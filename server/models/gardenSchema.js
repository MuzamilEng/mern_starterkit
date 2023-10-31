const mongoose = require('mongoose');

const gardenSchema = new mongoose.Schema({
    headerTitle: {
        type: String,
    },
    headerImage: {
        type: String,
        default: "https://www.thespruce.com/thmb/LLKNiIRgGlJ8XlQtBu-IkGQrQU0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg",
    },
    headerText: {
        type: String,
    },
    rentRoom: {
        type: String,
    },
    privateRoom: {
        type: String,
    },
    mainImage1: {
        type: String,
        default: "https://www.thespruce.com/thmb/LLKNiIRgGlJ8XlQtBu-IkGQrQU0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg",
    },
    mainImage2: {
        type: String,
        default: "https://www.thespruce.com/thmb/LLKNiIRgGlJ8XlQtBu-IkGQrQU0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg",
    }, mainImage3: {
        type: String,
        default: "https://www.thespruce.com/thmb/LLKNiIRgGlJ8XlQtBu-IkGQrQU0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg",
    }, mainImage4: {
        type: String,
        default: "https://www.thespruce.com/thmb/LLKNiIRgGlJ8XlQtBu-IkGQrQU0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg",
    },
    mainDescription:{
        type: String
    },
    mainLocation:{
        type: String
    },
    mainCommunity:{
        type: String
    }, 
    mainPara:{
        type: String
    },
    bannerText:{
        type: String
    },
    bannerButton:{
        type: String
    },
    sectionTitle:{
        type: String
    }, 
    sectionText:{
        type: String
    },
    footerLogoImage: {
        type: String,
        default: "https://www.thespruce.com/thmb/LLKNiIRgGlJ8XlQtBu-IkGQrQU0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg",

    },
    footerDescription:{
        type: String
    },
    footerText:{
        type: String
    },
    footerLinks:{
        type: Array
    }
})

module.exports = mongoose.model('SquareGarden', gardenSchema)