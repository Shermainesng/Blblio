import { prisma } from "@/server/db/client"

export default async function handler(req, res) {
    const {method} = req
    const {bookId, listId} = req.body
    switch (method) {
        // case 'DELETE':
        //     const deleteBook = await prisma.Book.delete({
        //         where: {
        //             id: id,
        //         }
        //     })
        //     res.status(200).json(deleteBook);
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
