import axios from 'axios'

export default function IndivList({list}){

    async function handleEdit() {
        const {data} = await axios.put('/api/lists', {
            id:list.id,
            title: "test1 edit",
            description:"desc edit"
        })
        console.log(list.id);
    }

    async function handleDelete() {
        // listId = parseInt(listId);
        const {data} = await axios.delete('/api/lists', {
            data: {
                id:list.id
            }
        })
        console.log(list.id);
    }

    return(
        <>
            <h2>{list.title}</h2>

            <button onClick={()=>handleEdit()}>Edit this list</button>
            <button onClick={()=>handleDelete()}>Delete this list</button>
        </>
    )

}
export async function getServerSideProps({params}){
    const ListId=parseInt(params.listId);
    const list = await prisma.List.findUnique({
        where: {
          id:ListId
        },
      })

    return{
        props:{
            list,

        }
    }
} 