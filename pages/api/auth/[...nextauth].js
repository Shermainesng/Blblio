import { verifyPassword } from '@/lib/auth';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { prisma } from "@/server/db/client"

export default NextAuth({
    session: {
        jwt:true,
        // maxAge: 24 * 60 * 60,
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const user = await prisma.User.findFirst({
                  where: {
                    email: credentials.email
                  }
                })

                console.log("user", user);

               
                if (!user || user==null) {
                    console.log("no user")
                    throw new Error('no user found!')
                }

                const isValid = await verifyPassword(credentials.password, user.password)
                console.log("isvalid", isValid)
                if (!isValid) {
                    throw new Error('could not log you in');
                }
                return { email:user.email };
            }
        })
    ]
})