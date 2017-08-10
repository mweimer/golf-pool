const xlsx = require('xlsx');
const fs = require('fs');
const Fuse = require('fuse.js');
const http = require('http');

if (process.argv.length < 3 || (process.argv.length >= 3 && !/\.xlsx$/.test(process.argv[2]))) {
    console.log('Please specify xlsx file.');
    return;
}

const inputFile = process.argv[2];

if (process.argv.length < 4 || (process.argv.length >= 4 && !/^[0-9]{4}$/.test(process.argv[3])))  {
    console.log('Please specify tourneyId');
    return;
}

const tourneyId = process.argv[3];
const host = `cdn.espn.com`;
const path = `/core/golf/leaderboard?tournamentId=${tourneyId}&xhr=1`;

let golferIdIndex = 1;
let contestantIdIndex = 1;

const tierStartingPositions = [
    { column: 'C', row: 15 }, 
    { column: 'F', row: 15 }, 
    { column: 'I', row: 15 }, 
    { column: 'L', row: 15 }
];

const contestantStartCellAddress = { column: 'A', row: 1 };

const tiers = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
const golfersSheetName = 'Player Tiers & Instructions';
const contestantsSheetName = 'Contestants';


getEspnData().then(espnData => {
    run(espnData);
}).catch(e => console.error(e));

function run(espnData) {
    const workbook = xlsx.readFile(inputFile);
    const golfersWorksheet = workbook.Sheets[golfersSheetName];
    const contestantWorksheet = workbook.Sheets[contestantsSheetName];

    const options = {
      shouldSort: true,
      tokenize: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['athlete.displayName']
    };

    const espnFuse = new Fuse(espnData.json.competitions[0].competitors, options);

    const golferConfig = tierStartingPositions
        .map((position, tierIndex) => createGolferConfig(golfersWorksheet, position, tierIndex, espnFuse))
        .reduce((prev, next) => prev.concat(next));


    const golferNames = golferConfig.map(g => g.name);
    const duplicates = golferNames.filter((name, index) => {
       return golferNames.includes(name, index + 1);
    });


    if (duplicates.length > 0) {
        console.error('Error: Duplicate names - ' + duplicates.join(', '));
    }

    const contestantConfig = createContestantConfig(contestantWorksheet, contestantStartCellAddress, golferConfig);

    writeConfig(golferConfig, contestantConfig, espnData);
}

function createGolferConfig(worksheet, tierPosition, tierIndex, espnFuse) {
    const tierGolfers = [];

    while (true) {
        const cellAddress = tierPosition.column + tierPosition.row.toString();
        const targetCell = worksheet[cellAddress];
        if (targetCell) {
            tierGolfers.push(createGolfer(targetCell.v, tierIndex, espnFuse));
        } else {
            break;
        }
        tierPosition.row++;
    }

    return tierGolfers;
}

function createGolfer(cellValue, tierIndex, espnFuse) {
    const tier = tiers[tierIndex];

    const spreadsheetName = cellValue.trim();
    const espnResult = espnFuse.search(spreadsheetName)[0];
    const name = espnResult ? espnResult.athlete.displayName : spreadsheetName ;
    const espnId = espnResult ? espnResult.athlete.id : '';

    return { id: golferIdIndex++, name, spreadsheetName, espnId, tier };
}

function createContestantConfig(worksheet, position, golferConfig) {
    const contestants = [];

    while (worksheet) {
        if (worksheet[position.column + position.row]) {
            contestants.push(createContestant(worksheet, position, golferConfig));
            position.row += 7;
        } else {
            break;
        }
    }

    return contestants;
}

function createContestant(worksheet, position, golferConfig) {
    const nameCellAddress = position.column + position.row;
    const name = worksheet[nameCellAddress].v.trim();

    const entry1Pos = { column: position.column, row: position.row + 2}
    const entry2Pos = { column: incrementColumn(position.column, 1), row: position.row + 2}
    const entry3Pos = { column: incrementColumn(position.column, 2), row: position.row + 2}

    const entry1 = createEntry(worksheet, entry1Pos, golferConfig);
    const entry2 = createEntry(worksheet, entry2Pos, golferConfig);
    const entry3 = createEntry(worksheet, entry3Pos, golferConfig);
   
    return { id: contestantIdIndex++, name, entries: [entry1, entry2, entry3]};
}

function createEntry(worksheet, position, golferConfig) {
    const golfer1Name = worksheet[position.column + position.row].v.trim();
    const golfer2Name = worksheet[position.column + (position.row + 1)].v.trim();
    const golfer3Name = worksheet[position.column + (position.row + 2)].v.trim();
    const golfer4Name = worksheet[position.column + (position.row + 3)].v.trim();

    const options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['spreadsheetName']
    };
    const entryFuse = new Fuse(golferConfig, options);
   
    const getGolferId = (golferName) => {
        const result = entryFuse.search(golferName);
        return result[0].id;
    }

    const golferId1 = getGolferId(golfer1Name);
    const golferId2 = getGolferId(golfer2Name);
    const golferId3 = getGolferId(golfer3Name);
    const golferId4 = getGolferId(golfer4Name);

    return [golferId1, golferId2, golferId3, golferId4];
}

function incrementColumn(row, delta = 1) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const index = alphabet.findIndex(letter => letter === row);
    return alphabet[index + delta];
}

function writeConfig(golferConfig, contestantConfig, espnData) {
    const tourneyTitle = espnData.content.tournamentName;

    const fileName = tourneyTitle.toLowerCase().replace(/\s/g, '-').replace(/\./g, '');

    const stream = fs.createWriteStream('config-' + fileName + '.ts');
    stream.write(`const tourneyTitle = \'${tourneyTitle}\';\n\nconst tourneyId = \'${tourneyId}\';\n\nconst golferData = [\n`);
    let previousTier = 'A';

    golferConfig.forEach((g, i) => {
        if (g.tier !== previousTier) {
            previousTier = g.tier;
            stream.write('\n');
        }

        const name = g.name.replace(/'/g, '\\\'');

        stream.write(`    { id: ${g.id}, name: '${name}', espnId: '${g.espnId}', tier: '${g.tier}' }${i !== golferConfig.length - 1 ? ',' : ''}\n`);
    });

    stream.write('];\n\nconst contestantData = [\n');
    contestantConfig.forEach((c, i) => {
        const name = c.name.replace(/'/g, '\\\'');

        stream.write(`    { id: ${c.id}, name: '${name}', entries: [` + 
            `[${c.entries[0][0]}, ${c.entries[0][1]}, ${c.entries[0][2]}, ${c.entries[0][3]}], ` +
            `[${c.entries[1][0]}, ${c.entries[1][1]}, ${c.entries[1][2]}, ${c.entries[1][3]}], ` +
            `[${c.entries[2][0]}, ${c.entries[2][1]}, ${c.entries[2][2]}, ${c.entries[2][3]}]` +
            `] }${i !== contestantConfig.length - 1 ? ',' : ''}\n`);
    });

    stream.write('];\n\nexport default { tourneyTitle, tourneyId, golferData, contestantData };\n');
    stream.end();   
}

function getEspnData() {
    return new Promise((resolve, reject) => {
        http.get({ host, path}, (response)  => {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                var parsed = JSON.parse(body);
                resolve(parsed);
            });
        });
    });
}