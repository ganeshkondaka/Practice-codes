import { SQSEvent } from "aws-lambda";
import AWS from "aws-sdk";

const sns = new AWS.SNS();

export const sqsHandler = async (event) => {
  for (const record of event.Records) {
    const message = record.body;

    await sns
      .publish({
        TopicArn: process.env.MY_TOPIC_ARN,
        Message: `New SQS Message: ${message}`,
      })
      .promise();
  }

  return { statusCode: 200, body: "Processed" };
};
