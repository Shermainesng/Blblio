import Image from 'next/image';
import Link from 'next/link';


function BookList(props) {
    const { items } = props;
  
   
  
    return (
      <div>
          <div className = "container">
            <div className={`row justify-content-md-center ${props.scrollable ? "scrollable-row" : ""}`}>
           
              {items.map(book => (
                  <Link className='col-8 col-sm-8 col-md-6 col-lg-3' key={book.id} href={`/books/${book.id}`}>
                      <div className="book-title-table d-flex flex-column align-items-center pb-3">
                        {typeof book.volumeInfo.imageLinks!= 'undefined' ? 
                        <Image src= {book.volumeInfo.imageLinks.thumbnail} alt="pic of book" width={250} height={300}/>:
                        <Image src='/no-img.png' alt="pic of book" width={250} height={300}/>
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