const tourneyTitle = 'PGA Championship';

const tourneyId = '401056552';

const golferData = [
    { id: 1, name: 'Dustin Johnson', espnId: '3448', tier: 'A' },
    { id: 2, name: 'Brooks Koepka', espnId: '6798', tier: 'A' },
    { id: 3, name: 'Rory McIlroy', espnId: '3470', tier: 'A' },
    { id: 4, name: 'Tiger Woods', espnId: '462', tier: 'A' },
    { id: 5, name: 'Rickie Fowler', espnId: '3702', tier: 'A' },
    { id: 6, name: 'Jon Rahm', espnId: '9780', tier: 'A' },
    { id: 7, name: 'Justin Rose', espnId: '569', tier: 'A' },
    { id: 8, name: 'Jason Day', espnId: '1680', tier: 'A' },
    { id: 9, name: 'Francesco Molinari', espnId: '1483', tier: 'A' },
    { id: 10, name: 'Xander Schauffele', espnId: '10140', tier: 'A' },

    { id: 11, name: 'Tommy Fleetwood', espnId: '5539', tier: 'B' },
    { id: 12, name: 'Tony Finau', espnId: '2230', tier: 'B' },
    { id: 13, name: 'Bryson DeChambeau', espnId: '10046', tier: 'B' },
    { id: 14, name: 'Hideki Matsuyama', espnId: '5860', tier: 'B' },
    { id: 15, name: 'Jordan Spieth', espnId: '5467', tier: 'B' },
    { id: 16, name: 'Patrick Cantlay', espnId: '6007', tier: 'B' },
    { id: 17, name: 'Sergio Garcia', espnId: '158', tier: 'B' },
    { id: 18, name: 'Matt Kuchar', espnId: '257', tier: 'B' },
    { id: 19, name: 'Adam Scott', espnId: '388', tier: 'B' },
    { id: 20, name: 'Bubba Watson', espnId: '780', tier: 'B' },
    { id: 21, name: 'Paul Casey', espnId: '72', tier: 'B' },
    { id: 22, name: 'Gary Woodland', espnId: '3550', tier: 'B' },
    { id: 23, name: 'Henrik Stenson', espnId: '576', tier: 'B' },
    { id: 24, name: 'Louis Oosthuizen', espnId: '1293', tier: 'B' },
    { id: 25, name: 'Marc Leishman', espnId: '3351', tier: 'B' },
    { id: 26, name: 'Patrick Reed', espnId: '5579', tier: 'B' },
    { id: 27, name: 'Phil Mickelson', espnId: '308', tier: 'B' },
    { id: 28, name: 'Webb Simpson', espnId: '1614', tier: 'B' },
    { id: 29, name: 'Ian Poulter', espnId: '619', tier: 'B' },

    { id: 30, name: 'Jason Kokrak', espnId: '3317', tier: 'C' },
    { id: 31, name: 'Kevin Kisner', espnId: '2552', tier: 'C' },
    { id: 32, name: 'Rafael Cabrera Bello', espnId: '4321', tier: 'C' },
    { id: 33, name: 'Aaron Wise', espnId: '10577', tier: 'C' },
    { id: 34, name: 'Branden Grace', espnId: '4383', tier: 'C' },
    { id: 35, name: 'Cameron Smith', espnId: '9131', tier: 'C' },
    { id: 36, name: 'Charley Hoffman', espnId: '205', tier: 'C' },
    { id: 37, name: 'Li Haotong', espnId: '5934', tier: 'C' },
    { id: 38, name: 'Jhonattan Vegas', espnId: '1030', tier: 'C' },
    { id: 39, name: 'Keith Mitchell', espnId: '8906', tier: 'C' },
    { id: 40, name: 'Lucas Glover', espnId: '676', tier: 'C' },
    { id: 41, name: 'Matt Wallace', espnId: '10548', tier: 'C' },
    { id: 42, name: 'Matthew Fitzpatrick', espnId: '9037', tier: 'C' },
    { id: 43, name: 'Ryan Moore', espnId: '809', tier: 'C' },
    { id: 44, name: 'Scott Piercy', espnId: '1037', tier: 'C' },
    { id: 45, name: 'Alexander Noren', espnId: '3832', tier: 'C' },
    { id: 46, name: 'Billy Horschel', espnId: '1651', tier: 'C' },
    { id: 47, name: 'Brandt Snedeker', espnId: '1222', tier: 'C' },
    { id: 48, name: 'Byeong-Hun An', espnId: '5285', tier: 'C' },
    { id: 49, name: 'C.T. Pan', espnId: '6017', tier: 'C' },
    { id: 50, name: 'Charles Howell III', espnId: '208', tier: 'C' },
    { id: 51, name: 'Daniel Berger', espnId: '9025', tier: 'C' },
    { id: 52, name: 'Eddie Pepperell', espnId: '6629', tier: 'C' },
    { id: 53, name: 'Emiliano Grillo', espnId: '5882', tier: 'C' },
    { id: 54, name: 'Graeme McDowell', espnId: '301', tier: 'C' },
    { id: 55, name: 'Jim Furyk', espnId: '153', tier: 'C' },
    { id: 56, name: 'Joel Dahmen', espnId: '6196', tier: 'C' },
    { id: 57, name: 'Keegan Bradley', espnId: '4513', tier: 'C' },
    { id: 58, name: 'Lucas Bjerregaard', espnId: '9575', tier: 'C' },
    { id: 59, name: 'Martin Kaymer', espnId: '3670', tier: 'C' },
    { id: 60, name: 'Pat Perez', espnId: '707', tier: 'C' },
    { id: 61, name: 'Ryan Palmer', espnId: '962', tier: 'C' },
    { id: 62, name: 'Shane Lowry', espnId: '4587', tier: 'C' },
    { id: 63, name: 'Si Woo Kim', espnId: '7081', tier: 'C' },
    { id: 64, name: 'Sung Kang', espnId: '4449', tier: 'C' },
    { id: 65, name: 'Sung-jae Im', espnId: '11382', tier: 'C' },
    { id: 66, name: 'Thomas Pieters', espnId: '9031', tier: 'C' },
    { id: 67, name: 'Tyrrell Hatton', espnId: '5553', tier: 'C' },
    { id: 68, name: 'Zach Johnson', espnId: '686', tier: 'C' },
    { id: 69, name: 'Abraham Ancer', espnId: '9261', tier: 'C' },
    { id: 70, name: 'Chez Reavie', espnId: '769', tier: 'C' },
    { id: 71, name: 'Corey Conners', espnId: '9126', tier: 'C' },
    { id: 72, name: 'J.B. Holmes', espnId: '1067', tier: 'C' },
    { id: 73, name: 'Jason Dufner', espnId: '110', tier: 'C' },
    { id: 74, name: 'Joost Luiten', espnId: '4831', tier: 'C' },
    { id: 75, name: 'Jorge Campillo', espnId: '4691', tier: 'C' },
    { id: 76, name: 'Julian Suri', espnId: '10195', tier: 'C' },
    { id: 77, name: 'Justin Harding', espnId: '5825', tier: 'C' },
    { id: 78, name: 'Kevin Na', espnId: '318', tier: 'C' },
    { id: 79, name: 'Kyle Stanley', espnId: '1778', tier: 'C' },
    { id: 80, name: 'Lee Westwood', espnId: '455', tier: 'C' },
    { id: 81, name: 'Luke List', espnId: '1059', tier: 'C' },
    { id: 82, name: 'Max Homa', espnId: '8973', tier: 'C' },
    { id: 83, name: 'Russell Knox', espnId: '4483', tier: 'C' },
    { id: 84, name: 'Thorbjorn Olesen', espnId: '5140', tier: 'C' },

    { id: 85, name: 'Adam Hadwin', espnId: '5548', tier: 'D' },
    { id: 86, name: 'Andrew Putnam', espnId: '5502', tier: 'D' },
    { id: 87, name: 'Brian Harman', espnId: '1225', tier: 'D' },
    { id: 88, name: 'Cameron Champ', espnId: '11098', tier: 'D' },
    { id: 89, name: 'David Lipsky', espnId: '6701', tier: 'D' },
    { id: 90, name: 'Erik van Rooyen', espnId: '9364', tier: 'D' },
    { id: 91, name: 'J.J. Spaun', espnId: '10166', tier: 'D' },
    { id: 92, name: 'Jimmy Walker', espnId: '446', tier: 'D' },
    { id: 93, name: 'Joaquin Niemann', espnId: '11099', tier: 'D' },
    { id: 94, name: 'Kevin Tway', espnId: '3793', tier: 'D' },
    { id: 95, name: 'Kiradech Aphibarnrat', espnId: '5771', tier: 'D' },
    { id: 96, name: 'Michael Thompson', espnId: '3688', tier: 'D' },
    { id: 97, name: 'Tom Lewis', espnId: '5868', tier: 'D' },
    { id: 98, name: 'Beau Hossler', espnId: '6011', tier: 'D' },
    { id: 99, name: 'Chesson Hadley', espnId: '5704', tier: 'D' },
    { id: 100, name: 'Danny Willett', espnId: '4304', tier: 'D' },
    { id: 101, name: 'Dylan Frittelli', espnId: '5167', tier: 'D' },
    { id: 102, name: 'Lucas Herbert', espnId: '10343', tier: 'D' },
    { id: 103, name: 'Mike Lorenzo-Vera', espnId: '4272', tier: 'D' },
    { id: 104, name: 'Mikko Korhonen', espnId: '4374', tier: 'D' },
    { id: 105, name: 'Richard Sterne', espnId: '1499', tier: 'D' },
    { id: 106, name: 'Ross Fisher', espnId: '3462', tier: 'D' },
    { id: 107, name: 'Ryan Fox', espnId: '4251', tier: 'D' },
    { id: 108, name: 'Sam Burns', espnId: '9938', tier: 'D' },
    { id: 109, name: 'Steve Stricker', espnId: '412', tier: 'D' },
    { id: 110, name: 'Troy Merritt', espnId: '3970', tier: 'D' },
    { id: 111, name: 'Brian Gay', espnId: '159', tier: 'D' },
    { id: 112, name: 'Danny Lee', espnId: '3950', tier: 'D' },
    { id: 113, name: 'Harold Varner III', espnId: '6991', tier: 'D' },
    { id: 114, name: 'Jazz Janewattananond', espnId: '9413', tier: 'D' },
    { id: 115, name: 'Adrian Otaegui', espnId: '5965', tier: 'D' },
    { id: 116, name: 'Kurt Kitayama', espnId: '10364', tier: 'D' },
    { id: 117, name: 'Padraig Harrington', espnId: '186', tier: 'D' },
    { id: 118, name: 'Patton Kizzire', espnId: '3980', tier: 'D' },
    { id: 119, name: 'Adam Long', espnId: '6015', tier: 'D' },
    { id: 120, name: 'Alexander Bjork', espnId: '9469', tier: 'D' },
    { id: 121, name: 'Brandon Stone', espnId: '6280', tier: 'D' },
    { id: 122, name: 'Brendan Jones', espnId: '1256', tier: 'D' },
    { id: 123, name: 'Bronson Burgoon', espnId: '1626', tier: 'D' },
    { id: 124, name: 'Michael Kim', espnId: '8974', tier: 'D' },
    { id: 125, name: 'Richy Werenski', espnId: '9804', tier: 'D' },
    { id: 126, name: 'Ryan Armour', espnId: '1750', tier: 'D' },
    { id: 127, name: 'Satoshi Kodaira', espnId: '9076', tier: 'D' },
    { id: 128, name: 'Shaun Norris', espnId: '5057', tier: 'D' },
    { id: 129, name: 'Shugo Imahira', espnId: '10630', tier: 'D' },
    { id: 130, name: 'Sung-jae Im', espnId: '11382', tier: 'D' },
    { id: 131, name: 'Y.E. Yang', espnId: '1350', tier: 'D' },
    { id: 132, name: 'John Daly', espnId: '97', tier: 'D' },
    { id: 133, name: 'Martin Trainer', espnId: '6151', tier: 'D' },
    { id: 134, name: 'Alex Beach', espnId: '11219', tier: 'D' },
    { id: 135, name: 'Andrew Filbert', espnId: '11431', tier: 'D' },
    { id: 136, name: 'Ben Cook', espnId: '4422368', tier: 'D' },
    { id: 137, name: 'Brian Mackey', espnId: '4422372', tier: 'D' },
    { id: 138, name: 'Casey Russell', espnId: '11022', tier: 'D' },
    { id: 139, name: 'Cory Schneider', espnId: '3307', tier: 'D' },
    { id: 140, name: 'Craig Bowden', espnId: '47', tier: 'D' },
    { id: 141, name: 'Craig Hocknull', espnId: '6608', tier: 'D' },
    { id: 142, name: 'Danny Balin', espnId: '9381', tier: 'D' },
    { id: 143, name: 'Jason Caron', espnId: '802', tier: 'D' },
    { id: 144, name: 'Jeffrey Schmid', espnId: '4422371', tier: 'D' },
    { id: 145, name: 'John O\'Leary', espnId: '3516', tier: 'D' },
    { id: 146, name: 'Justin Bertsch', espnId: '4420096', tier: 'D' },
    { id: 147, name: 'Marty Jertson', espnId: '5769', tier: 'D' },
    { id: 148, name: 'Rich Beem', espnId: '29', tier: 'D' },
    { id: 149, name: 'Rich Berberian Jr.', espnId: '10045', tier: 'D' },
    { id: 150, name: 'Rob Labritz', espnId: '259', tier: 'D' },
    { id: 151, name: 'Rod Perry', espnId: '667', tier: 'D' },
    { id: 152, name: 'Ryan Vermeer', espnId: '3284', tier: 'D' },
    { id: 153, name: 'Shaun Micheel', espnId: '307', tier: 'D' },
    { id: 154, name: 'Stuart Deane', espnId: '1630', tier: 'D' },
    { id: 155, name: 'Tyler Hall', espnId: '1562', tier: 'D' },
    { id: 156, name: 'Kelly Kraft', espnId: '6689', tier: 'D' }
];

