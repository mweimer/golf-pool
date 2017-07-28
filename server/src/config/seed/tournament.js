'use strict';

import sqldb from '../../sqldb';

export default function seed () {
    let Tournament = sqldb.Tournament;

    return Tournament.destroy({ where: {} })
    .then(() => Tournament.bulkCreate([
        { id: 1, name: '2017 Masters', espnId: '2700' },
        { id: 2, name: '2017 Memorial', espnId: '2706' },
        { id: 3, name: '2017 US Open', espnId: '3066' },
        { id: 4, name: '2017 The Open', espnId: '2710' },
    ])
    .then(() => console.log('finished populating tournaments'))
    .catch(err => console.log('error populating tournaments', err)));
}
