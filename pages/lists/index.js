import {prisma} from '../../server/db/client'
import Link from 'next/link'
import ListsOfLists from '@/components/lists/lists-list';

export default function AllLists({initialLists}) {
    const lists = [];

    return (
        <div>
            <h1>Your List:</h1>
            <ListsOfLists initialLists={initialLists}/>
        </div>
    )
}

    //GET DATA FROM PRISMADB 
export async function getServerSideProps() {
    const lists = await prisma.List.findMany();
    return {
      props: {
        initialLists: lists
      }
    };
  }

