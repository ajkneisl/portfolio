import Head from "next/head";
import styled from "styled-components";

type LayoutProps = {
    title?: string;
    children: JSX.Element[] | JSX.Element;
};

const Main = styled.main`
    animation: fadeIn;
    animation-duration: 1s;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 32px;
    min-height: calc(100vh - 40px);
    position: relative;
`;

const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    position: absolute;
    width: 100%;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Layout = ({ title, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title === undefined ? "AJ Kneisl" : title}</title>
                <link rel="icon" href="/icon.jpg" />
            </Head>

            <Main>{children}</Main>

            <Footer>
                <div>
                    <p>aj kneisl ©{new Date().getFullYear()}, aj@ajkneisl.dev</p>
                </div>
            </Footer>
        </>
    );
};

export default Layout;
