'use strict';

import crypto from 'crypto';
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var validatePresenceOf = function (value) {
  return value && value.length;
};

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
    salt: DataTypes.STRING,
    facebook: DataTypes.JSON,
    twitter: DataTypes.JSON,
    google: DataTypes.JSON,
    github: DataTypes.JSON

  }, {

    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      profile () {
        return {
          name: this.name,
          role: this.role
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
        var totalUpdated = 0;
        users.forEach(user => {
          user.updatePassword(err => {
            if (err) {
              throw new Error(err)
            }
            totalUpdated += 1;
          });
        });
      },
      beforeCreate (user, fields) {
        user.updatePassword(() => {});
      },
      beforeUpdate (user, fields) {
        if (user.changed('password')) {
          return user.updatePassword(() => {});
        }
      }
    }
  });

  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
  */
  User.prototype.makeSalt = function(...args) {
    let byteSize;
    let callback;
    let defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    } else {
      throw new Error('Missing Callback');
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    return crypto.randomBytes(byteSize, function (err, salt) {
      if (err) {
        callback(err);
      }
      return callback(null, salt.toString('base64'));
    });
  }

  /**
  * Authenticate - check if the passwords are the same
  *
  * @param {String} password
  * @param {Function} callback
  * @return {Boolean}
  * @api public
  */
  User.prototype.authenticate = function(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    var _this = this;
    this.encryptPassword(password, function (err, pwdGen) {
      if (err) {
        callback(err);
      }

      if (_this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  }

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  User.prototype.encryptPassword = function(password, callback) {
    if (!password || !this.salt) {
      return callback ? callback(null) : null;
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = Buffer.from(this.salt, 'base64');
    var digest = 'sha512';

    if (!callback) {
      // eslint-disable-next-line no-sync
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, digest)
        .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, digest,
      function (err, key) {
        if (err) {
          callback(err);
        }
        return callback(null, key.toString('base64'));
      });
  }

  /**
   * Update password field
   *
   * @param {Function} fn
   * @return {String}
   * @api public
   */
  User.prototype.updatePassword = function(fn) {
    // Handle new/update passwords
    if (!this.password) return fn(null);

    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
      fn(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        return fn(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          fn(encryptErr);
        }
        this.password = hashedPassword;
        fn(null);
      });
    });
  }

  return User;
}
