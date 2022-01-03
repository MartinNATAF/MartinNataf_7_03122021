const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("foodly", "root", "MARTINnataf1", {
    dialect: "mysql",
    host: "localhost"
});

try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("../models/post.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);

module.exports = db;