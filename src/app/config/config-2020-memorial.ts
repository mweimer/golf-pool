const tourneyTitle = '2020 Memorial';

const tourneyId = '401155461';

const golferData = [
    { id: 1, name: 'Bryson DeChambeau', espnId: '10046', tier: 'A' },
    { id: 2, name: 'Justin Thomas', espnId: '4848', tier: 'A' },
    { id: 3, name: 'Patrick Cantlay', espnId: '6007', tier: 'A' },
    { id: 4, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 5, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 6, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 7, name: 'Brooks Koepka', espnId: '6798', tier: 'A' },
    { id: 8, name: 'Collin Morikawa', espnId: '10592', tier: 'A' },
    { id: 9, name: 'Tiger Woods', espnId: '462', tier: 'A' },
    { id: 10, name: 'Viktor Hovland', espnId: '4364873', tier: 'A' },

    { id: 11, name: 'Webb Simpson', espnId: '1614', tier: 'B' },
    { id: 12, name: 'Hideki Matsuyama', espnId: '5860', tier: 'B' },
    { id: 13, name: 'Xander Schauffele', espnId: '10140', tier: 'B' },
    { id: 14, name: 'Rickie Fowler', espnId: '3702', tier: 'B' },
    { id: 15, name: 'Abraham Ancer', espnId: '9261', tier: 'B' },
    { id: 16, name: 'Daniel Berger', espnId: '9025', tier: 'B' },
    { id: 17, name: 'Gary Woodland', espnId: '3550', tier: 'B' },
    { id: 18, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 19, name: 'Jason Day', espnId: '1680', tier: 'B' },
    { id: 20, name: 'Joaquin Niemann', espnId: '11099', tier: 'B' },
    { id: 21, name: 'Justin Rose', espnId: '569', tier: 'B' },
    { id: 22, name: 'Tony Finau', espnId: '2230', tier: 'B' },
    { id: 23, name: 'Jordan Spieth', espnId: '5467', tier: 'B' },
    { id: 24, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 25, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'B' },
    { id: 26, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 27, name: 'Sergio Garcia', espnId: '158', tier: 'B' },
    { id: 28, name: 'Sungjae Im', espnId: '11382', tier: 'B' },
    { id: 29, name: 'Marc Leishman', espnId: '3351', tier: 'B' },

    { id: 30, name: 'Adam Hadwin', espnId: '5548', tier: 'C' },
    { id: 31, name: 'Billy Horschel', espnId: '1651', tier: 'C' },
    { id: 32, name: 'Ian Poulter', espnId: '619', tier: 'C' },
    { id: 33, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 34, name: 'Kevin Streelman', espnId: '1077', tier: 'C' },
    { id: 35, name: 'Byeong-Hun An', espnId: '5285', tier: 'C' },
    { id: 36, name: 'Matthew Wolff', espnId: '4412121', tier: 'C' },
    { id: 37, name: 'Bubba Watson', espnId: '780', tier: 'C' },
    { id: 38, name: 'Cameron Champ', espnId: '11098', tier: 'C' },
    { id: 39, name: 'Corey Conners', espnId: '9126', tier: 'C' },
    { id: 40, name: 'Doc Redman', espnId: '11448', tier: 'C' },
    { id: 41, name: 'Harris English', espnId: '5408', tier: 'C' },
    { id: 42, name: 'Kevin Na', espnId: '318', tier: 'C' },
    { id: 43, name: 'Lucas Glover', espnId: '676', tier: 'C' },
    { id: 44, name: 'Phil Mickelson', espnId: '308', tier: 'C' },
    { id: 45, name: 'Rory Sabbatini', espnId: '377', tier: 'C' },
    { id: 46, name: 'Scottie Scheffler', espnId: '9478', tier: 'C' },
    { id: 47, name: 'Shane Lowry', espnId: '4587', tier: 'C' },
    { id: 48, name: 'Brendan Steele', espnId: '3596', tier: 'C' },
    { id: 49, name: 'Brendon Todd', espnId: '3454', tier: 'C' },
    { id: 50, name: 'Brian Harman', espnId: '1225', tier: 'C' },
    { id: 51, name: 'Christiaan Bezuidenhout', espnId: '9243', tier: 'C' },
    { id: 52, name: 'Danny Willett', espnId: '4304', tier: 'C' },
    { id: 53, name: 'Harold Varner III', espnId: '6991', tier: 'C' },
    { id: 54, name: 'J.T. Poston', espnId: '10505', tier: 'C' },
    { id: 55, name: 'Joel Dahmen', espnId: '6196', tier: 'C' },
    { id: 56, name: 'Keegan Bradley', espnId: '4513', tier: 'C' },
    { id: 57, name: 'Louis Oosthuizen', espnId: '1293', tier: 'C' },
    { id: 58, name: 'Matt Wallace', espnId: '10548', tier: 'C' },
    { id: 59, name: 'Max Homa', espnId: '8973', tier: 'C' },
    { id: 60, name: 'Patrick Rodgers', espnId: '6825', tier: 'C' },
    { id: 61, name: 'Sepp Straka', espnId: '8961', tier: 'C' },

    { id: 62, name: 'Alexander Noren', espnId: '3832', tier: 'D' },
    { id: 63, name: 'Bernd Wiesberger', espnId: '4317', tier: 'D' },
    { id: 64, name: 'Branden Grace', espnId: '4383', tier: 'D' },
    { id: 65, name: 'Chez Reavie', espnId: '769', tier: 'D' },
    { id: 66, name: 'Emiliano Grillo', espnId: '5882', tier: 'D' },
    { id: 67, name: 'Erik van Rooyen', espnId: '9364', tier: 'D' },
    { id: 68, name: 'Jason Kokrak', espnId: '3317', tier: 'D' },
    { id: 69, name: 'Lanto Griffin', espnId: '5962', tier: 'D' },
    { id: 70, name: 'Mackenzie Hughes', espnId: '6931', tier: 'D' },
    { id: 71, name: 'Mark Hubbard', espnId: '9143', tier: 'D' },
    { id: 72, name: 'Matthias Schwab', espnId: '5729', tier: 'D' },
    { id: 73, name: 'Maverick McNealy', espnId: '9530', tier: 'D' },
    { id: 74, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'D' },
    { id: 75, name: 'Ryan Moore', espnId: '809', tier: 'D' },
    { id: 76, name: 'Troy Merritt', espnId: '3970', tier: 'D' },
    { id: 77, name: 'Zach Johnson', espnId: '686', tier: 'D' },
    { id: 78, name: 'Andrew Landry', espnId: '4682', tier: 'D' },
    { id: 79, name: 'Brian Stuard', espnId: '3599', tier: 'D' },
    { id: 80, name: 'Bud Cauley', espnId: '5338', tier: 'D' },
    { id: 81, name: 'Cameron Smith', espnId: '9131', tier: 'D' },
    { id: 82, name: 'Charles Howell III', espnId: '208', tier: 'D' },
    { id: 83, name: 'Graeme McDowell', espnId: '301', tier: 'D' },
    { id: 84, name: 'Li Haotong', espnId: '5934', tier: 'D' },
    { id: 85, name: 'Henrik Norlander', espnId: '5573', tier: 'D' },
    { id: 86, name: 'Jason Dufner', espnId: '110', tier: 'D' },
    { id: 87, name: 'Jim Furyk', espnId: '153', tier: 'D' },
    { id: 88, name: 'Nick Taylor', espnId: '3792', tier: 'D' },
    { id: 89, name: 'Ryan Palmer', espnId: '962', tier: 'D' },
    { id: 90, name: 'Si Woo Kim', espnId: '7081', tier: 'D' },
    { id: 91, name: 'Talor Gooch', espnId: '9513', tier: 'D' },
    { id: 92, name: 'Tyler Duncan', espnId: '9569', tier: 'D' },
    { id: 93, name: 'Adam Long', espnId: '6015', tier: 'D' },
    { id: 94, name: 'Carlos Ortiz', espnId: '5532', tier: 'D' },
    { id: 95, name: 'Danny Lee', espnId: '3950', tier: 'D' },
    { id: 96, name: 'Dylan Frittelli', espnId: '5167', tier: 'D' },
    { id: 97, name: 'Harry Higgs', espnId: '4844', tier: 'D' },
    { id: 98, name: 'Matthew NeSmith', espnId: '6954', tier: 'D' },
    { id: 99, name: 'Scott Piercy', espnId: '1037', tier: 'D' },
    { id: 100, name: 'Sebastian Munoz', espnId: '10404', tier: 'D' },
    { id: 101, name: 'Tom Hoge', espnId: '6086', tier: 'D' },
    { id: 102, name: 'Wyndham Clark', espnId: '11119', tier: 'D' },
    { id: 103, name: 'Andrew Putnam', espnId: '5502', tier: 'D' },
    { id: 104, name: 'C.T. Pan', espnId: '6017', tier: 'D' },
    { id: 105, name: 'Charl Schwartzel', espnId: '1097', tier: 'D' },
    { id: 106, name: 'Jazz Janewattananond', espnId: '9413', tier: 'D' },
    { id: 107, name: 'Jimmy Walker', espnId: '446', tier: 'D' },
    { id: 108, name: 'Nate Lashley', espnId: '1600', tier: 'D' },
    { id: 109, name: 'Stewart Cink', espnId: '78', tier: 'D' },
    { id: 110, name: 'Sung Kang', espnId: '4449', tier: 'D' },
    { id: 111, name: 'Vaughn Taylor', espnId: '1185', tier: 'D' },
    { id: 112, name: 'Victor Perez', espnId: '11340', tier: 'D' },
    { id: 113, name: 'David Lingmerth', espnId: '5574', tier: 'D' },
    { id: 114, name: 'Denny McCarthy', espnId: '10054', tier: 'D' },
    { id: 115, name: 'Ernie Els', espnId: '123', tier: 'D' },
    { id: 116, name: 'Jason Scrivener', espnId: '4265', tier: 'D' },
    { id: 117, name: 'Keith Mitchell', espnId: '8906', tier: 'D' },
    { id: 118, name: 'Kevin Tway', espnId: '3793', tier: 'D' },
    { id: 119, name: 'Scott Harrington', espnId: '1210', tier: 'D' },
    { id: 120, name: 'Steve Stricker', espnId: '412', tier: 'D' },
    { id: 121, name: 'Xin-Jun Zhang', espnId: '4479', tier: 'D' },
    { id: 122, name: 'Zac Blair', espnId: '9040', tier: 'D' },
    { id: 123, name: 'Bo Hoag', espnId: '4780', tier: 'D' },
    { id: 124, name: 'William McGirt', espnId: '3532', tier: 'D' },
    { id: 125, name: 'Andy Ogletree', espnId: '4683804', tier: 'D' },
    { id: 126, name: 'Carl Pettersson', espnId: '856', tier: 'D' },
    { id: 127, name: 'Jim Herman', espnId: '3598', tier: 'D' },
    { id: 128, name: 'K.J. Choi', espnId: '77', tier: 'D' },
    { id: 129, name: 'Peter Kuest', espnId: '4684201', tier: 'D' },
    { id: 130, name: 'Vijay Singh', espnId: '392', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Curtis Chapin', entries: [[1, 13, 33, 87], [8, 11, 42, 77], [5, 23, 31, 123]] },
    { id: 2, name: 'Alex Duff', entries: [[2, 17, 32, 65], [1, 12, 34, 68], [3, 11, 30, 80]] },
    { id: 3, name: 'Chris Rose', entries: [[2, 29, 36, 67], [8, 28, 52, 66], [2, 13, 30, 66]] },
    { id: 4, name: 'Kili', entries: [[1, 22, 36, 77], [2, 18, 36, 77], [9, 13, 44, 77]] },
    { id: 5, name: 'Kaz', entries: [[7, 16, 33, 70], [1, 14, 39, 64], [5, 13, 44, 86]] },
    { id: 6, name: 'Kendall Kadish', entries: [[9, 22, 37, 96], [1, 14, 33, 62], [3, 21, 31, 70]] },
    { id: 7, name: 'Max Marshall', entries: [[1, 13, 31, 120], [4, 17, 34, 64], [2, 11, 34, 76]] },
    { id: 8, name: 'Matt Weimer', entries: [[2, 13, 34, 91], [1, 17, 35, 76], [8, 16, 32, 83]] },
    { id: 9, name: 'Ian H', entries: [[7, 14, 45, 73], [1, 12, 32, 87], [5, 22, 37, 84]] },
    { id: 10, name: 'Nate Heckmann', entries: [[4, 22, 45, 84], [7, 12, 34, 62], [2, 21, 47, 66]] },
    { id: 11, name: 'Ryan Romes', entries: [[9, 13, 48, 65], [1, 18, 42, 64], [2, 21, 31, 75]] },
    { id: 12, name: 'Lorenzo Washington', entries: [[1, 15, 32, 68], [6, 28, 33, 111], [10, 22, 31, 81]] },
    { id: 13, name: 'Don', entries: [[1, 13, 36, 80], [7, 22, 44, 76], [4, 19, 57, 90]] },
    { id: 14, name: 'Kub', entries: [[2, 22, 53, 96], [2, 22, 53, 96], [2, 22, 53, 96]] },
    { id: 15, name: 'Ryan', entries: [[1, 13, 36, 66], [9, 14, 35, 66], [7, 13, 42, 66]] },
    { id: 16, name: 'Sean Buckle', entries: [[1, 13, 31, 68], [3, 14, 33, 64], [2, 16, 35, 63]] },
    { id: 17, name: 'Kevin O\'Brien', entries: [[1, 13, 32, 90], [2, 19, 36, 64], [9, 21, 44, 77]] },
    { id: 18, name: 'Cameron Weimer', entries: [[2, 12, 30, 77], [8, 13, 32, 91], [3, 12, 47, 103]] },
    { id: 19, name: 'Ryan Aguiar', entries: [[1, 16, 34, 91], [3, 11, 30, 70], [2, 20, 39, 63]] }
];


export default { tourneyTitle, tourneyId, golferData, contestantData };
