const tourneyTitle = 'U.S. Open';

const tourneyId = '401056556';

const golferData = [
    { id: 1, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 2, name: 'Brooks Koepka', espnId: '6798', tier: 'A' },
    { id: 3, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 4, name: 'Tiger Woods', espnId: '462', tier: 'A' },
    { id: 5, name: 'Patrick Cantlay', espnId: '6007', tier: 'A' },
    { id: 6, name: 'Jordan Spieth', espnId: '5467', tier: 'A' },
    { id: 7, name: 'Justin Rose', espnId: '569', tier: 'A' },
    { id: 8, name: 'Rickie Fowler', espnId: '3702', tier: 'A' },
    { id: 9, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 10, name: 'Xander Schauffele', espnId: '10140', tier: 'A' },
    { id: 11, name: 'Justin Thomas', espnId: '4848', tier: 'A' },

    { id: 12, name: 'Jason Day', espnId: '1680', tier: 'B' },
    { id: 13, name: 'Tommy Fleetwood', espnId: '5539', tier: 'B' },
    { id: 14, name: 'Hideki Matsuyama', espnId: '5860', tier: 'B' },
    { id: 15, name: 'Francesco Molinari', espnId: '1483', tier: 'B' },
    { id: 16, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 17, name: 'Bryson DeChambeau', espnId: '10046', tier: 'B' },
    { id: 18, name: 'Tony Finau', espnId: '2230', tier: 'B' },
    { id: 19, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 20, name: 'Phil Mickelson', espnId: '308', tier: 'B' },
    { id: 21, name: 'Webb Simpson', espnId: '1614', tier: 'B' },
    { id: 22, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 23, name: 'Shane Lowry', espnId: '4587', tier: 'B' },
    { id: 24, name: 'Brandt Snedeker', espnId: '1222', tier: 'B' },
    { id: 25, name: 'Henrik Stenson', espnId: '576', tier: 'B' },
    { id: 26, name: 'Marc Leishman', espnId: '3351', tier: 'B' },
    { id: 27, name: 'Gary Woodland', espnId: '3550', tier: 'B' },
    { id: 28, name: 'Sergio Garcia', espnId: '158', tier: 'B' },
    { id: 29, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 30, name: 'Matt Wallace', espnId: '10548', tier: 'B' },
    { id: 31, name: 'Martin Kaymer', espnId: '3670', tier: 'B' },
    { id: 32, name: 'Graeme McDowell', espnId: '301', tier: 'B' },
    { id: 33, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 34, name: 'Bubba Watson', espnId: '780', tier: 'B' },

    { id: 35, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'C' },
    { id: 36, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 37, name: 'Kevin Na', espnId: '318', tier: 'C' },
    { id: 38, name: 'Ian Poulter', espnId: '619', tier: 'C' },
    { id: 39, name: 'Keegan Bradley', espnId: '4513', tier: 'C' },
    { id: 40, name: 'Jim Furyk', espnId: '153', tier: 'C' },
    { id: 41, name: 'Lucas Glover', espnId: '676', tier: 'C' },
    { id: 42, name: 'Branden Grace', espnId: '4383', tier: 'C' },
    { id: 43, name: 'Emiliano Grillo', espnId: '5882', tier: 'C' },
    { id: 44, name: 'Tyrrell Hatton', espnId: '5553', tier: 'C' },
    { id: 45, name: 'Billy Horschel', espnId: '1651', tier: 'C' },
    { id: 46, name: 'Scott Piercy', espnId: '1037', tier: 'C' },
    { id: 47, name: 'Cameron Smith', espnId: '9131', tier: 'C' },
    { id: 48, name: 'Jimmy Walker', espnId: '446', tier: 'C' },
    { id: 49, name: 'Daniel Berger', espnId: '9025', tier: 'C' },
    { id: 50, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'C' },
    { id: 51, name: 'Jason Dufner', espnId: '110', tier: 'C' },
    { id: 52, name: 'Charles Howell III', espnId: '208', tier: 'C' },
    { id: 53, name: 'Zach Johnson', espnId: '686', tier: 'C' },
    { id: 54, name: 'Luke List', espnId: '1059', tier: 'C' },
    { id: 55, name: 'Alexander Noren', espnId: '3832', tier: 'C' },
    { id: 56, name: 'C.T. Pan', espnId: '6017', tier: 'C' },
    { id: 57, name: 'Thomas Pieters', espnId: '9031', tier: 'C' },
    { id: 58, name: 'Rory Sabbatini', espnId: '377', tier: 'C' },
    { id: 59, name: 'Li Haotong', espnId: '5934', tier: 'C' },
    { id: 60, name: 'Erik van Rooyen', espnId: '9364', tier: 'C' },
    { id: 61, name: 'Danny Willett', espnId: '4304', tier: 'C' },
    { id: 62, name: 'Si Woo Kim', espnId: '7081', tier: 'C' },
    { id: 63, name: 'Byeong-Hun An', espnId: '5285', tier: 'C' },
    { id: 64, name: 'Kiradech Aphibarnrat', espnId: '5771', tier: 'C' },
    { id: 65, name: 'Lucas Bjerregaard', espnId: '9575', tier: 'C' },
    { id: 66, name: 'Andrew Putnam', espnId: '5502', tier: 'C' },
    { id: 67, name: 'J.B. Holmes', espnId: '1067', tier: 'C' },
    { id: 68, name: 'Keith Mitchell', espnId: '8906', tier: 'C' },
    { id: 69, name: 'Thorbjorn Olesen', espnId: '5140', tier: 'C' },
    { id: 70, name: 'Chez Reavie', espnId: '769', tier: 'C' },
    { id: 71, name: 'Scottie Scheffler', espnId: '9478', tier: 'C' },
    { id: 72, name: 'Kyle Stanley', espnId: '1778', tier: 'C' },
    { id: 73, name: 'Bernd Wiesberger', espnId: '4317', tier: 'C' },
    { id: 74, name: 'Aaron Wise', espnId: '10577', tier: 'C' },

    { id: 75, name: 'Abraham Ancer', espnId: '9261', tier: 'D' },
    { id: 76, name: 'Aaron Baddeley', espnId: '16', tier: 'D' },
    { id: 77, name: 'Justin Harding', espnId: '5825', tier: 'D' },
    { id: 78, name: 'Jhonattan Vegas', espnId: '1030', tier: 'D' },
    { id: 79, name: 'Luke Donald', espnId: '601', tier: 'D' },
    { id: 80, name: 'Ryan Fox', espnId: '4251', tier: 'D' },
    { id: 81, name: 'Viktor Hovland', espnId: '4364873', tier: 'D' },
    { id: 82, name: 'Matt Jones', espnId: '1367', tier: 'D' },
    { id: 83, name: 'Harris English', espnId: '5408', tier: 'D' },
    { id: 84, name: 'Kyoung-Hoon Lee', espnId: '7083', tier: 'D' },
    { id: 85, name: 'Ollie Schniederjans', espnId: '9568', tier: 'D' },
    { id: 86, name: 'Dean Burmester', espnId: '5830', tier: 'D' },
    { id: 87, name: 'Ernie Els', espnId: '123', tier: 'D' },
    { id: 88, name: 'Sam Horsfield', espnId: '10049', tier: 'D' },
    { id: 89, name: 'Marcus Kinhult', espnId: '9496', tier: 'D' },
    { id: 90, name: 'Patton Kizzire', espnId: '3980', tier: 'D' },
    { id: 91, name: 'Anirban Lahiri', espnId: '4989', tier: 'D' },
    { id: 92, name: 'Collin Morikawa', espnId: '10592', tier: 'D' },
    { id: 93, name: 'Brian Stuard', espnId: '3599', tier: 'D' },
    { id: 94, name: 'Nick Taylor', espnId: '3792', tier: 'D' },
    { id: 95, name: 'Connor Arendell', espnId: '6781', tier: 'D' },
    { id: 96, name: 'Adri Arnaus', espnId: '11350', tier: 'D' },
    { id: 97, name: 'Zac Blair', espnId: '9040', tier: 'D' },
    { id: 98, name: 'Devon Bling', espnId: '4420723', tier: 'D' },
    { id: 99, name: 'Joseph Bramlett', espnId: '5902', tier: 'D' },
    { id: 100, name: 'Merrick Bremner', espnId: '5082', tier: 'D' },
    { id: 101, name: 'Roberto Castro', espnId: '3740', tier: 'D' },
    { id: 102, name: 'Joel Dahmen', espnId: '6196', tier: 'D' },
    { id: 103, name: 'Charlie Danielson', espnId: '10442', tier: 'D' },
    { id: 104, name: 'Brian Davis', espnId: '1049', tier: 'D' },
    { id: 105, name: 'Eric Dietrich', espnId: '4425896', tier: 'D' },
    { id: 106, name: 'Brett Drewitt', espnId: '9791', tier: 'D' },
    { id: 107, name: 'Chandler Eaton', espnId: '4425897', tier: 'D' },
    { id: 108, name: 'Austin Eckroat', espnId: '4425898', tier: 'D' },
    { id: 109, name: 'Rhys Enoch', espnId: '6776', tier: 'D' },
    { id: 110, name: 'Julian Etulain', espnId: '5259', tier: 'D' },
    { id: 111, name: 'Marcus Fraser', espnId: '1457', tier: 'D' },
    { id: 112, name: 'Luis Gagne', espnId: '4349536', tier: 'D' },
    { id: 113, name: 'Cody Gribble', espnId: '8971', tier: 'D' },
    { id: 114, name: 'Guillermo Pereira', espnId: '9931', tier: 'D' },
    { id: 115, name: 'Luke Guthrie', espnId: '6066', tier: 'D' },
    { id: 116, name: 'Richard H. Lee', espnId: '6644', tier: 'D' },
    { id: 117, name: 'Chesson Hadley', espnId: '5704', tier: 'D' },
    { id: 118, name: 'Stewart Hagestad', espnId: '11000', tier: 'D' },
    { id: 119, name: 'Andreas Halvorsen', espnId: '11188', tier: 'D' },
    { id: 120, name: 'Nick Hardy', espnId: '10048', tier: 'D' },
    { id: 121, name: 'Daniel Hillier', espnId: '4425899', tier: 'D' },
    { id: 122, name: 'Tom Hoge', espnId: '6086', tier: 'D' },
    { id: 123, name: 'Mikumu Horikawa', espnId: '4425900', tier: 'D' },
    { id: 124, name: 'Billy Hurley III', espnId: '1612', tier: 'D' },
    { id: 125, name: 'Kodai Ichihara', espnId: '4318', tier: 'D' },
    { id: 126, name: 'Shugo Imahira', espnId: '10630', tier: 'D' },
    { id: 127, name: 'Chan Kim', espnId: '5724', tier: 'D' },
    { id: 128, name: 'Nate Lashley', espnId: '1600', tier: 'D' },
    { id: 129, name: 'Chip McDaniel', espnId: '4362864', tier: 'D' },
    { id: 130, name: 'Matt Naumec', espnId: '4425901', tier: 'D' },
    { id: 131, name: 'Noah Norton', espnId: '4425902', tier: 'D' },
    { id: 132, name: 'Kevin O\'Connell', espnId: '5662', tier: 'D' },
    { id: 133, name: 'Rob Oppenheim', espnId: '1733', tier: 'D' },
    { id: 134, name: 'Carlos Ortiz', espnId: '5532', tier: 'D' },
    { id: 135, name: 'Renato Paratore', espnId: '6979', tier: 'D' },
    { id: 136, name: 'Matt Parziale', espnId: '11457', tier: 'D' },
    { id: 137, name: 'Matthieu Pavon', espnId: '10596', tier: 'D' },
    { id: 138, name: 'Andy Pope', espnId: '4827', tier: 'D' },
    { id: 139, name: 'Alex Prugh', espnId: '3322', tier: 'D' },
    { id: 140, name: 'Jovan Rebula', espnId: '10944', tier: 'D' },
    { id: 141, name: 'Sam Saunders', espnId: '1613', tier: 'D' },
    { id: 142, name: 'Hayden Shieh', espnId: '4425903', tier: 'D' },
    { id: 143, name: 'Lee Slattery', espnId: '1498', tier: 'D' },
    { id: 144, name: 'Clement Sordet', espnId: '10230', tier: 'D' },
    { id: 145, name: 'Sepp Straka', espnId: '8961', tier: 'D' },
    { id: 146, name: 'Ryan Sullivan', espnId: '7087', tier: 'D' },
    { id: 147, name: 'Callum Tarren', espnId: '11376', tier: 'D' },
    { id: 148, name: 'Michael Thorbjornsen', espnId: '4425904', tier: 'D' },
    { id: 149, name: 'Spencer Tibbits', espnId: '4425905', tier: 'D' },
    { id: 150, name: 'Brendon Todd', espnId: '3454', tier: 'D' },
    { id: 151, name: 'David Toms', espnId: '429', tier: 'D' },
    { id: 152, name: 'Justin Walters', espnId: '4008', tier: 'D' },
    { id: 153, name: 'Mike Weir', espnId: '453', tier: 'D' },
    { id: 154, name: 'Brandon Wu', espnId: '4355673', tier: 'D' },
    { id: 155, name: 'Cameron Young', espnId: '4425906', tier: 'D' },
    { id: 156, name: 'Chun An Yu', espnId: '4349547', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Matt Weimer', entries: [[2, 13, 37, 79], [3, 16, 38, 83], [2, 15, 36, 87]] },
    { id: 2, name: 'Ryan Boudouris', entries: [[1, 21, 40, 75], [6, 13, 37, 75], [4, 19, 53, 75]] },
    { id: 3, name: 'Tim Cableck', entries: [[4, 16, 64, 79], [2, 19, 40, 78], [10, 15, 36, 91]] },
    { id: 4, name: 'Andrew Kubaszewski', entries: [[2, 19, 52, 78], [1, 16, 39, 85], [6, 18, 64, 90]] },
    { id: 5, name: 'Brett Kubaszewski', entries: [[2, 12, 38, 90], [2, 13, 37, 78], [11, 16, 46, 90]] },
    { id: 6, name: 'Matt Kilianski', entries: [[6, 16, 38, 75], [8, 13, 54, 85], [4, 16, 40, 81]] },
    { id: 7, name: 'Alex Duff', entries: [[3, 18, 61, 145], [1, 15, 36, 79], [2, 24, 37, 75]] },
    { id: 8, name: 'Max Marshall', entries: [[5, 12, 37, 78], [1, 16, 42, 81], [2, 20, 46, 77]] },
    { id: 9, name: 'Nate Heckmann', entries: [[2, 20, 36, 79], [3, 12, 45, 91], [10, 18, 40, 85]] },
    { id: 10, name: 'Curtis Chapin', entries: [[3, 16, 40, 76], [2, 14, 37, 78], [6, 17, 53, 83]] },
    { id: 11, name: 'Drew Serruto', entries: [[1, 14, 38, 85], [2, 17, 38, 76], [5, 13, 37, 87]] },
    { id: 12, name: 'Kyle Bivenour', entries: [[2, 13, 37, 79], [3, 15, 49, 77], [2, 18, 36, 75]] },
    { id: 13, name: 'Steven Laake', entries: [[1, 16, 38, 79], [3, 23, 48, 78], [2, 13, 40, 83]] },
    { id: 14, name: 'Sean Buckle', entries: [[2, 13, 40, 76], [1, 16, 36, 78], [10, 19, 46, 84]] },
    { id: 15, name: 'Kevin Donoher', entries: [[4, 20, 38, 87], [1, 12, 51, 78], [6, 13, 35, 77]] },
    { id: 16, name: 'Cameron Weimer', entries: [[3, 24, 36, 78], [4, 13, 50, 91], [6, 16, 44, 83]] },
    { id: 17, name: 'Nick Royer', entries: [[2, 13, 38, 77], [4, 16, 36, 76], [1, 29, 62, 81]] },
    { id: 18, name: 'Tony Boyle', entries: [[4, 20, 37, 76], [2, 12, 44, 76], [1, 18, 36, 76]] },
    { id: 19, name: 'Tony Drake', entries: [[2, 16, 43, 78], [1, 13, 53, 77], [3, 18, 36, 81]] },
    { id: 20, name: 'Nick Cocalis', entries: [[2, 18, 37, 76], [2, 16, 51, 102], [6, 20, 37, 102]] },
    { id: 21, name: 'Nick Brohas', entries: [[2, 21, 36, 79], [1, 24, 39, 151], [4, 12, 67, 78]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };
