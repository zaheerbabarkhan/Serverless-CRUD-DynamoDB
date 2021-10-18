const aws = require('aws-sdk')


aws.config.update({
	region: 'us-east-1',
	// endpoint: 'http://localhost:8000',
});

const dynamoDB = new aws.DynamoDB.DocumentClient({});


module.exports = {
    dynamoDB
}