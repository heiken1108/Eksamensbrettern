import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
    return (
    <>
    <Navbar />
    <Component {...pageProps} />
    </>
);
}

export default MyApp;