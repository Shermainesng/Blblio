import axios from 'axios'

export default function EditList() {

    test();

    async function test() {
        const {data} = await axios.put('/api/lists', {
            title: "test1 edit",
            description:"desc edit"
        })
        console.log(data);
    }
    //     const {data} = await axios.put('/api/lists/`${listId}`, {
    //         id,
    //         title,
    //         description,
    //     })
    // }
    

    return (
        <div>
            <h1>Edit your list</h1>
            
        </div>
    )
}