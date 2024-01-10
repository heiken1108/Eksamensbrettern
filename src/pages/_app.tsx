import Navbar from "../components/Navbar/Navbar";
import { MathJaxContext } from "better-react-mathjax"; // Replace "your-mathjax-package" with the actual package name
import "../styles/globals.css";
import { AppProps } from "next/app";

import { ApolloProvider } from '@apollo/client'

import client from "../graphql/apollo-client"

function MyApp({ Component, pageProps }: AppProps) {
    return (
    <ApolloProvider client={client}>
        <MathJaxContext>
            <Navbar />
            <Component {...pageProps} />
        </MathJaxContext>
    </ApolloProvider>
);
}

export default MyApp;