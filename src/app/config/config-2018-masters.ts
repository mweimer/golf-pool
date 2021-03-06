const tourneyTitle = '2018 Masters';

const tourneyId = '401025221';

const golferData = [
    { id: 1, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 2, name: 'Jordan Spieth', espnId: '5467', tier: 'A' },
    { id: 3, name: 'Justin Thomas', espnId: '4848', tier: 'A' },
    { id: 4, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 5, name: 'Tiger Woods', espnId: '462', tier: 'A' },
    { id: 6, name: 'Bubba Watson', espnId: '780', tier: 'A' },
    { id: 7, name: 'Justin Rose', espnId: '569', tier: 'A' },
    { id: 8, name: 'Jason Day', espnId: '1680', tier: 'A' },
    { id: 9, name: 'Phil Mickelson', espnId: '308', tier: 'A' },
    { id: 10, name: 'Rickie Fowler', espnId: '3702', tier: 'A' },

    { id: 11, name: 'Jon Rahm', espnId: '9780', tier: 'B' },
    { id: 12, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 13, name: 'Sergio Garcia', espnId: '158', tier: 'B' },
    { id: 14, name: 'Hideki Matsuyama', espnId: '5860', tier: 'B' },
    { id: 15, name: 'Alex Noren', espnId: '3832', tier: 'B' },
    { id: 16, name: 'Henrik Stenson', espnId: '576', tier: 'B' },
    { id: 17, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 18, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 19, name: 'Tommy Fleetwood', espnId: '5539', tier: 'B' },
    { id: 20, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 21, name: 'Ian Poulter', espnId: '619', tier: 'B' },
    { id: 22, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 23, name: 'Marc Leishman', espnId: '3351', tier: 'B' },
    { id: 24, name: 'Bryson DeChambeau', espnId: '10046', tier: 'B' },
    { id: 25, name: 'Thomas Pieters', espnId: '9031', tier: 'B' },
    { id: 26, name: 'Tyrrell Hatton', espnId: '5553', tier: 'B' },

    { id: 27, name: 'Branden Grace', espnId: '4383', tier: 'C' },
    { id: 28, name: 'Brian Harman', espnId: '1225', tier: 'C' },
    { id: 29, name: 'Charley Hoffman', espnId: '205', tier: 'C' },
    { id: 30, name: 'Daniel Berger', espnId: '9025', tier: 'C' },
    { id: 31, name: 'Patrick Cantlay', espnId: '6007', tier: 'C' },
    { id: 32, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'C' },
    { id: 33, name: 'Tony Finau', espnId: '2230', tier: 'C' },
    { id: 34, name: 'Xander Schauffele', espnId: '10140', tier: 'C' },
    { id: 35, name: 'Cameron Smith', espnId: '9131', tier: 'C' },
    { id: 36, name: 'Charl Schwartzel', espnId: '1097', tier: 'C' },
    { id: 37, name: 'Kevin Chappell', espnId: '3857', tier: 'C' },
    { id: 38, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 39, name: 'Kiradech Aphibarnrat', espnId: '5771', tier: 'C' },
    { id: 40, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'C' },
    { id: 41, name: 'Ryan Moore', espnId: '809', tier: 'C' },
    { id: 42, name: 'Zach Johnson', espnId: '686', tier: 'C' },
    { id: 43, name: 'Adam Hadwin', espnId: '5548', tier: 'C' },
    { id: 44, name: 'Gary Woodland', espnId: '3550', tier: 'C' },
    { id: 45, name: 'Pat Perez', espnId: '707', tier: 'C' },
    { id: 46, name: 'Russell Henley', espnId: '5409', tier: 'C' },
    { id: 47, name: 'Brendan Steele', espnId: '3596', tier: 'C' },
    { id: 48, name: 'Francesco Molinari', espnId: '1483', tier: 'C' },
    { id: 49, name: 'Jason Dufner', espnId: '110', tier: 'C' },
    { id: 50, name: 'Jimmy Walker', espnId: '446', tier: 'C' },
    { id: 51, name: 'Patton Kizzire', espnId: '3980', tier: 'C' },
    { id: 52, name: 'Shubhankar Sharma', espnId: '9888', tier: 'C' },
    { id: 53, name: 'Webb Simpson', espnId: '1614', tier: 'C' },

    { id: 54, name: 'Dylan Frittelli', espnId: '5167', tier: 'D' },
    { id: 55, name: 'Li Haotong', espnId: '5934', tier: 'D' },
    { id: 56, name: 'Martin Kaymer', espnId: '3670', tier: 'D' },
    { id: 57, name: 'Ross Fisher', espnId: '3462', tier: 'D' },
    { id: 58, name: 'Bernd Wiesberger', espnId: '4317', tier: 'D' },
    { id: 59, name: 'Chez Reavie', espnId: '769', tier: 'D' },
    { id: 60, name: 'Kyle Stanley', espnId: '1778', tier: 'D' },
    { id: 61, name: 'Austin Cook', espnId: '9517', tier: 'D' },
    { id: 62, name: 'Billy Horschel', espnId: '1651', tier: 'D' },
    { id: 63, name: 'Danny Willett', espnId: '4304', tier: 'D' },
    { id: 64, name: 'Si Woo Kim', espnId: '7081', tier: 'D' },
    { id: 65, name: 'Angel Cabrera', espnId: '65', tier: 'D' },
    { id: 66, name: 'Fred Couples', espnId: '91', tier: 'D' },
    { id: 67, name: 'Jhonattan Vegas', espnId: '1030', tier: 'D' },
    { id: 68, name: 'Wesley Bryan', espnId: '10360', tier: 'D' },
    { id: 69, name: 'Ted Potter Jr.', espnId: '2883', tier: 'D' },
    { id: 70, name: 'Bernhard Langer', espnId: '261', tier: 'D' },
    { id: 71, name: 'Joaquin Niemann', espnId: '11099', tier: 'D' },
    { id: 72, name: 'Satoshi Kodaira', espnId: '9076', tier: 'D' },
    { id: 73, name: 'Vijay Singh', espnId: '392', tier: 'D' },
    { id: 74, name: 'Yusaku Miyazato', espnId: '978', tier: 'D' },
    { id: 75, name: 'Yuta Ikeda', espnId: '4712', tier: 'D' },
    { id: 76, name: 'Doc Redman', espnId: '11448', tier: 'D' },
    { id: 77, name: 'Doug Ghim', espnId: '11456', tier: 'D' },
    { id: 78, name: 'Harry Ellis', espnId: '11174', tier: 'D' },
    { id: 79, name: 'Trevor Immelman', espnId: '215', tier: 'D' },
    { id: 80, name: 'Lin Yuxin', espnId: '11455', tier: 'D' },
    { id: 81, name: 'Jose Maria Olazabal', espnId: '329', tier: 'D' },
    { id: 82, name: 'Matt Parziale', espnId: '11457', tier: 'D' },
    { id: 83, name: 'Mike Weir', espnId: '453', tier: 'D' },
    { id: 84, name: 'Ian Woosnam', espnId: '463', tier: 'D' },
    { id: 85, name: 'Larry Mize', espnId: '310', tier: 'D' },
    { id: 86, name: 'Mark O\'Meara', espnId: '325', tier: 'D' },
    { id: 87, name: 'Sandy Lyle', espnId: '281', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Brian Hoffman', entries: [[1, 15, 30, 63], [5, 12, 35, 59], [6, 14, 27, 56]] },
    { id: 2, name: 'Ryan Boudouris', entries: [[1, 17, 34, 57], [5, 12, 29, 59], [7, 16, 29, 56]] },
    { id: 3, name: 'Matt Kavanaugh', entries: [[2, 11, 27, 54], [3, 12, 28, 56], [10, 14, 31, 62]] },
    { id: 4, name: 'Kevin Donoher', entries: [[2, 22, 30, 60], [1, 12, 40, 57], [5, 17, 37, 66]] },
    { id: 5, name: 'Alex Duff', entries: [[7, 13, 30, 56], [3, 14, 43, 62], [1, 20, 49, 54]] },
    { id: 6, name: 'Garrett Ryan', entries: [[5, 17, 29, 64], [10, 14, 38, 56], [9, 11, 27, 66]] },
    { id: 7, name: 'Kyle Bivenour', entries: [[2, 14, 29, 54], [5, 20, 49, 62], [4, 16, 28, 56]] },
    { id: 8, name: 'Ian Horwich', entries: [[2, 13, 42, 61], [5, 12, 29, 56], [10, 17, 46, 57]] },
    { id: 9, name: 'Nate Heckmann', entries: [[4, 12, 41, 56], [3, 14, 37, 60], [7, 12, 34, 58]] },
    { id: 10, name: 'Ryan Romes', entries: [[5, 17, 31, 60], [1, 13, 27, 59], [9, 11, 30, 62]] },
    { id: 11, name: 'Dan Godshall', entries: [[2, 12, 29, 66], [4, 11, 29, 62], [5, 25, 30, 71]] },
    { id: 12, name: 'Drew Serruto', entries: [[3, 13, 42, 64], [1, 14, 29, 56], [5, 21, 36, 64]] },
    { id: 13, name: 'Matt Weimer', entries: [[3, 11, 29, 55], [2, 14, 33, 68], [1, 17, 34, 56]] },
    { id: 14, name: 'Nick Royer', entries: [[2, 17, 36, 66], [7, 17, 38, 66], [7, 25, 31, 57]] },
    { id: 15, name: 'Kendall Kadish', entries: [[5, 11, 31, 54], [2, 13, 33, 56], [4, 12, 36, 66]] },
    { id: 16, name: 'Lorenzo Washington', entries: [[7, 12, 31, 59], [3, 13, 53, 61], [2, 17, 29, 60]] },
    { id: 17, name: 'Matt Bobson', entries: [[3, 12, 34, 55], [7, 15, 34, 57], [4, 12, 31, 55]] },
    { id: 18, name: 'Ryan Aguiar', entries: [[7, 12, 31, 54], [2, 17, 28, 60], [1, 14, 38, 55]] },
    { id: 19, name: 'Matt Kilianski', entries: [[5, 15, 31, 60], [1, 14, 30, 61], [7, 11, 34, 55]] },
    { id: 20, name: 'Brendan McCausland', entries: [[9, 11, 27, 60], [6, 17, 38, 62], [1, 16, 37, 63]] },
    { id: 21, name: 'Kevin O\'Brien', entries: [[3, 13, 49, 63], [2, 11, 27, 66], [5, 22, 27, 62]] },
    { id: 22, name: 'Cameron Weimer', entries: [[1, 11, 31, 55], [3, 12, 29, 56], [7, 15, 38, 62]] },
    { id: 23, name: 'Cameron Anderson', entries: [[7, 12, 29, 66], [2, 12, 29, 66], [7, 14, 30, 66]] },
    { id: 24, name: 'Andrew Kubaszewski', entries: [[5, 16, 36, 66], [3, 11, 42, 56], [10, 13, 29, 62]] },
    { id: 25, name: 'Sean Buckle', entries: [[5, 17, 30, 56], [7, 14, 43, 62], [6, 13, 31, 54]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };
