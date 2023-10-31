const express = require('express')
const router = express.Router();


const {
    getHomePosts,
    getHomePostById,
    deleteHomePost
} = require('../controllers/EarlsPosts')

router.route('/').get(getHomePosts)
// .post(createContent);
router.route('/:postId').get(getHomePostById).delete(deleteHomePost)

module.exports = router