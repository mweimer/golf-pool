const xlsx = require('xlsx');
const fs = require('fs');

if (process.argv.length < 3 || (process.argv.length >= 3 && !/\.xlsx$/.test(process.argv[2]))) {
    console.log('Please specify xlsx file.');
    return;
}

const inputFile = process.argv[2];

let golferIdIndex = 1;
let contestantIdIndex = 1;

const tierStartingPositions = [
    { column: 'C', row: 15 }, 
    { column: 'F', row: 15 }, 
    { column: 'I', row: 15 }, 
    { column: 'L', row: 15 }];
const titleCellAddress = 'B1';
const idCellAddress = 'B2';
const contestantStartCellAddress = { column: 'A', row: 4 };

const tiers = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
const golfersSheetName = 'Player Tiers & Instructions';
const contestantsSheetName = 'Contestants';

run();

function run() {
    const workbook = xlsx.readFile(inputFile);
    const golfersWorksheet = workbook.Sheets[golfersSheetName];
    const contestantWorksheet = workbook.Sheets[contestantsSheetName];

    const golferConfig = tierStartingPositions
        .map((position, tierIndex) => createGolferConfig(golfersWorksheet, position, tierIndex))
        .reduce((prev, next) => prev.concat(next));

    const titleId = createTitleId(contestantWorksheet);

    const contestantConfig = createContestantConfig(contestantWorksheet, contestantStartCellAddress, golferConfig);

    writeConfig(golferConfig, titleId, contestantConfig);
}

function createGolferConfig(worksheet, tierPosition, tierIndex) {
    const tierGolfers = [];

    while (true) {
        const cellAddress = tierPosition.column + tierPosition.row.toString();
        const targetCell = worksheet[cellAddress];
        if (targetCell) {
            tierGolfers.push(createGolfer(targetCell.v, tierIndex));
        } else {
            break;
        }
        tierPosition.row++;
    }

    return tierGolfers;
}

function createGolfer(cellValue, tierIndex) {
    const tier = tiers[tierIndex];

    const name = cellValue.trim();
    const nameMatch = name.match(/^([a-zA-Z,.'-]+) ([a-zA-Z ,.'-]+)$/);
    const firstName = nameMatch[1];
    const lastName = nameMatch[2];

    return { id: golferIdIndex++, firstName,  lastName, tier };
}

function createTitleId(worksheet) {
    const title = worksheet[titleCellAddress].v.trim();
    const id = worksheet[idCellAddress].w.trim();
    return { title, id };
}

function createContestantConfig(worksheet, position, golferConfig) {
    const contestants = [];

    while (true) {
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
    const golfer1 = worksheet[position.column + position.row].v.trim();
    const golfer2 = worksheet[position.column + (position.row + 1)].v.trim();
    const golfer3 = worksheet[position.column + (position.row + 2)].v.trim();
    const golfer4 = worksheet[position.column + (position.row + 3)].v.trim();


    const matchGolfer = (golferConfig, golferName) => {
        const regex = new RegExp(`${golferConfig.firstName}.*${golferConfig.lastName}` , 'i')
        return regex.test(golferName);
    }

    const golferId1 = golferConfig.find(gc => matchGolfer(gc, golfer1)).id;
    const golferId2 = golferConfig.find(gc => matchGolfer(gc, golfer2)).id;
    const golferId3 = golferConfig.find(gc => matchGolfer(gc, golfer3)).id;
    const golferId4 = golferConfig.find(gc => matchGolfer(gc, golfer4)).id;

    return [golferId1, golferId2, golferId3, golferId4];
}

function incrementColumn(row, delta = 1) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const index = alphabet.findIndex(letter => letter === row);
    return alphabet[index + delta];
}

function writeConfig(golferConfig, titleId, contestantConfig) {

    const fileName = titleId.title.toLowerCase().replace(/\s/g, '-');

    const stream = fs.createWriteStream(fileName + '.ts');

    stream.write(`const tourneyTitle = \'${titleId.title}\';\n\nconst tourneyId = \'${titleId.id}\';\n\nconst golferData = [\n`);
    let previousTier = 'A';
    golferConfig.forEach((g, i) => {
        if (g.tier !== previousTier) {
            previousTier = g.tier;
            stream.write('\n');
        }

        stream.write(`    { id: ${g.id}, firstName: '${g.firstName}', lastName: '${g.lastName}', tier: '${g.tier}' }${i !== golferConfig.length - 1 ? ',' : ''}\n`);
    });

    stream.write('];\n\nconst contestantData = [\n');
    contestantConfig.forEach((c, i) => {
        stream.write(`    { id: ${c.id}, name: '${c.name}', entries: [` + 
            `[${c.entries[0][0]}, ${c.entries[0][1]}, ${c.entries[0][2]}, ${c.entries[0][3]}], ` +
            `[${c.entries[1][0]}, ${c.entries[1][1]}, ${c.entries[1][2]}, ${c.entries[1][3]}], ` +
            `[${c.entries[2][0]}, ${c.entries[2][1]}, ${c.entries[2][2]}, ${c.entries[2][3]}]` +
            `] }${i !== contestantConfig.length - 1 ? ',' : ''}\n`);
    });

    stream.write('];\n\nexport default { tourneyTitle, tourneyId, golferData, contestantData };\n');
    stream.end();   
}