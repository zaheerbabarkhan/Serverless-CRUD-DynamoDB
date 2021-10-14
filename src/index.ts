const aws = require('aws-sdk')


aws.config.update({
    region: "us-east-1"
})


const dynamoDB = new aws.DynamoDB();


module.exports = {
    dynamoDB
}