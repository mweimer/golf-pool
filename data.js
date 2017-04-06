const golferData = [
	{ id: 1, firstName: 'Dustin', lastName: 'Johnson', tier: 'A' },
	{ id: 2, firstName: 'Rory', lastName: 'McIlroy', tier: 'A' },
	{ id: 3, firstName: 'Jordan', lastName: 'Spieth', tier: 'A' },
	{ id: 4, firstName: 'Hideki', lastName: 'Matsuyama', tier: 'A' },
	{ id: 5, firstName: 'Rickie', lastName: 'Fowler', tier: 'A' },
	{ id: 6, firstName: 'Jason', lastName: 'Day', tier: 'A' },
	{ id: 7, firstName: 'Jon', lastName: 'Rahm', tier: 'A' },
	{ id: 8, firstName: 'Justin', lastName: 'Rose', tier: 'A' },
	{ id: 9, firstName: 'Phil', lastName: 'Mickelson', tier: 'A' },
	{ id: 10, firstName: 'Henrik', lastName: 'Stenson', tier: 'A' },

	{ id: 11, firstName: 'Justin', lastName: 'Thomas', tier: 'B' },
	{ id: 12, firstName: 'Adam', lastName: 'Scott', tier: 'B' },
	{ id: 13, firstName: 'Paul', lastName: 'Casey', tier: 'B' },
	{ id: 14, firstName: 'Sergio', lastName: 'Garcia', tier: 'B' },
	{ id: 15, firstName: 'Bubba', lastName: 'Watson', tier: 'B' },
	{ id: 16, firstName: 'Brandt', lastName: 'Snedeker', tier: 'B' },
	{ id: 17, firstName: 'Louis', lastName: 'Oosthuizen', tier: 'B' },
	{ id: 18, firstName: 'Marc', lastName: 'Leishman', tier: 'B' },
	{ id: 19, firstName: 'Tyrrell', lastName: 'Hatton', tier: 'B' },
	{ id: 20, firstName: 'Brooks', lastName: 'Koepka', tier: 'B' },
	{ id: 21, firstName: 'Russell', lastName: 'Henley', tier: 'B' },
	{ id: 22, firstName: 'Daniel', lastName: 'Berger', tier: 'B' },
	{ id: 23, firstName: 'Matthew', lastName: 'Fitzpatrick', tier: 'B' },
	{ id: 24, firstName: 'Thomas', lastName: 'Pieters', tier: 'B' },
	{ id: 25, firstName: 'Charl', lastName: 'Schwartzel', tier: 'B' },
	{ id: 26, firstName: 'Patrick', lastName: 'Reed', tier: 'B' },
	{ id: 27, firstName: 'Adam', lastName: 'Hadwin', tier: 'B' },
	{ id: 28, firstName: 'Lee', lastName: 'Westwood', tier: 'B' },
	{ id: 29, firstName: 'Matt', lastName: 'Kuchar', tier: 'B' },
	{ id: 30, firstName: 'Tommy', lastName: 'Fleetwood', tier: 'B' },
	{ id: 31, firstName: 'Alex', lastName: 'Noren', tier: 'B' },

	{ id: 32, firstName: 'Branden', lastName: 'Grace', tier: 'C' },
	{ id: 33, firstName: 'J.B.', lastName: 'Holmes', tier: 'C' },
	{ id: 34, firstName: 'Bill', lastName: 'Haas', tier: 'C' },
	{ id: 35, firstName: 'Jimmy', lastName: 'Walker', tier: 'C' },
	{ id: 36, firstName: 'Danny', lastName: 'Willett', tier: 'C' },
	{ id: 37, firstName: 'Gary', lastName: 'Woodland', tier: 'C' },
	{ id: 38, firstName: 'Kevin', lastName: 'Kisner', tier: 'C' },
	{ id: 39, firstName: 'Zach', lastName: 'Johnson', tier: 'C' },
	{ id: 40, firstName: 'Charley', lastName: 'Hoffman', tier: 'C' },
	{ id: 41, firstName: 'Emiliano', lastName: 'Grillo', tier: 'C' },
	{ id: 42, firstName: 'Martin', lastName: 'Kaymer', tier: 'C' },
	{ id: 43, firstName: 'Rafa', lastName: 'Cabrera Bello', tier: 'C' },
	{ id: 44, firstName: 'Ross', lastName: 'Fisher', tier: 'C' },
	{ id: 45, firstName: 'Shane', lastName: 'Lowry', tier: 'C' },
	{ id: 46, firstName: 'Bernd', lastName: 'Wiesberger', tier: 'C' },
	{ id: 47, firstName: 'Jason', lastName: 'Dufner', tier: 'C' },
	{ id: 48, firstName: 'Ryan', lastName: 'Moore', tier: 'C' },
	{ id: 49, firstName: 'Soren', lastName: 'Kjeldsen', tier: 'C' },
	{ id: 50, firstName: 'Brendan', lastName: 'Steele', tier: 'C' },
	{ id: 51, firstName: 'Byeong Hun', lastName: 'An', tier: 'C' },
	{ id: 52, firstName: 'Francesco', lastName: 'Molinari', tier: 'C' },
	{ id: 53, firstName: 'Jim', lastName: 'Furyk', tier: 'C' },
	{ id: 54, firstName: 'Kevin', lastName: 'Na', tier: 'C' },
	{ id: 55, firstName: 'Pat', lastName: 'Perez', tier: 'C' },
	{ id: 56, firstName: 'Andy', lastName: 'Sullivan', tier: 'C' },
	{ id: 57, firstName: 'Russell', lastName: 'Knox', tier: 'C' },
	{ id: 58, firstName: 'Angel', lastName: 'Cabrera', tier: 'C' },
	{ id: 59, firstName: 'Hudson', lastName: 'Swafford', tier: 'C' },

	{ id: 60, firstName: 'Hideto', lastName: 'Tanihara', tier: 'D' },
	{ id: 61, firstName: 'Kevin', lastName: 'Chappell', tier: 'D' },
	{ id: 62, firstName: 'Webb', lastName: 'Simpson', tier: 'D' },
	{ id: 63, firstName: 'William', lastName: 'McGirt', tier: 'D' },
	{ id: 64, firstName: 'Scott', lastName: 'Piercy', tier: 'D' },
	{ id: 65, firstName: 'Steve', lastName: 'Stricker', tier: 'D' },
	{ id: 66, firstName: 'Chris', lastName: 'Wood', tier: 'D' },
	{ id: 67, firstName: 'Jhonattan', lastName: 'Vegas', tier: 'D' },
	{ id: 68, firstName: 'Fred', lastName: 'Couples', tier: 'D' },
	{ id: 69, firstName: 'James', lastName: 'Hahn', tier: 'D' },
	{ id: 70, firstName: 'Jeunghun', lastName: 'Wang', tier: 'D' },
	{ id: 71, firstName: 'Bernhard', lastName: 'Langer', tier: 'D' },
	{ id: 72, firstName: 'Roberto', lastName: 'Castro', tier: 'D' },
	{ id: 73, firstName: 'Sean', lastName: 'O\'Hair', tier: 'D' },
	{ id: 74, firstName: 'Curtis', lastName: 'Luck', tier: 'D', isAmateur: true },
	{ id: 75, firstName: 'Si Woo', lastName: 'Kim', tier: 'D' },
	{ id: 76, firstName: 'Ernie', lastName: 'Els', tier: 'D' },
	{ id: 77, firstName: 'Yuta', lastName: 'Ikeda', tier: 'D' },
	{ id: 78, firstName: 'Billy', lastName: 'Hurley III', tier: 'D' },
	{ id: 79, firstName: 'Brian', lastName: 'Stuard', tier: 'D' },
	{ id: 80, firstName: 'Daniel', lastName: 'Summerhays', tier: 'D' },
	{ id: 81, firstName: 'Mackenzie', lastName: 'Hughes', tier: 'D' },
	{ id: 82, firstName: 'Rod', lastName: 'Pampling', tier: 'D' },
	{ id: 83, firstName: 'Vijay', lastName: 'Singh', tier: 'D' },
	{ id: 84, firstName: 'Scott', lastName: 'Gregory', tier: 'D', isAmateur: true },
	{ id: 85, firstName: 'Brad', lastName: 'Dalke', tier: 'D', isAmateur: true },
	{ id: 86, firstName: 'Ian', lastName: 'Woosnam', tier: 'D' },
	{ id: 87, firstName: 'Stewart', lastName: 'Hagestad', tier: 'D', isAmateur: true },
	{ id: 88, firstName: 'Toto', lastName: 'Gana', tier: 'D', isAmateur: true },
	{ id: 89, firstName: 'Jose Maria', lastName: 'Olazabal', tier: 'D' },
	{ id: 90, firstName: 'Trevor', lastName: 'Immelman', tier: 'D' },
	{ id: 91, firstName: 'Larry', lastName: 'Mize', tier: 'D' },
	{ id: 92, firstName: 'Mark', lastName: 'O\'Meara', tier: 'D' },
	{ id: 93, firstName: 'Mike', lastName: 'Weir', tier: 'D' },
	{ id: 94, firstName: 'Sandy', lastName: 'Lyle', tier: 'D' }
];

