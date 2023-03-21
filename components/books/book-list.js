import BookItem from "./book-item";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";

function BookList(props) {
    const { items, isDelete, listid } = props;
    console.log(listid)
    
    return (
      
        <ul>
          {items.map(book => (
            <BookItem key={book.id} id={book.id} title={book.volumeInfo.title} author={book.volumeInfo.authors} description={book.volumeInfo.description} listid = {listid} isDelete={isDelete}
                imageUrl = {typeof book.volumeInfo.imageLinks!= 'undefined' ? 
                book.volumeInfo.imageLinks.thumbnail:
              `http://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
              }
              />
          ))}
      </ul>
    );
  }

  export default BookList;