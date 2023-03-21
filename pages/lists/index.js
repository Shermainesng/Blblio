import {prisma} from '../../server/db/client'
import Link from 'next/link'
import ListsOfLists from '@/components/lists/lists-list';

export default function AllLists({initialLists, allBookIds}) {
    const lists = [];

    return (
      <>
        <div className='container-fluid bg-orange custom-banner'>
          <h1 className='big-header-fonts'>BROWSE LIST</h1>
            <h1 className='medium-header-fonts'>YOUR LISTS:</h1>
            {initialLists.length > 0 && <ListsOfLists initialLists={initialLists} bookIds={allBookIds}/>}
            {initialLists.length == 0 && <div>
              Add your first list!</div>}
        </div>
      </>
    )
}

    //GET DATA FROM PRISMADB 
export async function getServerSideProps() {
    const lists = await prisma.List.findMany();

    const bookids = await prisma.booksOnLists.findMany();
    return {
      props: {
        initialLists: lists,
        allBookIds: JSON.parse(JSON.stringify(bookids)),
      }
    };
  }

