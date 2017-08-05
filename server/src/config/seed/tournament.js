'use strict';

const sqldb = require('../../sqldb');

module.exports = function seed () {
    let Tournament = sqldb.Tournament;

    return Tournament.destroy({ where: {} })
    .then(() => Tournament.bulkCreate([
        { id: 1, name: '2017 Masters', espnId: '2700', current: false },
        { id: 2, name: '2017 Memorial', espnId: '2706', current: false },
        { id: 3, name: '2017 US Open', espnId: '3066', current: false },
        { id: 4, name: '2017 The Open', espnId: '2710', current: false },
        { id: 5, name: '2017 Test Open', espnId: '2710', current: true }
    ])
    .then(() => console.log('finished populating tournaments'))
    .catch(err => console.log('error populating tournaments', err)));
}
