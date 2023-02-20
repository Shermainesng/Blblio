import {prisma} from '../../server/db/client'
import Link from 'next/link'

export default function AllLists({initialLists}) {
    const lists = [];

    return (
        <div>
            <ul>
                {initialLists.map(list => (
                    <li key={list.id}>
                        {list.title}, {list.description}
                        <Link href={`/lists/${list.id}`}>
                            View List
                        </Link>
                    </li>
                ))}
               
            
            </ul>
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

