import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker";

function ListsOfLists(props) {
  const router = useRouter();

  console.log("books passed");
  console.log(props.books);
  function descTrimmer(description) {
    if (description.length > 40) {
      var trimDesc = description.slice(0, 40);
      description = trimDesc;
    }
    return description + "...";
  }

  function getImages(listId) {
    var arrUrls = [];
    console.log("listid here " + listId);
    var listBooks = props.books.filter((obj) => obj.listId == listId);
    for (let i = 0; i < 4; i++) {
      if (listBooks[i]) {
        console.log("each listbook");
        console.log(listBooks[i]);
        if (listBooks[i].imageUrl) {
          arrUrls.push(listBooks[i].imageUrl);
        }
      } else {
        arrUrls.push(
          "https://as1.ftcdn.net/v2/jpg/01/09/34/82/1000_F_109348261_aanUtbiqtEPzkc2Xx3SmIwIKxDBcSYMt.jpg"
        );
      }
    }
    return arrUrls;
  }

  async function handleAddBookToList(listId, bookId) {
    if (!bookId) {
      return <div>loading</div>;
    }

    var found = props.books.find(
      (book) => book.bookId == bookId && book.listId == listId
    );
    console.log(found);
    if (typeof found == "undefined") {
      const { bookonlist } = await axios.post("/api/booksonlist", {
        listId: listId,
        bookId: bookId,
      });
      const { bookadded } = await axios.post("/api/books", {
        bookId: bookId,
        listId: listId,
        title: props.book.volumeInfo.title,
        author: props.book.volumeInfo.authors
          ? props.book.volumeInfo.authors[0]
          : "no author",
        publisher: props.book.volumeInfo.publisher,
        publishedDate: props.book.volumeInfo.publishedDate,
        category: props.book.volumeInfo.categories
          ? props.book.volumeInfo.categories[0]
          : "fake category",
        imageUrl: props.book.volumeInfo.imageLinks
          ? props.book.volumeInfo.imageLinks.thumbnail
          : "https://as1.ftcdn.net/v2/jpg/04/34/72/82/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
        description: truncateDescription(
          props.book.volumeInfo.description,
          500
        ),
      });

      // 'http://books.google.com/books/content?id=SAFVv6aTpFMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
      router.push(`/lists`);
    } else {
      alert("book is already in your list!");
    }
  }

  const truncateDescription = (description, wordLimit) => {
    if (!description) {
      return "this is"; // Default value if description is not available
    }

    const words = description.split(" ");
    const truncatedWords = words.slice(0, wordLimit);
    console.log(truncatedWords.join(" ").length);
    return truncatedWords.join(" ");
  };

  return (
    <div className="horizontal-scroll">
      <div>
        {props.books.length != 0 &&
          props.initialLists.map((list) => {
            var imageArr = getImages(list.id);
            return (
              <div className="list-block" key={list.id}>
                <div id="cover-img text-center">
                  <Image
                    src={imageArr[0]}
                    alt="pic of book"
                    width={70}
                    height={85}
                  />
                  <Image
                    src={imageArr[1]}
                    alt="pic of book"
                    width={70}
                    height={85}
                  />
                  <br />
                  <Image
                    src={imageArr[2]}
                    alt="pic of book"
                    width={70}
                    height={85}
                  />
                  <Image
                    src={imageArr[3]}
                    alt="pic of book"
                    width={70}
                    height={85}
                  />
                </div>
                <div className="list-desc pt-3">
                  <div className="small-header-fonts">{list.title}</div>
                  <div className="para-fonts">
                    {descTrimmer(list.description)}
                  </div>
                  <Link href={`/lists/${list.id}`}>
                    <button className="btn btn-pink my-2">View List</button>
                  </Link>
                  <br />
                  {props.canAddToList && (
                    <button
                      className="btn btn-pink"
                      onClick={() =>
                        handleAddBookToList(list.id, props.book.id)
                      }
                    >
                      Add to list: {list.title}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      <div>
        {props.books.length == 0 &&
          props.initialLists.map((list) => (
            <div key={list.id}>
              <div className="list-desc pt-3">
                <div className="small-header-fonts">{list.title}</div>
                <div className="para-fonts">{list.description}</div>
                <Link href={`/lists/${list.id}`}>
                  <button className="btn btn-yellow px-5 me-3">
                    View List
                  </button>
                </Link>
                {props.canAddToList && (
                  <button
                    className="btn btn-yellow px-4"
                    onClick={() => handleAddBookToList(list.id, props.book.id)}
                  >
                    Add to list: {list.title}
                  </button>
                )}
              </div>
            </div>
          ))}

        {/* // && props.initialLists.map(list => {
                //     <div key={list.id}>
                //         <div>hi</div>
                //     </div>
                // })}                 */}
      </div>
    </div>
  );
}

export default ListsOfLists;
