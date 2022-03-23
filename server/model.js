const mongoose = require('mongoose');

var views = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    ipnickname: String,
    visittime: String,
    session: String,
    views: {
        home: {
            views: String,
            duration: String
        },
        about: {
            views: String,
            duration: String
        },
        skills: {
            views: String,
            duration: String
        },
        contact: {
            views: String,
            duration: String
        }
    }
})

const viewsdb = mongoose.model('views', views);

var feedback = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    message: String,
    session: String
})
const feedbackdb = mongoose.model('feedback', feedback);

module.exports = {
    viewsdb,
    feedbackdb
};
