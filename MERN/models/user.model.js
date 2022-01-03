const bcrypt = require('bcrypt');
const { DataTypes } = require("sequelize");


async function hashPassword(user, options) {
    const SALT_FACTOR = 8;
    
    if (!user.changed("password")) {
      return 0;
    }
    console.log('hashing')
    user.password = await bcrypt.hash(user.password, SALT_FACTOR);
  }
  
module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('users', {
        pseudo: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        bio: {
            type: DataTypes.STRING,
        }
    }, {
        hooks: {
            beforeSave: hashPassword,
            //beforeCreate: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        bcrypt.compare(password, this.password, function (res, err) {
          if (res) {
            console.log(res)
          } else {
            console.log(err)
          }
        })
        return bcrypt.compare(password, this.password)
      }

    return User;
}
