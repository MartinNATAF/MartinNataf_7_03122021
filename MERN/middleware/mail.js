const UserModel = require('../config/db').user;

module.exports = (req, res, next) => {
    try {
        UserModel.findOne({ where: {email: req.body.email}})
        .then((valide) => {
            if(valide !== null) {
                res.status(402).json({
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