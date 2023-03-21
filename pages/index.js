import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

//GET DATA FROM PRISMADB 
export async function getServerSideProps() {
  const lists = await prisma.List.findMany();
  return {
    props: {
      initialLists: lists
    }
  };
}

const inter = Inter({ subsets: ['latin'] })

export default function Home({initialLists}) {
  console.log({initialLists});
  return (
    <div>
      hello
    </div>
  )
}
