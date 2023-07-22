import { hashPassword } from "@/lib/auth";
import { prisma } from "@/server/db/client"
import { PrismaClient } from '@prisma/client';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  console.log(data);
  const {name, email, password} = data;


  if (!email || !email.includes('@') || !password) {
    res
      .status(422)
      .json({
        message:
          'Invalid input.'
      }); 
      return; 
  }

  //check if email exists alr
  const existingEmail = await prisma.User.findFirst({
  where: {
    email: email,
  },
  })

  if (existingEmail) {
    res.status(422).json({message:'User already exists!'});
    return;
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.User.create({
      data: {
          name: name,
          email: email,
          password:hashedPassword,
      },
  })
  res.status(201).json({message:'created user!'});
}

export default handler;