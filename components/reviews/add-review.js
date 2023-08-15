import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef,useState } from 'react'
// import {useSession, getSession} from 'next-auth/client'
import {useSession, getSession} from 'next-auth/react'
import React, { useEffect } from 'react'
import ReactStars from 'react-stars'
import { Avatar, Grid } from "@nextui-org/react";

export default function AddReview({book}) {
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)
    const [inputValue, setInputValue] = useState(0);
    const { data: session, status } = useSession()

    const bookId = book.id;
    const ratingRef = useRef();
    const descriptionRef = useRef();
    const userName = session.user.name;
    const userAvatar = session.user.image;

    const ratingStars = {
        count:5,
        value:inputValue,
        onChange: newRating => {
            console.log(newRating)
            setInputValue(newRating)
        },
        half:false,
        size:24,
        color2:'#ffd700'
    }

    useEffect(() => {
        getSession().then(session => {
            setIsLoading(false);
            if(!session) {
                window.location.href = '/auth'
            }
        })
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        const rating = parseInt(inputValue);
        console.log("RATING " + inputValue)
        const description = descriptionRef.current.value;
        const {data} = await axios.post('/api/reviews', {
            userName,
            userAvatar,
            rating, 
            description, 
            bookId
        })
        router.reload();
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <div className='card'>
            <div className='card-header d-flex flex-row justify-content-start align-items-center review-header'>
                <Grid>
                    <Avatar className='mx-2'
                    src={session.user.image} 
                    size="md"/>
                </Grid>
                <p>Review by: {userName}</p>
                   
               
            </div>
            <div class="card-body d-flex flex-column review-body justify-content-center">
                <form onSubmit = {handleSubmit}>
                    <div className='d-flex flex-row align-items-center justify-content-center'>
                        <p class="card-title">your rating:</p>
                        <ReactStars className='pb-2' {...ratingStars}/>
                    </div>
                    <div>
                        <textarea className='input-field text-center' placeholder='hate it? love it? post a review...go!' type='description' id='description' ref={descriptionRef}></textarea>
                    </div>
                <button className='mt-2 btn btn-yellow'>Add Review</button>
            </form>
            </div>
        </div>
    )
}

