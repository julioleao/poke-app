const express = require('express');
const auth = require('./auth');

module.exports = function (server) {
  /*
   * Rotas protegidas por Token JWT
   */
  const protectedApi = express.Router();
  server.use('/api', protectedApi);

  //protectedApi.use(auth);

  const Cards = require('../api/cards/cardsService');
  Cards.register(protectedApi, '/cards');
  /*
   * Rotas abertas
   */
  const openApi = express.Router();
  server.use('/oapi', openApi);

  const UsersService = require('../api/users/usersService');
  openApi.post('/login', UsersService.login);
  openApi.post('/signup', UsersService.signup);
  openApi.post('/validateToken', UsersService.validateToken);
};
