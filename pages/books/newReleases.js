import BookList from '@/components/books/book-list-api'

export default function classics({newBooks}) {

    return(
        <div>
            <div className='bg-pink text-center pb-4 pt-5'>
                <h1 className='medium-header-fonts pb-4'>NEW RELEASES:</h1>
                <BookList items={newBooks}/>
            </div>
        </div>

    )
    
}

export async function getServerSideProps(){
    const axios = require('axios')
    let books = [];
    await axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=new+books&&maxResults=30`)
    .then(function(response) {
        books = response.data.items
  })
    return{
        props:{
            newBooks: books
        }
    }
} 