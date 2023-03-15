
export async function getDetailsForBook(bookIdString) {
    var res = await fetch (`https://www.googleapis.com/books/v1/volumes/${bookIdString}`)
    const book = await res.json()
    console.log("this is book title: " + book.volumeInfo.title)
    return book;

}

export async function findBooksForList(listId) {
    
    var booksInList = await prisma.booksInList.findMany({
        where: {
            listId: listId,
        }
    });
    return booksInList;
}
    