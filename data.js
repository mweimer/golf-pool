const golferData = [
    { id: 1, firstName: 'Dustin', lastName: 'Johnson', tier: 'A' },
    { id: 2, firstName: 'Jon', lastName: 'Rahm', tier: 'A' },
    { id: 3, firstName: 'Jordan', lastName: 'Spieth', tier: 'A' },
    { id: 4, firstName: 'Jason', lastName: 'Day', tier: 'A' },
    { id: 5, firstName: 'Hideki', lastName: 'Matsuyama', tier: 'A' },
    { id: 6, firstName: 'Adam', lastName: 'Scott', tier: 'A' },
    { id: 7, firstName: 'Rickie', lastName: 'Fowler', tier: 'A' },
    { id: 8, firstName: 'Matt', lastName: 'Kuchar', tier: 'A' },
    { id: 9, firstName: 'Brooks', lastName: 'Koepka', tier: 'A' },
    { id: 10, firstName: 'Justin', lastName: 'Thomas', tier: 'A' },

    { id: 11, firstName: 'Patrick', lastName: 'Reed', tier: 'B' },
    { id: 12, firstName: 'Tony', lastName: 'Finau', tier: 'B' },
    { id: 13, firstName: 'Kevin', lastName: 'Kisner', tier: 'B' },
    { id: 14, firstName: 'Patrick', lastName: 'Cantlay', tier: 'B' },
    { id: 15, firstName: 'Kevin', lastName: 'Chappell', tier: 'B' },
    { id: 16, firstName: 'Byeong Hun', lastName: 'An', tier: 'B' },
    { id: 17, firstName: 'Emiliano', lastName: 'Grillo', tier: 'B' },
    { id: 18, firstName: 'Phil', lastName: 'Mickelson', tier: 'B' },
    { id: 19, firstName: 'Billy', lastName: 'Horschel', tier: 'B' },
    { id: 20, firstName: 'Bud', lastName: 'Cauley', tier: 'B' },
    { id: 21, firstName: 'Jason', lastName: 'Dufner', tier: 'B' },
    { id: 22, firstName: 'Marc', lastName: 'Leishman', tier: 'B' },
    { id: 23, firstName: 'Webb', lastName: 'Simpson', tier: 'B' },
    { id: 24, firstName: 'Charl', lastName: 'Schwartzel', tier: 'B' },
    { id: 25, firstName: 'Bill', lastName: 'Haas', tier: 'B' },
    { id: 26, firstName: 'Brendan', lastName: 'Steele', tier: 'B' },
    { id: 27, firstName: 'Keegan', lastName: 'Bradley', tier: 'B' },
    { id: 28, firstName: 'Kevin', lastName: 'Tway', tier: 'B' },
    { id: 29, firstName: 'Kyle', lastName: 'Stanley', tier: 'B' },
    { id: 30, firstName: 'Shane', lastName: 'Lowry', tier: 'B' },
    { id: 31, firstName: 'Steve', lastName: 'Stricker', tier: 'B' },
    { id: 32, firstName: 'William', lastName: 'McGirt', tier: 'B' },

    { id: 33, firstName: 'Adam', lastName: 'Hadwin', tier: 'C' },
    { id: 34, firstName: 'Danny', lastName: 'Lee', tier: 'C' },
    { id: 35, firstName: 'Gary', lastName: 'Woodland', tier: 'C' },
    { id: 36, firstName: 'J.B.', lastName: 'Holmes', tier: 'C' },
    { id: 37, firstName: 'Pat', lastName: 'Perez', tier: 'C' },
    { id: 38, firstName: 'Rafael', lastName: 'Cabrera Bello', tier: 'C' },
    { id: 39, firstName: 'Ryan', lastName: 'Moore', tier: 'C' },
    { id: 40, firstName: 'Scott', lastName: 'Piercy', tier: 'C' },
    { id: 41, firstName: 'Sean', lastName: 'O\'Hair', tier: 'C' },
    { id: 42, firstName: 'Tommy', lastName: 'Fleetwood', tier: 'C' },
    { id: 43, firstName: 'Brian', lastName: 'Harman', tier: 'C' },
    { id: 44, firstName: 'Bubba', lastName: 'Watson', tier: 'C' },
    { id: 45, firstName: 'Charley', lastName: 'Hoffman', tier: 'C' },
    { id: 46, firstName: 'David', lastName: 'Lingmerth', tier: 'C' },
    { id: 47, firstName: 'Ollie', lastName: 'Schniederjans', tier: 'C' },
    { id: 48, firstName: 'Ross', lastName: 'Fisher', tier: 'C' },
    { id: 49, firstName: 'Graham', lastName: 'Delaet', tier: 'C' },
    { id: 50, firstName: 'Lucas', lastName: 'Glover', tier: 'C' },
    { id: 51, firstName: 'Si Woo', lastName: 'Kim', tier: 'C' },
    { id: 52, firstName: 'Smylie', lastName: 'Kaufman', tier: 'C' },
    { id: 53, firstName: 'Zach', lastName: 'Johnson', tier: 'C' },
    { id: 54, firstName: 'Cameron', lastName: 'Smith', tier: 'C' },
    { id: 55, firstName: 'Chris', lastName: 'Kirk', tier: 'C' },
    { id: 56, firstName: 'Morgan', lastName: 'Hoffmann', tier: 'C' },
    { id: 57, firstName: 'Nick', lastName: 'Taylor', tier: 'C' },
    { id: 58, firstName: 'Peter', lastName: 'Uihlein', tier: 'C' },
    { id: 59, firstName: 'Russell', lastName: 'Knox', tier: 'C' },
    { id: 60, firstName: 'Scott', lastName: 'Brown', tier: 'C' },
    { id: 61, firstName: 'Stewart', lastName: 'Cink', tier: 'C' },
    { id: 62, firstName: 'Sung', lastName: 'Kang', tier: 'C' },
    { id: 63, firstName: 'Jim', lastName: 'Furyk', tier: 'C' },
    { id: 64, firstName: 'Kevin', lastName: 'Streelman', tier: 'C' },
    { id: 65, firstName: 'Soren', lastName: 'Kjeldsen', tier: 'C' },

    { id: 66, firstName: 'Ben', lastName: 'Martin', tier: 'D' },
    { id: 67, firstName: 'Hudson', lastName: 'Swafford', tier: 'D' },
    { id: 68, firstName: 'James', lastName: 'Hahn', tier: 'D' },
    { id: 69, firstName: 'Jamie', lastName: 'Lovemark', tier: 'D' },
    { id: 70, firstName: 'Jason', lastName: 'Kokrak', tier: 'D' },
    { id: 71, firstName: 'Jonas', lastName: 'Blixt', tier: 'D' },
    { id: 72, firstName: 'Martin', lastName: 'Laird', tier: 'D' },
    { id: 73, firstName: 'Patrick', lastName: 'Rodgers', tier: 'D' },
    { id: 74, firstName: 'Vaughn', lastName: 'Taylor', tier: 'D' },
    { id: 75, firstName: 'Aaron', lastName: 'Baddeley', tier: 'D' },
    { id: 76, firstName: 'Billy', lastName: 'Hurley III', tier: 'D' },
    { id: 77, firstName: 'Daniel', lastName: 'Summerhays', tier: 'D' },
    { id: 78, firstName: 'Jim', lastName: 'Herman', tier: 'D' },
    { id: 79, firstName: 'Kelly', lastName: 'Kraft', tier: 'D' },
    { id: 80, firstName: 'Kyle', lastName: 'Reifers', tier: 'D' },
    { id: 81, firstName: 'Luke', lastName: 'Donald', tier: 'D' },
    { id: 82, firstName: 'Luke', lastName: 'List', tier: 'D' },
    { id: 83, firstName: 'Michael', lastName: 'Kim', tier: 'D' },
    { id: 84, firstName: 'Ryan', lastName: 'Ruffels', tier: 'D' },
    { id: 85, firstName: 'J.J.', lastName: 'Spaun', tier: 'D' },
    { id: 86, firstName: 'Brian', lastName: 'Stuard', tier: 'D' },
    { id: 87, firstName: 'David', lastName: 'Hearn', tier: 'D' },
    { id: 88, firstName: 'Harold', lastName: 'Varner, III', tier: 'D' },
    { id: 89, firstName: 'Padraig', lastName: 'Harrington', tier: 'D' },
    { id: 90, firstName: 'Sam', lastName: 'Saunders', tier: 'D' },
    { id: 91, firstName: 'Zac', lastName: 'Blair', tier: 'D' },
    { id: 92, firstName: 'Anirban', lastName: 'Lahiri', tier: 'D' },
    { id: 93, firstName: 'Grayson', lastName: 'Murray', tier: 'D' },
    { id: 94, firstName: 'Mackenzie', lastName: 'Hughes', tier: 'D' },
    { id: 95, firstName: 'Ricky', lastName: 'Barnes', tier: 'D' },
    { id: 96, firstName: 'Vijay', lastName: 'Singh', tier: 'D' },
    { id: 97, firstName: 'Curtis', lastName: 'Luck', tier: 'D' },
    { id: 98, firstName: 'Patton', lastName: 'Kizzire', tier: 'D' },
    { id: 99, firstName: 'Alex', lastName: 'Cejka', tier: 'D' },
    { id: 100, firstName: 'Cheng', lastName: 'Tsung Pan', tier: 'D' },
    { id: 101, firstName: 'D.A.', lastName: 'Points', tier: 'D' },
    { id: 102, firstName: 'Fabian', lastName: 'Gomez', tier: 'D' },
    { id: 103, firstName: 'Hunter', lastName: 'Mahan', tier: 'D' },
    { id: 104, firstName: 'Johnson', lastName: 'Wagner', tier: 'D' },
    { id: 105, firstName: 'K.J.', lastName: 'Choi', tier: 'D' },
    { id: 106, firstName: 'Retief', lastName: 'Goosen', tier: 'D' },
    { id: 107, firstName: 'Roberto', lastName: 'Castro', tier: 'D' },
    { id: 108, firstName: 'Rod', lastName: 'Pampling', tier: 'D' },
    { id: 109, firstName: 'Ryan', lastName: 'Armour', tier: 'D' },
    { id: 110, firstName: 'Ryo', lastName: 'Ishikawa', tier: 'D' },
    { id: 111, firstName: 'Yuta', lastName: 'Ikeda', tier: 'D' },
    { id: 112, firstName: 'Brendon', lastName: 'De Jonge', tier: 'D' },
    { id: 113, firstName: 'Brett', lastName: 'Coletta', tier: 'D' },
    { id: 114, firstName: 'Carl', lastName: 'Pettersson', tier: 'D' },
    { id: 115, firstName: 'Greg', lastName: 'Chalmers', tier: 'D' },
    { id: 116, firstName: 'Matthew', lastName: 'Griffin', tier: 'D' },
    { id: 117, firstName: 'Scott', lastName: 'Gregory', tier: 'D' },
    { id: 118, firstName: 'Matt', lastName: 'Every', tier: 'D' },
    { id: 119, firstName: 'Steven', lastName: 'Bowditch', tier: 'D' }
];
const contestantData = [
	{ name: 'Kevin O\'Brien', entries: [[1, 18, 36, 77], [4, 27, 44, 89], [3, 19, 53, 105]] },
	{ name: 'Matt Kilianski', entries: [[1, 18, 44, 71], [1, 26, 53, 73], [4, 15, 36, 77]] },
	{ name: 'Matt Weimer', entries: [[8, 32, 51, 81], [4, 32, 63, 66], [7, 11, 33, 67]] },
	{ name: 'Nate Heckmann', entries: [[1, 12, 35, 77], [2, 16, 33, 80], [8, 12, 33, 67]] },
	{ name: 'Ryan Boudouris', entries: [[8, 13, 35, 67], [1, 12, 39, 87], [4, 12, 37, 107]] }
];

