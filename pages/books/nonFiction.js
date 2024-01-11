import BookList from "@/components/books/book-list-api";

export default function nonFiction({ nonFiction }) {
  return (
    <div>
      <div className="bg-pink text-center pb-4 pt-5">
        <h1 className="medium-header-fonts pb-4">BEST NONFICTION:</h1>
        <BookList items={nonFiction} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const axios = require("axios");
  let books = [];
  await axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=nonfiction+books&&maxResults=10&key=AIzaSyCQucF_1d8cNR0dwoI43RpQK8E0xTCgjFs`
    )
    .then(function (response) {
      books = response.data.items;
    });
  return {
    props: {
      nonFiction: books,
    },
  };
}
