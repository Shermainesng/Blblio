import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef,useState } from 'react'
import {useSession, getSession} from 'next-auth/client'
import { useEffect } from 'react'

export default function NewList({session, user}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)
    console.log("session" , session);

    useEffect(() => {
        getSession().then(session => {
            setIsLoading(false);
            if(!session) {
                window.location.href = '/auth'
            }
        })
    }, [])

    
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    async function handleSubmit(event) {
        event.preventDefault();
        const title = titleInputRef.current.value;
        const description = descriptionInputRef.current.value;
        const userId = user.id;
        const {data} = await axios.post('/api/lists', {
            title,
            description,
            userId
        })
        router.push("/lists")
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div className='bg-pink'>
            <div className='d-flex flex-column text-center pt-4 pb-5'>
            <h1 className='big-header-fonts'>Add a new list!</h1>
            <form onSubmit = {handleSubmit}>
                <div>
                    <input className='input-field big-header-fonts mb-2 text-center' type='title' id='title' ref={titleInputRef} placeholder='enter a title'></input>
                </div>
                <div>
                    {/* <label htmlFor='description'>Describe your list:</label> */}
                    <textarea className='input-field small-header-fonts text-center' placeholder='describe your list' type='description' id='description' ref={descriptionInputRef}></textarea>
                </div>
                <button className='mt-4 btn btn-yellow'>Create List</button>
            </form>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }
    const user = await prisma.User.findFirst(
        {
            where: {
                email: session.user.email,
            },
        }
    );


    return {
        props: {
            session,
            user
        }
    }
}