const contestantData = [
	{ name: 'Alex Duff', entries: [[2, 11, 37, 62], [5, 19, 47, 65], [7, 27, 39, 63]] },
	{ name: 'Alex Prevo', entries: [[1, 15, 34, 68], [3, 12, 53, 65], [5, 29, 54, 66]] },
	{ name: 'Bob Kelly', entries: [[3, 16, 39, 62], [5, 12, 33, 67], [6, 14, 53, 65]] },
	{ name: 'Cameron Weimer', entries: [[7, 13, 34, 66], [3, 24, 40, 66], [2, 11, 41, 64]] },
	{ name: 'Drew Serruto', entries: [[1, 15, 33, 62], [6, 11, 39, 65], [5, 28, 45, 68]] },
	{ name: 'Ian Horwich', entries: [[1, 15, 53, 76], [4, 12, 33, 83], [5, 29, 39, 62]] },
	{ name: 'Joey Graham', entries: [[2, 16, 47, 76], [3, 11, 35, 67], [6, 15, 58, 68]] },
	{ name: 'Kevin Donoher', entries: [[7, 14, 43, 67], [2, 23, 41, 66], [3, 22, 34, 62]] },
	{ name: 'Kevin O\'Brien', entries: [[4, 16, 36, 65], [6, 12, 32, 61], [1, 14, 34, 68]] },
	{ name: 'Matt Dorow', entries: [[9, 28, 41, 67], [5, 14, 39, 67], [3, 15, 43, 61]] },
	{ name: 'Matt Kilianski', entries: [[3, 12, 35, 67], [3, 28, 41, 68], [2, 11, 33, 67]] },
	{ name: 'Matt Walker', entries: [[2, 15, 38, 64], [3, 14, 32, 64], [6, 11, 32, 64]] },
	{ name: 'Matt Weimer', entries: [[3, 28, 49, 69], [2, 17, 45, 62], [6, 15, 41, 63]] },
	{ name: 'Nick Royer', entries: [[1, 12, 33, 67], [3, 13, 37, 67], [2, 12, 33, 67]] },
	{ name: 'Rob Stoecklein', entries: [[6, 12, 42, 63], [3, 16, 33, 76], [8, 17, 39, 62]] },
	{ name: 'Ryan Boudouris', entries: [[2, 11, 37, 62], [5, 14, 35, 64], [4, 15, 39, 65]] },
	{ name: 'Ryan Buckle', entries: [[3, 11, 33, 70], [6, 12, 36, 65], [2, 17, 54, 64]] },
	{ name: 'Tony Drake', entries: [[9, 19, 53, 70], [3, 16, 34, 62], [3, 26, 47, 67]] }
];

