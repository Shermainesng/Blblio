import BookList from '@/components/books/book-list-api'

export default function classics({classicBooks}) {

    return(
        <div>
            <div className='bg-pink text-center pb-4 pt-5'>
                <h1 className='medium-header-fonts pb-4'>BROWSE CLASSICS</h1>
                <BookList items={classicBooks}/>
            </div>
        </div>

    )
    
}

export async function getServerSideProps(){
    const axios = require('axios')
    let books = [];
    await axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=subject:classics&maxResults=10&KEY=AIzaSyClm-Sa7powQda-22jmYXK2MNLaRmkzmmA`)
    .then(function(response) {
        books = response.data.items
  })
    return{
        props:{
            classicBooks: books
        }
    }
} 