import AddReview from "./add-review";
import Review from "./review";

export default function ReviewList({book, reviews}) {
    // console.log("REVIEWS " + reviews[0].description);

    return (
        <div className='text-center'>
            <div className='container d-flex justify-content-center col-12 col-sm-8 col-md-8 col-lg-8'>
                <div className='w-50 mb-5'>
                <AddReview book={book}/>
                
                {reviews &&
                
                <div>
                    {reviews.map(review => (
                        <Review key={review.id} review={review}/>
                    ))}
                </div>
            
                }
                </div>
            </div>
        </div>
    )
}
