import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

const sqs = new AWS.SQS({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      await sqs
        .sendMessage({
          QueueUrl: process.env.SQS_QUEUE_URL!, // Get from AWS Console
          MessageBody: message,
        })
        .promise();

      res.status(200).json({ status: 'Message sent to SQS' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to send message', details: err });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
