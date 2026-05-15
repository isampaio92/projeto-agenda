const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatosController = require('./src/controllers/contatosController')
const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Rotas de contatos
route.get('/contatos', loginRequired, contatosController.index)
route.get('/contatos/:id', loginRequired, contatosController.editIndex)
route.post('/contatos/register', loginRequired, contatosController.register)
route.post('/contatos/edit/:id', loginRequired, contatosController.edit)

module.exports = route;
