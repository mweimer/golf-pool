const tourneyTitle = '2017 Open Championship';

const tourneyId = '2710';

const golferData = [	
	{ id: 1, firstName: 'Dustin', lastName: 'Johnson', tier: 'A' },
	{ id: 2, firstName: 'Jordan', lastName: 'Spieth', tier: 'A' },
	{ id: 3, firstName: 'Rickie', lastName: 'Fowler', tier: 'A' },
	{ id: 4, firstName: 'Jon', lastName: 'Rahm', tier: 'A' },
	{ id: 5, firstName: 'Sergio', lastName: 'Garcia', tier: 'A' },
	{ id: 6, firstName: 'Justin', lastName: 'Rose', tier: 'A' },
	{ id: 7, firstName: 'Rory', lastName: 'McIlroy', tier: 'A' },
	{ id: 8, firstName: 'Hideki', lastName: 'Matsuyama', tier: 'A' },
	{ id: 9, firstName: 'Tommy', lastName: 'Fleetwood', tier: 'A' },
	{ id: 10, firstName: 'Henrik', lastName: 'Stenson', tier: 'A' },
	{ id: 11, firstName: 'Adam', lastName: 'Scott', tier: 'A' },
	{ id: 12, firstName: 'Brooks', lastName: 'Koepka', tier: 'B' },
	{ id: 13, firstName: 'Jason', lastName: 'Day', tier: 'B' },
	{ id: 14, firstName: 'Paul', lastName: 'Casey', tier: 'B' },
	{ id: 15, firstName: 'Alex', lastName: 'Noren', tier: 'B' },
	{ id: 16, firstName: 'Phil', lastName: 'Mickelson', tier: 'B' },
	{ id: 17, firstName: 'Louis', lastName: 'Oosthuizen', tier: 'B' },
	{ id: 18, firstName: 'Branden', lastName: 'Grace', tier: 'B' },
	{ id: 19, firstName: 'Marc', lastName: 'Leishman', tier: 'B' },
	{ id: 20, firstName: 'Justin', lastName: 'Thomas', tier: 'B' },
	{ id: 21, firstName: 'Matt', lastName: 'Kuchar', tier: 'B' },
	{ id: 22, firstName: 'Thomas', lastName: 'Pieters', tier: 'B' },
	{ id: 23, firstName: 'Padraig', lastName: 'Harrington', tier: 'B' },
	{ id: 24, firstName: 'Rafael Cabrera', lastName: 'Bello', tier: 'B' },
	{ id: 25, firstName: 'Patrick', lastName: 'Reed', tier: 'B' },
	{ id: 26, firstName: 'Shane', lastName: 'Lowry', tier: 'B' },
	{ id: 27, firstName: 'Charl', lastName: 'Schwartzel', tier: 'B' },
	{ id: 28, firstName: 'Brandt', lastName: 'Snedeker', tier: 'B' },
	{ id: 29, firstName: 'Ian', lastName: 'Poulter', tier: 'B' },
	{ id: 30, firstName: 'Lee', lastName: 'Westwood', tier: 'B' },
	{ id: 31, firstName: 'Daniel', lastName: 'Berger', tier: 'B' },
	{ id: 32, firstName: 'Matthew', lastName: 'Fitzpatrick', tier: 'B' },
	{ id: 33, firstName: 'Andy', lastName: 'Sullivan', tier: 'C' },
	{ id: 34, firstName: 'Ross', lastName: 'Fisher', tier: 'C' },
	{ id: 35, firstName: 'Zach', lastName: 'Johnson', tier: 'C' },
	{ id: 36, firstName: 'Martin', lastName: 'Kaymer', tier: 'C' },
	{ id: 37, firstName: 'Francesco', lastName: 'Molinari', tier: 'C' },
	{ id: 38, firstName: 'Tyrrell', lastName: 'Hatton', tier: 'C' },
	{ id: 39, firstName: 'Bernd', lastName: 'Wiesberger', tier: 'C' },
	{ id: 40, firstName: 'Chris', lastName: 'Wood', tier: 'C' },
	{ id: 41, firstName: 'Steve', lastName: 'Stricker', tier: 'C' },
	{ id: 42, firstName: 'Kevin', lastName: 'Kisner', tier: 'C' },
	{ id: 43, firstName: 'Bill', lastName: 'Haas', tier: 'C' },
	{ id: 44, firstName: 'Brian', lastName: 'Harman', tier: 'C' },
	{ id: 45, firstName: 'J.B.', lastName: 'Holmes', tier: 'C' },
	{ id: 46, firstName: 'Jason', lastName: 'Dufner', tier: 'C' },
	{ id: 47, firstName: 'Soren', lastName: 'Kjeldsen', tier: 'C' },
	{ id: 48, firstName: 'Bryson', lastName: 'DeChambeau', tier: 'C' },
	{ id: 49, firstName: 'Byeong Hun', lastName: 'An', tier: 'C' },
	{ id: 50, firstName: 'Charley', lastName: 'Hoffman', tier: 'C' },
	{ id: 51, firstName: 'Peter', lastName: 'Uihlein', tier: 'C' },
	{ id: 52, firstName: 'Russell', lastName: 'Henley', tier: 'C' },
	{ id: 53, firstName: 'Thorbjorn', lastName: 'Olesen', tier: 'C' },
	{ id: 54, firstName: 'Tony', lastName: 'Finau', tier: 'C' },
	{ id: 55, firstName: 'Andrew', lastName: 'Johnston', tier: 'C' },
	{ id: 56, firstName: 'Bubba', lastName: 'Watson', tier: 'C' },
	{ id: 57, firstName: 'Ryan', lastName: 'Fox', tier: 'C' },
	{ id: 58, firstName: 'Brendan', lastName: 'Steele', tier: 'C' },
	{ id: 59, firstName: 'Emiliano', lastName: 'Grillo', tier: 'C' },
	{ id: 60, firstName: 'Hideto', lastName: 'Tanihara', tier: 'C' },
	{ id: 61, firstName: 'Jimmy', lastName: 'Walker', tier: 'C' },
	{ id: 62, firstName: 'Kevin', lastName: 'Chappell', tier: 'C' },
	{ id: 63, firstName: 'Kyle', lastName: 'Stanley', tier: 'C' },
	{ id: 64, firstName: 'Si Woo', lastName: 'Kim', tier: 'C' },
	{ id: 65, firstName: 'Charles Howell', lastName: 'III', tier: 'C' },
	{ id: 66, firstName: 'Martin', lastName: 'Laird', tier: 'C' },
	{ id: 67, firstName: 'Webb', lastName: 'Simpson', tier: 'C' },
	{ id: 68, firstName: 'Billy', lastName: 'Horschel', tier: 'C' },
	{ id: 69, firstName: 'Xander', lastName: 'Schauffele', tier: 'C' },
	{ id: 70, firstName: 'Adam', lastName: 'Hadwin', tier: 'C' },
	{ id: 71, firstName: 'Richie', lastName: 'Ramsay', tier: 'C' },
	{ id: 72, firstName: 'Russell', lastName: 'Knox', tier: 'C' },
	{ id: 73, firstName: 'Joost', lastName: 'Luiten', tier: 'C' },
	{ id: 74, firstName: 'Anirban', lastName: 'Lahiri', tier: 'D' },
	{ id: 75, firstName: 'Gary', lastName: 'Woodland', tier: 'D' },
	{ id: 76, firstName: 'Alexander', lastName: 'Levy', tier: 'D' },
	{ id: 77, firstName: 'Callum', lastName: 'Shinkwin', tier: 'D' },
	{ id: 78, firstName: 'Cameron', lastName: 'Smith', tier: 'D' },
	{ id: 79, firstName: 'Jamie', lastName: 'Lovemark', tier: 'D' },
	{ id: 80, firstName: 'Matthew', lastName: 'Southgate', tier: 'D' },
	{ id: 81, firstName: 'Pat', lastName: 'Perez', tier: 'D' },
	{ id: 82, firstName: 'Ryan', lastName: 'Moore', tier: 'D' },
	{ id: 83, firstName: 'Stewart', lastName: 'Cink', tier: 'D' },
	{ id: 84, firstName: 'Wesley', lastName: 'Bryan', tier: 'D' },
	{ id: 85, firstName: 'Pablo', lastName: 'Larrazabal', tier: 'D' },
	{ id: 86, firstName: 'Robert', lastName: 'Streb', tier: 'D' },
	{ id: 87, firstName: 'Sean', lastName: 'O\'Hair', tier: 'D' },
	{ id: 88, firstName: 'Danny', lastName: 'Willett', tier: 'D' },
	{ id: 89, firstName: 'Haotong', lastName: 'Li', tier: 'D' },
	{ id: 90, firstName: 'William', lastName: 'McGirt', tier: 'D' },
	{ id: 91, firstName: 'Dylan', lastName: 'Frittelli', tier: 'D' },
	{ id: 92, firstName: 'Ernie', lastName: 'Els', tier: 'D' },
	{ id: 93, firstName: 'Fabrizio', lastName: 'Zanotti', tier: 'D' },
	{ id: 94, firstName: 'Kevin', lastName: 'Na', tier: 'D' },
	{ id: 95, firstName: 'Brandon', lastName: 'Stone', tier: 'D' },
	{ id: 96, firstName: 'Alexander', lastName: 'Bjork', tier: 'D' },
	{ id: 97, firstName: 'Andrew', lastName: 'Dodt', tier: 'D' },
	{ id: 98, firstName: 'David', lastName: 'Horsey', tier: 'D' },
	{ id: 99, firstName: 'Sung', lastName: 'Kang', tier: 'D' },
	{ id: 100, firstName: 'Thongchai', lastName: 'Jaidee', tier: 'D' },
	{ id: 101, firstName: 'Paul', lastName: 'Waring', tier: 'D' },
	{ id: 102, firstName: 'Julian', lastName: 'Suri', tier: 'D' },
	{ id: 103, firstName: 'David', lastName: 'Drysdale', tier: 'D' },
	{ id: 104, firstName: 'David', lastName: 'Lipsky', tier: 'D' },
	{ id: 105, firstName: 'Matthieu', lastName: 'Pavon', tier: 'D' },
	{ id: 106, firstName: 'Richard', lastName: 'Bland', tier: 'D' },
	{ id: 107, firstName: 'Scott', lastName: 'Hend', tier: 'D' },
	{ id: 108, firstName: 'Jeunghun', lastName: 'Wang', tier: 'D' },
	{ id: 109, firstName: 'Jhonattan', lastName: 'Vegas', tier: 'D' },
	{ id: 110, firstName: 'Michael', lastName: 'Lorenzo-Vera', tier: 'D' },
	{ id: 111, firstName: 'Roberto', lastName: 'Castro', tier: 'D' },
	{ id: 112, firstName: 'Aaron', lastName: 'Baddeley', tier: 'D' },
	{ id: 113, firstName: 'Kyung-Tae', lastName: 'Kim', tier: 'D' },
	{ id: 114, firstName: 'Maverick', lastName: 'McNealy', tier: 'D' },
	{ id: 115, firstName: 'Miyazato', lastName: 'Yusaku', tier: 'D' },
	{ id: 116, firstName: 'Paul', lastName: 'Lawrie', tier: 'D' },
	{ id: 117, firstName: 'Sebastian', lastName: 'Munoz', tier: 'D' },
	{ id: 118, firstName: 'Shiv', lastName: 'Kapur', tier: 'D' },
	{ id: 119, firstName: 'Austin', lastName: 'Connelly', tier: 'D' },
	{ id: 120, firstName: 'Jbe', lastName: 'Kruger', tier: 'D' },
	{ id: 121, firstName: 'Phachara', lastName: 'Khongwatmai', tier: 'D' },
	{ id: 122, firstName: 'Prayad', lastName: 'Marksaeng', tier: 'D' },
	{ id: 123, firstName: 'Young-han', lastName: 'Song', tier: 'D' },
	{ id: 124, firstName: 'Yuta', lastName: 'Ikeda', tier: 'D' },
	{ id: 125, firstName: 'Darren', lastName: 'Fichardt', tier: 'D' },
	{ id: 126, firstName: 'Mark', lastName: 'Foster', tier: 'D' },
	{ id: 127, firstName: 'Mike', lastName: 'Hendry', tier: 'D' },
	{ id: 128, firstName: 'Yi-Keun', lastName: 'Chang', tier: 'D' },
	{ id: 129, firstName: 'Tom', lastName: 'Lehman', tier: 'D' },
	{ id: 130, firstName: 'Adam', lastName: 'Bland', tier: 'D' },
	{ id: 131, firstName: 'Alfie', lastName: 'Plant', tier: 'D' },
	{ id: 132, firstName: 'Ashley', lastName: 'Hall', tier: 'D' },
	{ id: 133, firstName: 'Chan', lastName: 'Kim', tier: 'D' },
	{ id: 134, firstName: 'Connor', lastName: 'Syme', tier: 'D' },
	{ id: 135, firstName: 'Gi-Whan', lastName: 'Kim', tier: 'D' },
	{ id: 136, firstName: 'Harry', lastName: 'Ellis', tier: 'D' },
	{ id: 137, firstName: 'Haydn', lastName: 'Mccullen', tier: 'D' },
	{ id: 138, firstName: 'John', lastName: 'Daly', tier: 'D' },
	{ id: 139, firstName: 'Kent', lastName: 'Bulle', tier: 'D' },
	{ id: 140, firstName: 'Luca', lastName: 'Cianchetti', tier: 'D' },
	{ id: 141, firstName: 'Matthew', lastName: 'Griffin', tier: 'D' },
	{ id: 142, firstName: 'Paul', lastName: 'Broadhurst', tier: 'D' },
	{ id: 143, firstName: 'Robert', lastName: 'Dinwiddie', tier: 'D' },
	{ id: 144, firstName: 'Shaun', lastName: 'Norris', tier: 'D' },
	{ id: 145, firstName: 'Toby', lastName: 'Tree', tier: 'D' },
	{ id: 146, firstName: 'Darren', lastName: 'Clarke', tier: 'D' },
	{ id: 147, firstName: 'Joseph', lastName: 'Dean', tier: 'D' },
	{ id: 148, firstName: 'Laurie', lastName: 'Canter', tier: 'D' },
	{ id: 149, firstName: 'David', lastName: 'Duval', tier: 'D' },
	{ id: 150, firstName: 'Adam', lastName: 'Hodkinson', tier: 'D' },
	{ id: 151, firstName: 'Mark', lastName: 'O\'Meara', tier: 'D' },
	{ id: 152, firstName: 'Ryan', lastName: 'McCarthy', tier: 'D' },
	{ id: 153, firstName: 'Nick', lastName: 'McCarthy', tier: 'D' },
	{ id: 154, firstName: 'Sandy', lastName: 'Lyle', tier: 'D' },
	{ id: 155, firstName: 'Todd', lastName: 'Hamilton', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Adam Weiss', entries: [[1, 11, 39, 95], [2, 15, 43, 95], [6, 13, 34, 73]] },
    { id: 2, name: 'Cameron Weimer', entries: [[2, 20, 35, 82], [1, 15, 34, 95], [6, 12, 33, 75]] },
    { id: 3, name: 'Drew Serruto', entries: [[1, 12, 46, 68], [6, 11, 32, 62], [3, 20, 50, 69]] },
    { id: 4, name: 'Jon Frantz', entries: [[2, 21, 33, 63], [6, 20, 32, 68], [1, 31, 47, 69]] },
    { id: 5, name: 'Kevin Donoher', entries: [[1, 11, 36, 60], [5, 16, 43, 61], [6, 19, 50, 71]] },
    { id: 6, name: 'Kyle Bivenour', entries: [[2, 20, 32, 68], [1, 20, 58, 68], [6, 11, 33, 69]] },
    { id: 7, name: 'Matt Kilianski', entries: [[3, 12, 40, 64], [1, 27, 33, 68], [6, 27, 48, 62]] },
    { id: 8, name: 'Matt Weimer', entries: [[2, 12, 32, 95], [6, 13, 40, 62], [1, 20, 33, 75]] },
    { id: 9, name: 'Nate Heckmann', entries: [[4, 27, 50, 75], [6, 12, 47, 69], [2, 14, 33, 69]] },
    { id: 10, name: 'Neil Thompson', entries: [[1, 13, 46, 71], [2, 12, 34, 71], [3, 17, 34, 71]] },
    { id: 11, name: 'Ryan Boudouris', entries: [[4, 11, 48, 60], [3, 13, 38, 85], [1, 15, 32, 62]] },
    { id: 12, name: 'Nick Royer', entries: [[1, 11, 37, 62], [1, 15, 43, 74], [7, 15, 33, 62]] },
    { id: 13, name: 'Ryan Romes', entries: [[4, 25, 39, 62], [6, 15, 41, 60], [7, 18, 33, 75]] },
    { id: 14, name: 'Sean Buckle', entries: [[1, 12, 33, 67], [3, 11, 36, 68], [6, 12, 45, 75]] },
    { id: 15, name: 'Ian Horwich', entries: [[1, 17, 32, 71], [6, 25, 40, 61], [4, 16, 42, 94]] },
    { id: 16, name: 'David Prevo', entries: [[2, 20, 36, 77], [4, 22, 39, 68], [3, 13, 34, 69]] }
];

export { tourneyTitle, tourneyId, golferData, contestantData };
