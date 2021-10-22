import styled from 'styled-components'
import Layout from '../app/components/Layout';
import Link from "next/link"

const Navigation = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-left: 12px;
`;

const HomeStyle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
    justify-content: space-between;

    .border {
        border: 1px solid gray;
    }

    .child {
        min-width: 300px;
    }

    .title {
        font-size: 64px;
        font-family: "Montserrat", sans-serif;

        margin-bottom: -16px;
    }

    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    .projects {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }
`;

const Home = () => {
    return (
        <Layout>
            <HomeStyle>
                <div className="child">
                    <h1 className="title">AJ Kneisl</h1>
                    <p>Fullstack Developer</p>
                </div>

                <div className="border" />

                <div className="child right">
                    <div className="projects">
                        <div>
                            <h3>
                                <Link href="https://unifey.ajkneisl.dev">
                                    Unifey
                                </Link>
                            </h3>
                        </div>
                    </div>

                    <Navigation>
                        <Link href="/portfolio">portfolio</Link>
                        <Link href="/contact">contact</Link>
                    </Navigation>
                </div>
            </HomeStyle>
        </Layout>
    );
}

export default Home;
