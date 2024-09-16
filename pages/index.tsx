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
                    <h1 className="title">hello!</h1>
                </section>
            </HomeStyle>
        </Layout>
    )
}

export default Home
