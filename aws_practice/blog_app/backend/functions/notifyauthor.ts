const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event:{Records:[{body:string}]}) => {
  for (const record of event.Records) {
    const { authorEmail, blogTitle } = JSON.parse(record.body);

    await sns.publish({
      Message: `New comment on your blog "${blogTitle}"!`,
      Subject: 'BlogBuzz - New Comment',
      TopicArn: process.env.SNS_TOPIC_ARN
    }).promise();
  }

  return { statusCode: 200 };
};
