const AWS = require('aws-sdk');

module.exports = async (awsConfig, dynamoConfig, scriptFunc) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient(dynamoConfig);
    const client = new AWS.DynamoDB(dynamoConfig);
    AWS.config.update(awsConfig);

    try {
        await scriptFunc(dynamodb, client);
    } finally {
        // Ensures that the client will close when you finish/error
    }
};
