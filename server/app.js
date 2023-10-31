const express = require('express');
const app = express();
const multer = require('multer');
require('dotenv').config({ path: '.env' })
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const home = require('./routes/EarlsHome');
const homePosts = require('./routes/EarlsPosts');
const auth = require('./routes/auth');
const cors = require('cors');
const path = require('path');
const earlsPostSchema = require('./models/earlsPostSchema');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'njnjj2fdiawje',
  api_key: '186277285738544',
  api_secret: 'IKoKc-pKt9XF8dNdJbE3TeA9WyM',
});

const storage = multer.diskStorage({
  destination: ('./public/uploads/'),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 10 * 1024 * 1024,
  }
}); const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/home', home);
app.use('/api/v1/posts', homePosts);
app.use('/api/v1/auth', auth);


// post-content
app.post('/api/v1/Posts', upload.single('postImage'), async (req, res, next) => {
  const { postDate, postTitle, postTopic, postDescription, postInfo, postLine1, postLine2, postLine3, postLine4, postFooterText, postSummary, download_btn, postFooter, readme_btn } = req.body;

  let postImageURL;

  // Handle image updates
  if (req.file) {
    const postImage = req.file;
    const postImageResult = await cloudinary.uploader.upload(postImage.path, {
      folder: 'Assets',
    });
    postImageURL = postImageResult.secure_url;
  }

  const newContent = new earlsPostSchema({
    postDate,
    postTitle,
    postTopic,
    postDescription,
    postInfo,
    postLine1,
    postLine2,
    postLine3,
    postLine4,
    postSummary,
    download_btn,
    postFooter,
    postFooterText,
    readme_btn,
    postImage: postImageURL
  });

  try {
    const savedContent = await newContent.save();

    const responseObj = {
      ...savedContent._doc,
    };

    if (postImageURL) {
      responseObj.postImage = postImageURL;
    }

    res.status(201).json(responseObj);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error saving product' });
  }
});

// postDate, postTitle, postTopic, postImage, postDescription, postSummary, download_btn, postFooter, readme_btn

app.put('/api/v1/editPost/:id', upload.single('postImage'), async (req, res, next) => {
  const { postDate, postTitle, postTopic, postDescription,postFooterText, postInfo, postLine1, postLine2, postLine3, postLine4, postSummary, download_btn, postFooter, readme_btn } = req.body;
  // console.log(req.body, "body")

  const updateFields = {
    postDate,
    postTitle,
    postTopic,
    postDescription,
    postInfo,
    postLine1,
    postLine2,
    postLine3,
    postLine4,
    postSummary,
    download_btn,
    postFooter,
    postFooterText,
    readme_btn,
  };

  try {
    const existingPost = await earlsPostSchema.findById(req.params.id);

    if (!existingPost) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (req.file) {
      // Delete previous post image if it exists
      if (existingPost.postImage) {
        await cloudinary.uploader.destroy(existingPost.postImage.replace(cloudinary.config().cloud_name + '/', ''));
      }

      const postImage = req.file;
      const postImageResult = await cloudinary.uploader.upload(postImage.path, {
        folder: 'Assets',
      });
      updateFields.postImage = postImageResult.secure_url;
    } else {
      updateFields.postImage = existingPost.postImage;
    }

    if(!updateFields.postImage) {
      updateFields.postImage = existingPost.postImage;
    }
    if(!updateFields.postDate) {
      updateFields.postDate = existingPost.postDate;
    }
    if(!updateFields.postTitle) {
      updateFields.postTitle = existingPost.postTitle;
    }
    if(!updateFields.postTopic) {
      updateFields.postTopic = existingPost.postTopic;
    }
    if(!updateFields.postDescription) {
      updateFields.postDescription = existingPost.postDescription;
    }
    if(!updateFields.postInfo) {
      updateFields.postInfo = existingPost.postInfo;
    }
    if(!updateFields.postLine1) {
      updateFields.postLine1 = existingPost.postLine1;
    }
    if(!updateFields.postLine2) {
      updateFields.postLine2 = existingPost.postLine2;
    }
    if(!updateFields.postLine3) {
      updateFields.postLine3 = existingPost.postLine3;
    }
    if(!updateFields.postLine4) {
      updateFields.postLine4 = existingPost.postLine4;
    }
    if(!updateFields.postSummary) {
      updateFields.postSummary = existingPost.postSummary;
    }
    if(!updateFields.download_btn) {
      updateFields.download_btn = existingPost.download_btn;
    }
    if(!updateFields.postFooter) {
      updateFields.postFooter = existingPost.postFooter;
    }
    if(!updateFields.postFooterText) {
      updateFields.postFooterText = existingPost.postFooterText;
    }
    if(!updateFields.readme_btn) {
      updateFields.readme_btn = existingPost.readme_btn;
    }

    const updatedContent = await earlsPostSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // Use $set to update specific fields
      { new: true }
    );

    // console.log(updatedContent, "updatedContent");
    if (!updatedContent) {
      return res.status(500).json({ message: 'Failed to update content' });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});


app.use(errorHandler)
app.use(notFound)

const start = async () => {
  try {
    await connectDB(process.env.URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start(); 