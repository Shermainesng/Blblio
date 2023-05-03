import { prisma } from "@/server/db/client"
export default async function handler(req, res) {
    const {method} = req
    const {bookId, id, listId, title, author, publisher, publishedDate, category, imageUrl, description} = req.body
    switch (method) {
        case 'POST': 
            const book = await prisma.Book.create({
                data: {
                    bookId, 
                    listId, 
                    title, 
                    author, 
                    publisher, 
                    publishedDate, 
                    category,
                    imageUrl,
                    description
                },
            })
            res.status(201).json(book)
            console.log("added to book table")
            break
        case 'DELETE':
            const deleteBook = await prisma.Book.delete({
                where: {
                    id: id
                }
            })
            res.status(200).json(deleteBook);
            break
        }
    }
