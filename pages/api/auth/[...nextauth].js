import { verifyPassword } from '@/lib/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/server/db/client"
import { SessionProvider } from 'next-auth/react';

export default NextAuth({
    session: {
        jwt:true,
        maxAge: 24 * 60 * 60,
        secret: process.env.NEXTAUTH_SECRET
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const user = await prisma.User.findFirst({
                  where: {
                    email: credentials.email
                  }
                })

                console.log("user iS HERE ", user);

               
                if (!user || user==null) {
                    console.log("no user")
                    throw new Error('no user found!')
                }

                const isValid = await verifyPassword(credentials.password, user.password)
                console.log("isvalid", isValid)
                if (!isValid) {
                    throw new Error('could not log you in');
                }
                return {  
                    image: user.avatar,
                    email: user.email,
                    name: user.name, 
                 };
              
            }
        }), 
    ]
})