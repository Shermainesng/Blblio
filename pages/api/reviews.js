import { prisma } from "@/server/db/client"

export default async function handler(req, res) {
    const {method} = req
    const {userName, userAvatar, bookId, rating, description} = req.body
    switch (method) {
        case 'POST': 
            const review = await prisma.Review.create({
                data: { 
                    userName,
                    userAvatar,
                    bookId,
                    rating, 
                    description
                },
            })
            res.status(201).json(review)
            console.log("added to review table")
            break
        }
    }
