const tourneyTitle = '2020 US Open';

const tourneyId = '401219333';

const golferData = [
    { id: 1, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 2, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 3, name: 'Justin Thomas', espnId: '4848', tier: 'A' },
    { id: 4, name: 'Xander Schauffele', espnId: '10140', tier: 'A' },
    { id: 5, name: 'Collin Morikawa', espnId: '10592', tier: 'A' },
    { id: 6, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 7, name: 'Bryson DeChambeau', espnId: '10046', tier: 'A' },
    { id: 8, name: 'Webb Simpson', espnId: '1614', tier: 'A' },
    { id: 9, name: 'Daniel Berger', espnId: '9025', tier: 'A' },
    { id: 10, name: 'Patrick Cantlay', espnId: '6007', tier: 'A' },

    { id: 11, name: 'Hideki Matsuyama', espnId: '5860', tier: 'B' },
    { id: 12, name: 'Jason Day', espnId: '1680', tier: 'B' },
    { id: 13, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 14, name: 'Tommy Fleetwood', espnId: '5539', tier: 'B' },
    { id: 15, name: 'Tony Finau', espnId: '2230', tier: 'B' },
    { id: 16, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 17, name: 'Tiger Woods', espnId: '462', tier: 'B' },
    { id: 18, name: 'Tyrrell Hatton', espnId: '5553', tier: 'B' },
    { id: 19, name: 'Justin Rose', espnId: '569', tier: 'B' },
    { id: 20, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'B' },
    { id: 21, name: 'Viktor Hovland', espnId: '4364873', tier: 'B' },
    { id: 22, name: 'Matthew Wolff', espnId: '4412121', tier: 'B' },
    { id: 23, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 24, name: 'Rickie Fowler', espnId: '3702', tier: 'B' },
    { id: 25, name: 'Brendon Todd', espnId: '3454', tier: 'B' },
    { id: 26, name: 'Gary Woodland', espnId: '3550', tier: 'B' },
    { id: 27, name: 'Harris English', espnId: '5408', tier: 'B' },
    { id: 28, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 29, name: 'Shane Lowry', espnId: '4587', tier: 'B' },
    { id: 30, name: 'Sungjae Im', espnId: '11382', tier: 'B' },

    { id: 31, name: 'Abraham Ancer', espnId: '9261', tier: 'C' },
    { id: 32, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 33, name: 'Martin Kaymer', espnId: '3670', tier: 'C' },
    { id: 34, name: 'Phil Mickelson', espnId: '308', tier: 'C' },
    { id: 35, name: 'Cameron Champ', espnId: '11098', tier: 'C' },
    { id: 36, name: 'Joaquin Niemann', espnId: '11099', tier: 'C' },
    { id: 37, name: 'Jordan Spieth', espnId: '5467', tier: 'C' },
    { id: 38, name: 'Si Woo Kim', espnId: '7081', tier: 'C' },
    { id: 39, name: 'Billy Horschel', espnId: '1651', tier: 'C' },
    { id: 40, name: 'Bubba Watson', espnId: '780', tier: 'C' },
    { id: 41, name: 'Jason Kokrak', espnId: '3317', tier: 'C' },
    { id: 42, name: 'Matt Kuchar', espnId: '257', tier: 'C' },
    { id: 43, name: 'Rasmus Hojgaard', espnId: '11253', tier: 'C' },
    { id: 44, name: 'Sergio Garcia', espnId: '158', tier: 'C' },
    { id: 45, name: 'Will Zalatoris', espnId: '9877', tier: 'C' },
    { id: 46, name: 'Alexander Noren', espnId: '3832', tier: 'C' },
    { id: 47, name: 'Byeong-Hun An', espnId: '5285', tier: 'C' },
    { id: 48, name: 'Cameron Smith', espnId: '9131', tier: 'C' },
    { id: 49, name: 'Chez Reavie', espnId: '769', tier: 'C' },
    { id: 50, name: 'Corey Conners', espnId: '9126', tier: 'C' },
    { id: 51, name: 'Henrik Stenson', espnId: '576', tier: 'C' },
    { id: 52, name: 'Ian Poulter', espnId: '619', tier: 'C' },
    { id: 53, name: 'Kevin Na', espnId: '318', tier: 'C' },
    { id: 54, name: 'Kevin Streelman', espnId: '1077', tier: 'C' },
    { id: 55, name: 'Mackenzie Hughes', espnId: '6931', tier: 'C' },
    { id: 56, name: 'Ryan Palmer', espnId: '962', tier: 'C' },
    { id: 57, name: 'Sebastian Munoz', espnId: '10404', tier: 'C' },
    { id: 58, name: 'Thomas Pieters', espnId: '9031', tier: 'C' },

    { id: 59, name: 'Bernd Wiesberger', espnId: '4317', tier: 'D' },
    { id: 60, name: 'Brandon Wu', espnId: '4355673', tier: 'D' },
    { id: 61, name: 'Brandt Snedeker', espnId: '1222', tier: 'D' },
    { id: 62, name: 'Brian Harman', espnId: '1225', tier: 'D' },
    { id: 63, name: 'Charles Howell III', espnId: '208', tier: 'D' },
    { id: 64, name: 'Christiaan Bezuidenhout', espnId: '9243', tier: 'D' },
    { id: 65, name: 'Danny Willett', espnId: '4304', tier: 'D' },
    { id: 66, name: 'Erik van Rooyen', espnId: '9364', tier: 'D' },
    { id: 67, name: 'Joel Dahmen', espnId: '6196', tier: 'D' },
    { id: 68, name: 'Keegan Bradley', espnId: '4513', tier: 'D' },
    { id: 69, name: 'Lanto Griffin', espnId: '5962', tier: 'D' },
    { id: 70, name: 'Lee Westwood', espnId: '455', tier: 'D' },
    { id: 71, name: 'Marc Leishman', espnId: '3351', tier: 'D' },
    { id: 72, name: 'Matt Wallace', espnId: '10548', tier: 'D' },
    { id: 73, name: 'Matthias Schwab', espnId: '5729', tier: 'D' },
    { id: 74, name: 'Tom Lewis', espnId: '5868', tier: 'D' },
    { id: 75, name: 'Zach Johnson', espnId: '686', tier: 'D' },
    { id: 76, name: 'Adam Hadwin', espnId: '5548', tier: 'D' },
    { id: 77, name: 'Andy Sullivan', espnId: '5956', tier: 'D' },
    { id: 78, name: 'Mark Hubbard', espnId: '9143', tier: 'D' },
    { id: 79, name: 'Max Homa', espnId: '8973', tier: 'D' },
    { id: 80, name: 'Michael Thompson', espnId: '3688', tier: 'D' },
    { id: 81, name: 'Thomas Detry', espnId: '4837', tier: 'D' },
    { id: 82, name: 'Adam Long', espnId: '6015', tier: 'D' },
    { id: 83, name: 'Danny Lee', espnId: '3950', tier: 'D' },
    { id: 84, name: 'Graeme McDowell', espnId: '301', tier: 'D' },
    { id: 85, name: 'J.T. Poston', espnId: '10505', tier: 'D' },
    { id: 86, name: 'Justin Harding', espnId: '5825', tier: 'D' },
    { id: 87, name: 'Lucas Glover', espnId: '676', tier: 'D' },
    { id: 88, name: 'Mike Lorenzo-Vera', espnId: '4272', tier: 'D' },
    { id: 89, name: 'Paul Waring', espnId: '3474', tier: 'D' },
    { id: 90, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'D' },
    { id: 91, name: 'Robert MacIntyre', espnId: '11378', tier: 'D' },
    { id: 92, name: 'Romain Langasque', espnId: '10099', tier: 'D' },
    { id: 93, name: 'Sami Valimaki', espnId: '4585548', tier: 'D' },
    { id: 94, name: 'Victor Perez', espnId: '11340', tier: 'D' },
    { id: 95, name: 'Adrian Otaegui', espnId: '5965', tier: 'D' },
    { id: 96, name: 'Andrew Putnam', espnId: '5502', tier: 'D' },
    { id: 97, name: 'Chan Kim', espnId: '5724', tier: 'D' },
    { id: 98, name: 'Chesson Hadley', espnId: '5704', tier: 'D' },
    { id: 99, name: 'Connor Syme', espnId: '10983', tier: 'D' },
    { id: 100, name: 'Davis Riley', espnId: '10058', tier: 'D' },
    { id: 101, name: 'Eddie Pepperell', espnId: '6629', tier: 'D' },
    { id: 102, name: 'Jazz Janewattananond', espnId: '9413', tier: 'D' },
    { id: 103, name: 'Jim Herman', espnId: '3598', tier: 'D' },
    { id: 104, name: 'Jimmy Walker', espnId: '446', tier: 'D' },
    { id: 105, name: 'Kurt Kitayama', espnId: '10364', tier: 'D' },
    { id: 106, name: 'Lee Hodges', espnId: '4404991', tier: 'D' },
    { id: 107, name: 'Lucas Herbert', espnId: '10343', tier: 'D' },
    { id: 108, name: 'Matt Jones', espnId: '1367', tier: 'D' },
    { id: 109, name: 'Renato Paratore', espnId: '6979', tier: 'D' },
    { id: 110, name: 'Richy Werenski', espnId: '9804', tier: 'D' },
    { id: 111, name: 'Ryan Fox', espnId: '4251', tier: 'D' },
    { id: 112, name: 'Ryo Ishikawa', espnId: '4047', tier: 'D' },
    { id: 113, name: 'Shugo Imahira', espnId: '10630', tier: 'D' },
    { id: 114, name: 'Steve Stricker', espnId: '412', tier: 'D' },
    { id: 115, name: 'Sung Kang', espnId: '4449', tier: 'D' },
    { id: 116, name: 'Takumi Kanaya', espnId: '4410612', tier: 'D' },
    { id: 117, name: 'Taylor Pendrith', espnId: '9658', tier: 'D' },
    { id: 118, name: 'Troy Merritt', espnId: '3970', tier: 'D' },
    { id: 119, name: 'Tyler Duncan', espnId: '9569', tier: 'D' },
    { id: 120, name: 'Chun An Yu', espnId: '4349547', tier: 'D' },
    { id: 121, name: 'Cole Hammer', espnId: '10047', tier: 'D' },
    { id: 122, name: 'Curtis Luck', espnId: '10910', tier: 'D' },
    { id: 123, name: 'Davis Thompson', espnId: '4602218', tier: 'D' },
    { id: 124, name: 'Greyson Sigg', espnId: '11333', tier: 'D' },
    { id: 125, name: 'Stephan Jaeger', espnId: '6937', tier: 'D' },
    { id: 126, name: 'Andy Ogletree', espnId: '4683804', tier: 'D' },
    { id: 127, name: 'Daniel McCarthy', espnId: '2683', tier: 'D' },
    { id: 128, name: 'Eduard Rousaud', espnId: '4690741', tier: 'D' },
    { id: 129, name: 'J.C. Ritchie', espnId: '9374', tier: 'D' },
    { id: 130, name: 'James Sugrue', espnId: '4566449', tier: 'D' },
    { id: 131, name: 'John Augenstein', espnId: '4421475', tier: 'D' },
    { id: 132, name: 'John Pak', espnId: '4691933', tier: 'D' },
    { id: 133, name: 'Lukas Michel', espnId: '4691932', tier: 'D' },
    { id: 134, name: 'Paul Barjon', espnId: '10831', tier: 'D' },
    { id: 135, name: 'Preston Summerhays', espnId: '4565481', tier: 'D' },
    { id: 136, name: 'Ricky Castillo', espnId: '4691931', tier: 'D' },
    { id: 137, name: 'Sandy Scott', espnId: '11149', tier: 'D' },
    { id: 138, name: 'Scott Hend', espnId: '1178', tier: 'D' },
    { id: 139, name: 'Shaun Norris', espnId: '5057', tier: 'D' },
    { id: 140, name: 'Marty Jertson', espnId: '5769', tier: 'D' },
    { id: 141, name: 'Ryan Vermeer', espnId: '3284', tier: 'D' },
    { id: 142, name: 'Danny Balin', espnId: '9381', tier: 'D' },
    { id: 143, name: 'Branden Grace', espnId: '4383', tier: 'D' },
    { id: 144, name: 'Rory Sabbatini', espnId: '377', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Tim Walker', entries: [[5, 11, 34, 75], [1, 12, 39, 61], [3, 26, 53, 62]] },
    { id: 2, name: 'Jake Ross', entries: [[1, 12, 37, 67], [4, 13, 34, 76], [3, 29, 31, 64]] },
    { id: 3, name: 'Matthew Kilianski', entries: [[1, 13, 36, 75], [6, 14, 52, 66], [4, 15, 58, 110]] },
    { id: 4, name: 'Evan Slavik', entries: [[1, 12, 50, 100], [2, 14, 34, 60], [7, 20, 38, 97]] },
    { id: 5, name: 'Max Marshall', entries: [[5, 25, 31, 69], [4, 12, 33, 87], [3, 14, 44, 67]] },
    { id: 6, name: 'Drew Serruto', entries: [[1, 13, 37, 65], [2, 11, 38, 68], [3, 14, 32, 70]] },
    { id: 7, name: 'Nate Heckmann', entries: [[4, 13, 39, 71], [3, 14, 32, 87], [9, 15, 31, 69]] },
    { id: 8, name: 'Taylor Rice', entries: [[1, 13, 32, 61], [3, 18, 33, 65], [5, 17, 38, 71]] },
    { id: 9, name: 'Brian Zwick', entries: [[1, 27, 52, 67], [2, 25, 34, 61], [4, 18, 49, 59]] },
    { id: 10, name: 'David Reger', entries: [[1, 12, 49, 70], [2, 18, 33, 87], [4, 13, 51, 68]] },
    { id: 11, name: 'Nick Royer', entries: [[1, 14, 43, 69], [1, 27, 49, 69], [10, 16, 41, 69]] },
    { id: 12, name: 'Kyle Bivenour', entries: [[1, 11, 37, 65], [2, 15, 53, 68], [1, 12, 32, 62]] },
    { id: 13, name: 'Will Alexander', entries: [[1, 17, 34, 61], [3, 22, 56, 65], [10, 24, 31, 68]] },
    { id: 14, name: 'Kevin', entries: [[1, 15, 34, 69], [2, 13, 31, 62], [6, 14, 36, 71]] },
    { id: 15, name: 'Duff', entries: [[1, 15, 44, 75], [3, 13, 38, 68], [4, 25, 39, 67]] },
    { id: 16, name: 'Cub', entries: [[1, 17, 31, 87], [1, 19, 32, 68], [1, 24, 52, 83]] },
    { id: 17, name: 'Bodacious', entries: [[2, 23, 50, 87], [4, 18, 54, 76], [5, 14, 49, 75]] },
    { id: 18, name: 'Kevin O\'Brien', entries: [[1, 14, 37, 76], [2, 15, 44, 65], [3, 22, 40, 70]] },
    { id: 19, name: 'Lorenzo Washington', entries: [[8, 13, 41, 75], [4, 14, 31, 71], [5, 15, 35, 114]] },
    { id: 20, name: 'Cocalis', entries: [[8, 12, 49, 66], [8, 15, 49, 75], [2, 25, 54, 79]] },
    { id: 21, name: 'David Prevo', entries: [[1, 15, 37, 65], [5, 12, 35, 75], [7, 17, 32, 68]] },
    { id: 22, name: 'Matt Weimer', entries: [[2, 12, 52, 70], [1, 16, 57, 62], [4, 15, 45, 69]] },
    { id: 23, name: 'T Drake', entries: [[3, 19, 31, 99], [1, 21, 58, 73], [3, 16, 31, 85]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };
