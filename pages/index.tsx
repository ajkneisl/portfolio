import styled from 'styled-components'
import Layout from '../app/components/Layout'
import Link from 'next/link'

const Navigation = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-left: 12px;
`

const HomeStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: space-between;

    .title {
        font-size: 64px;
        font-family: 'Montserrat', sans-serif;
    }
`

const Home = () => {
    return (
        <Layout>
            <HomeStyle>
                <section>
                    <h1 className="title">aj kneisl</h1>
                    <p>fullstack highschool developer.<br/>experienced in jvm languages and javascript.</p>
                </section>

                <section>
                    <Navigation>
                        <Link href="/portfolio">portfolio</Link>
                        <Link href="/contact">contact</Link>
                    </Navigation>
                </section>
            </HomeStyle>
        </Layout>
    )
}

export default Home
