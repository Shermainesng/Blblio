import { prisma } from "@/server/db/client"

export default async function handler(req, res) {
    const {method} = req
    const {id} = req.body
    switch (method) {
        case 'DELETE':
            const deleteBook = await prisma.Book.delete({
                where: {
                    id: id,
                }
            })
            res.status(200).json(deleteBook);
        }
    }
    