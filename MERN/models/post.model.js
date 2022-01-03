const { DataTypes } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define('posts', {
        pseudo: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
        picture: {
            type: DataTypes.STRING,
        },
        video: {
            type: DataTypes.STRING,
        },
        idUser: {
            type: DataTypes.INTEGER,
        }
    })
    return Post;
}