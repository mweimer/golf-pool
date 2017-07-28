'use strict';

import crypto from 'crypto';

export default function (sequelize, DataTypes) {
    var User = sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'The specified email address is already in use.'
            },
            validate: {
                isEmail: true
            }
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        password: {
            type: DataTypes.STRING,
            validate: {
              notEmpty: true
            }
        },
        provider: DataTypes.STRING,
        salt: DataTypes.STRING
    }, {

        /**
         * Virtual Getters
         */
        getterMethods: {
            // Public profile information
            profile () {
                return {
                    name: this.name,
                    ole: this.role
                };
            },

          // Non-sensitive info we'll be putting in the token
            token () {
                return {
                    id: this.id,
                    role: this.role
                };
            }
        },

        /**
        * Pre-save hooks
        */
        hooks: {
            beforeBulkCreate (users, fields) {
                return new Promise((resolve, reject) => {
                    const numUsers = users.length;
                    users.forEach((user, index) =>  {
                        if (index === numUsers - 1) {
                            user.hashPassword().then(() => resolve());
                        } else {
                            user.hashPassword();
                        }
                    });
                });
            },
            beforeCreate (user, fields) {
                return user.hashPassword();
            },
            beforeUpdate (user, fields) {
                if (user.changed('password')) {
                    return user.hashPassword();
                }
            }
        }
    });

    /**
    * Authenticate - check if the passwords are the same
    *
    * @param {String} password
    * @return {Boolean}
    * @api public
    */
    User.prototype.authenticate = function(password) {
        return new Promise((resolve, reject) => {
            generateHash(password, this.salt).then(hash =>{
                resolve(hash === this.password);
            }).catch(err => reject(err));
        });
    }


    /**
    * Update password field
    *
    * @return {String}
    * @api public
    */
    User.prototype.hashPassword = function() {
        return new Promise((resolve, reject) => {
            makeSalt().then(salt => {
                this.salt = salt;
                generateHash(this.password, salt).then(hashedPassword => {
                    this.password = hashedPassword;
                    resolve();
                })
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        });
    }

    /**
    * Make salt
    *
    * @param {Number} [byteSize] - Optional salt byte size, default to 16
    * @return {String}
    * @api public
    */
    function makeSalt(byteSize = 16) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(byteSize, (err, salt) => {
                if (err) {
                    reject(err);
                }
                return resolve(salt.toString('base64'));
            });
        });
    }

    /**
    * Generate hash
    *
    * @param {String} password
    * @return {String}
    * @api public
    */
    function generateHash(password, salt) {
        return new Promise((resolve, reject) => {
            const defaultIterations = 10000;
            const defaultKeyLength = 64;
            const saltBase64 = Buffer.from(salt, 'base64');
            const digest = 'sha512';

            crypto.pbkdf2(password, saltBase64, defaultIterations, defaultKeyLength, digest, (err, key) => {
                if (err) {
                    reject(err);
                }

                resolve(key.toString('base64'))
            });
        });
    }

    return User;
}
