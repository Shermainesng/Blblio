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
            <BookItem key={book.id} bookId={book.bookId} title={book.title} author={book.author} description={book.description} listId = {book.listId} isDelete={isDelete}
                imageUrl = {book.imageUrl} 
              />
          ))}
      </ul>
    );
  }

  export default BookList;