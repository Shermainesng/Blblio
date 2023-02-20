import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef,useState } from 'react'

export default function NewList() {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    async function handleSubmit(event) {
        event.preventDefault();
        const title = titleInputRef.current.value;
        const description = descriptionInputRef.current.value;
        const {data} = await axios.post('/api/lists', {
            title,
            description,
        })
        console.log(data)
    }

    return (
        <div>
            <h1>Add a new list!</h1>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor='title'>Title of your list:</label>
                    <input type='title' id='title' ref={titleInputRef}></input>
                </div>
                <div>
                    <label htmlFor='description'>Describe your list:</label>
                    <input type='description' id='description' ref={descriptionInputRef}></input>
                </div>
                <button>Create List</button>
            </form>
        </div>
    )
}