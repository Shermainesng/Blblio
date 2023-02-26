import BookItem from "./book-item";
function BookList(props) {
    const { items } = props;
  
    return (
      <ul>
        {items.map(book => (
          <BookItem key={book.id} id={book.id} title={book.title} />
        ))}
      </ul>
    );
  }
  
  export default BookList;