const contestantData = [
    { id: 1, name: 'Matt Weimer', entries: [[2, 13, 30, 90], [4, 15, 31, 92], [5, 11, 30, 87]] },
    { id: 2, name: 'Kevin Donoher', entries: [[1, 13, 33, 88], [2, 12, 38, 98], [3, 11, 35, 93]] },
    { id: 3, name: 'Kyle Bivenour', entries: [[2, 12, 31, 89], [6, 15, 33, 85], [4, 11, 30, 88]] },
    { id: 4, name: 'Max Marshall', entries: [[2, 17, 44, 109], [5, 18, 55, 95], [1, 11, 60, 106]] },
    { id: 5, name: 'Alex Duff', entries: [[2, 12, 31, 111], [9, 11, 34, 88], [7, 18, 79, 118]] },
    { id: 6, name: 'Ryan Boudouris', entries: [[1, 12, 32, 92], [2, 11, 34, 95], [4, 13, 36, 92]] },
    { id: 7, name: 'Matt Kilanski', entries: [[1, 19, 33, 92], [8, 11, 36, 88], [2, 19, 71, 95]] },
    { id: 8, name: 'Andrew Kubaszewski', entries: [[2, 18, 31, 95], [4, 17, 38, 92], [5, 12, 39, 118]] },
    { id: 9, name: 'David Prevo', entries: [[2, 12, 32, 100], [4, 15, 52, 102], [1, 16, 42, 98]] },
    { id: 10, name: 'Cameron Weimer', entries: [[2, 12, 31, 98], [10, 23, 53, 112], [3, 24, 36, 150]] },
    { id: 11, name: 'Nick Royer', entries: [[9, 11, 31, 85], [10, 12, 35, 85], [1, 11, 34, 85]] },
    { id: 12, name: 'Drew Serruto', entries: [[2, 15, 36, 100], [4, 13, 42, 109], [5, 11, 31, 112]] },
    { id: 13, name: 'Steven Laake', entries: [[6, 23, 32, 88], [2, 11, 36, 92], [1, 12, 30, 99]] },
    { id: 14, name: 'Kevin O\'Brien', entries: [[2, 11, 47, 100], [8, 29, 31, 94], [10, 17, 53, 117]] }
];

export default { tourneyTitle, tourneyId, golferData, contestantData };
