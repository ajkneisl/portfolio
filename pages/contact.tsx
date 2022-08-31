import Layout from "../app/components/Layout";
import styled from "styled-components";
import Link from "next/link";
import Breadcrumbs from "../app/components/Breadcrumbs";

const Title = styled.h1`
    margin-bottom: 48px;
`;

const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Contact = () => {
    return (
        <Layout>
            <Breadcrumbs/>
            <Title>contact</Title>

            <Links>
                <Link href="mailto:aj@ajkneisl.dev">email: aj@ajkneisl.dev</Link>
                <Link href="https://github.com/shoganeko">github</Link>
            </Links>
        </Layout>
    );
};

export default Contact;
