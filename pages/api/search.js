import useSWR from 'swr';


export default async function handler(req, res) {
    const fetcher = async (url) => await axios.get(url).then((res) => res.data);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data, error} = useSWR(`https://www.googleapis.com/books/v1/volumes?q=${req.query.title}&maxResults=10`, fetcher)
    if (error) return <div>failed to load</div>
    if(!data) return <div>loading</div>
    console.log(data)


	// const options = {
	// 	method: 'GET',
	// 	url: `https://www.googleapis.com/books/v1/volumes?q=${req.query.title}&maxResults=10`,
	// 	headers: {
	// 		'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com',
	// 		'X-RapidAPI-Key': NEXT_PUBLIC_RAPIDAPI_KEY
	// 	}
	// };
	// try {
	// 	let response = await axios(options);
	// 	res.status(200).json(response.data);
	// } catch (error) {
	// 	console.error(error.response);
	// }
}