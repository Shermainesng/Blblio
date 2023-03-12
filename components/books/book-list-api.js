import Image from 'next/image';
import BookItem from "./book-item";
import Link from 'next/link';

function BookList(props) {
    const { items } = props;
  
    return (
      <div>
        <h1>Browse Books</h1>
        <ul>
          {items.map(book => (
            <Link href={`/books/${book.id}`} key={book.id}>
                <p>hi</p>
                {typeof book.volumeInfo.imageLinks!= 'undefined' ? 
                <Image src= {book.volumeInfo.imageLinks.thumbnail} alt="pic of book" width={300} height={300}/>:
                <Image src={`http://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`} alt="pic of book" width={300} height={300}/>
              }

            </Link>
          ))}
          
        </ul>
      </div>
    );
  }
  
  export default BookList;