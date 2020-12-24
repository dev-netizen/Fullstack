const Buffer = require('safe-buffer').Buffer;

// Load the AWS SDK
let AWS = require('aws-sdk'),
  region = 'us-east-2',
  secretName = `fullstackdev`,
  secret,
  decodedBinarySecret;

// Create a Secrets Manager client
let client = new AWS.SecretsManager({
  region: region,
});

module.exports.getSecretsData = async () => {
  return new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) {
        reject(err);
        if (err.code === 'DecryptionFailureException')
          // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === 'InternalServiceErrorException')
          // An error occurred on the server side.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === 'InvalidParameterException')
          // You provided an invalid value for a parameter.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === 'InvalidRequestException')
          // You provided a parameter value that is not valid for the current state of the resource.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
        else if (err.code === 'ResourceNotFoundException')
          // We can't find the resource that you asked for.
          // Deal with the exception here, and/or rethrow at your discretion.
          throw err;
      } else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
          secret = data.SecretString;
          data = JSON.parse(secret);
          resolve(data);
        } else {
          let buff = Buffer.from(data.SecretBinary, 'base64');
          // eslint-disable-next-line
          decodedBinarySecret = buff.toString('ascii');
        }
      }

      // Your code goes here.
    });
  });
};
