import Navbar from "../components/Navbar/Navbar";
import { MathJaxContext } from "better-react-mathjax"; // Replace "your-mathjax-package" with the actual package name
import "../styles/globals.css";
import { AppProps } from "next/app";


function MyApp({ Component, pageProps }: AppProps) {
    return (
    <MathJaxContext>
        <Navbar />
        <Component {...pageProps} />
    </MathJaxContext>
);
}

export default MyApp;