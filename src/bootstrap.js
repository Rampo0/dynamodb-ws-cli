const AWS = require('aws-sdk');

module.exports = async (awsConfig, dynamoConfig, scriptFunc) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient(dynamoConfig);
    AWS.config.update(awsConfig);

    try {
        await scriptFunc(dynamodb);
    } finally {
        // Ensures that the client will close when you finish/error
    }
};
