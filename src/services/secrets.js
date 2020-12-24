const { getSecretsData } = require('../integrations/secrets');

let data = {};

exports.init = async () => {
  data = await getSecretsData();
  return data;
};

exports.data = () => {
  return data;
};
