import {prisma} from '../../server/db/client'
import Link from 'next/link'
import ListsOfLists from '@/components/lists/lists-list';

export default function AllLists({initialLists, books}) {
    const lists = [];
    console.log(books)

    return (
      <>
        <div className='container-fluid bg-orange custom-banner'>
          <h1 className='big-header-fonts'>BROWSE LIST</h1>
            <h1 className='medium-header-fonts'>YOUR LISTS:</h1>
            {initialLists.length > 0 && <ListsOfLists initialLists={initialLists} books={books}/>}
            {initialLists.length == 0 && <div>
              Add your first list!</div>}
        </div>
      </>
    )
}

    //GET DATA FROM PRISMADB 
export async function getServerSideProps() {
    const lists = await prisma.List.findMany();

    const books = await prisma.Book.findMany();
    return {
      props: {
        initialLists: lists,
        books: books,
      }
    };
  }

