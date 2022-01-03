const UserModel = require('../config/db').user;

module.exports.userInfo = (req, res) => {
    UserModel.findOne({ where: {id: req.params.id}})
        .then(user => {
            res.status(200).json({user});
        })
        .catch(err => res.status(500).json({ err }));
};

module.exports.deleteUser = async (req, res) => {

    try {
        await UserModel.destroy({ where: {id: req.params.id}})
            res.status(200).json({ message: "Successfully deleted. "});
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

module.exports.updateUser =  (req, res) => {
    UserModel.update(
        { bio: req.body.data.bio},
        { where: { id: req.body.data.id} }
      )
        .then(result =>
          res.status(201).json({result})
        )
        .catch(err =>
            res.status(500).json({ message: err})
        )
}
