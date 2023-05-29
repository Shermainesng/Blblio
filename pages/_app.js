// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
import '../styles/bootstrap-custom.scss'; //override the bootstrap classes with my own

import '@/styles/globals.css'
import 'styles/styles.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import Navbar from "@/components/ui/Navbar";
import {Provider} from 'next-auth/client'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    typeof document !== undefined
    ? require ("bootstrap/dist/js/bootstrap")
    : null;
  }, [router.events]);

  return (
      <div>
        <Provider session={pageProps.session}>
          <Navbar/>
            <Component {...pageProps} />
            </Provider>
      </div>
  )
}

