import { prisma } from "../layers/shared/prisma";
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = async (event :{body:string}) => {
  const { content, blogId, userId } = JSON.parse(event.body);

  const comment = await prisma.comment.create({
    data: { content, blogId, userId }
  });

  // Fetch blog to get author
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    include: { author: true }
  });

  // Push message to SQS
  await sqs.sendMessage({
    QueueUrl: process.env.SQS_URL,
    MessageBody: JSON.stringify({
      commenterId: userId,
      authorEmail: blog.author.email,
      blogTitle: blog.title
    })
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
