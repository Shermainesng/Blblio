import useSWR from "swr";

export async function getDetailsForBook(bookIdString) {
  var res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookIdString}&key=AIzaSyCQucF_1d8cNR0dwoI43RpQK8E0xTCgjFs`
  );
  const book = await res.json();
  console.log("this is book title: " + book.volumeInfo.title);
  if (!book) return <div>loading</div>;
  return book;
}

export async function findBooksForList(listId) {
  var booksInList = await prisma.booksInList.findMany({
    where: {
      listId: listId,
    },
  });
  return booksInList;
}
