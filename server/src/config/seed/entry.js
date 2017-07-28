'use strict';

import sqldb from '../../sqldb';

export default function seed () {
    let Entry = sqldb.Entry;

    return Entry.destroy({ where: {} })
    .then(() => Entry.bulkCreate([
        { id: 1, userId: 2, tournamentId: 1, g1AId: 122, g1BId: 166, g1CId: 125, g1DId: 95, g2AId: 133, g2BId: 185, g2CId: 10, g2DId: 35, g3AId: 242, g3BId: 183, g3CId: 48, g3DId: 124 },
        { id: 2, userId: 3, tournamentId: 1, g1AId: 118, g1BId: 52, g1CId: 51, g1DId: 8, g2AId: 180, g2BId: 33, g2CId: 13, g2DId: 35, g3AId: 133, g3BId: 21, g3CId: 29, g3DId: 140 },
        { id: 3, userId: 4, tournamentId: 1, g1AId: 180, g1BId: 77, g1CId: 48, g1DId: 95, g2AId: 133, g2BId: 33, g2CId: 65, g2DId: 62, g3AId: 99, g3BId: 14, g3CId: 13, g3DId: 35 },
        { id: 4, userId: 5, tournamentId: 1, g1AId: 242, g1BId: 3, g1CId: 51, g1DId: 140, g2AId: 180, g2BId: 223, g2CId: 17, g2DId: 140, g3AId: 122, g3BId: 166, g3CId: 196, g3DId: 63 },
        { id: 5, userId: 7, tournamentId: 1, g1AId: 195, g1BId: 52, g1CId: 65, g1DId: 95, g2AId: 99, g2BId: 166, g2CId: 48, g2DId: 35, g3AId: 133, g3BId: 38, g3CId: 158, g3DId: 8 },
        { id: 6, userId: 8, tournamentId: 1, g1AId: 99, g1BId: 52, g1CId: 13, g1DId: 12, g2AId: 195, g2BId: 33, g2CId: 65, g2DId: 34, g3AId: 133, g3BId: 21, g3CId: 48, g3DId: 95 },
        { id: 7, userId: 9, tournamentId: 1, g1AId: 122, g1BId: 77, g1CId: 10, g1DId: 12, g2AId: 180, g2BId: 166, g2CId: 36, g2DId: 62, g3AId: 99, g3BId: 52, g3CId: 2, g3DId: 8 },
        { id: 8, userId: 11, tournamentId: 1, g1AId: 242, g1BId: 14, g1CId: 153, g1DId: 62, g2AId: 122, g2BId: 224, g2CId: 196, g2DId: 140, g3AId: 180, g3BId: 222, g3CId: 51, g3DId: 95 },
        { id: 9, userId: 12, tournamentId: 1, g1AId: 195, g1BId: 77, g1CId: 151, g1DId: 35, g2AId: 99, g2BId: 33, g2CId: 154, g2DId: 142, g3AId: 122, g3BId: 14, g3CId: 51, g3DId: 8 },
        { id: 10, userId: 14, tournamentId: 1, g1AId: 27, g1BId: 38, g1CId: 196, g1DId: 62, g2AId: 133, g2BId: 14, g2CId: 48, g2DId: 62, g3AId: 180, g3BId: 52, g3CId: 153, g3DId: 142 },
        { id: 11, userId: 15, tournamentId: 1, g1AId: 180, g1BId: 33, g1CId: 36, g1DId: 62, g2AId: 180, g2BId: 38, g2CId: 196, g2DId: 8, g3AId: 122, g3BId: 166, g3CId: 65, g3DId: 62 },
        { id: 12, userId: 16, tournamentId: 1, g1AId: 122, g1BId: 52, g1CId: 112, g1DId: 63, g2AId: 180, g2BId: 14, g2CId: 154, g2DId: 63, g3AId: 99, g3BId: 166, g3CId: 154, g3DId: 63 },
        { id: 13, userId: 17, tournamentId: 1, g1AId: 180, g1BId: 38, g1CId: 41, g1DId: 169, g2AId: 122, g2BId: 81, g2CId: 158, g2DId: 95, g3AId: 99, g3BId: 52, g3CId: 196, g3DId: 124 },
        { id: 14, userId: 20, tournamentId: 1, g1AId: 180, g1BId: 33, g1CId: 65, g1DId: 62, g2AId: 180, g2BId: 3, g2CId: 125, g2DId: 62, g3AId: 122, g3BId: 33, g3CId: 65, g3DId: 62 },
        { id: 15, userId: 21, tournamentId: 1, g1AId: 99, g1BId: 33, g1CId: 131, g1DId: 124, g2AId: 180, g2BId: 77, g2CId: 65, g2DId: 12, g3AId: 42, g3BId: 81, g3CId: 48, g3DId: 95 },
        { id: 16, userId: 22, tournamentId: 1, g1AId: 122, g1BId: 166, g1CId: 125, g1DId: 95, g2AId: 133, g2BId: 14, g2CId: 36, g2DId: 63, g3AId: 195, g3BId: 52, g3CId: 48, g3DId: 35 },
        { id: 17, userId: 23, tournamentId: 1, g1AId: 180, g1BId: 166, g1CId: 65, g1DId: 241, g2AId: 99, g2BId: 33, g2CId: 151, g2DId: 35, g3AId: 122, g3BId: 81, g3CId: 29, g3DId: 63 },
        { id: 18, userId: 26, tournamentId: 1, g1AId: 27, g1BId: 185, g1CId: 13, g1DId: 241, g2AId: 180, g2BId: 77, g2CId: 51, g2DId: 95, g3AId: 180, g3BId: 189, g3CId: 10, g3DId: 62 },
        { id: 19, userId: 12, tournamentId: 2, g1AId: 118, g1BId: 27, g1CId: 65, g1DId: 120, g2AId: 99, g2BId: 157, g2CId: 52, g2DId: 16, g3AId: 180, g3BId: 96, g3CId: 48, g3DId: 5 },
        { id: 20, userId: 15, tournamentId: 2, g1AId: 118, g1BId: 27, g1CId: 52, g1DId: 141, g2AId: 118, g2BId: 127, g2CId: 48, g2DId: 210, g3AId: 99, g3BId: 142, g3CId: 65, g3DId: 120 },
        { id: 21, userId: 17, tournamentId: 2, g1AId: 21, g1BId: 124, g1CId: 218, g1DId: 45, g2AId: 99, g2BId: 124, g2CId: 13, g2DId: 161, g3AId: 133, g3BId: 189, g3CId: 183, g3DId: 181 },
        { id: 22, userId: 18, tournamentId: 2, g1AId: 118, g1BId: 110, g1CId: 125, g1DId: 120, g2AId: 242, g2BId: 175, g2CId: 183, g2DId: 102, g3AId: 21, g3BId: 110, g3CId: 183, g3DId: 181 },
        { id: 23, userId: 22, tournamentId: 2, g1AId: 21, g1BId: 112, g1CId: 125, g1DId: 181, g2AId: 118, g2BId: 110, g2CId: 54, g2DId: 58, g3AId: 99, g3BId: 110, g3CId: 49, g3DId: 134 },
        { id: 24, userId: 1, tournamentId: 3, g1AId: 118, g1BId: 33, g1CId: 178, g1DId: 231, g2AId: 180, g2BId: 223, g2CId: 127, g2DId: 231, g3AId: 133, g3BId: 209, g3CId: 176, g3DId: 82 },
        { id: 25, userId: 5, tournamentId: 3, g1AId: 180, g1BId: 10, g1CId: 175, g1DId: 98, g2AId: 118, g2BId: 223, g2CId: 176, g2DId: 231, g3AId: 133, g3BId: 166, g3CId: 77, g3DId: 124 },
        { id: 26, userId: 7, tournamentId: 3, g1AId: 118, g1BId: 166, g1CId: 65, g1DId: 157, g2AId: 133, g2BId: 33, g2CId: 38, g2DId: 120, g3AId: 122, g3BId: 10, g3CId: 51, g3DId: 29 },
        { id: 27, userId: 10, tournamentId: 3, g1AId: 180, g1BId: 21, g1CId: 77, g1DId: 151, g2AId: 133, g2BId: 10, g2CId: 38, g2DId: 157, g3AId: 118, g3BId: 116, g3CId: 218, g3DId: 29 },
        { id: 28, userId: 11, tournamentId: 3, g1AId: 118, g1BId: 33, g1CId: 36, g1DId: 49, g2AId: 242, g2BId: 3, g2CId: 127, g2DId: 201, g3AId: 133, g3BId: 81, g3CId: 51, g3DId: 97 },
        { id: 29, userId: 13, tournamentId: 3, g1AId: 180, g1BId: 10, g1CId: 38, g1DId: 157, g2AId: 118, g2BId: 10, g2CId: 95, g2DId: 157, g3AId: 133, g3BId: 33, g3CId: 77, g3DId: 29 },
        { id: 30, userId: 15, tournamentId: 3, g1AId: 122, g1BId: 166, g1CId: 185, g1DId: 187, g2AId: 118, g2BId: 158, g2CId: 77, g2DId: 157, g3AId: 133, g3BId: 158, g3CId: 35, g3DId: 120 },
        { id: 31, userId: 17, tournamentId: 3, g1AId: 180, g1BId: 166, g1CId: 38, g1DId: 231, g2AId: 133, g2BId: 209, g2CId: 185, g2DId: 120, g3AId: 118, g3BId: 10, g3CId: 77, g3DId: 124 },
        { id: 32, userId: 18, tournamentId: 3, g1AId: 99, g1BId: 158, g1CId: 51, g1DId: 124, g2AId: 133, g2BId: 166, g2CId: 218, g2DId: 29, g3AId: 180, g3BId: 154, g3CId: 77, g3DId: 29 },
        { id: 33, userId: 19, tournamentId: 3, g1AId: 118, g1BId: 209, g1CId: 65, g1DId: 97, g2AId: 180, g2BId: 166, g2CId: 176, g2DId: 97, g3AId: 122, g3BId: 139, g3CId: 176, g3DId: 97 },
        { id: 34, userId: 22, tournamentId: 3, g1AId: 99, g1BId: 33, g1CId: 35, g1DId: 49, g2AId: 122, g2BId: 209, g2CId: 153, g2DId: 13, g3AId: 118, g3BId: 223, g3CId: 38, g3DId: 120 },
        { id: 35, userId: 20, tournamentId: 3, g1AId: 118, g1BId: 33, g1CId: 224, g1DId: 120, g2AId: 118, g2BId: 223, g2CId: 127, g2DId: 255, g3AId: 42, g3BId: 223, g3CId: 77, g3DId: 120 },
        { id: 36, userId: 24, tournamentId: 3, g1AId: 99, g1BId: 112, g1CId: 178, g1DId: 120, g2AId: 133, g2BId: 223, g2CId: 183, g2DId: 49, g3AId: 42, g3BId: 69, g3CId: 77, g3DId: 124 },
        { id: 37, userId: 25, tournamentId: 3, g1AId: 118, g1BId: 166, g1CId: 77, g1DId: 62, g2AId: 122, g2BId: 33, g2CId: 36, g2DId: 157, g3AId: 133, g3BId: 166, g3CId: 125, g3DId: 124 },
        { id: 38, userId: 8, tournamentId: 3, g1AId: 118, g1BId: 139, g1CId: 38, g1DId: 97, g2AId: 133, g2BId: 112, g2CId: 185, g2DId: 201, g3AId: 99, g3BId: 3, g3CId: 152, g3DId: 276 },
        { id: 39, userId: 6, tournamentId: 3, g1AId: 180, g1BId: 10, g1CId: 36, g1DId: 87, g2AId: 99, g2BId: 52, g2CId: 178, g2DId: 157, g3AId: 122, g3BId: 209, g3CId: 176, g3DId: 29 },
        { id: 40, userId: 11, tournamentId: 4, g1AId: 180, g1BId: 99, g1CId: 35, g1DId: 190, g2AId: 242, g2BId: 27, g2CId: 89, g2DId: 167, g3AId: 42, g3BId: 38, g3CId: 198, g3DId: 151 },
        { id: 41, userId: 13, tournamentId: 4, g1AId: 133, g1BId: 99, g1CId: 51, g1DId: 124, g2AId: 180, g2BId: 209, g2CId: 48, g2DId: 29, g3AId: 44, g3BId: 77, g3CId: 10, g3DId: 151 },
        { id: 42, userId: 15, tournamentId: 4, g1AId: 133, g1BId: 27, g1CId: 131, g1DId: 194, g2AId: 122, g2BId: 99, g2CId: 17, g2DId: 125, g3AId: 195, g3BId: 27, g3CId: 48, g3DId: 190 },
        { id: 43, userId: 17, tournamentId: 4, g1AId: 133, g1BId: 21, g1CId: 17, g1DId: 125, g2AId: 133, g2BId: 166, g2CId: 10, g2DId: 98, g3AId: 42, g3BId: 16, g3CId: 185, g3DId: 124 },
        { id: 44, userId: 18, tournamentId: 4, g1AId: 133, g1BId: 38, g1CId: 97, g1DId: 124, g2AId: 182, g2BId: 158, g2CId: 51, g2DId: 29, g3AId: 42, g3BId: 189, g3CId: 185, g3DId: 98 },
        { id: 45, userId: 22, tournamentId: 4, g1AId: 14, g1BId: 27, g1CId: 48, g1DId: 125, g2AId: 33, g2BId: 209, g2CId: 89, g2DId: 125, g3AId: 122, g3BId: 99, g3CId: 131, g3DId: 228 },
        { id: 46, userId: 5, tournamentId: 4, g1AId: 180, g1BId: 209, g1CId: 89, g1DId: 98, g2AId: 14, g2BId: 3, g2CId: 65, g2DId: 124, g3AId: 42, g3BId: 81, g3CId: 17, g3DId: 29 },
        { id: 47, userId: 25, tournamentId: 4, g1AId: 133, g1BId: 3, g1CId: 131, g1DId: 98, g2AId: 180, g2BId: 209, g2CId: 152, g2DId: 255, g3AId: 118, g3BId: 166, g3CId: 17, g3DId: 29 },
        { id: 48, userId: 24, tournamentId: 4, g1AId: 180, g1BId: 3, g1CId: 89, g1DId: 49, g2AId: 133, g2BId: 116, g2CId: 48, g2DId: 54, g3AId: 242, g3BId: 166, g3CId: 112, g3DId: 255 }
        ])
    .then(() => console.log('finished populating entries'))
    .catch(err => console.log('error populating entries', err)));
}
