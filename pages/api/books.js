import useSWR from 'swr';

export async function getDetailsForBook(bookIdString) {
    var res = await fetch (`https://www.googleapis.com/books/v1/volumes/${bookIdString}`)
    const book = await res.json()
    console.log("this is book title: " + book.volumeInfo.title)
   
    // const fetcher = async (url) => await axios.get(url).then((res) => res.data);
    // const {data, error} = useSWR('https://www.googleapis.com/books/v1/volumes?q=most+famous+books', fetcher)
    // if (error) return <div>failed to load</div>
    // if(!data) return <div>loading</div>
    // console.log(data)

    
    return book;
    
    // const {method} = req
    // const {id, listId, title, description, author, imageUrl, publishedDate, category, publisher} = req.body
    // switch (method) {
    //     case 'DELETE':
    //         const deleteBook = await prisma.Book.delete({
    //             where: {
    //                 id: id,
    //             }
    //         })
    //         res.status(200).json(deleteBook);
    //     case 'POST': 
    //         const book = await prisma.Book.create({
    //             data: {
    //                 listId,
    //                 title,
    //                 description, 
    //                 author, 
    //                 imageUrl,
    //                 publishedDate,
    //                 category,
    //                 publisher
    //             },
    //         })
    //         res.status(201).json(book)
    //         break
    // }
}
    