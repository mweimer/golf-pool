const tourneyTitle = '2018 US Open';

const tourneyId = '401025255';

const golferData = [
    { id: 1, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 2, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 3, name: 'Jordan Spieth', espnId: '5467', tier: 'A' },
    { id: 4, name: 'Justin Thomas', espnId: '4848', tier: 'A' },
    { id: 5, name: 'Jason Day', espnId: '1680', tier: 'A' },
    { id: 6, name: 'Justin Rose', espnId: '569', tier: 'A' },
    { id: 7, name: 'Tiger Woods', espnId: '462', tier: 'A' },
    { id: 8, name: 'Rickie Fowler', espnId: '3702', tier: 'A' },
    { id: 9, name: 'Brooks Koepka', espnId: '6798', tier: 'A' },
    { id: 10, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 11, name: 'Hideki Matsuyama', espnId: '5860', tier: 'A' },
    { id: 12, name: 'Phil Mickelson', espnId: '308', tier: 'A' },

    { id: 13, name: 'Henrik Stenson', espnId: '576', tier: 'B' },
    { id: 14, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 15, name: 'Sergio Garcia', espnId: '158', tier: 'B' },
    { id: 16, name: 'Branden Grace', espnId: '4383', tier: 'B' },
    { id: 17, name: 'Bryson DeChambeau', espnId: '10046', tier: 'B' },
    { id: 18, name: 'Bubba Watson', espnId: '780', tier: 'B' },
    { id: 19, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 20, name: 'Tommy Fleetwood', espnId: '5539', tier: 'B' },
    { id: 21, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 22, name: 'Alexander Noren', espnId: '3832', tier: 'B' },
    { id: 23, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 24, name: 'Marc Leishman', espnId: '3351', tier: 'B' },
    { id: 25, name: 'Charl Schwartzel', espnId: '1097', tier: 'B' },
    { id: 26, name: 'Francesco Molinari', espnId: '1483', tier: 'B' },
    { id: 27, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 28, name: 'Patrick Cantlay', espnId: '6007', tier: 'B' },
    { id: 29, name: 'Tony Finau', espnId: '2230', tier: 'B' },
    { id: 30, name: 'Webb Simpson', espnId: '1614', tier: 'B' },
    { id: 31, name: 'Aaron Wise', espnId: '10577', tier: 'B' },
    { id: 32, name: 'Xander Schauffele', espnId: '10140', tier: 'B' },

    { id: 33, name: 'Byeong Hun An', espnId: '5285', tier: 'C' },
    { id: 34, name: 'Emiliano Grillo', espnId: '5882', tier: 'C' },
    { id: 35, name: 'Brandt Snedeker', espnId: '1222', tier: 'C' },
    { id: 36, name: 'Brian Harman', espnId: '1225', tier: 'C' },
    { id: 37, name: 'Charley Hoffman', espnId: '205', tier: 'C' },
    { id: 38, name: 'Ian Poulter', espnId: '619', tier: 'C' },
    { id: 39, name: 'Jason Dufner', espnId: '110', tier: 'C' },
    { id: 40, name: 'Jimmy Walker', espnId: '446', tier: 'C' },
    { id: 41, name: 'Kyle Stanley', espnId: '1778', tier: 'C' },
    { id: 42, name: 'Peter Uihlein', espnId: '1674', tier: 'C' },
    { id: 43, name: 'Keegan Bradley', espnId: '4513', tier: 'C' },
    { id: 44, name: 'Adam Hadwin', espnId: '5548', tier: 'C' },
    { id: 45, name: 'Cameron Smith', espnId: '9131', tier: 'C' },
    { id: 46, name: 'Daniel Berger', espnId: '9025', tier: 'C' },
    { id: 47, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 48, name: 'Kiradech Aphibarnrat', espnId: '5771', tier: 'C' },
    { id: 49, name: 'Luke List', espnId: '1059', tier: 'C' },
    { id: 50, name: 'Martin Kaymer', espnId: '3670', tier: 'C' },
    { id: 51, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'C' },
    { id: 52, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'C' },
    { id: 53, name: 'Shane Lowry', espnId: '4587', tier: 'C' },
    { id: 54, name: 'Si Woo Kim', espnId: '7081', tier: 'C' },
    { id: 55, name: 'Tyrrell Hatton', espnId: '5553', tier: 'C' },
    { id: 56, name: 'Zach Johnson', espnId: '686', tier: 'C' },
    { id: 57, name: 'Steve Stricker', espnId: '412', tier: 'C' },
    { id: 58, name: 'Brendan Steele', espnId: '3596', tier: 'C' },
    { id: 59, name: 'Graeme McDowell', espnId: '301', tier: 'C' },
    { id: 60, name: 'Kevin Chappell', espnId: '3857', tier: 'C' },
    { id: 61, name: 'Pat Perez', espnId: '707', tier: 'C' },
    { id: 62, name: 'Ross Fisher', espnId: '3462', tier: 'C' },
    { id: 63, name: 'Russell Henley', espnId: '5409', tier: 'C' },
    { id: 64, name: 'Thorbjorn Olesen', espnId: '5140', tier: 'C' },
    { id: 65, name: 'Bill Haas', espnId: '774', tier: 'C' },
    { id: 66, name: 'Chesson Hadley', espnId: '5704', tier: 'C' },
    { id: 67, name: 'Chez Reavie', espnId: '769', tier: 'C' },
    { id: 68, name: 'Gary Woodland', espnId: '3550', tier: 'C' },

    { id: 69, name: 'Charles Howell III', espnId: '208', tier: 'D' },
    { id: 70, name: 'Danny Willett', espnId: '4304', tier: 'D' },
    { id: 71, name: 'Li Haotong', espnId: '5934', tier: 'D' },
    { id: 72, name: 'Satoshi Kodaira', espnId: '9076', tier: 'D' },
    { id: 73, name: 'Andrew Johnston', espnId: '5838', tier: 'D' },
    { id: 74, name: 'Ollie Schniederjans', espnId: '9568', tier: 'D' },
    { id: 75, name: 'Russell Knox', espnId: '4483', tier: 'D' },
    { id: 76, name: 'Braden Thornberry', espnId: '11094', tier: 'D' },
    { id: 77, name: 'Doug Ghim', espnId: '11456', tier: 'D' },
    { id: 78, name: 'Lucas Glover', espnId: '676', tier: 'D' },
    { id: 79, name: 'Trey Mullinax', espnId: '9626', tier: 'D' },
    { id: 80, name: 'Jim Furyk', espnId: '153', tier: 'D' },
    { id: 81, name: 'Alexander Levy', espnId: '6041', tier: 'D' },
    { id: 82, name: 'Matt Wallace', espnId: '10548', tier: 'D' },
    { id: 83, name: 'Patrick Rodgers', espnId: '6825', tier: 'D' },
    { id: 84, name: 'Roberto Castro', espnId: '3740', tier: 'D' },
    { id: 85, name: 'Shubhankar Sharma', espnId: '9888', tier: 'D' },
    { id: 86, name: 'Dylan Frittelli', espnId: '5167', tier: 'D' },
    { id: 87, name: 'Scott Piercy', espnId: '1037', tier: 'D' },
    { id: 88, name: 'Brian Gay', espnId: '159', tier: 'D' },
    { id: 89, name: 'Jhonattan Vegas', espnId: '1030', tier: 'D' },
    { id: 90, name: 'Ryan Fox', espnId: '4251', tier: 'D' },
    { id: 91, name: 'Sung-jae Im', espnId: '11382', tier: 'D' },
    { id: 92, name: 'Ted Potter Jr.', espnId: '2883', tier: 'D' },
    { id: 93, name: 'Aaron Baddeley', espnId: '16', tier: 'D' },
    { id: 94, name: 'Brian Stuard', espnId: '3599', tier: 'D' },
    { id: 95, name: 'Lanto Griffin', espnId: '5962', tier: 'D' },
    { id: 96, name: 'Matt Jones', espnId: '1367', tier: 'D' },
    { id: 97, name: 'Michael Hebert', espnId: '9272', tier: 'D' },
    { id: 98, name: 'Sam Burns', espnId: '9938', tier: 'D' },
    { id: 99, name: 'Sebastian Munoz', espnId: '10404', tier: 'D' },
    { id: 100, name: 'Theo Humphrey', espnId: '4349541', tier: 'D' },
    { id: 101, name: 'Dean Burmester', espnId: '5830', tier: 'D' },
    { id: 102, name: 'Harold Varner, III', espnId: '6991', tier: 'D' },
    { id: 103, name: 'Jason Scrivener', espnId: '4265', tier: 'D' },
    { id: 104, name: 'Lucas Herbert', espnId: '10343', tier: 'D' },
    { id: 105, name: 'Mackenzie Hughes', espnId: '6931', tier: 'D' },
    { id: 106, name: 'Matthew Southgate', espnId: '5852', tier: 'D' },
    { id: 107, name: 'Matthieu Pavon', espnId: '10596', tier: 'D' },
    { id: 108, name: 'Richie Ramsay', espnId: '1782', tier: 'D' },
    { id: 109, name: 'Rikuya Hoshino', espnId: '4350033', tier: 'D' },
    { id: 110, name: 'Shintaro Ban', espnId: '4349524', tier: 'D' },
    { id: 111, name: 'Paul Waring', espnId: '3474', tier: 'D' },
    { id: 112, name: 'Dylan Meyer', espnId: '11115', tier: 'D' },
    { id: 113, name: 'Ernie Els', espnId: '123', tier: 'D' },
    { id: 114, name: 'Noah Goodwin', espnId: '4339409', tier: 'D' },
    { id: 115, name: 'Richy Werenski', espnId: '9804', tier: 'D' },
    { id: 116, name: 'Scott Stallings', espnId: '3378', tier: 'D' },
    { id: 117, name: 'Shota Akiyoshi', espnId: '4349587', tier: 'D' },
    { id: 118, name: 'Tyler Duncan', espnId: '9569', tier: 'D' },
    { id: 119, name: 'Kenny Perry', espnId: '349', tier: 'D' },
    { id: 120, name: 'Stewart Hagestad', espnId: '11000', tier: 'D' },
    { id: 121, name: 'James Morrison', espnId: '4566', tier: 'D' },
    { id: 122, name: 'Ryan Evans', espnId: '9743', tier: 'D' },
    { id: 123, name: 'Tom Lewis', espnId: '5868', tier: 'D' },
    { id: 124, name: 'Jacob Bergeron', espnId: '4349535', tier: 'D' },
    { id: 125, name: 'Michael Putnam', espnId: '1423', tier: 'D' },
    { id: 126, name: 'Kristoffer Reitan', espnId: '4348470', tier: 'D' },
    { id: 127, name: 'Mickey DeMorat', espnId: '4349592', tier: 'D' },
    { id: 128, name: 'Mike Miller', espnId: '', tier: 'D' },
    { id: 129, name: 'Scott Gregory', espnId: '10629', tier: 'D' },
    { id: 130, name: 'Chun An Yu', espnId: '4349547', tier: 'D' },
    { id: 131, name: 'Cole Miller', espnId: '4349563', tier: 'D' },
    { id: 132, name: 'David Bransdon', espnId: '4306', tier: 'D' },
    { id: 133, name: 'Garrett Rank', espnId: '10165', tier: 'D' },
    { id: 134, name: 'Harry Ellis', espnId: '11174', tier: 'D' },
    { id: 135, name: 'Luis Gagne', espnId: '4349536', tier: 'D' },
    { id: 136, name: 'Ryan Lumsden', espnId: '4349542', tier: 'D' },
    { id: 137, name: 'Tim Wilkinson', espnId: '1157', tier: 'D' },
    { id: 138, name: 'Timothy Wiseman', espnId: '4349544', tier: 'D' },
    { id: 139, name: 'Chris Naegel', espnId: '8876', tier: 'D' },
    { id: 140, name: 'Eric Axley', espnId: '1247', tier: 'D' },
    { id: 141, name: 'Ty Strafaci', espnId: '11447', tier: 'D' },
    { id: 142, name: 'Calum Hill', espnId: '10102', tier: 'D' },
    { id: 143, name: 'David Gazzolo', espnId: '10362', tier: 'D' },
    { id: 144, name: 'Sung Joon Park', espnId: '9277', tier: 'D' },
    { id: 145, name: 'WC Liang', espnId: '5209', tier: 'D' },
    { id: 146, name: 'Will Grimmer', espnId: '9527', tier: 'D' },
    { id: 147, name: 'Cameron Wilson', espnId: '9532', tier: 'D' },
    { id: 148, name: 'Christopher Babcock', espnId: '4349548', tier: 'D' },
    { id: 149, name: 'Franklin Huang', espnId: '4349539', tier: 'D' },
    { id: 150, name: 'Matt Parziale', espnId: '11457', tier: 'D' },
    { id: 151, name: 'Philip Barbaree', espnId: '10563', tier: 'D' },
    { id: 152, name: 'Rhett Rasmussen', espnId: '4349543', tier: 'D' },
    { id: 153, name: 'Sebastian Vazquez', espnId: '6034', tier: 'D' },
    { id: 154, name: 'Sulman Raza', espnId: '4349564', tier: 'D' },
    { id: 155, name: 'Will Zalatoris', espnId: '9877', tier: 'D' },
    { id: 156, name: 'Michael Block', espnId: '3312', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Matt Weimer', entries: [[3, 27, 37, 98], [5, 17, 37, 89], [8, 27, 49, 71]] },
    { id: 2, name: 'Kevin Donoher', entries: [[1, 13, 41, 69], [5, 16, 58, 81], [8, 32, 36, 98]] },
    { id: 3, name: 'Ryan Boudouris', entries: [[1, 13, 36, 83], [6, 15, 41, 72], [7, 16, 37, 69]] },
    { id: 4, name: 'David Prevo', entries: [[1, 17, 50, 147], [7, 14, 38, 78], [4, 18, 65, 100]] },
    { id: 5, name: 'Lorenzo Washington', entries: [[9, 20, 36, 78], [8, 29, 46, 81], [4, 14, 44, 84]] },
    { id: 6, name: 'Matt Scharrer', entries: [[12, 17, 40, 80], [6, 30, 51, 72], [5, 20, 67, 98]] },
    { id: 7, name: 'Ryan Aguiar', entries: [[4, 20, 33, 71], [5, 21, 39, 77], [1, 24, 34, 79]] },
    { id: 8, name: 'Ryan Romes', entries: [[7, 14, 41, 88], [1, 16, 46, 69], [6, 28, 44, 78]] },
    { id: 9, name: 'Tyler Rodman', entries: [[1, 15, 35, 70], [3, 20, 36, 100], [6, 13, 51, 71]] },
    { id: 10, name: 'Nick Brohas', entries: [[6, 20, 51, 69], [12, 31, 36, 69], [2, 32, 36, 69]] },
    { id: 11, name: 'Andrew Kaczala', entries: [[1, 15, 46, 84], [3, 13, 38, 71], [8, 19, 66, 113]] },
    { id: 12, name: 'Nick Royer', entries: [[6, 13, 36, 79], [1, 14, 35, 80], [8, 13, 36, 102]] },
    { id: 13, name: 'Nate Heckmann', entries: [[1, 20, 40, 83], [6, 29, 34, 75], [12, 21, 41, 69]] },
    { id: 14, name: 'Steven Laake', entries: [[6, 28, 66, 75], [1, 23, 41, 79], [4, 20, 34, 71]] },
    { id: 15, name: 'Drew Serruto', entries: [[1, 14, 38, 69], [8, 17, 39, 80], [7, 13, 35, 70]] },
    { id: 16, name: 'Matt Bobson', entries: [[1, 17, 36, 76], [6, 13, 41, 71], [5, 13, 36, 70]] },
    { id: 17, name: 'Alex Duff', entries: [[1, 26, 39, 70], [7, 13, 41, 85], [8, 23, 44, 96]] },
    { id: 18, name: 'Kyle Bivenour', entries: [[1, 19, 37, 70], [3, 13, 41, 78], [8, 14, 35, 76]] },
    { id: 19, name: 'Matt Kilianski', entries: [[1, 15, 49, 80], [4, 13, 41, 72], [2, 18, 39, 83]] },
    { id: 20, name: 'Kevin O\'Brien', entries: [[3, 29, 56, 70], [5, 16, 39, 69], [12, 27, 37, 89]] },
    { id: 21, name: 'Cameron Weimer', entries: [[6, 13, 34, 90], [9, 17, 51, 98], [12, 30, 37, 79]] },
    { id: 22, name: 'Dan Godshall', entries: [[1, 17, 40, 70], [6, 13, 38, 78], [4, 29, 49, 76]] },
    { id: 23, name: 'Andrew Kubaszewski', entries: [[1, 29, 37, 78], [7, 19, 39, 89], [8, 13, 40, 80]] },
    { id: 24, name: 'Matt Walker', entries: [[1, 17, 42, 80], [8, 16, 39, 70], [4, 29, 37, 69]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };
