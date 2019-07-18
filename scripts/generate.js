const xlsx = require('xlsx');
const fs = require('fs');
const Fuse = require('fuse.js');
const http = require('http');

if (process.argv.length < 3 || (process.argv.length >= 3 && !/\.xlsx$/.test(process.argv[2]))) {
    console.log('Please specify xlsx file for golfers/odds.');
    return;
}

const golfersFile = process.argv[2];

if (process.argv.length < 4 || (process.argv.length >= 4 && !/\.xlsx$/.test(process.argv[3])))  {
    console.log('Please specify xlsx file for entries');
    return;
}

const entriesFile = process.argv[3];

if (process.argv.length < 5 || (process.argv.length >= 5 && !/^[0-9]{4,9}$/.test(process.argv[4])))  {
    console.log('Please specify tourneyId');
    return;
}

const tourneyId = process.argv[4];

const host = `site.web.api.espn.com`;
//const path = `/core/golf/leaderboard?tournamentId=${tourneyId}&xhr=1`;
const path = `/apis/site/v2/sports/golf/leaderboard?league=pga&region=us&lang=en&event=${tourneyId}&showAirings=true`;


let golferIdIndex = 1;
let contestantIdIndex = 1;

const golferStartingPositions = { column: 'A', row: 2 };
const contestantStartCellAddress = { column: 'B', row: 2 };

const tiers = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
const golfersSheetName = 'Sheet1';
const contestantsSheetName = 'Sheet2';


getEspnData().then(espnData => {
    run(espnData);
}).catch(e => console.error(e));

function run(espnData) {
    const golfersWorkbook = xlsx.readFile(golfersFile);
    const entriesWorkbook = xlsx.readFile(entriesFile);
    const golfersWorksheet = golfersWorkbook.Sheets[Object.keys(golfersWorkbook.Sheets)[0]]
    const contestantWorksheet = entriesWorkbook.Sheets[Object.keys(entriesWorkbook.Sheets)[0]]

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

    const competitions = espnData.events[0].competitions;
    const espnFuse = new Fuse(competitions[0].competitors, options);

    const golferConfig = createGolferConfig(golfersWorksheet, espnFuse);

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

function createGolferConfig(worksheet, espnFuse) {
    const tierGolfers = [];

    let { column, row } = golferStartingPositions;

    while (true) {
        const cellAddress = column + row.toString();
        const targetCell = worksheet[cellAddress];
        const tierAddress = incrementColumn(column, 2) + row.toString();
        const tierCell = worksheet[tierAddress];
        if (targetCell) {
            tierGolfers.push(createGolfer(targetCell.v, tierCell.v, espnFuse));
        } else {
            break;
        }
        row++;
    }

    return tierGolfers;
}

function createGolfer(cellValue, tier, espnFuse) {

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
            position.row += 3;
        } else {
            break;
        }
    }

    return contestants;
}

function createContestant(worksheet, position, golferConfig) {
    const nameCellAddress = position.column + position.row;
    const name = worksheet[nameCellAddress].v.trim();

    const entry1Pos = { column: incrementColumn(position.column, 1), row: position.row}
    const entry2Pos = { column: incrementColumn(position.column, 1), row: position.row + 1}
    const entry3Pos = { column: incrementColumn(position.column, 1), row: position.row + 2}

    const entry1 = createEntry(worksheet, entry1Pos, golferConfig);
    const entry2 = createEntry(worksheet, entry2Pos, golferConfig);
    const entry3 = createEntry(worksheet, entry3Pos, golferConfig);
   
    return { id: contestantIdIndex++, name, entries: [entry1, entry2, entry3]};
}

function createEntry(worksheet, position, golferConfig) {
    const golfer1Name = worksheet[position.column + position.row].v.trim();
    const golfer2Name = worksheet[incrementColumn(position.column, 1) + position.row].v.trim();
    const golfer3Name = worksheet[incrementColumn(position.column, 2) + position.row].v.trim();
    const golfer4Name = worksheet[incrementColumn(position.column, 3) + position.row].v.trim();

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
   
    const getGolferData = (golferName) => {
        const result = entryFuse.search(golferName);
        if (result.length === 0) {
            console.log("Could not find espn data for entry: " + golferName);
            return null;
        }


        return result[0];
    }

    const golferData1 = getGolferData(golfer1Name);
    const golferData2 = getGolferData(golfer2Name);
    const golferData3 = getGolferData(golfer3Name);
    const golferData4 = getGolferData(golfer4Name);

    validate(golferData1, 'A');
    validate(golferData2, 'B');
    validate(golferData3, 'C');
    validate(golferData4, 'D');


    return [golferData1.id, golferData2.id, golferData3.id, golferData4.id];
}

function validate(golferData, expectedTier) {
    const expected = tierToNum(expectedTier);
    const golferVal = tierToNum(golferData.tier) 
   
    if (golferVal < expected) {
        throw new Error(`Found ${golferData.name} in tier ${golferData.tier}, expected: ${expectedTier}`);
    }
}

function tierToNum(tier) {
    switch (tier) {
        case 'A':
            return 1;
        case 'B':
            return 2;
        case 'C':
            return 3;
        case 'D':
            return 4;
        default:
            return 5;
    }
}

function incrementColumn(row, delta = 1) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const index = alphabet.findIndex(letter => letter === row);
    return alphabet[index + delta];
}

function writeConfig(golferConfig, contestantConfig, espnData) {
    const tourneyTitle = espnData.events[0].name;

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