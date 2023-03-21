import Link from 'next/link';
import Image from 'next/image';

function ListsOfLists(props) {
  
// async function getImages(listId) {
//     console.log("testing")
//     var arrUrls = []
//     for (let i=0; i< 4; i++) {
//         if (props.bookIds[i]) {
//             console.log(props.bookIds[i])
//             if (props.bookIds[i].listId == listId) {
//                 console.log("success for 1")
//                 console.log(props.bookIds[i].bookId);
//                 var res = await fetch (`https://www.googleapis.com/books/v1/volumes/${props.bookIds[i].bookId}`)
//                 const bookObj = await res.json()
//                 if (bookObj){
//                     console.log(bookObj)
//                     var image = bookObj.volumeInfo.imageLinks.thumbnail;
//                 }
//             }
//         } else {
//             var image = 'http://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
//         }
//             arrUrls.push(image);
//     }
//     console.log(arrUrls);
//     return arrUrls;
// }

    

    return(
        <ul>
            {props.initialLists.map(list => {
                // var imageArr = getImages(list.id)
                
                return (
                <li key={list.id}>
                    <div id="cover-img">
                        {/* {imageArr && imageArr.map(imageUrl => {
                            <Image src={imageUrl} alt="pic of book" width={40} height={60}/>
                        })}
                     */}
                    </div>
                    {list.title}, {list.description}
                    <Link href={`/lists/${list.id}`}>
                        View List
                    </Link>
                </li>
            )})}      
        </ul>
    )
    }

export default ListsOfLists;