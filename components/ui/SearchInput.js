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
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState("")
  const [isSubmit, setIsSubmit] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
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
          .get(`https://www.googleapis.com/books/v1/volumes?q=${encodedCat}+inauthor:${encodedAuthor}&maxResults=16`)
          .then(function(response) {
              console.log(response)
              setSearchResults(response.data.items);
          })
  }

  async function onSearch(e) {
    e.preventDefault();
    if (e.target.value==""){return}
    setLoading(true);
    const encodedSearchQuery = encodeURI(SQ);
    setIsSubmit(false)
    await axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${encodedSearchQuery}&maxResults=16`)
      .then(function(response) {
        // console.log(response.data.items)
        // setSearchResults(response.data.items);
        filterResponseData(response.data.items);
        setLoading(false)
    })
    setIsSubmit(true)
  }

  function filterResponseData(unfilteredResponses) {
    let arrResponses = [];
    for (let i=0; i< unfilteredResponses.length; i++) {
      if(unfilteredResponses[i].volumeInfo.title) {
        if (unfilteredResponses[i].volumeInfo.title.toLowerCase() != 'undefined') {
          arrResponses.push(unfilteredResponses[i]);
          console.log(unfilteredResponses[i].volumeInfo.title)
        }
      }
    }
    setSearchResults(arrResponses);
    // if (!isSubmit) {
    //   setSearchResults(arrResponses.slice(0,5))
    // } else {
    //   setSearchResults(searchResultsFull);
    //   console.log(searchResults)
    // }
  }

  return (
    <div className='row'>
      <h1 className='big-header-fonts p-3'>Search Books:</h1>
      {/* <form className="col d-flex justify-content-start align-items-center" onSubmit={(e)=>onSearchSubmit(e)}> */}
      <form className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-start align-items-start">
      <label htmlFor="search">Type to start searching:</label>
        <input 
          className='input-field search-field mx-2'
          value={SQ}
          onChange={(e) => {
            SQ = e.target.value 
            console.log(e.target.value)
            // setSearchQuery(e.target.value);
            onSearch(e);
          }}
          placeholder="The Hunger Games"
          />
      </form>
       
       <form className='col-12 col-sm-12 col-md-12 col-lg-6 row'>
          <div className='d-flex flex-column justify-content-center justify-content-start align-items-start'>
            <div className='mt-1'>
              <label htmlFor="category">Category:</label>
              <input className='input-field mx-2' type='text' id='category' ref={categoryInputRef} placeholder="Romance">
              </input>
            </div>
          
            <div className='mt-1'>
              <label htmlFor="category">Author:</label>
              <input className='input-field mx-2' type='text' id='author' ref={authorInputRef} placeholder="Stephen King"></input>
            </div>
            <div className='btn btn-green mt-1' onClick={(e)=>submitHandler(e)}>Search</div>
          </div>
       </form>


      <div className = "container pt-4">
        <div className="row justify-content-md-center">
        {searchResults &&
            <BookList items={searchResults}/>}
        </div>
      </div>
    </div>

  )
}

export default SearchInput