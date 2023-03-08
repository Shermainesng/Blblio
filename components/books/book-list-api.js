import BookItem from "./book-item";

function BookList(props) {
    const { items } = props;
    // const authors = items[0].volumeInfo.authors.join()
    console.log("image url " + items[0].volumeInfo.imageLinks.thumbnail)
    return (
      <ul>
        {items.map(book => (
          <BookItem key={book.id} 
          id={book.id} 
          title={book.volumeInfo.title} 
          description={book.volumeInfo.description} 
          author={book.volumeInfo.authors} 
          category={book.volumeInfo.categories} 
          publishedDate={book.volumeInfo.publishedDate}
          publisher={book.volumeInfo.publisher}
          />
        ))}
      </ul>
    );
  }
  
  export default BookList;