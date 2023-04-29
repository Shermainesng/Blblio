import Image from 'next/image';
import BookItem from "./book-item";
import Link from 'next/link';
import noimg from '/public/no-img.png';

function BookList(props) {
    const { items } = props;
  
    return (
      <div>
          <div className = "container">
            <div className="row justify-content-md-center">
              {items.map(book => (
          
                  <Link className='col-12 col-sm-12 col-md-6 col-lg-4' key={book.id} href={`/books/${book.id}`}>
                      <div className="book-title-table d-flex flex-column align-items-center pb-3">
                        {typeof book.volumeInfo.imageLinks!= 'undefined' ? 
                        <Image src= {book.volumeInfo.imageLinks.thumbnail} alt="pic of book" width={250} height={300}/>:
                        <Image src='https://depositphotos.com/418806478/stock-illustration-add-icon-vector-sign.html' alt="pic of book" width={250} height={300}/>
                      }
                      <p className="book-title pt-2">
                          {book.volumeInfo.title}
                          </p>
                        
                      </div>
                  </Link>

              ))}

            </div>
        
         
          </div>
      </div>
    );
  }
  
  export default BookList;