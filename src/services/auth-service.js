const { query } = require('../integrations/db');
const { authQueries } = require('./auth-service.mysql');
const { funcWrapper } = require('../utils');

exports.login = async (email, password) => {
  const fn = async () => {
    const user = await query(authQueries.getUser, [email]);

    if (!user[0]) {
      funcWrapper.funcWrapper.throwError('User with that email does not exist');
    }

    if (user[0].password !== password) {
      funcWrapper.funcWrapper.throwError('Email and password does not match');
    }

    return user[0];
  };

  return await funcWrapper.funcWrapper.ExecFnAsync(fn);
};

exports.createUser = async (params) => {
  const fn = async () => {
    const user = await query(authQueries.getUser, [params.email]);

    if (user[0]) {
      funcWrapper.funcWrapper.throwError('User with that email already exist');
    }

    const newUser = await query(authQueries.createUser, [params.name, params.lastName, params.email, params.password]);

    return newUser;
  };

  return await funcWrapper.funcWrapper.ExecFnAsync(fn);
};
