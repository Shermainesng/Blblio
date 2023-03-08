import BookItem from "./book-item";

function BookList(props) {
    const { items, isDelete } = props;
  
    return (
      <ul>
        {items.map(book => (
          <BookItem key={book.id} id={book.id} title={book.title} author={book.author} description={book.description} isDelete={isDelete}/>
        ))}
      </ul>
    );
  }
  
  export default BookList;