import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BookItem from '../books/book-item';
import BookList from '../books/book-list-api';
import { useRef } from "react";

const SearchInput = () => {
  const categoryInputRef = useRef();
  const authorInputRef = useRef();
  var SQ;
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState("")
  const [isSubmit, setIsSubmit] = useState(false)
  const axios = require('axios')


  function submitHandler(e) {
      e.preventDefault();
      const author = authorInputRef.current.value;
      const encodedAuthor= encodeURI(author);
      console.log("author", encodedAuthor)
      const category = categoryInputRef.current.value;
      const encodedCat= encodeURI(category);
      console.log("CAT", encodedCat)
      filterBooksHandler(encodedAuthor, encodedCat)
      setIsSubmit(true);
  
  }       

  async function filterBooksHandler(encodedAuthor, encodedCat) {
      await axios
          .get(`https://www.googleapis.com/books/v1/volumes?q=${encodedCat}+inauthor:${encodedAuthor}&maxResults=15`)
          .then(function(response) {
              console.log(response)
              setSearchResults(response.data.items);
          })
  }

  const onSearch = async (e) => {
    e.preventDefault();
    if (e.target.value==""){return}
    setLoading(true);
    const encodedSearchQuery = encodeURI(SQ);
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${encodedSearchQuery}&maxResults=15`)
      .then(function(response) {
        // console.log(response.data.items)
        // setSearchResults(response.data.items);
        filterResponseData(response.data.items);
        setLoading(false)
    })
    setIsSubmit(false)
  }

  function onSubmit() {
    setIsSubmit(true)
    onSearch()
  }


  function filterResponseData(unfilteredResponses) {
    let arrResponses = [];
    for (let i=0; i< unfilteredResponses.length; i++) {
      if (unfilteredResponses[i].volumeInfo.title.toLowerCase() != 'undefined') {
        arrResponses.push(unfilteredResponses[i]);
        console.log(unfilteredResponses[i].volumeInfo.title)
      }
    }
    setSearchResults(arrResponses);
  }

  return (
    <div>
       <form onSubmit={submitHandler} >
          <label htmlFor="category">Category</label>
          <input type='text' id='category' ref={categoryInputRef}>
          </input>

          <label htmlFor="category">Author</label>
          <input type='text' id='author' ref={authorInputRef}></input>
          <div className='btn btn-primary' onClick={(e)=>submitHandler(e)}>Search</div>
       </form>

      <form className="d-flex justify-content-center py-4" onSubmit={(e) => {setIsSubmit(true); e.preventDefault();}}>
        <input
          value={SQ}
          onChange={(e) => {
            SQ = e.target.value 
            console.log(e.target.value)
            // setSearchQuery(e.target.value);
            onSearch(e);
          }}
          placeholder="Search for book"
          />
           <button onClick={()=>onSubmit}>Search</button>
      </form>

      <div className = "container">
        <div className="row justify-content-md-center">
          {searchResults &&
            <BookList items={searchResults.slice(0,5)}/>}
          {searchResults && isSubmit &&
            <BookList items={searchResults}/>}
        </div>
      </div>
    </div>

  )
}

export default SearchInput