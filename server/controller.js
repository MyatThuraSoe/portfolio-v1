var model = require('./model');
var Views = model.viewsdb;
var Feedback = model.feedbackdb;
const url = require('url');
exports.storefirstdata = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    var firstdata = new Views({
        ip: req.socket.remoteAddress,
        visittime: req.body.currenttime,
        session: req.session.id
    })

    firstdata
        .save()
        .catch(err => {
            console.log(err, " while saving the first data");
        });



}

exports.updateViews = (req, res) => {
    if (req.body) {
        let views = req.body.views;

        let condition = { session: req.session.id };
        Views.findOneAndUpdate(condition, { views: views }, {
            new: true,
            runValidators: true,
        }).catch(err => {
            console.log(err);
        });
        res.status(200).end();
    }
    else {
        return;
    }

}
exports.insights = (req, res) => {
    if (req.body.password == process.env.LOGIN_PWD) {
        res.redirect('/insights');
    } else {
        console.log('wrong password', req.body.password);
        res.redirect(url.format({
            pathname: "/login",
            query: {
                "msg": "Wrong password"
            }
        }));
    }


}
exports.submitfeedback = (req, res) => {
    if (req.body) {
        let name = req.body.feedbackname;
        let email = req.body.feedbackemail;
        let message = req.body.feedbackmessage;

        console.log(name, email, message);


        var feedback = new Feedback({
            name: name,
            email: email,
            message: message,
            session: req.session.id
        })

        feedback
            .save()
            .catch(err => {
                console.log(err, " while saving the first data");
            });

        let backURL = req.header('Referer') || '/';
        res.redirect(backURL);
        res.status(200).end();
    }
    else {
        return;
    }

}
exports.getViews = (req, res) => {
    Views.find()
        .sort({ created_at: 1 })
        .then(views => {
            res.send(views)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occurred while retriving Views db information" })
        })
}
