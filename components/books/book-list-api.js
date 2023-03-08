
import BookItem from "./book-item";

function BookList(props) {
    const { items } = props;
  
    return (
      <ul>
        {items.map(book => (
          <BookItem key={book.id} 
          id={book.id} 
          title={book.volumeInfo.title} 
          description={book.volumeInfo.description} 
          author={book.volumeInfo.authors} 
          category={book.volumeInfo.categories} 
          
            imageUrl={typeof book.volumeInfo.imageLinks== 'undefined' ? 
            `http://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
            :
            book.volumeInfo.imageLinks.thumbnail}
          
          publishedDate={book.volumeInfo.publishedDate}
          publisher={book.volumeInfo.publisher}
          />
        ))}
      </ul>
    );
  }
  
  export default BookList;