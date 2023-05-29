import Router, { useRouter } from 'next/router';
import {getSession} from 'next-auth/client'
import {useEffect, useState} from 'react'
import AuthForm from "@/components/auth/auth-form";

export default function auth() {

    return (
        <AuthForm/>
    )
}
