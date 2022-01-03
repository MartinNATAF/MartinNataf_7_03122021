const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../config/db').user;

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body;
    const bio = "";

      try {
          const user = await UserModel.create({pseudo, email, password, bio});
          console.log(user)
          res.status(201).json({user: user._id})
      }
      catch(err) { 
        console.log(err)
          res.status(200).send({ err })
      }
}

module.exports.login = (req, res) => {
    UserModel.findOne({ where: {email: req.body.email }})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password , user.password, function(err, res1) {
          console.log(err, res1, req.body.password, user.password)
          if (err) {
            console.log(err.toString()); 
          }
          if (!res1) {
            return res.status(401).json({ error: 'MDP incorrect !' });
          }
          else {
            res.status(200).json({
              id: user.id,
              username: user.pseudo,
              token: jwt.sign(
                { userId: user.id , userPseudo: user.pseudo},
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ),
              message: 'Vous êtes connectés'
            });
          }
        })
      })
      .catch(error => res.status(500).json({ error }));
  };

