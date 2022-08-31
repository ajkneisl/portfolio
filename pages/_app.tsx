import { createGlobalStyle } from "styled-components";
import Seo from "../app/util/Seo"

const GlobalStyle = createGlobalStyle`
    html, body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

        background-color: #151416;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    p, h1, h2, h3, li {
        color: white;
        font-weight: 300;
    }

    a {
        color: whitesmoke;
        text-decoration: underline;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;

const Portfolio = ({ Component, pageProps }) => {
    return (
        <>
            <GlobalStyle/>
            {Seo}
            <Component {...pageProps} />
        </>
    );
}

export default Portfolio;