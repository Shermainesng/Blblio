// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
import '../styles/bootstrap-custom.scss'; //override the bootstrap classes with my own
import '../styles/nprogress.css';
import '@/styles/globals.css'
import 'styles/styles.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import Navbar from "@/components/ui/Navbar";
import { SessionProvider } from "next-auth/react"
// import {Provider} from 'next-auth/client'
import { useState } from "react";
import NProgress from 'nprogress';

// function Loading() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const handleStart = (url) => (url !== router.asPath) && setLoading(true);
//     const handleComplete= (url) => (url === router.asPath) && setTimeout(() => {setLoading(false)}, 5000);

//     router.events.on('routerChangeStart', handleStart)
//     router.events.on('routerChangeComplete', handleComplete)
//     router.events.on('routerChangeError', handleComplete)

//     return () => {
//       router.events.off('routerChangeStart', handleStart)
//       router.events.off('routerChangeComplete', handleComplete)
//       router.events.off('routerChangeError', handleComplete)

//     }
//   })
  // return loading && (
  //   <div className='spinner-wrapper'>
  //     <div className='spinner-grow text-primary'></div>
  //   </div>
  // )
// }

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () =>  NProgress.start());
    router.events.on('routeChangeComplete', () =>  NProgress.done());
    router.events.on('routeChangeError', () =>  NProgress.done());
  }, []);

  useEffect(() => {
    typeof document !== undefined
    ? require ("bootstrap/dist/js/bootstrap")
    : null;
  }, [router.events]);

  return (
      <div>
        <SessionProvider session={pageProps.session}>
          <Navbar/>
            {/* <NextNProgress /> */}
            {/* <Loading/> */}
            <Component {...pageProps} />
        </SessionProvider>
      </div>
  )
}

