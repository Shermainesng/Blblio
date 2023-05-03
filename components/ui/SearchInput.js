import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const SearchInput = () => {
  var SQ;
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState("")
  const [isSubmit, setIsSubmit] = useState(false)
  const axios = require('axios')

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
          {searchResults && searchResults.slice(0,5).map(result => (
              <Link className='col-12 col-sm-12 col-md-6 col-lg-4' key={result.id} href={`/books/${result.id}`}>
                <div className="book-title-table d-flex flex-column align-items-center pb-3">
                  {typeof result.volumeInfo.imageLinks!= 'undefined' ? 
                  <Image src= {result.volumeInfo.imageLinks.thumbnail} alt="Book cover image" width={250} height={300}/>:
                  <Image src="/no-img.png" alt="No pic available" width={250} height={300}/>
                }
                  <h2>{result.volumeInfo.title}</h2>
                </div>
              </Link>
          ))}
          {searchResults && isSubmit && searchResults.map(result => (
            <Link className='col-12 col-sm-12 col-md-6 col-lg-4' key={result.id} href={`/books/${result.id}`}>
              {typeof result.volumeInfo.imageLinks!= 'undefined' ? 
                <Image src= {result.volumeInfo.imageLinks.thumbnail} alt='Book cover image' width={250} height={300}/>:
                <Image src="/no-img.png" alt="No pic available" width={250} height={300}/>
              }
            <h2>{result.volumeInfo.title}</h2>
          </Link>
          ))}
        </div>
      </div>
    </div>

  )
}

export default SearchInput