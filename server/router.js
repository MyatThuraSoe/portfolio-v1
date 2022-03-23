const express = require('express');
const route = express.Router()

const services = require('./render');
const controller = require('./controller');

/**
 *  @description Root Route
 *  @method GET /
 */

route.get('/', services.portfolio);
route.get('/login', services.login);
route.get('/insights', services.insights);


// API
route.post('/update', controller.updateViews);
route.put('/storefirstdata', controller.storefirstdata);
route.post('/insights', controller.insights);
route.post('/submitfeedback', controller.submitfeedback);
route.get('/api/views', controller.getViews);
// route.post('/api/views', controller.createViews);
// route.get('/api/views', controller.find);
// route.put('/api/users/:id', controller.update);
// route.delete('/api/users/:id', controller.delete);


module.exports = route