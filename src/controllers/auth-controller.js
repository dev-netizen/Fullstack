const express = require('express');
const router = express.Router();

const { authService } = require('../services');

router.post('/login', async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  res.cookie('authentication', result.data, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, signed: true }).send(result);
});

router.post('/createUser', async (req, res) => {
  const params = { email: req.body.email, lastName: req.body.lastName, name: req.body.name, password: req.body.password };
  const result = await authService.createUser(params);

  res.send(result);
});

module.exports = router;
