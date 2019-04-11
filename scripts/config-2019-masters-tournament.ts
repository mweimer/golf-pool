const tourneyTitle = '2019 Masters Tournament';

const tourneyId = '401056527';

const golferData = [
    { id: 1, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 2, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 3, name: 'Justin Rose', espnId: '569', tier: 'A' },
    { id: 4, name: 'Tiger Woods', espnId: '462', tier: 'A' },
    { id: 5, name: 'Jordan Spieth', espnId: '5467', tier: 'A' },
    { id: 6, name: 'Justin Thomas', espnId: '4848', tier: 'A' },
    { id: 7, name: 'Rickie Fowler', espnId: '3702', tier: 'A' },
    { id: 8, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 9, name: 'Tommy Fleetwood', espnId: '5539', tier: 'A' },
    { id: 10, name: 'Francesco Molinari', espnId: '1483', tier: 'A' },

    { id: 11, name: 'Brooks Koepka', espnId: '6798', tier: 'B' },
    { id: 12, name: 'Jason Day', espnId: '1680', tier: 'B' },
    { id: 13, name: 'Bubba Watson', espnId: '780', tier: 'B' },
    { id: 14, name: 'Bryson DeChambeau', espnId: '10046', tier: 'B' },
    { id: 15, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 16, name: 'Hideki Matsuyama', espnId: '5860', tier: 'B' },
    { id: 17, name: 'Tony Finau', espnId: '2230', tier: 'B' },
    { id: 18, name: 'Phil Mickelson', espnId: '308', tier: 'B' },
    { id: 19, name: 'Xander Schauffele', espnId: '10140', tier: 'B' },
    { id: 20, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 21, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 22, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 23, name: 'Marc Leishman', espnId: '3351', tier: 'B' },
    { id: 24, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 25, name: 'Sergio Garcia', espnId: '158', tier: 'B' },
    { id: 26, name: 'Henrik Stenson', espnId: '576', tier: 'B' },
    { id: 27, name: 'Gary Woodland', espnId: '3550', tier: 'B' },
    { id: 28, name: 'Patrick Cantlay', espnId: '6007', tier: 'B' },
    { id: 29, name: 'Kevin Kisner', espnId: '2552', tier: 'B' },

    { id: 30, name: 'Charley Hoffman', espnId: '205', tier: 'C' },
    { id: 31, name: 'Cameron Smith', espnId: '9131', tier: 'C' },
    { id: 32, name: 'Branden Grace', espnId: '4383', tier: 'C' },
    { id: 33, name: 'Ian Poulter', espnId: '619', tier: 'C' },
    { id: 34, name: 'Brandt Snedeker', espnId: '1222', tier: 'C' },
    { id: 35, name: 'Webb Simpson', espnId: '1614', tier: 'C' },
    { id: 36, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'C' },
    { id: 37, name: 'Keegan Bradley', espnId: '4513', tier: 'C' },
    { id: 38, name: 'Si Woo Kim', espnId: '7081', tier: 'C' },
    { id: 39, name: 'Charles Howell III', espnId: '208', tier: 'C' },
    { id: 40, name: 'Charl Schwartzel', espnId: '1097', tier: 'C' },
    { id: 41, name: 'Zach Johnson', espnId: '686', tier: 'C' },
    { id: 42, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'C' },
    { id: 43, name: 'J.B. Holmes', espnId: '1067', tier: 'C' },
    { id: 44, name: 'Danny Willett', espnId: '4304', tier: 'C' },
    { id: 45, name: 'Alexander Noren', espnId: '3832', tier: 'C' },
    { id: 46, name: 'Tyrrell Hatton', espnId: '5553', tier: 'C' },
    { id: 47, name: 'Billy Horschel', espnId: '1651', tier: 'C' },
    { id: 48, name: 'Keith Mitchell', espnId: '8906', tier: 'C' },
    { id: 49, name: 'Li Haotong', espnId: '5934', tier: 'C' },
    { id: 50, name: 'Eddie Pepperell', espnId: '6629', tier: 'C' },
    { id: 51, name: 'Kevin Na', espnId: '318', tier: 'C' },
    { id: 52, name: 'Matt Wallace', espnId: '10548', tier: 'C' },

    { id: 53, name: 'Emiliano Grillo', espnId: '5882', tier: 'D' },
    { id: 54, name: 'Aaron Wise', espnId: '10577', tier: 'D' },
    { id: 55, name: 'Lucas Bjerregaard', espnId: '9575', tier: 'D' },
    { id: 56, name: 'Corey Conners', espnId: '9126', tier: 'D' },
    { id: 57, name: 'Shane Lowry', espnId: '4587', tier: 'D' },
    { id: 58, name: 'Martin Kaymer', espnId: '3670', tier: 'D' },
    { id: 59, name: 'Jimmy Walker', espnId: '446', tier: 'D' },
    { id: 60, name: 'Kyle Stanley', espnId: '1778', tier: 'D' },
    { id: 61, name: 'Thorbjorn Olesen', espnId: '5140', tier: 'D' },
    { id: 62, name: 'Kiradech Aphibarnrat', espnId: '5771', tier: 'D' },
    { id: 63, name: 'Fred Couples', espnId: '91', tier: 'D' },
    { id: 64, name: 'Justin Harding', espnId: '5825', tier: 'D' },
    { id: 65, name: 'Stewart Cink', espnId: '78', tier: 'D' },
    { id: 66, name: 'Patton Kizzire', espnId: '3980', tier: 'D' },
    { id: 67, name: 'Bernhard Langer', espnId: '261', tier: 'D' },
    { id: 68, name: 'Kevin Tway', espnId: '3793', tier: 'D' },
    { id: 69, name: 'Adam Long', espnId: '6015', tier: 'D' },
    { id: 70, name: 'Michael Kim', espnId: '8974', tier: 'D' },
    { id: 71, name: 'Satoshi Kodaira', espnId: '9076', tier: 'D' },
    { id: 72, name: 'Andrew Landry', espnId: '4682', tier: 'D' },
    { id: 73, name: 'Angel Cabrera', espnId: '65', tier: 'D' },
    { id: 74, name: 'Shugo Imahira', espnId: '10630', tier: 'D' },
    { id: 75, name: 'Vijay Singh', espnId: '392', tier: 'D' },
    { id: 76, name: 'Trevor Immelman', espnId: '215', tier: 'D' },
    { id: 77, name: 'Mike Weir', espnId: '453', tier: 'D' },
    { id: 78, name: 'Viktor Hovland', espnId: '4364873', tier: 'D' },
    { id: 79, name: 'Devon Bling', espnId: '4420723', tier: 'D' },
    { id: 80, name: 'Takumi Kanaya', espnId: '4410612', tier: 'D' },
    { id: 81, name: 'Kevin O\'Connell', espnId: '5662', tier: 'D' },
    { id: 82, name: 'Alvaro Ortiz', espnId: '10481', tier: 'D' },
    { id: 83, name: 'Jovan Rebula', espnId: '10944', tier: 'D' },
    { id: 84, name: 'Jose Maria Olazabal', espnId: '329', tier: 'D' },
    { id: 85, name: 'Sandy Lyle', espnId: '281', tier: 'D' },
    { id: 86, name: 'Larry Mize', espnId: '310', tier: 'D' },
    { id: 87, name: 'Ian Woosnam', espnId: '463', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Matt Weimer', entries: [[1, 11, 33, 58], [4, 14, 35, 53], [5, 20, 30, 59]] },
    { id: 2, name: 'Ryan Boudouris', entries: [[3, 11, 32, 53], [4, 13, 39, 59], [7, 21, 33, 61]] },
    { id: 3, name: 'Lorenzo Washington', entries: [[8, 17, 30, 55], [2, 15, 35, 62], [1, 13, 38, 60]] },
    { id: 4, name: 'Andrew Kubaszewski', entries: [[3, 21, 39, 62], [6, 12, 41, 60], [8, 17, 35, 59]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };
