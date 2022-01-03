const UserModel = require('../config/db').user;

module.exports = (req, res, next) => {
    try {
        UserModel.findOne({ where: {pseudo: req.body.pseudo}})
        .then((valide) => {
            if(valide !== null) {
              res.status(403).json({
                  error: new Error('Invalid pseudo')
              });
            }
            else {
              next();
            }
        })
        .catch(() => {
          return(false);
        });
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
};