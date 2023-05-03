/* eslint-disable react-hooks/rules-of-hooks */
import SearchInput from '@/components/ui/SearchInput';
import { useState } from 'react';
import useSWR from 'swr';


export default function searchBooks() {



    return(
        <div>
            <div className='container-fluid bg-orange'>
                    <SearchInput/>

            </div>
             
        </div>
    )
}

