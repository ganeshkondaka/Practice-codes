// const { prisma } = require('../layers/shared/prisma');

import { prisma } from "../layers/shared/prisma";

exports.handler = async (event: { body: string; }) => {
  const { title, content, authorId } = JSON.parse(event.body);

  const blog = await prisma.blog.create({
    data: { title, content, authorId }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(blog)
  };
};
