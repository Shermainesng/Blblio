import Router, { useRouter } from "next/router";
import Link from "next/link";
import AddBookToList from "@/components/books/add-book-to-list";
import { useState } from "react";
import ReviewList from "@/components/reviews/review-list";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
export default function BookDetails({
  book,
  booksInAllLists,
  allBooks,
  lists,
  reviews,
}) {
  const [isShown, setIsShown] = useState(false);
  const { data: session, status } = useSession();

  console.log("book", book);
  const router = useRouter();
  const bookId = router.query.bookId;

  function handleClick(e) {
    setIsShown(true);
  }

  if (!book) return <div>loading</div>;

  console.log(reviews[0]);

  function stripTags(html) {
    // var stringToStrip = ('<' + html);
    if (html) {
      var newHtml = html.replaceAll(/<\/?[^>]+(>|$)/gi, "");
    } else {
      newHtml = "No description available";
    }
    return newHtml;
  }

  return (
    <div className="bg-green">
      <h1 className="big-header-fonts text-center pt-3">
        {book.volumeInfo.title}
      </h1>
      <div className="small-header-fonts text-center">
        <p>{book.volumeInfo.publishedDate.slice(0, 4)}</p>
        <p>Written by: {book.volumeInfo.authors}</p>
      </div>

      {typeof book.volumeInfo.imageLinks != "undefined" ? (
        <div className="d-flex justify-content-center my-4">
          <Image
            src={book.volumeInfo.imageLinks.thumbnail}
            alt="pic of book"
            width={300}
            height={330}
          />
        </div>
      ) : (
        <div className="d-flex justify-content-center my-4">
          <Image src="/no-img.png" alt="pic of book" width={250} height={300} />
        </div>
      )}

      <div className="book-desc-text mx-auto text-center para-fonts">
        <p>{stripTags(book.volumeInfo.description)}</p>
      </div>

      {session ? (
        <div className="text-center">
          <Link href="#down">
            <button
              className="btn btn-yellow px-5 my-4"
              onClick={() => handleClick()}
            >
              Add book to a list
            </button>
          </Link>
          {isShown ? (
            <AddBookToList
              book={book}
              isShown={isShown}
              setIsShown={setIsShown}
              booksInAllLists={booksInAllLists}
              lists={lists}
              books={allBooks}
            />
          ) : (
            <ReviewList book={book} reviews={reviews} />
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="pt-3 medium-header-fonts">
            Log in first to add books to lists!
          </h2>
          <Link href="/auth">
            <button className="btn btn-yellow">Log In/Sign up</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  const user = await prisma.User.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const lists = await prisma.List.findMany({
    where: {
      userId: user.id,
    },
  });

  var bookIdString = context.params.bookId;
  // const session = await getSession({req: context.req})

  var res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookIdString}?q=&key=AIzaSyCQucF_1d8cNR0dwoI43RpQK8E0xTCgjFs`
  );
  const book = await res.json();
  const booksInAllLists = await prisma.booksOnLists.findMany();
  const allBooks = await prisma.Book.findMany();

  const reviews = await prisma.Review.findMany({
    where: {
      bookId: bookIdString,
    },
    orderBy: [{ assignedAt: "desc" }],
  });

  return {
    props: {
      book,
      booksInAllLists: JSON.parse(JSON.stringify(booksInAllLists)),
      allBooks,
      lists,
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
}
