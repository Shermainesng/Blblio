import Link from 'next/link';
import Image from 'next/image';

function ListsOfLists(props) {  

    function getImages(listId) {
        var arrUrls = []
        var listBooks = props.books.filter(obj=>obj.listId == listId)
        console.log(listBooks)
        for (let i=0; i< 4; i++) {
            if (listBooks[i]){
                if (listBooks[i].imageUrl) {
                    arrUrls.push(props.books[i].imageUrl); 
                }
            } else {
                arrUrls.push('http://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');
            }
        }
        console.log(arrUrls);
        return arrUrls;
    }
    
    return(
        <ul>
            {props.initialLists.map(list => {
                var imageArr = getImages(list.id)
                console.log("this is it")
                console.log(imageArr)
                return (
                <li key={list.id}>
                    <div id="cover-img">
                        <Image src={imageArr[0]} alt="pic of book" width={40} height={60}/>
                        <Image src={imageArr[1]} alt="pic of book" width={40} height={60}/>
                        <Image src={imageArr[2]} alt="pic of book" width={40} height={60}/>
                        <Image src={imageArr[3]} alt="pic of book" width={40} height={60}/>
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