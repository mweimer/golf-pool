/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';

export default function seedDatabaseIfNeeded () {
  if (config.seedDB) {
    let Golfer = sqldb.Golfer;
    let User = sqldb.User;
    let Tournament = sqldb.Tournament;
    let Entry = sqldb.Entry;

    Golfer.destroy({ where: {} })
      .then(() => {
        let golfers = Golfer.bulkCreate([
          { id: 1, name: 'Dustin Johnson', espnId: '3448' },
          { id: 2, name: 'Jordan Spieth', espnId: '5467' },
          { id: 3, name: 'Rickie Fowler', espnId: '3702' },
          { id: 4, name: 'Jon Rahm', espnId: '9780' },
          { id: 5, name: 'Sergio Garcia', espnId: '158' },
          { id: 6, name: 'Justin Rose', espnId: '569' },
          { id: 7, name: 'Rory McIlroy', espnId: '3470' },
          { id: 8, name: 'Hideki Matsuyama', espnId: '5860' },
          { id: 9, name: 'Tommy Fleetwood', espnId: '5539' },
          { id: 10, name: 'Henrik Stenson', espnId: '576' },
          { id: 11, name: 'Adam Scott', espnId: '388' },

          { id: 12, name: 'Brooks Koepka', espnId: '6798' },
          { id: 13, name: 'Jason Day', espnId: '1680' },
          { id: 14, name: 'Paul Casey', espnId: '72' },
          { id: 15, name: 'Alex Noren', espnId: '3832' },
          { id: 16, name: 'Phil Mickelson', espnId: '308' },
          { id: 17, name: 'Louis Oosthuizen', espnId: '1293' },
          { id: 18, name: 'Branden Grace', espnId: '4383' },
          { id: 19, name: 'Marc Leishman', espnId: '3351' },
          { id: 20, name: 'Justin Thomas', espnId: '4848' },
          { id: 21, name: 'Matt Kuchar', espnId: '257' },
          { id: 22, name: 'Thomas Pieters', espnId: '9031' },
          { id: 23, name: 'Padraig Harrington', espnId: '186' },
          { id: 24, name: 'Rafael Cabrera Bello', espnId: '4321' },
          { id: 25, name: 'Patrick Reed', espnId: '5579' },
          { id: 26, name: 'Shane Lowry', espnId: '4587' },
          { id: 27, name: 'Charl Schwartzel', espnId: '1097' },
          { id: 28, name: 'Brandt Snedeker', espnId: '' },
          { id: 29, name: 'Ian Poulter', espnId: '619' },
          { id: 30, name: 'Lee Westwood', espnId: '455' },
          { id: 31, name: 'Daniel Berger', espnId: '9025' },
          { id: 32, name: 'Matthew Fitzpatrick', espnId: '9037' },

          { id: 33, name: 'Andy Sullivan', espnId: '5956' },
          { id: 34, name: 'Ross Fisher', espnId: '3462' },
          { id: 35, name: 'Zach Johnson', espnId: '686' },
          { id: 36, name: 'Martin Kaymer', espnId: '3670' },
          { id: 37, name: 'Francesco Molinari', espnId: '1483' },
          { id: 38, name: 'Tyrrell Hatton', espnId: '5553' },
          { id: 39, name: 'Bernd Wiesberger', espnId: '4317' },
          { id: 40, name: 'Chris Wood', espnId: '3839' },
          { id: 41, name: 'Steve Stricker', espnId: '412' },
          { id: 42, name: 'Kevin Kisner', espnId: '2552' },
          { id: 43, name: 'Bill Haas', espnId: '774' },
          { id: 44, name: 'Brian Harman', espnId: '1225' },
          { id: 45, name: 'J.B. Holmes', espnId: '1067' },
          { id: 46, name: 'Jason Dufner', espnId: '110' },
          { id: 47, name: 'Soren Kjeldsen', espnId: '547' },
          { id: 48, name: 'Bryson DeChambeau', espnId: '10046' },
          { id: 49, name: 'Byeong Hun An', espnId: '5285' },
          { id: 50, name: 'Charley Hoffman', espnId: '205' },
          { id: 51, name: 'Peter Uihlein', espnId: '1674' },
          { id: 52, name: 'Russell Henley', espnId: '5409' },
          { id: 53, name: 'Thorbjorn Olesen', espnId: '5140' },
          { id: 54, name: 'Tony Finau', espnId: '2230' },
          { id: 55, name: 'Andrew Johnston', espnId: '5838' },
          { id: 56, name: 'Bubba Watson', espnId: '780' },
          { id: 57, name: 'Ryan Fox', espnId: '4251' },
          { id: 58, name: 'Brendan Steele', espnId: '3596' },
          { id: 59, name: 'Emiliano Grillo', espnId: '5882' },
          { id: 60, name: 'Hideto Tanihara', espnId: '1099' },
          { id: 61, name: 'Jimmy Walker', espnId: '446' },
          { id: 62, name: 'Kevin Chappell', espnId: '3857' },
          { id: 63, name: 'Kyle Stanley', espnId: '1778' },
          { id: 64, name: 'Si Woo Kim', espnId: '7081' },
          { id: 65, name: 'Charles Howell III', espnId: '208' },
          { id: 66, name: 'Martin Laird', espnId: '2571' },
          { id: 67, name: 'Webb Simpson', espnId: '1614' },
          { id: 68, name: 'Billy Horschel', espnId: '1651' },
          { id: 69, name: 'Xander Schauffele', espnId: '10140' },
          { id: 70, name: 'Adam Hadwin', espnId: '5548' },
          { id: 71, name: 'Richie Ramsay', espnId: '1782' },
          { id: 72, name: 'Russell Knox', espnId: '4483' },
          { id: 73, name: 'Joost Luiten', espnId: '4831' },

          { id: 74, name: 'Anirban Lahiri', espnId: '4989' },
          { id: 75, name: 'Gary Woodland', espnId: '3550' },
          { id: 76, name: 'Alexander Levy', espnId: '6041' },
          { id: 77, name: 'Callum Shinkwin', espnId: '9258' },
          { id: 78, name: 'Cameron Smith', espnId: '9131' },
          { id: 79, name: 'Jamie Lovemark', espnId: '1676' },
          { id: 80, name: 'Matthew Southgate', espnId: '5852' },
          { id: 81, name: 'Pat Perez', espnId: '707' },
          { id: 82, name: 'Ryan Moore', espnId: '809' },
          { id: 83, name: 'Stewart Cink', espnId: '78' },
          { id: 84, name: 'Wesley Bryan', espnId: '10360' },
          { id: 85, name: 'Pablo Larrazabal', espnId: '3829' },
          { id: 86, name: 'Robert Streb', espnId: '5619' },
          { id: 87, name: 'Sean O\'Hair', espnId: '1359' },
          { id: 88, name: 'Danny Willett', espnId: '4304' },
          { id: 89, name: 'Haotong Li', espnId: '5934' },
          { id: 90, name: 'William McGirt', espnId: '3532' },
          { id: 91, name: 'Dylan Frittelli', espnId: '5167' },
          { id: 92, name: 'Ernie Els', espnId: '123' },
          { id: 93, name: 'Fabrizio Zanotti', espnId: '1770' },
          { id: 94, name: 'Kevin Na', espnId: '318' },
          { id: 95, name: 'Brandon Stone', espnId: '6280' },
          { id: 96, name: 'Alexander Bjork', espnId: '9469' },
          { id: 97, name: 'Andrew Dodt', espnId: '3639' },
          { id: 98, name: 'David Horsey', espnId: '3825' },
          { id: 99, name: 'Sung-hoon Kang', espnId: '4449' },
          { id: 100, name: 'Thongchai Jaidee', espnId: '222' },
          { id: 101, name: 'Paul Waring', espnId: '3474' },
          { id: 102, name: 'Julian Suri', espnId: '10195' },
          { id: 103, name: 'David Drysdale', espnId: '1453' },
          { id: 104, name: 'David Lipsky', espnId: '6701' },
          { id: 105, name: 'Matthieu Pavon', espnId: '10596' },
          { id: 106, name: 'Richard Bland', espnId: '1441' },
          { id: 107, name: 'Scott Hend', espnId: '1178' },
          { id: 108, name: 'Jeunghun Wang', espnId: '9754' },
          { id: 109, name: 'Jhonattan Vegas', espnId: '1030' },
          { id: 110, name: 'Michael Lorenzo-Vera', espnId: '4272' },
          { id: 111, name: 'Roberto Castro', espnId: '3740' },
          { id: 112, name: 'Aaron Baddeley', espnId: '16' },
          { id: 113, name: 'Kyung-tae Kim', espnId: '8858' },
          { id: 114, name: 'Maverick McNealy', espnId: '9530' },
          { id: 115, name: 'Yusaku Miyazato', espnId: '978' },
          { id: 116, name: 'Paul Lawrie', espnId: '265' },
          { id: 117, name: 'Sebastian Munoz', espnId: '10404' },
          { id: 118, name: 'Shiv Kapur', espnId: '1583' },
          { id: 119, name: 'Austin Connelly', espnId: '10017' },
          { id: 120, name: 'Jbe\' Kruger', espnId: '4993' },
          { id: 121, name: 'Phachara Khongwatmai', espnId: '9852' },
          { id: 122, name: 'Prayad Marksaeng', espnId: '3687' },
          { id: 123, name: 'Young-han Song', espnId: '10422' },
          { id: 124, name: 'Yuta Ikeda', espnId: '4712' },
          { id: 125, name: 'Darren Fichardt', espnId: '868' },
          { id: 126, name: 'Mark Foster', espnId: '1087' },
          { id: 127, name: 'Mike Hendry', espnId: '4252' },
          { id: 128, name: 'Yi Keun Chang', espnId: '11175' },
          { id: 129, name: 'Tom Lehman', espnId: '268' },
          { id: 130, name: 'Adam Bland', espnId: '1688' },
          { id: 131, name: 'Alfie Plant', espnId: '11177' },
          { id: 132, name: 'Ashley Hall', espnId: '11176' },
          { id: 133, name: 'Chan Kim', espnId: '5724' },
          { id: 134, name: 'Connor Syme', espnId: '10983' },
          { id: 135, name: 'Gi-Whan Kim', espnId: '6706' },
          { id: 136, name: 'Harry Ellis', espnId: '11174' },
          { id: 137, name: 'Haydn McCullen', espnId: '11148' },
          { id: 138, name: 'John Daly', espnId: '97' },
          { id: 139, name: 'Kent Bulle', espnId: '6180' },
          { id: 140, name: 'Luca Cianchetti', espnId: '10227' },
          { id: 141, name: 'Matthew Griffin', espnId: '4219' },
          { id: 142, name: 'Paul Broadhurst', espnId: '1280' },
          { id: 143, name: 'Robert Dinwiddie', espnId: '1797' },
          { id: 144, name: 'Shaun Norris', espnId: '5057' },
          { id: 145, name: 'Toby Tree', espnId: '9821' },
          { id: 146, name: 'Darren Clarke', espnId: '82' },
          { id: 147, name: 'Joseph Dean', espnId: '6970' },
          { id: 148, name: 'Laurie Canter', espnId: '5550' },
          { id: 149, name: 'David Duval', espnId: '115' },
          { id: 150, name: 'Adam Hodkinson', espnId: '11147' },
          { id: 151, name: 'Mark O\'Meara', espnId: '325' },
          { id: 152, name: 'Ryan McCarthy', espnId: '7026' },
          { id: 153, name: 'Nick McCarthy', espnId: '5827' },
          { id: 154, name: 'Sandy Lyle', espnId: '281' },
          { id: 155, name: 'Todd Hamilton', espnId: '1090' }]);
        
        return golfers;
      })
      .then(() => console.log('finished populating golfers'))
      .catch(err => console.log('error populating golfers', err));

    User.destroy({ where: {} })
      .then(() => User.bulkCreate([{
        id: 1,
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }, {
        id: 2,
        provider: 'local',
        name: 'Matt Weimer',
        email: 'mweimer85@gmail.com',
        password: 'pass@word1'
      }])
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err)));

    Tournament.destroy({ where: {} })
      .then(() => User.bulkCreate([{
        id: 1,
        name: '2017 The Open',
        espnId: '2710'
      }])
        .then(() => console.log('finished populating tournaments'))
        .catch(err => console.log('error populating tournaments', err)));

    return Entry.destroy({ where: {} })
      .then(() => Entry.bulkCreate([{
        id: 1,
        userId: 2,
        tournamentId: 1,
        golfer1AId: 1,
        golfer1BId: 2,
        golfer1CId: 3,
        golfer1DId: 4,
        golfer2AId: 5,
        golfer2BId: 6,
        golfer2CId: 7,
        golfer2DId: 8,
        golfer3AId: 9,
        golfer3BId: 10,
        golfer3CId: 11,
        golfer3DId: 12
      }])
        .then(() => console.log('finished populating entries'))
        .catch(err => console.log('error populating entries', err)));
  }
}
