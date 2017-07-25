const tourneyTitle = '2017 Masters';

const tourneyId = '2700';

const golferData = [
    { id: 1, name: 'Dustin Johnson', espnId: '', tier: 'A' },
    { id: 2, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 3, name: 'Jordan Spieth', espnId: '5467', tier: 'A' },
    { id: 4, name: 'Hideki Matsuyama', espnId: '5860', tier: 'A' },
    { id: 5, name: 'Rickie Fowler', espnId: '3702', tier: 'A' },
    { id: 6, name: 'Jason Day', espnId: '1680', tier: 'A' },
    { id: 7, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 8, name: 'Justin Rose', espnId: '569', tier: 'A' },
    { id: 9, name: 'Phil Mickelson', espnId: '308', tier: 'A' },
    { id: 10, name: 'Henrik Stenson', espnId: '576', tier: 'A' },

    { id: 11, name: 'Justin Thomas', espnId: '4848', tier: 'B' },
    { id: 12, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 13, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 14, name: 'Sergio Garcia', espnId: '158', tier: 'B' },
    { id: 15, name: 'Bubba Watson', espnId: '780', tier: 'B' },
    { id: 16, name: 'Brandt Snedeker', espnId: '1222', tier: 'B' },
    { id: 17, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 18, name: 'Marc Leishman', espnId: '3351', tier: 'B' },
    { id: 19, name: 'Tyrrell Hatton', espnId: '5553', tier: 'B' },
    { id: 20, name: 'Brooks Koepka', espnId: '6798', tier: 'B' },
    { id: 21, name: 'Russell Henley', espnId: '5409', tier: 'B' },
    { id: 22, name: 'Daniel Berger', espnId: '9025', tier: 'B' },
    { id: 23, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'B' },
    { id: 24, name: 'Thomas Pieters', espnId: '9031', tier: 'B' },
    { id: 25, name: 'Charl Schwartzel', espnId: '1097', tier: 'B' },
    { id: 26, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 27, name: 'Adam Hadwin', espnId: '5548', tier: 'B' },
    { id: 28, name: 'Lee Westwood', espnId: '455', tier: 'B' },
    { id: 29, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 30, name: 'Tommy Fleetwood', espnId: '5539', tier: 'B' },
    { id: 31, name: 'Alex Noren', espnId: '3832', tier: 'B' },

    { id: 32, name: 'Branden Grace', espnId: '4383', tier: 'C' },
    { id: 33, name: 'J.B. Holmes', espnId: '1067', tier: 'C' },
    { id: 34, name: 'Bill Haas', espnId: '774', tier: 'C' },
    { id: 35, name: 'Jimmy Walker', espnId: '446', tier: 'C' },
    { id: 36, name: 'Danny Willett', espnId: '4304', tier: 'C' },
    { id: 37, name: 'Gary Woodland', espnId: '3550', tier: 'C' },
    { id: 38, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 39, name: 'Zach Johnson', espnId: '686', tier: 'C' },
    { id: 40, name: 'Charley Hoffman', espnId: '205', tier: 'C' },
    { id: 41, name: 'Emiliano Grillo', espnId: '5882', tier: 'C' },
    { id: 42, name: 'Martin Kaymer', espnId: '3670', tier: 'C' },
    { id: 43, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'C' },
    { id: 44, name: 'Ross Fisher', espnId: '3462', tier: 'C' },
    { id: 45, name: 'Shane Lowry', espnId: '4587', tier: 'C' },
    { id: 46, name: 'Bernd Wiesberger', espnId: '4317', tier: 'C' },
    { id: 47, name: 'Jason Dufner', espnId: '110', tier: 'C' },
    { id: 48, name: 'Ryan Moore', espnId: '809', tier: 'C' },
    { id: 49, name: 'Soren Kjeldsen', espnId: '547', tier: 'C' },
    { id: 50, name: 'Brendan Steele', espnId: '3596', tier: 'C' },
    { id: 51, name: 'Byeong Hun An', espnId: '5285', tier: 'C' },
    { id: 52, name: 'Francesco Molinari', espnId: '1483', tier: 'C' },
    { id: 53, name: 'Jim Furyk', espnId: '153', tier: 'C' },
    { id: 54, name: 'Kevin Na', espnId: '318', tier: 'C' },
    { id: 55, name: 'Pat Perez', espnId: '707', tier: 'C' },
    { id: 56, name: 'Andy Sullivan', espnId: '5956', tier: 'C' },
    { id: 57, name: 'Russell Knox', espnId: '4483', tier: 'C' },
    { id: 58, name: 'Angel Cabrera', espnId: '65', tier: 'C' },
    { id: 59, name: 'Hudson Swafford', espnId: '5504', tier: 'C' },

    { id: 60, name: 'Hideto Tanihara', espnId: '1099', tier: 'D' },
    { id: 61, name: 'Kevin Chappell', espnId: '3857', tier: 'D' },
    { id: 62, name: 'Webb Simpson', espnId: '1614', tier: 'D' },
    { id: 63, name: 'William McGirt', espnId: '3532', tier: 'D' },
    { id: 64, name: 'Scott Piercy', espnId: '1037', tier: 'D' },
    { id: 65, name: 'Steve Stricker', espnId: '412', tier: 'D' },
    { id: 66, name: 'Chris Wood', espnId: '3839', tier: 'D' },
    { id: 67, name: 'Jhonattan Vegas', espnId: '1030', tier: 'D' },
    { id: 68, name: 'Fred Couples', espnId: '91', tier: 'D' },
    { id: 69, name: 'James Hahn', espnId: '5025', tier: 'D' },
    { id: 70, name: 'Jeunghun Wang', espnId: '9754', tier: 'D' },
    { id: 71, name: 'Bernhard Langer', espnId: '261', tier: 'D' },
    { id: 72, name: 'Roberto Castro', espnId: '3740', tier: 'D' },
    { id: 73, name: 'Sean O\'Hair', espnId: '1359', tier: 'D' },
    { id: 74, name: 'Curtis Luck', espnId: '10910', tier: 'D' },
    { id: 75, name: 'Si Woo Kim', espnId: '7081', tier: 'D' },
    { id: 76, name: 'Ernie Els', espnId: '123', tier: 'D' },
    { id: 77, name: 'Yuta Ikeda', espnId: '4712', tier: 'D' },
    { id: 78, name: 'Billy Hurley III', espnId: '1612', tier: 'D' },
    { id: 79, name: 'Brian Stuard', espnId: '3599', tier: 'D' },
    { id: 80, name: 'Daniel Summerhays', espnId: '3452', tier: 'D' },
    { id: 81, name: 'Mackenzie Hughes', espnId: '6931', tier: 'D' },
    { id: 82, name: 'Rod Pampling', espnId: '335', tier: 'D' },
    { id: 83, name: 'Vijay Singh', espnId: '392', tier: 'D' },
    { id: 84, name: 'Scott Gregory', espnId: '10629', tier: 'D' },
    { id: 85, name: 'Brad Dalke', espnId: '10488', tier: 'D' },
    { id: 86, name: 'Ian Woosnam', espnId: '463', tier: 'D' },
    { id: 87, name: 'Stewart Hagestad', espnId: '11000', tier: 'D' },
    { id: 88, name: 'Toto Gana', espnId: '10999', tier: 'D' },
    { id: 89, name: 'Jose Maria Olazabal', espnId: '329', tier: 'D' },
    { id: 90, name: 'Trevor Immelman', espnId: '215', tier: 'D' },
    { id: 91, name: 'Larry Mize', espnId: '310', tier: 'D' },
    { id: 92, name: 'Mark O\'Meara', espnId: '325', tier: 'D' },
    { id: 93, name: 'Mike Weir', espnId: '453', tier: 'D' },
    { id: 94, name: 'Sandy Lyle', espnId: '281', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Alex Duff', entries: [[2, 11, 37, 62], [5, 19, 47, 65], [7, 27, 39, 63]] },
    { id: 2, name: 'Alex Prevo', entries: [[1, 15, 34, 68], [3, 12, 53, 65], [5, 29, 54, 66]] },
    { id: 3, name: 'Bob Kelly', entries: [[3, 16, 39, 62], [5, 12, 33, 67], [6, 14, 53, 65]] },
    { id: 4, name: 'Cameron Weimer', entries: [[7, 13, 34, 66], [3, 24, 40, 66], [2, 11, 41, 64]] },
    { id: 5, name: 'Drew Serruto', entries: [[4, 15, 33, 62], [6, 11, 39, 65], [5, 28, 45, 68]] },
    { id: 6, name: 'Ian Horwich', entries: [[6, 15, 53, 76], [4, 12, 33, 83], [5, 29, 39, 62]] },
    { id: 7, name: 'Joey Graham', entries: [[2, 16, 47, 76], [3, 11, 35, 67], [6, 15, 58, 68]] },
    { id: 8, name: 'Kevin Donoher', entries: [[7, 14, 43, 67], [2, 23, 41, 66], [3, 22, 34, 62]] },
    { id: 9, name: 'Kevin O\'Brien', entries: [[4, 16, 36, 65], [6, 12, 32, 61], [2, 14, 34, 68]] },
    { id: 10, name: 'Matt Dorow', entries: [[9, 28, 41, 67], [5, 14, 39, 67], [3, 15, 43, 61]] },
    { id: 11, name: 'Matt Kilianski', entries: [[3, 12, 35, 67], [3, 28, 41, 68], [2, 11, 33, 67]] },
    { id: 12, name: 'Matt Walker', entries: [[2, 15, 38, 64], [3, 14, 32, 64], [6, 11, 32, 64]] },
    { id: 13, name: 'Matt Weimer', entries: [[3, 28, 49, 69], [2, 17, 45, 62], [6, 15, 41, 63]] },
    { id: 14, name: 'Nick Royer', entries: [[3, 12, 33, 67], [3, 13, 37, 67], [2, 12, 33, 67]] },
    { id: 15, name: 'Rob Stoecklein', entries: [[6, 12, 42, 63], [3, 16, 33, 76], [8, 17, 39, 62]] },
    { id: 16, name: 'Ryan Boudouris', entries: [[2, 11, 37, 62], [5, 14, 35, 64], [4, 15, 39, 65]] },
    { id: 17, name: 'Ryan Buckle', entries: [[3, 11, 33, 70], [6, 12, 36, 65], [2, 17, 54, 64]] },
    { id: 18, name: 'Tony Drake', entries: [[9, 19, 53, 70], [3, 16, 34, 62], [3, 26, 47, 67]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };