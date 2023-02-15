import {prisma} from '../../server/db/client'

export default function AllLists({initialLists}) {
    const lists = [];

    return (
        <div>
            <ul>
                {initialLists.map(list => (
                    <li key={list.id}>
                        {list.title}, {list.description}
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

