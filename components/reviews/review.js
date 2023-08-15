import {useSession, getSession} from 'next-auth/react';
import { Avatar, Grid } from "@nextui-org/react";
import ReactStars from 'react-stars'

export default function Review(props) {
    const { data: session, status } = useSession();
    // const review = props.review.userName
    // console.log(props.review)

    const {userName, userAvatar, rating, description, assignedAt} = props.review;

    const ratingStars = {
        count:5,
        value:rating,
        size:24,
        edit:false,
        color2:'#ffd700'
    }
  
    return (
        <div class="card mt-3">
            <div class="card-header d-flex flex-row justify-content-start align-items-center review-header">
                <Grid>
                    <Avatar className='mx-2'
                    src={userAvatar} 
                    size="md"/>
                </Grid>
                <div>
                    <p>Review by {userName}</p>
                    <div>
                        <ReactStars className='d-flex justify-content-center' {...ratingStars}/>
                    </div>
                </div>
            </div>
            
            <div class="card-body d-flex review-body justify-content-start">
                <q class="card-text mx-2">{description}</q>
            </div>   
        </div>
        
    )
}
