import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

const sqs = new AWS.SQS({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  try {
    await sqs
      .sendMessage({
        QueueUrl: process.env.SQS_QUEUE_URL!,
        MessageBody: message,
      })
      .promise();

    return NextResponse.json({ status: 'Message sent to SQS' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
