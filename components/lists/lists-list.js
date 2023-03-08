import Link from 'next/link';

function ListsOfLists(props) {
    console.log(props.ListsOfLists);

    return(
        <ul>
            {props.initialLists.map(list => (
                <li key={list.id}>
                    {list.title}, {list.description}
                    <Link href={`/lists/${list.id}`}>
                        View List
                    </Link>
                </li>
            ))}      
        </ul>
    )
    }

export default ListsOfLists;