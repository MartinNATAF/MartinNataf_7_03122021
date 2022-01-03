const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');

router.get('/', auth, postController.readPost);
router.post('/', auth, upload.single("file"), postController.createPost);
router.delete('/:id', auth, postController.deletePost);
router.delete('/', auth, postController.deletePostUser);

module.exports = router;
