const tourneyTitle = 'The Open Championship';

const tourneyId = '401056547';

const golferData = [
    { id: 1, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 2, name: 'Brooks Koepka', espnId: '6798', tier: 'A' },
    { id: 3, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 4, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 5, name: 'Tiger Woods', espnId: '462', tier: 'A' },
    { id: 6, name: 'Justin Rose', espnId: '569', tier: 'A' },
    { id: 7, name: 'Francesco Molinari', espnId: '1483', tier: 'A' },
    { id: 8, name: 'Patrick Cantlay', espnId: '6007', tier: 'A' },
    { id: 9, name: 'Tommy Fleetwood', espnId: '5539', tier: 'A' },
    { id: 10, name: 'Xander Schauffele', espnId: '10140', tier: 'A' },

    { id: 11, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 12, name: 'Henrik Stenson', espnId: '576', tier: 'B' },
    { id: 13, name: 'Justin Thomas', espnId: '4848', tier: 'B' },
    { id: 14, name: 'Rickie Fowler', espnId: '3702', tier: 'B' },
    { id: 15, name: 'Jordan Spieth', espnId: '5467', tier: 'B' },
    { id: 16, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 17, name: 'Bryson DeChambeau', espnId: '10046', tier: 'B' },
    { id: 18, name: 'Hideki Matsuyama', espnId: '5860', tier: 'B' },
    { id: 19, name: 'Jason Day', espnId: '1680', tier: 'B' },
    { id: 20, name: 'Matt Wallace', espnId: '10548', tier: 'B' },
    { id: 21, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 22, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 23, name: 'Bernd Wiesberger', espnId: '4317', tier: 'B' },
    { id: 24, name: 'Gary Woodland', espnId: '3550', tier: 'B' },
    { id: 25, name: 'Graeme McDowell', espnId: '301', tier: 'B' },
    { id: 26, name: 'Marc Leishman', espnId: '3351', tier: 'B' },
    { id: 27, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'B' },
    { id: 28, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'B' },
    { id: 29, name: 'Shane Lowry', espnId: '4587', tier: 'B' },
    { id: 30, name: 'Tony Finau', espnId: '2230', tier: 'B' },

    { id: 31, name: 'Eddie Pepperell', espnId: '6629', tier: 'C' },
    { id: 32, name: 'Ian Poulter', espnId: '619', tier: 'C' },
    { id: 33, name: 'Patrick Reed', espnId: '5579', tier: 'C' },
    { id: 34, name: 'Sergio Garcia', espnId: '158', tier: 'C' },
    { id: 35, name: 'Tyrrell Hatton', espnId: '5553', tier: 'C' },
    { id: 36, name: 'Webb Simpson', espnId: '1614', tier: 'C' },
    { id: 37, name: 'Erik van Rooyen', espnId: '9364', tier: 'C' },
    { id: 38, name: 'Phil Mickelson', espnId: '308', tier: 'C' },
    { id: 39, name: 'Danny Willett', espnId: '4304', tier: 'C' },
    { id: 40, name: 'Li Haotong', espnId: '5934', tier: 'C' },
    { id: 41, name: 'Lee Westwood', espnId: '455', tier: 'C' },
    { id: 42, name: 'Thorbjorn Olesen', espnId: '5140', tier: 'C' },
    { id: 43, name: 'Alexander Noren', espnId: '3832', tier: 'C' },
    { id: 44, name: 'Andy Sullivan', espnId: '5956', tier: 'C' },
    { id: 45, name: 'Billy Horschel', espnId: '1651', tier: 'C' },
    { id: 46, name: 'Branden Grace', espnId: '4383', tier: 'C' },
    { id: 47, name: 'Brandt Snedeker', espnId: '1222', tier: 'C' },
    { id: 48, name: 'Brian Harman', espnId: '1225', tier: 'C' },
    { id: 49, name: 'Chez Reavie', espnId: '769', tier: 'C' },
    { id: 50, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 51, name: 'Aaron Wise', espnId: '10577', tier: 'C' },
    { id: 52, name: 'Abraham Ancer', espnId: '9261', tier: 'C' },
    { id: 53, name: 'Andrew Putnam', espnId: '5502', tier: 'C' },
    { id: 54, name: 'Bubba Watson', espnId: '780', tier: 'C' },
    { id: 55, name: 'Byeong-Hun An', espnId: '5285', tier: 'C' },
    { id: 56, name: 'Dylan Frittelli', espnId: '5167', tier: 'C' },
    { id: 57, name: 'Emiliano Grillo', espnId: '5882', tier: 'C' },
    { id: 58, name: 'Joaquin Niemann', espnId: '11099', tier: 'C' },
    { id: 59, name: 'Keegan Bradley', espnId: '4513', tier: 'C' },
    { id: 60, name: 'Padraig Harrington', espnId: '186', tier: 'C' },
    { id: 61, name: 'Robert MacIntyre', espnId: '11378', tier: 'C' },
    { id: 62, name: 'Russell Knox', espnId: '4483', tier: 'C' },
    { id: 63, name: 'Sung-jae Im', espnId: '11382', tier: 'C' },
    { id: 64, name: 'Thomas Pieters', espnId: '9031', tier: 'C' },
    { id: 65, name: 'Zach Johnson', espnId: '686', tier: 'C' },

    { id: 66, name: 'Adam Hadwin', espnId: '5548', tier: 'D' },
    { id: 67, name: 'Andrea Pavan', espnId: '5423', tier: 'D' },
    { id: 68, name: 'Andrew Johnston', espnId: '5838', tier: 'D' },
    { id: 69, name: 'Cameron Smith', espnId: '9131', tier: 'D' },
    { id: 70, name: 'Jason Kokrak', espnId: '3317', tier: 'D' },
    { id: 71, name: 'Jim Furyk', espnId: '153', tier: 'D' },
    { id: 72, name: 'Jorge Campillo', espnId: '4691', tier: 'D' },
    { id: 73, name: 'Kevin Streelman', espnId: '1077', tier: 'D' },
    { id: 74, name: 'Lucas Bjerregaard', espnId: '9575', tier: 'D' },
    { id: 75, name: 'Lucas Glover', espnId: '676', tier: 'D' },
    { id: 76, name: 'Mike Lorenzo-Vera', espnId: '4272', tier: 'D' },
    { id: 77, name: 'Brandon Stone', espnId: '6280', tier: 'D' },
    { id: 78, name: 'Charley Hoffman', espnId: '205', tier: 'D' },
    { id: 79, name: 'Christiaan Bezuidenhout', espnId: '9243', tier: 'D' },
    { id: 80, name: 'Jazz Janewattananond', espnId: '9413', tier: 'D' },
    { id: 81, name: 'Joost Luiten', espnId: '4831', tier: 'D' },
    { id: 82, name: 'Justin Harding', espnId: '5825', tier: 'D' },
    { id: 83, name: 'Keith Mitchell', espnId: '8906', tier: 'D' },
    { id: 84, name: 'Kiradech Aphibarnrat', espnId: '5771', tier: 'D' },
    { id: 85, name: 'Kyle Stanley', espnId: '1778', tier: 'D' },
    { id: 86, name: 'Luke List', espnId: '1059', tier: 'D' },
    { id: 87, name: 'Oliver Wilson', espnId: '1506', tier: 'D' },
    { id: 88, name: 'Paul Waring', espnId: '3474', tier: 'D' },
    { id: 89, name: 'Robert Rock', espnId: '1494', tier: 'D' },
    { id: 90, name: 'Romain Langasque', espnId: '10099', tier: 'D' },
    { id: 91, name: 'Rory Sabbatini', espnId: '377', tier: 'D' },
    { id: 92, name: 'Ryan Fox', espnId: '4251', tier: 'D' },
    { id: 93, name: 'Ryan Palmer', espnId: '962', tier: 'D' },
    { id: 94, name: 'Si Woo Kim', espnId: '7081', tier: 'D' },
    { id: 95, name: 'Sung Kang', espnId: '4449', tier: 'D' },
    { id: 96, name: 'Tom Lewis', espnId: '5868', tier: 'D' },
    { id: 97, name: 'Adri Arnaus', espnId: '11350', tier: 'D' },
    { id: 98, name: 'Adrian Otaegui', espnId: '5965', tier: 'D' },
    { id: 99, name: 'Alexander Bjork', espnId: '9469', tier: 'D' },
    { id: 100, name: 'Alexander Levy', espnId: '6041', tier: 'D' },
    { id: 101, name: 'Benjamin Hebert', espnId: '3824', tier: 'D' },
    { id: 102, name: 'Brandon Wu', espnId: '4355673', tier: 'D' },
    { id: 103, name: 'C.T. Pan', espnId: '6017', tier: 'D' },
    { id: 104, name: 'Chris Wood', espnId: '3839', tier: 'D' },
    { id: 105, name: 'Corey Conners', espnId: '9126', tier: 'D' },
    { id: 106, name: 'J.B. Holmes', espnId: '1067', tier: 'D' },
    { id: 107, name: 'Jimmy Walker', espnId: '446', tier: 'D' },
    { id: 108, name: 'Mikko Korhonen', espnId: '4374', tier: 'D' },
    { id: 109, name: 'Callum Shinkwin', espnId: '9258', tier: 'D' },
    { id: 110, name: 'Chan Kim', espnId: '5724', tier: 'D' },
    { id: 111, name: 'Connor Syme', espnId: '10983', tier: 'D' },
    { id: 112, name: 'Darren Clarke', espnId: '82', tier: 'D' },
    { id: 113, name: 'David Lipsky', espnId: '6701', tier: 'D' },
    { id: 114, name: 'Doc Redman', espnId: '11448', tier: 'D' },
    { id: 115, name: 'Ernie Els', espnId: '123', tier: 'D' },
    { id: 116, name: 'Joel Dahmen', espnId: '6196', tier: 'D' },
    { id: 117, name: 'Kurt Kitayama', espnId: '10364', tier: 'D' },
    { id: 118, name: 'Nate Lashley', espnId: '1600', tier: 'D' },
    { id: 119, name: 'Nino Bertasio', espnId: '4573', tier: 'D' },
    { id: 120, name: 'Patton Kizzire', espnId: '3980', tier: 'D' },
    { id: 121, name: 'Prom Meesawat', espnId: '1780', tier: 'D' },
    { id: 122, name: 'Richard Sterne', espnId: '1499', tier: 'D' },
    { id: 123, name: 'Shugo Imahira', espnId: '10630', tier: 'D' },
    { id: 124, name: 'Zander Lombard', espnId: '7056', tier: 'D' },
    { id: 125, name: 'Sang-hyun Park', espnId: '5327', tier: 'D' },
    { id: 126, name: 'Shaun Norris', espnId: '5057', tier: 'D' },
    { id: 127, name: 'Shubhankar Sharma', espnId: '9888', tier: 'D' },
    { id: 128, name: 'Stewart Cink', espnId: '78', tier: 'D' },
    { id: 129, name: 'Takumi Kanaya', espnId: '4410612', tier: 'D' },
    { id: 130, name: 'Yuta Ikeda', espnId: '4712', tier: 'D' },
    { id: 131, name: 'Andrew Wilson', espnId: '5085', tier: 'D' },
    { id: 132, name: 'Ashton Turner', espnId: '4357759', tier: 'D' },
    { id: 133, name: 'Austin Connelly', espnId: '10017', tier: 'D' },
    { id: 134, name: 'Curtis Knipes', espnId: '4566630', tier: 'D' },
    { id: 135, name: 'David Duval', espnId: '115', tier: 'D' },
    { id: 136, name: 'Dimitrios Papadatos', espnId: '9197', tier: 'D' },
    { id: 137, name: 'Dong-Kyu Jang', espnId: '5357', tier: 'D' },
    { id: 138, name: 'Doyeob Mun', espnId: '4396847', tier: 'D' },
    { id: 139, name: 'Garrick Porteous', espnId: '9028', tier: 'D' },
    { id: 140, name: 'Gunn Charoenkul', espnId: '7047', tier: 'D' },
    { id: 141, name: 'Inn-choon Hwang', espnId: '4961', tier: 'D' },
    { id: 142, name: 'Isidro Benitez', espnId: '4566424', tier: 'D' },
    { id: 143, name: 'Jack Senior', espnId: '6221', tier: 'D' },
    { id: 144, name: 'Jake McLeod', espnId: '10336', tier: 'D' },
    { id: 145, name: 'James Sugrue', espnId: '4566449', tier: 'D' },
    { id: 146, name: 'Matthias Schmid', espnId: '4566443', tier: 'D' },
    { id: 147, name: 'Miguel Angel Jimenez', espnId: '224', tier: 'D' },
    { id: 148, name: 'Mikumu Horikawa', espnId: '4425900', tier: 'D' },
    { id: 149, name: 'Paul Lawrie', espnId: '265', tier: 'D' },
    { id: 150, name: 'Sam Locke', espnId: '4358737', tier: 'D' },
    { id: 151, name: 'Thomas Thurloway', espnId: '4566456', tier: 'D' },
    { id: 152, name: 'Tom Lehman', espnId: '268', tier: 'D' },
    { id: 153, name: 'Yoshinori Fujimoto', espnId: '6845', tier: 'D' },
    { id: 154, name: 'Yosuke Asaji', espnId: '4566423', tier: 'D' },
    { id: 155, name: 'Yuki Inamori', espnId: '4399256', tier: 'D' },
    { id: 156, name: 'Matthew Baldwin', espnId: '5832', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Alex Duff', entries: [[1, 11, 32, 71], [2, 12, 31, 66], [6, 25, 46, 89]] },
    { id: 2, name: 'Brett Kub', entries: [[2, 13, 34, 106], [2, 15, 33, 66], [2, 19, 32, 66]] },
    { id: 3, name: 'Cameron Weimer', entries: [[5, 15, 58, 78], [2, 16, 37, 66], [9, 11, 35, 81]] },
    { id: 4, name: 'Curtis Chapin', entries: [[9, 14, 32, 66], [1, 12, 33, 71], [2, 11, 34, 72]] },
    { id: 5, name: 'Dan Godshall', entries: [[2, 11, 32, 71], [2, 12, 34, 80], [2, 11, 31, 80]] },
    { id: 6, name: 'Dave Fleming', entries: [[9, 11, 50, 66], [6, 21, 59, 84], [1, 17, 31, 78]] },
    { id: 7, name: 'Drew Serruto', entries: [[1, 14, 32, 78], [2, 12, 32, 79], [2, 15, 38, 78]] },
    { id: 8, name: 'Ian Horwich', entries: [[3, 12, 41, 78], [2, 14, 35, 71], [1, 13, 33, 85]] },
    { id: 9, name: 'Kevin Donoher', entries: [[2, 11, 38, 80], [1, 26, 31, 68], [4, 28, 34, 84]] },
    { id: 10, name: 'Kevin O\'Brien', entries: [[2, 19, 34, 69], [1, 14, 33, 78], [7, 15, 32, 74]] },
    { id: 11, name: 'Kub', entries: [[2, 14, 32, 75], [2, 12, 57, 71], [2, 13, 50, 84]] },
    { id: 12, name: 'Kyle Bivenour', entries: [[2, 14, 36, 78], [5, 15, 39, 75], [1, 13, 31, 66]] },
    { id: 13, name: 'Matt Weimer', entries: [[2, 15, 32, 71], [2, 18, 33, 68], [6, 11, 40, 78]] },
    { id: 14, name: 'Max Marshall', entries: [[2, 11, 36, 77], [4, 16, 32, 73], [8, 13, 50, 75]] },
    { id: 15, name: 'Nick Cocalis', entries: [[1, 12, 37, 80], [1, 11, 44, 105], [2, 12, 45, 80]] },
    { id: 16, name: 'Rob Stoecklein', entries: [[2, 14, 33, 66], [2, 11, 38, 66], [1, 14, 33, 68]] },
    { id: 17, name: 'Ryan Boudouris', entries: [[1, 29, 31, 69], [2, 15, 38, 66], [6, 11, 31, 89]] },
    { id: 18, name: 'Tim Cableck', entries: [[1, 13, 32, 71], [2, 20, 36, 66], [5, 17, 54, 73]] },
    { id: 19, name: 'Tony Boyle', entries: [[2, 19, 35, 66], [1, 11, 34, 102], [3, 20, 49, 79]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };
