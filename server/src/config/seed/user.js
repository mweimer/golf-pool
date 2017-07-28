'use strict';

import sqldb from '../../sqldb';

export default function seed () {
    let User = sqldb.User;

    return User.destroy({ where: {} })
    .then(() => User.bulkCreate([
        { id: 1, provider: 'local', name: 'Adam Weiss', email: 'user1@test.com', password: 'pass@word1' },
        { id: 2, provider: 'local', name: 'Alex Duff', email: 'user2@test.com', password: 'pass@word1' },
        { id: 3, provider: 'local', name: 'Alex Prevo', email: 'user3@test.com', password: 'pass@word1' },
        { id: 4, provider: 'local', name: 'Bob Kelly', email: 'user4@test.com', password: 'pass@word1' },
        { id: 5, provider: 'local', name: 'Cameron Weimer', email: 'user5@test.com', password: 'pass@word1' },
        { id: 6, provider: 'local', name: 'David Prevo', email: 'user6@test.com', password: 'pass@word1' },
        { id: 7, provider: 'local', name: 'Drew Serruto', email: 'user7@test.com', password: 'pass@word1' },
        { id: 8, provider: 'local', name: 'Ian Horwich', email: 'user8@test.com', password: 'pass@word1' },
        { id: 9, provider: 'local', name: 'Joey Graham', email: 'user9@test.com', password: 'pass@word1' },
        { id: 10, provider: 'local', name: 'Jon Frantz', email: 'user10@test.com', password: 'pass@word1' },
        { id: 11, provider: 'local', name: 'Kevin Donoher', email: 'user11@test.com', password: 'pass@word1' },
        { id: 12, provider: 'local', name: 'Kevin O\'Brien', email: 'user12@test.com', password: 'pass@word1' },
        { id: 13, provider: 'local', name: 'Kyle Bivenour', email: 'user13@test.com', password: 'pass@word1' },
        { id: 14, provider: 'local', name: 'Matt Dorow', email: 'user14@test.com', password: 'pass@word1' },
        { id: 15, provider: 'local', name: 'Matt Kilianski', email: 'user15@test.com', password: 'pass@word1' },
        { id: 16, provider: 'local', name: 'Matt Walker', email: 'user16@test.com', password: 'pass@word1' },
        { id: 17, provider: 'local', name: 'Matt Weimer', email: 'user17@test.com', password: 'pass@word1' },
        { id: 18, provider: 'local', name: 'Nate Heckmann', email: 'user18@test.com', password: 'pass@word1' },
        { id: 19, provider: 'local', name: 'Neil Thompson', email: 'user19@test.com', password: 'pass@word1' },
        { id: 20, provider: 'local', name: 'Nick Royer', email: 'user20@test.com', password: 'pass@word1' },
        { id: 21, provider: 'local', name: 'Rob Stoecklein', email: 'user21@test.com', password: 'pass@word1' },
        { id: 22, provider: 'local', name: 'Ryan Boudouris', email: 'user22@test.com', password: 'pass@word1' },
        { id: 23, provider: 'local', name: 'Ryan Buckle', email: 'user23@test.com', password: 'pass@word1' },
        { id: 24, provider: 'local', name: 'Ryan Romes', email: 'user24@test.com', password: 'pass@word1' },
        { id: 25, provider: 'local', name: 'Sean Buckle', email: 'user25@test.com', password: 'pass@word1' },
        { id: 26, provider: 'local', name: 'Tony Drake', email: 'user26@test.com', password: 'pass@word1' }
        ])
    .then(() => console.log('finished populating users'))
    .catch(err => console.log('error populating users', err)));
}
