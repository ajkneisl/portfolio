import Link from "next/link";
import styled from "styled-components";
import Layout from "../app/components/Layout";
import Logo from "../app/components/Logo";

type ProjectArgs = {
    title: string;
    desc: string;
    links: JSX.Element[];
    icons: JSX.Element[] | JSX.Element;
    index: number
};

type ProjectStyleArgs = {
    duration: number
}

const Project = ({ title, desc, links, icons, index }: ProjectArgs) => {
    const ProjectBody = styled.div<ProjectStyleArgs>`
        animation: fadeIn;

        ${({ duration }: ProjectStyleArgs) => `animation-duration: ${duration}s;` }

        border-radius: 4px;
        position: relative;
        color: white;
        background-color: #1d1b1c;
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 16px;
        min-height: 232px;

        max-width: 256px;

        p {
            margin-bottom: 32px;
        }

        .project-footer {
            position: absolute;
            bottom: 0;
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;

            margin-bottom: 16px;
            width: 224px;

            .icons {
                display: flex;
                justify-content: space-evenly;
                flex-direction: row;
            }

            .links {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                list-decoration: none;
            }
        }
    `;

    return (
        <ProjectBody
            duration={index}
        >
            <h1>{title}</h1>
            <p>{desc}</p>
            <div className="project-footer">
                <div className="icons">{icons}</div>
                <div className="links">
                    {links.map((link: JSX.Element, index: number) => {
                        return index + 1 === links.length ? (
                            <div key={index}>{link}</div>
                        ) : (
                            <div key={index}>{link} / </div>
                        );
                    })}
                </div>
            </div>
        </ProjectBody>
    );
};

const ProjectLists = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 256px;
    min-width: 256px;
    @media only screen and (min-width: 600px) {
        max-width: 520px;
    }

    @media only screen and (min-width: 830px) {
        max-width: 816px;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;

    a {
        margin-top: 38px;
        margin-left: 4px;
    }
`

const Portfolio = () => {
    return (
        <Layout>
            <Title>
                <h1>projects</h1>
                <Link href="/">back</Link>
            </Title>
            <ProjectLists>
                <Project
                    index={0}
                    title="Unifey"
                    desc="An open-source social media platformed focused on privacy."
                    links={[
                        <a href="https://github.com/unifey-net">GitHub</a>,
                        <a href="https://unifey.app">Unifey</a>,
                    ]}
                    icons={[<Logo name={"react"} />, <Logo name={"kotlin"} />]}
                />

                <Project
                    index={1}
                    title="Buta"
                    desc="A bot for the chatting platform Discord. Provides a elegant user experience with it's integrated web panel."
                    links={[
                        <a href="https://github.com/shoganeko/buta">GitHub</a>,
                    ]}
                    icons={[<Logo name={"react"} />, <Logo name={"kotlin"} />]}
                />

                <Project
                    index={2}
                    title="SpotKey"
                    desc="An open-source way to add short-cuts onto Spotify."
                    icons={[<Logo name={"kotlin"} />]}
                    links={[
                        <a href="https://github.com/shoganeko/spotkey">
                            GitHub
                        </a>,
                    ]}
                />

                <Project
                    index={3}
                    title="Portfolio"
                    desc="This portfolio. Made in Next.js and hosted using Vercel."
                    icons={[<Logo name={"react"} />]}
                    links={[
                        <a href="https://github.com/shoganeko/portfolio">
                            GitHub
                        </a>,
                    ]}
                />
            </ProjectLists>
        </Layout>
    );
};

export default Portfolio;
