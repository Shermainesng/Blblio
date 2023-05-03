import BookItem from "./book-item";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";
import {noimg} from '/public/no-img.png';

function BookList(props) {
    const { items, isDelete, listid } = props;
    console.log(listid)
    
    return (
      <div>
        <div className = "container">
          <div className="row justify-content-md-center">
            {items.map(book => (
              <BookItem key={book.id} book={book} isDelete={isDelete}/>
              // <div className='col-12 col-sm-12 col-md-6 col-lg-4' key={book.id}>
              //   <Link href={`/books/${book.bookId}`}>
              //     <div className="book-title-table d-flex flex-column align-items-center pb-3">
              //       {book.imageUrl !=null ?
              //           <Image src={book.imageUrl} alt="pic of book" width={200} height={250}/>: <Image src={noimg} alt="pic of book" width={200} height={250}/>
              //       }
              //       <p className="book-title pt-2">
              //           {book.title}
              //       </p>
              //     </div>
              //   </Link>   
              //   <button>Delete</button>
              // </div>
          ))}
          </div>
        </div>
      </div>
    );
  }

  export default BookList;