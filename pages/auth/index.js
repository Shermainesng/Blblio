import { Suspense } from 'react';
import Router, { useRouter } from 'next/router';
import {useEffect, useState} from 'react'
import AuthForm from "@/components/auth/auth-form";
import Loading

from '@/components/ui/Loading';
export default function auth() {

    return (
       
        <AuthForm/>

    )
}
