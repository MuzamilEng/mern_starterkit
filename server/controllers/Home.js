const Content = require('../models/earlsPostSchema');


const getHomePosts = async (req, res) => {
    try {
        const contents = await Content.find();
        res.json(contents);
        //   console.log('contents found', contents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getHomePostById = async (req, res) => {
    try {
        const signleContent = await Content.findById(req.params.postId);
        if (!signleContent) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.json(signleContent);
        //   console.log('Content found', signleContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteHomePost = async (req, res) => {
    try {
        const deleteContent = await Content.findByIdAndRemove(req.params.postId);
        if (!deleteContent) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.json(deleteContent);
        //   console.log('Content deleted', deleteContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getHomePosts,
    getHomePostById,
    deleteHomePost
};