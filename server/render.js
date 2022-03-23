const axios = require('axios');
const { render } = require('express/lib/response');


exports.portfolio = (req, res) => {
    res.render('index');
}


exports.login = (req, res) => {
    res.render('login');
}
exports.insights = (req, res) => {
    if (req.header('Referer') == 'https://myatthurasoe.herokuapp.com/login') {
        axios.get('https://myatthurasoe.herokuapp.com/api/views')
            .then(function (response) {
                res.render('insights', { viewscollection: response.data });
            })
            .catch(err => {
                res.send(err);
            })
    } else {
        res.send(`<h3>Unauthorized access</h3><br><a href="https://myatthurasoe.herokuapp.com/login">Go back</a>`);
    }


}
