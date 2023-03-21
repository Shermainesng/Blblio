import { prisma } from "@/server/db/client"

export default async function handler(req, res) {
    const {method} = req
    const {bookId, listId, listid, bookid} = req.body
    switch (method) {
        case 'DELETE':
            const deleteBook = await prisma.BooksOnLists.deleteMany({
                where: {
                    listId: listid,
                    bookId: bookid
                }
            })
            res.status(200).json(deleteBook);
            break
        case 'POST': 
            const bookonlist = await prisma.BooksOnLists.create({
                data: {
                    bookId, 
                    listId
                },
            })
            res.status(201).json(bookonlist)
            console.log("added to table")
            break

        
    }
}
