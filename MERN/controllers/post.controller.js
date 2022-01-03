const PostModel = require('../config/db').post;
const fs = require("fs");
const {
    promisify
} = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost =  (req, res) => {
    PostModel.findAll()
    .then((resultat) => {
        res.status(200).json({resultat})
    })
    .catch((err) => {
        res.status(400).json({message : err})
    })
}

module.exports.createPost = async (req, res) => {
    var fileName ;
    if (req.file !== null) {
        const {
            file,
            body: {
                pseudo
            }
        } = req;

        console.log(file)
        var fileName = pseudo + file.detectedFileExtension;
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}../../../front/src/assets/uploads/${fileName}`)
        );
        if (req.file.detectedFileExtension !== '.mp4') {
            var picture = req.file !== null ? "/" + fileName : null;
            var video = null
        }
        else {
            var video = req.file !== null ? "/" + fileName : "";
            var picture = null
        }
    }
    else {
        var picture = null;
        var video = null
    }
    
    const {
        idUser,
        pseudo,
        message,
    } = req.body;
    try {
        const post = await PostModel.create({
            idUser,
            pseudo,
            message,
            picture,
            video
        });
        return res.status(202).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.deletePost = async (req, res) => {
    try {
        await PostModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Successfully deleted. "
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }
}

module.exports.deletePostUser = async (req, res) => {
    try {
        await PostModel.destroy({
            where: {
                pseudo: req.body.pseudo
            }
        })
        res.status(200).json({
            message: "Successfully deleted. "
        });
    } catch (err) {
        return res.status(500).json({
            message: err
        });
    }
}