'use strict';

import sqldb from '../../sqldb';

export default function seedDatabaseIfNeeded () {
    let TournamentGolfer = sqldb.TournamentGolfer;

    return TournamentGolfer.destroy({ where: {} })
    .then(() => TournamentGolfer.bulkCreate([
        { tournamentId: 1, golferId: 118, tier: 'A' },
        { tournamentId: 1, golferId: 122, tier: 'A' },
        { tournamentId: 1, golferId: 180, tier: 'A' },
        { tournamentId: 1, golferId: 195, tier: 'A' },
        { tournamentId: 1, golferId: 133, tier: 'A' },
        { tournamentId: 1, golferId: 99, tier: 'A' },
        { tournamentId: 1, golferId: 242, tier: 'A' },
        { tournamentId: 1, golferId: 42, tier: 'A' },
        { tournamentId: 1, golferId: 27, tier: 'A' },
        { tournamentId: 1, golferId: 44, tier: 'A' },
        { tournamentId: 1, golferId: 166, tier: 'B' },
        { tournamentId: 1, golferId: 33, tier: 'B' },
        { tournamentId: 1, golferId: 3, tier: 'B' },
        { tournamentId: 1, golferId: 14, tier: 'B' },
        { tournamentId: 1, golferId: 52, tier: 'B' },
        { tournamentId: 1, golferId: 77, tier: 'B' },
        { tournamentId: 1, golferId: 81, tier: 'B' },
        { tournamentId: 1, golferId: 116, tier: 'B' },
        { tournamentId: 1, golferId: 185, tier: 'B' },
        { tournamentId: 1, golferId: 209, tier: 'B' },
        { tournamentId: 1, golferId: 178, tier: 'B' },
        { tournamentId: 1, golferId: 222, tier: 'B' },
        { tournamentId: 1, golferId: 224, tier: 'B' },
        { tournamentId: 1, golferId: 223, tier: 'B' },
        { tournamentId: 1, golferId: 69, tier: 'B' },
        { tournamentId: 1, golferId: 189, tier: 'B' },
        { tournamentId: 1, golferId: 183, tier: 'B' },
        { tournamentId: 1, golferId: 38, tier: 'B' },
        { tournamentId: 1, golferId: 21, tier: 'B' },
        { tournamentId: 1, golferId: 182, tier: 'B' },
        { tournamentId: 1, golferId: 139, tier: 'B' },
        { tournamentId: 1, golferId: 154, tier: 'C' },
        { tournamentId: 1, golferId: 65, tier: 'C' },
        { tournamentId: 1, golferId: 51, tier: 'C' },
        { tournamentId: 1, golferId: 36, tier: 'C' },
        { tournamentId: 1, golferId: 151, tier: 'C' },
        { tournamentId: 1, golferId: 125, tier: 'C' },
        { tournamentId: 1, golferId: 112, tier: 'C' },
        { tournamentId: 1, golferId: 48, tier: 'C' },
        { tournamentId: 1, golferId: 17, tier: 'C' },
        { tournamentId: 1, golferId: 196, tier: 'C' },
        { tournamentId: 1, golferId: 131, tier: 'C' },
        { tournamentId: 1, golferId: 153, tier: 'C' },
        { tournamentId: 1, golferId: 121, tier: 'C' },
        { tournamentId: 1, golferId: 158, tier: 'C' },
        { tournamentId: 1, golferId: 152, tier: 'C' },
        { tournamentId: 1, golferId: 10, tier: 'C' },
        { tournamentId: 1, golferId: 54, tier: 'C' },
        { tournamentId: 1, golferId: 41, tier: 'C' },
        { tournamentId: 1, golferId: 127, tier: 'C' },
        { tournamentId: 1, golferId: 175, tier: 'C' },
        { tournamentId: 1, golferId: 89, tier: 'C' },
        { tournamentId: 1, golferId: 13, tier: 'C' },
        { tournamentId: 1, golferId: 29, tier: 'C' },
        { tournamentId: 1, golferId: 49, tier: 'C' },
        { tournamentId: 1, golferId: 198, tier: 'C' },
        { tournamentId: 1, golferId: 156, tier: 'C' },
        { tournamentId: 1, golferId: 2, tier: 'C' },
        { tournamentId: 1, golferId: 181, tier: 'C' },
        { tournamentId: 1, golferId: 70, tier: 'D' },
        { tournamentId: 1, golferId: 142, tier: 'D' },
        { tournamentId: 1, golferId: 95, tier: 'D' },
        { tournamentId: 1, golferId: 124, tier: 'D' },
        { tournamentId: 1, golferId: 63, tier: 'D' },
        { tournamentId: 1, golferId: 35, tier: 'D' },
        { tournamentId: 1, golferId: 140, tier: 'D' },
        { tournamentId: 1, golferId: 62, tier: 'D' },
        { tournamentId: 1, golferId: 8, tier: 'D' },
        { tournamentId: 1, golferId: 169, tier: 'D' },
        { tournamentId: 1, golferId: 241, tier: 'D' },
        { tournamentId: 1, golferId: 22, tier: 'D' },
        { tournamentId: 1, golferId: 134, tier: 'D' },
        { tournamentId: 1, golferId: 82, tier: 'D' },
        { tournamentId: 1, golferId: 267, tier: 'D' },
        { tournamentId: 1, golferId: 218, tier: 'D' },
        { tournamentId: 1, golferId: 12, tier: 'D' },
        { tournamentId: 1, golferId: 162, tier: 'D' },
        { tournamentId: 1, golferId: 93, tier: 'D' },
        { tournamentId: 1, golferId: 129, tier: 'D' },
        { tournamentId: 1, golferId: 120, tier: 'D' },
        { tournamentId: 1, golferId: 212, tier: 'D' },
        { tournamentId: 1, golferId: 32, tier: 'D' },
        { tournamentId: 1, golferId: 34, tier: 'D' },
        { tournamentId: 1, golferId: 263, tier: 'D' },
        { tournamentId: 1, golferId: 258, tier: 'D' },
        { tournamentId: 1, golferId: 39, tier: 'D' },
        { tournamentId: 1, golferId: 272, tier: 'D' },
        { tournamentId: 1, golferId: 271, tier: 'D' },
        { tournamentId: 1, golferId: 31, tier: 'D' },
        { tournamentId: 1, golferId: 19, tier: 'D' },
        { tournamentId: 1, golferId: 28, tier: 'D' },
        { tournamentId: 1, golferId: 30, tier: 'D' },
        { tournamentId: 1, golferId: 37, tier: 'D' },
        { tournamentId: 1, golferId: 25, tier: 'D' },
        { tournamentId: 2, golferId: 118, tier: 'A' },
        { tournamentId: 2, golferId: 242, tier: 'A' },
        { tournamentId: 2, golferId: 180, tier: 'A' },
        { tournamentId: 2, golferId: 99, tier: 'A' },
        { tournamentId: 2, golferId: 195, tier: 'A' },
        { tournamentId: 2, golferId: 33, tier: 'A' },
        { tournamentId: 2, golferId: 133, tier: 'A' },
        { tournamentId: 2, golferId: 21, tier: 'A' },
        { tournamentId: 2, golferId: 209, tier: 'A' },
        { tournamentId: 2, golferId: 166, tier: 'A' },
        { tournamentId: 2, golferId: 189, tier: 'B' },
        { tournamentId: 2, golferId: 110, tier: 'B' },
        { tournamentId: 2, golferId: 112, tier: 'B' },
        { tournamentId: 2, golferId: 199, tier: 'B' },
        { tournamentId: 2, golferId: 142, tier: 'B' },
        { tournamentId: 2, golferId: 175, tier: 'B' },
        { tournamentId: 2, golferId: 196, tier: 'B' },
        { tournamentId: 2, golferId: 27, tier: 'B' },
        { tournamentId: 2, golferId: 96, tier: 'B' },
        { tournamentId: 2, golferId: 176, tier: 'B' },
        { tournamentId: 2, golferId: 10, tier: 'B' },
        { tournamentId: 2, golferId: 116, tier: 'B' },
        { tournamentId: 2, golferId: 95, tier: 'B' },
        { tournamentId: 2, golferId: 69, tier: 'B' },
        { tournamentId: 2, golferId: 51, tier: 'B' },
        { tournamentId: 2, golferId: 127, tier: 'B' },
        { tournamentId: 2, golferId: 157, tier: 'B' },
        { tournamentId: 2, golferId: 136, tier: 'B' },
        { tournamentId: 2, golferId: 106, tier: 'B' },
        { tournamentId: 2, golferId: 158, tier: 'B' },
        { tournamentId: 2, golferId: 35, tier: 'B' },
        { tournamentId: 2, golferId: 124, tier: 'B' },
        { tournamentId: 2, golferId: 183, tier: 'C' },
        { tournamentId: 2, golferId: 143, tier: 'C' },
        { tournamentId: 2, golferId: 125, tier: 'C' },
        { tournamentId: 2, golferId: 65, tier: 'C' },
        { tournamentId: 2, golferId: 49, tier: 'C' },
        { tournamentId: 2, golferId: 153, tier: 'C' },
        { tournamentId: 2, golferId: 54, tier: 'C' },
        { tournamentId: 2, golferId: 63, tier: 'C' },
        { tournamentId: 2, golferId: 82, tier: 'C' },
        { tournamentId: 2, golferId: 182, tier: 'C' },
        { tournamentId: 2, golferId: 78, tier: 'C' },
        { tournamentId: 2, golferId: 52, tier: 'C' },
        { tournamentId: 2, golferId: 17, tier: 'C' },
        { tournamentId: 2, golferId: 187, tier: 'C' },
        { tournamentId: 2, golferId: 238, tier: 'C' },
        { tournamentId: 2, golferId: 121, tier: 'C' },
        { tournamentId: 2, golferId: 109, tier: 'C' },
        { tournamentId: 2, golferId: 47, tier: 'C' },
        { tournamentId: 2, golferId: 218, tier: 'C' },
        { tournamentId: 2, golferId: 236, tier: 'C' },
        { tournamentId: 2, golferId: 48, tier: 'C' },
        { tournamentId: 2, golferId: 228, tier: 'C' },
        { tournamentId: 2, golferId: 119, tier: 'C' },
        { tournamentId: 2, golferId: 163, tier: 'C' },
        { tournamentId: 2, golferId: 135, tier: 'C' },
        { tournamentId: 2, golferId: 97, tier: 'C' },
        { tournamentId: 2, golferId: 156, tier: 'C' },
        { tournamentId: 2, golferId: 159, tier: 'C' },
        { tournamentId: 2, golferId: 6, tier: 'C' },
        { tournamentId: 2, golferId: 155, tier: 'C' },
        { tournamentId: 2, golferId: 13, tier: 'C' },
        { tournamentId: 2, golferId: 66, tier: 'C' },
        { tournamentId: 2, golferId: 41, tier: 'C' },
        { tournamentId: 2, golferId: 161, tier: 'D' },
        { tournamentId: 2, golferId: 181, tier: 'D' },
        { tournamentId: 2, golferId: 169, tier: 'D' },
        { tournamentId: 2, golferId: 98, tier: 'D' },
        { tournamentId: 2, golferId: 115, tier: 'D' },
        { tournamentId: 2, golferId: 141, tier: 'D' },
        { tournamentId: 2, golferId: 113, tier: 'D' },
        { tournamentId: 2, golferId: 210, tier: 'D' },
        { tournamentId: 2, golferId: 74, tier: 'D' },
        { tournamentId: 2, golferId: 1, tier: 'D' },
        { tournamentId: 2, golferId: 93, tier: 'D' },
        { tournamentId: 2, golferId: 120, tier: 'D' },
        { tournamentId: 2, golferId: 128, tier: 'D' },
        { tournamentId: 2, golferId: 206, tier: 'D' },
        { tournamentId: 2, golferId: 102, tier: 'D' },
        { tournamentId: 2, golferId: 45, tier: 'D' },
        { tournamentId: 2, golferId: 64, tier: 'D' },
        { tournamentId: 2, golferId: 221, tier: 'D' },
        { tournamentId: 2, golferId: 249, tier: 'D' },
        { tournamentId: 2, golferId: 252, tier: 'D' },
        { tournamentId: 2, golferId: 129, tier: 'D' },
        { tournamentId: 2, golferId: 58, tier: 'D' },
        { tournamentId: 2, golferId: 215, tier: 'D' },
        { tournamentId: 2, golferId: 16, tier: 'D' },
        { tournamentId: 2, golferId: 94, tier: 'D' },
        { tournamentId: 2, golferId: 225, tier: 'D' },
        { tournamentId: 2, golferId: 167, tier: 'D' },
        { tournamentId: 2, golferId: 179, tier: 'D' },
        { tournamentId: 2, golferId: 212, tier: 'D' },
        { tournamentId: 2, golferId: 53, tier: 'D' },
        { tournamentId: 2, golferId: 34, tier: 'D' },
        { tournamentId: 2, golferId: 267, tier: 'D' },
        { tournamentId: 2, golferId: 145, tier: 'D' },
        { tournamentId: 2, golferId: 40, tier: 'D' },
        { tournamentId: 2, golferId: 200, tier: 'D' },
        { tournamentId: 2, golferId: 75, tier: 'D' },
        { tournamentId: 2, golferId: 117, tier: 'D' },
        { tournamentId: 2, golferId: 59, tier: 'D' },
        { tournamentId: 2, golferId: 79, tier: 'D' },
        { tournamentId: 2, golferId: 5, tier: 'D' },
        { tournamentId: 2, golferId: 15, tier: 'D' },
        { tournamentId: 2, golferId: 134, tier: 'D' },
        { tournamentId: 2, golferId: 32, tier: 'D' },
        { tournamentId: 2, golferId: 103, tier: 'D' },
        { tournamentId: 2, golferId: 146, tier: 'D' },
        { tournamentId: 2, golferId: 162, tier: 'D' },
        { tournamentId: 2, golferId: 104, tier: 'D' },
        { tournamentId: 2, golferId: 265, tier: 'D' },
        { tournamentId: 2, golferId: 55, tier: 'D' },
        { tournamentId: 2, golferId: 4, tier: 'D' },
        { tournamentId: 2, golferId: 147, tier: 'D' },
        { tournamentId: 2, golferId: 263, tier: 'D' },
        { tournamentId: 2, golferId: 83, tier: 'D' },
        { tournamentId: 2, golferId: 71, tier: 'D' },
        { tournamentId: 3, golferId: 118, tier: 'A' },
        { tournamentId: 3, golferId: 180, tier: 'A' },
        { tournamentId: 3, golferId: 122, tier: 'A' },
        { tournamentId: 3, golferId: 99, tier: 'A' },
        { tournamentId: 3, golferId: 242, tier: 'A' },
        { tournamentId: 3, golferId: 133, tier: 'A' },
        { tournamentId: 3, golferId: 42, tier: 'A' },
        { tournamentId: 3, golferId: 14, tier: 'A' },
        { tournamentId: 3, golferId: 195, tier: 'A' },
        { tournamentId: 3, golferId: 44, tier: 'A' },
        { tournamentId: 3, golferId: 33, tier: 'B' },
        { tournamentId: 3, golferId: 166, tier: 'B' },
        { tournamentId: 3, golferId: 209, tier: 'B' },
        { tournamentId: 3, golferId: 154, tier: 'B' },
        { tournamentId: 3, golferId: 223, tier: 'B' },
        { tournamentId: 3, golferId: 3, tier: 'B' },
        { tournamentId: 3, golferId: 139, tier: 'B' },
        { tournamentId: 3, golferId: 69, tier: 'B' },
        { tournamentId: 3, golferId: 81, tier: 'B' },
        { tournamentId: 3, golferId: 10, tier: 'B' },
        { tournamentId: 3, golferId: 21, tier: 'B' },
        { tournamentId: 3, golferId: 52, tier: 'B' },
        { tournamentId: 3, golferId: 222, tier: 'B' },
        { tournamentId: 3, golferId: 142, tier: 'B' },
        { tournamentId: 3, golferId: 112, tier: 'B' },
        { tournamentId: 3, golferId: 131, tier: 'B' },
        { tournamentId: 3, golferId: 158, tier: 'B' },
        { tournamentId: 3, golferId: 189, tier: 'B' },
        { tournamentId: 3, golferId: 96, tier: 'B' },
        { tournamentId: 3, golferId: 89, tier: 'B' },
        { tournamentId: 3, golferId: 116, tier: 'B' },
        { tournamentId: 3, golferId: 38, tier: 'C' },
        { tournamentId: 3, golferId: 77, tier: 'C' },
        { tournamentId: 3, golferId: 176, tier: 'C' },
        { tournamentId: 3, golferId: 175, tier: 'C' },
        { tournamentId: 3, golferId: 36, tier: 'C' },
        { tournamentId: 3, golferId: 224, tier: 'C' },
        { tournamentId: 3, golferId: 153, tier: 'C' },
        { tournamentId: 3, golferId: 178, tier: 'C' },
        { tournamentId: 3, golferId: 185, tier: 'C' },
        { tournamentId: 3, golferId: 183, tier: 'C' },
        { tournamentId: 3, golferId: 152, tier: 'C' },
        { tournamentId: 3, golferId: 127, tier: 'C' },
        { tournamentId: 3, golferId: 196, tier: 'C' },
        { tournamentId: 3, golferId: 125, tier: 'C' },
        { tournamentId: 3, golferId: 65, tier: 'C' },
        { tournamentId: 3, golferId: 218, tier: 'C' },
        { tournamentId: 3, golferId: 35, tier: 'C' },
        { tournamentId: 3, golferId: 182, tier: 'C' },
        { tournamentId: 3, golferId: 51, tier: 'C' },
        { tournamentId: 3, golferId: 78, tier: 'C' },
        { tournamentId: 3, golferId: 17, tier: 'C' },
        { tournamentId: 3, golferId: 26, tier: 'C' },
        { tournamentId: 3, golferId: 47, tier: 'C' },
        { tournamentId: 3, golferId: 121, tier: 'C' },
        { tournamentId: 3, golferId: 156, tier: 'C' },
        { tournamentId: 3, golferId: 6, tier: 'C' },
        { tournamentId: 3, golferId: 95, tier: 'C' },
        { tournamentId: 3, golferId: 48, tier: 'C' },
        { tournamentId: 3, golferId: 49, tier: 'D' },
        { tournamentId: 3, golferId: 201, tier: 'D' },
        { tournamentId: 3, golferId: 120, tier: 'D' },
        { tournamentId: 3, golferId: 151, tier: 'D' },
        { tournamentId: 3, golferId: 187, tier: 'D' },
        { tournamentId: 3, golferId: 197, tier: 'D' },
        { tournamentId: 3, golferId: 70, tier: 'D' },
        { tournamentId: 3, golferId: 62, tier: 'D' },
        { tournamentId: 3, golferId: 157, tier: 'D' },
        { tournamentId: 3, golferId: 29, tier: 'D' },
        { tournamentId: 3, golferId: 113, tier: 'D' },
        { tournamentId: 3, golferId: 97, tier: 'D' },
        { tournamentId: 3, golferId: 63, tier: 'D' },
        { tournamentId: 3, golferId: 82, tier: 'D' },
        { tournamentId: 3, golferId: 255, tier: 'D' },
        { tournamentId: 3, golferId: 124, tier: 'D' },
        { tournamentId: 3, golferId: 193, tier: 'D' },
        { tournamentId: 3, golferId: 87, tier: 'D' },
        { tournamentId: 3, golferId: 247, tier: 'D' },
        { tournamentId: 3, golferId: 200, tier: 'D' },
        { tournamentId: 3, golferId: 171, tier: 'D' },
        { tournamentId: 3, golferId: 177, tier: 'D' },
        { tournamentId: 3, golferId: 98, tier: 'D' },
        { tournamentId: 3, golferId: 115, tier: 'D' },
        { tournamentId: 3, golferId: 241, tier: 'D' },
        { tournamentId: 3, golferId: 13, tier: 'D' },
        { tournamentId: 3, golferId: 239, tier: 'D' },
        { tournamentId: 3, golferId: 56, tier: 'D' },
        { tournamentId: 3, golferId: 203, tier: 'D' },
        { tournamentId: 3, golferId: 191, tier: 'D' },
        { tournamentId: 3, golferId: 50, tier: 'D' },
        { tournamentId: 3, golferId: 204, tier: 'D' },
        { tournamentId: 3, golferId: 12, tier: 'D' },
        { tournamentId: 3, golferId: 259, tier: 'D' },
        { tournamentId: 3, golferId: 276, tier: 'D' },
        { tournamentId: 3, golferId: 231, tier: 'D' },
        { tournamentId: 3, golferId: 237, tier: 'D' },
        { tournamentId: 3, golferId: 107, tier: 'D' },
        { tournamentId: 3, golferId: 134, tier: 'D' },
        { tournamentId: 3, golferId: 114, tier: 'D' },
        { tournamentId: 3, golferId: 162, tier: 'D' },
        { tournamentId: 3, golferId: 266, tier: 'D' },
        { tournamentId: 3, golferId: 2, tier: 'D' },
        { tournamentId: 3, golferId: 188, tier: 'D' },
        { tournamentId: 3, golferId: 219, tier: 'D' },
        { tournamentId: 3, golferId: 61, tier: 'D' },
        { tournamentId: 3, golferId: 260, tier: 'D' },
        { tournamentId: 3, golferId: 226, tier: 'D' },
        { tournamentId: 3, golferId: 264, tier: 'D' },
        { tournamentId: 3, golferId: 85, tier: 'D' },
        { tournamentId: 3, golferId: 213, tier: 'D' },
        { tournamentId: 3, golferId: 101, tier: 'D' },
        { tournamentId: 3, golferId: 258, tier: 'D' },
        { tournamentId: 3, golferId: 129, tier: 'D' },
        { tournamentId: 3, golferId: 227, tier: 'D' },
        { tournamentId: 3, golferId: 43, tier: 'D' },
        { tournamentId: 3, golferId: 248, tier: 'D' },
        { tournamentId: 3, golferId: 84, tier: 'D' },
        { tournamentId: 3, golferId: 172, tier: 'D' },
        { tournamentId: 3, golferId: 216, tier: 'D' },
        { tournamentId: 3, golferId: 233, tier: 'D' },
        { tournamentId: 3, golferId: 235, tier: 'D' },
        { tournamentId: 3, golferId: 90, tier: 'D' },
        { tournamentId: 3, golferId: 251, tier: 'D' },
        { tournamentId: 3, golferId: 60, tier: 'D' },
        { tournamentId: 3, golferId: 72, tier: 'D' },
        { tournamentId: 3, golferId: 229, tier: 'D' },
        { tournamentId: 3, golferId: 211, tier: 'D' },
        { tournamentId: 3, golferId: 111, tier: 'D' },
        { tournamentId: 3, golferId: 250, tier: 'D' },
        { tournamentId: 3, golferId: 205, tier: 'D' },
        { tournamentId: 3, golferId: 91, tier: 'D' },
        { tournamentId: 3, golferId: 263, tier: 'D' },
        { tournamentId: 3, golferId: 272, tier: 'D' },
        { tournamentId: 3, golferId: 144, tier: 'D' },
        { tournamentId: 3, golferId: 164, tier: 'D' },
        { tournamentId: 3, golferId: 240, tier: 'D' },
        { tournamentId: 3, golferId: 234, tier: 'D' },
        { tournamentId: 3, golferId: 261, tier: 'D' },
        { tournamentId: 3, golferId: 186, tier: 'D' },
        { tournamentId: 3, golferId: 126, tier: 'D' },
        { tournamentId: 3, golferId: 269, tier: 'D' },
        { tournamentId: 3, golferId: 245, tier: 'D' },
        { tournamentId: 3, golferId: 274, tier: 'D' },
        { tournamentId: 3, golferId: 160, tier: 'D' },
        { tournamentId: 3, golferId: 279, tier: 'D' },
        { tournamentId: 3, golferId: 275, tier: 'D' },
        { tournamentId: 3, golferId: 268, tier: 'D' },
        { tournamentId: 3, golferId: 273, tier: 'D' },
        { tournamentId: 3, golferId: 278, tier: 'D' },
        { tournamentId: 3, golferId: 76, tier: 'D' },
        { tournamentId: 3, golferId: 277, tier: 'D' },
        { tournamentId: 4, golferId: 118, tier: 'A' },
        { tournamentId: 4, golferId: 180, tier: 'A' },
        { tournamentId: 4, golferId: 133, tier: 'A' },
        { tournamentId: 4, golferId: 242, tier: 'A' },
        { tournamentId: 4, golferId: 14, tier: 'A' },
        { tournamentId: 4, golferId: 42, tier: 'A' },
        { tournamentId: 4, golferId: 122, tier: 'A' },
        { tournamentId: 4, golferId: 195, tier: 'A' },
        { tournamentId: 4, golferId: 182, tier: 'A' },
        { tournamentId: 4, golferId: 44, tier: 'A' },
        { tournamentId: 4, golferId: 33, tier: 'A' },
        { tournamentId: 4, golferId: 209, tier: 'B' },
        { tournamentId: 4, golferId: 99, tier: 'B' },
        { tournamentId: 4, golferId: 3, tier: 'B' },
        { tournamentId: 4, golferId: 139, tier: 'B' },
        { tournamentId: 4, golferId: 27, tier: 'B' },
        { tournamentId: 4, golferId: 81, tier: 'B' },
        { tournamentId: 4, golferId: 154, tier: 'B' },
        { tournamentId: 4, golferId: 116, tier: 'B' },
        { tournamentId: 4, golferId: 166, tier: 'B' },
        { tournamentId: 4, golferId: 21, tier: 'B' },
        { tournamentId: 4, golferId: 223, tier: 'B' },
        { tournamentId: 4, golferId: 16, tier: 'B' },
        { tournamentId: 4, golferId: 153, tier: 'B' },
        { tournamentId: 4, golferId: 189, tier: 'B' },
        { tournamentId: 4, golferId: 158, tier: 'B' },
        { tournamentId: 4, golferId: 69, tier: 'B' },
        { tournamentId: 4, golferId: 77, tier: 'B' },
        { tournamentId: 4, golferId: 46, tier: 'B' },
        { tournamentId: 4, golferId: 38, tier: 'B' },
        { tournamentId: 4, golferId: 222, tier: 'B' },
        { tournamentId: 4, golferId: 224, tier: 'B' },
        { tournamentId: 4, golferId: 198, tier: 'C' },
        { tournamentId: 4, golferId: 121, tier: 'C' },
        { tournamentId: 4, golferId: 48, tier: 'C' },
        { tournamentId: 4, golferId: 131, tier: 'C' },
        { tournamentId: 4, golferId: 89, tier: 'C' },
        { tournamentId: 4, golferId: 185, tier: 'C' },
        { tournamentId: 4, golferId: 152, tier: 'C' },
        { tournamentId: 4, golferId: 140, tier: 'C' },
        { tournamentId: 4, golferId: 35, tier: 'C' },
        { tournamentId: 4, golferId: 112, tier: 'C' },
        { tournamentId: 4, golferId: 51, tier: 'C' },
        { tournamentId: 4, golferId: 78, tier: 'C' },
        { tournamentId: 4, golferId: 65, tier: 'C' },
        { tournamentId: 4, golferId: 10, tier: 'C' },
        { tournamentId: 4, golferId: 41, tier: 'C' },
        { tournamentId: 4, golferId: 247, tier: 'C' },
        { tournamentId: 4, golferId: 175, tier: 'C' },
        { tournamentId: 4, golferId: 17, tier: 'C' },
        { tournamentId: 4, golferId: 97, tier: 'C' },
        { tournamentId: 4, golferId: 178, tier: 'C' },
        { tournamentId: 4, golferId: 173, tier: 'C' },
        { tournamentId: 4, golferId: 110, tier: 'C' },
        { tournamentId: 4, golferId: 193, tier: 'C' },
        { tournamentId: 4, golferId: 52, tier: 'C' },
        { tournamentId: 4, golferId: 148, tier: 'C' },
        { tournamentId: 4, golferId: 127, tier: 'C' },
        { tournamentId: 4, golferId: 196, tier: 'C' },
        { tournamentId: 4, golferId: 70, tier: 'C' },
        { tournamentId: 4, golferId: 36, tier: 'C' },
        { tournamentId: 4, golferId: 142, tier: 'C' },
        { tournamentId: 4, golferId: 106, tier: 'C' },
        { tournamentId: 4, golferId: 218, tier: 'C' },
        { tournamentId: 4, golferId: 18, tier: 'C' },
        { tournamentId: 4, golferId: 113, tier: 'C' },
        { tournamentId: 4, golferId: 95, tier: 'C' },
        { tournamentId: 4, golferId: 96, tier: 'C' },
        { tournamentId: 4, golferId: 251, tier: 'C' },
        { tournamentId: 4, golferId: 183, tier: 'C' },
        { tournamentId: 4, golferId: 107, tier: 'C' },
        { tournamentId: 4, golferId: 156, tier: 'C' },
        { tournamentId: 4, golferId: 165, tier: 'C' },
        { tournamentId: 4, golferId: 167, tier: 'D' },
        { tournamentId: 4, golferId: 125, tier: 'D' },
        { tournamentId: 4, golferId: 201, tier: 'D' },
        { tournamentId: 4, golferId: 230, tier: 'D' },
        { tournamentId: 4, golferId: 228, tier: 'D' },
        { tournamentId: 4, golferId: 98, tier: 'D' },
        { tournamentId: 4, golferId: 194, tier: 'D' },
        { tournamentId: 4, golferId: 49, tier: 'D' },
        { tournamentId: 4, golferId: 54, tier: 'D' },
        { tournamentId: 4, golferId: 6, tier: 'D' },
        { tournamentId: 4, golferId: 255, tier: 'D' },
        { tournamentId: 4, golferId: 138, tier: 'D' },
        { tournamentId: 4, golferId: 190, tier: 'D' },
        { tournamentId: 4, golferId: 82, tier: 'D' },
        { tournamentId: 4, golferId: 151, tier: 'D' },
        { tournamentId: 4, golferId: 197, tier: 'D' },
        { tournamentId: 4, golferId: 124, tier: 'D' },
        { tournamentId: 4, golferId: 174, tier: 'D' },
        { tournamentId: 4, golferId: 12, tier: 'D' },
        { tournamentId: 4, golferId: 105, tier: 'D' },
        { tournamentId: 4, golferId: 29, tier: 'D' },
        { tournamentId: 4, golferId: 203, tier: 'D' },
        { tournamentId: 4, golferId: 232, tier: 'D' },
        { tournamentId: 4, golferId: 130, tier: 'D' },
        { tournamentId: 4, golferId: 137, tier: 'D' },
        { tournamentId: 4, golferId: 155, tier: 'D' },
        { tournamentId: 4, golferId: 20, tier: 'D' },
        { tournamentId: 4, golferId: 123, tier: 'D' },
        { tournamentId: 4, golferId: 253, tier: 'D' },
        { tournamentId: 4, golferId: 88, tier: 'D' },
        { tournamentId: 4, golferId: 207, tier: 'D' },
        { tournamentId: 4, golferId: 262, tier: 'D' },
        { tournamentId: 4, golferId: 86, tier: 'D' },
        { tournamentId: 4, golferId: 73, tier: 'D' },
        { tournamentId: 4, golferId: 241, tier: 'D' },
        { tournamentId: 4, golferId: 62, tier: 'D' },
        { tournamentId: 4, golferId: 150, tier: 'D' },
        { tournamentId: 4, golferId: 134, tier: 'D' },
        { tournamentId: 4, golferId: 1, tier: 'D' },
        { tournamentId: 4, golferId: 220, tier: 'D' },
        { tournamentId: 4, golferId: 237, tier: 'D' },
        { tournamentId: 4, golferId: 60, tier: 'D' },
        { tournamentId: 4, golferId: 23, tier: 'D' },
        { tournamentId: 4, golferId: 256, tier: 'D' },
        { tournamentId: 4, golferId: 92, tier: 'D' },
        { tournamentId: 4, golferId: 246, tier: 'D' },
        { tournamentId: 4, golferId: 168, tier: 'D' },
        { tournamentId: 4, golferId: 244, tier: 'D' },
        { tournamentId: 4, golferId: 132, tier: 'D' },
        { tournamentId: 4, golferId: 257, tier: 'D' },
        { tournamentId: 4, golferId: 162, tier: 'D' },
        { tournamentId: 4, golferId: 57, tier: 'D' },
        { tournamentId: 4, golferId: 67, tier: 'D' },
        { tournamentId: 4, golferId: 149, tier: 'D' },
        { tournamentId: 4, golferId: 283, tier: 'D' },
        { tournamentId: 4, golferId: 24, tier: 'D' },
        { tournamentId: 4, golferId: 100, tier: 'D' },
        { tournamentId: 4, golferId: 285, tier: 'D' },
        { tournamentId: 4, golferId: 284, tier: 'D' },
        { tournamentId: 4, golferId: 191, tier: 'D' },
        { tournamentId: 4, golferId: 270, tier: 'D' },
        { tournamentId: 4, golferId: 208, tier: 'D' },
        { tournamentId: 4, golferId: 282, tier: 'D' },
        { tournamentId: 4, golferId: 281, tier: 'D' },
        { tournamentId: 4, golferId: 9, tier: 'D' },
        { tournamentId: 4, golferId: 202, tier: 'D' },
        { tournamentId: 4, golferId: 254, tier: 'D' },
        { tournamentId: 4, golferId: 147, tier: 'D' },
        { tournamentId: 4, golferId: 80, tier: 'D' },
        { tournamentId: 4, golferId: 108, tier: 'D' },
        { tournamentId: 4, golferId: 170, tier: 'D' },
        { tournamentId: 4, golferId: 243, tier: 'D' },
        { tournamentId: 4, golferId: 7, tier: 'D' },
        { tournamentId: 4, golferId: 214, tier: 'D' },
        { tournamentId: 4, golferId: 184, tier: 'D' },
        { tournamentId: 4, golferId: 11, tier: 'D' },
        { tournamentId: 4, golferId: 280, tier: 'D' },
        { tournamentId: 4, golferId: 30, tier: 'D' },
        { tournamentId: 4, golferId: 217, tier: 'D' },
        { tournamentId: 4, golferId: 192, tier: 'D' },
        { tournamentId: 4, golferId: 25, tier: 'D' },
        { tournamentId: 4, golferId: 68, tier: 'D' }
    ])
    .then(() => console.log('finished populating tournament golfers'))
    .catch(err => console.log('error populating tournament golfers', err)));
}
