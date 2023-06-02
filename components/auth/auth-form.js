import { useState, useRef } from "react";
import {signIn} from 'next-auth/client';
import { useRouter } from 'next/router';

function AuthForm() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const [userNotExist, setUserNotExist] = useState(false)
    const [userAlrExist, setUserAlrExist] = useState(false)
    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
        setUserNotExist(false)
        setUserAlrExist(false)
    }

    async function createUser(name, email, password) {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        if (!response.ok){
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    }


    async function submitHandler(event) {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            //log user in
            setUserNotExist(false)
            const result = await signIn('credentials', {
                redirect:false, 
                email: enteredEmail, 
                password: enteredPassword
            })
            if (!result.error) {
                console.log(result)
                console.log("successful login!")
                router.push('/books')
            } else {
                console.log(result.error)
                setUserNotExist(true)
            }

        } else {
            try {
                //create new user
                setUserNotExist(false)
                const enteredName = nameInputRef.current.value;
                const result = await createUser(enteredName, enteredEmail, enteredPassword);
                console.log("user created, going back to login");
                const logInResult = await signIn('credentials', {
                    redirect:false, 
                    email: enteredEmail, 
                    password: enteredPassword
                })
                router.push('/books')

            } catch(error) {
                console.log(error);
                setUserAlrExist(true)
            }
        }
    }

    return (
        <div className='bg-pink'>
            <div className='text-center pt-4'>
                <h1 className='pb-3 big-header-fonts'>{isLogin? 'Login' : 'Sign up'}</h1>
                <form onSubmit={submitHandler}>
                    {!isLogin &&
                    <div className='pb-3 medium-header-fonts'>
                        <label className='mx-5' htmlFor="name">Your Name</label>
                        <input className='mx-4' type='name' id='name' ref={nameInputRef}/>
                    </div>
                    }               
                    <div className='pb-3 medium-header-fonts'> 
                        <label className='mx-5' htmlFor="email">Your Email</label>
                        <input className='mx-4' type='email' id='email' required ref={emailInputRef}/>
                    </div>
                    <div className='pb-3 medium-header-fonts'>
                        <label className='mx-4' htmlFor="password">Your Password</label>
                        <input type="password" id="password" required ref={passwordInputRef}/>
                    </div>
                    <div>
                        <button className='mx-3 px-5 btn btn-yellow' >{isLogin ? 'Login': 'Create Account'}</button>
                        <button className='btn btn-yellow' type='button' onClick={switchAuthModeHandler}>
                            {isLogin ? 'Create New Account': 'Login with existing account'}
                        </button>
                    </div>
                </form>
                {userNotExist && <h2 className='text-center mx-4 pt-5 medium-header-fonts'>Unable to log you in. Ensure that your credentials are correct.</h2>}
                {userAlrExist && <h2 className='text-center mx-4 pt-5 medium-header-fonts'>Email is already taken! Log in instead.</h2>}
            </div>
        </div>
    )
}

export default AuthForm;