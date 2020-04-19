const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.listOngs);
routes.post('/ongs', OngController.createOng);

routes.get('/incidents', IncidentsController.listIncidents);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.listIncidents);

module.exports = routes;
