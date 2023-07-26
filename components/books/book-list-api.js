import Image from 'next/image';
import Link from 'next/link';


function BookList(props) {
    const { items } = props;
   
    function titleTrimmer(title) {
      if (title.length > 100) {
        var trimTittle = title.slice(0, 40);
        title = trimTittle
      }
      return title;
    }
   
  
    return (
      <div>
          <div className = "container">
            <div className={`row justify-content-center ${props.scrollable ? "scrollable-row" : ""}`}>
           
              {items.map(book => (
                  <div className='col-8 col-sm-8 col-md-6 col-lg-3' key={book.id}>
                    <Link href={`/books/${book.id}`}>
                      <div className="book-title-table d-flex flex-column align-items-center pb-3">
                        {typeof book.volumeInfo.imageLinks!= 'undefined' ? 
                        <div className='book-cover'>
                          <Image src= {book.volumeInfo.imageLinks.thumbnail} alt="pic of book" width={250} height={300}/>
                        </div>:
                        <div className='book-cover'>
                          <Image src='/no-img.png' alt="pic of book" width={250} height={300}/>
                        </div>
                        
                      }
                      <p className="book-title pt-2">
                          {titleTrimmer(book.volumeInfo.title)}
                          </p>
                        
                      </div>
                    </Link>
                  </div>
              ))} 

            </div>
          </div>
      </div>
    );
  }
  
  export default BookList;