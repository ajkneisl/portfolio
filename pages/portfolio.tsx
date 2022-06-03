import { useState } from 'react'
import styled from 'styled-components'
import Layout from '../app/components/Layout'

const PortfolioStyle = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    ul {
        list-style-type: none;
        padding-left: 0;
    }

    li {
        cursor: pointer;
        font-size: 18px;
        text-decoration: underline;
    }

    #projects-view {
        max-width: 240px;
        min-width: 240px;

        max-height: 512px;
        min-height: 512px;

        overflow-y: scroll;
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */

        &::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
        }
    }

    #projects-list {
        max-width: 120px;
        min-width: 120px;

        justify-content: center;
        align-items: center;
    }

    /* When the browser is at least 600px and above */
    @media screen and (min-width: 600px) {
        flex-direction: row;
        justify-content: stretch;
        align-items: baseline;
    }
`

type Project = {
    title: string
    subtitle: string
    body: JSX.Element
    links: Link[]
}

type Link = {
    name: string
    url: string
}

const Discontinued = styled.span`
    color: gray;
`

const projects = {
    unifey: {
        title: 'Unifey',
        subtitle: 'Open-source social media website.',
        body: (
            <section>
                <p>
                    An open-sourced social-media website based off React and
                    Ktor.
                    <br />
                    It works based on different types of entities. These include
                    communities, users, and feeds.
                </p>

                <p>
                    <b>Community</b>
                    <br />A community is a group of users who are all entitled
                    to a community specific feed.
                </p>

                <p>
                    <b>Feed</b>
                    <br />
                    Each feed is an infinite scrolling list of posts, where
                    users with select permissions are able to create posts with
                    large amounts of text or images. This post is furthered
                    through the ability for other users to upvote, downvote, or
                    comment.
                </p>

                <p>
                    <b>Users</b>
                    <br />A user is an end-user's ability to interact with
                    Unifey and other entities within. Each user profile has
                    their own feed, which allows users to interact with other
                    users. Users can also friend and direct message eachother.
                </p>

                <h3>
                    <b>Backend</b>
                </h3>
                <p>
                    The backend is based off Ktor, a Kotlin web framework. It
                    utilizes REST and websockets for live notifications and
                    direct messaging. The backend is hosted through AWS, where
                    GitHub actions directly uploads it to an ECR repository and
                    deploys it on an ECS cluster.
                </p>

                <h3>
                    <b>Frontend</b>
                </h3>
                <p>
                    The frontend is based off a React-Redux framework. This is
                    hosted through AWS Amplify, where it is automatically built
                    and served.
                </p>
            </section>
        ),
        links: [
            { name: 'homepage', url: 'https://unifey.app' },
            { name: 'github', url: 'https://github.com/unifey-net' },
        ],
    },
    buta: {
        title: 'Buta',
        subtitle: 'Open-source Discord bot, focused on moderation.',
        body: <section></section>,
        links: []
    },
    printer: {
        title: 'printer',
        subtitle: 'A way to communicate with a receipt printer.',
        body: (
            <section>
                <p>
                    This is a combination of two different pieces of software,
                    combined to control a receipt printer through REST
                    endpoints.
                </p>
                <h3>
                    <b>Controller</b>
                </h3>
                <p>
                    The controller is Kotlin code that goes onto a Raspberry Pi.
                    This code is constatly watching a MongoDB database for new
                    entries. When there is a new entry, it serializes the entry
                    into a readable print request, then prints it.
                </p>

                <h3>
                    <b>Service</b>
                </h3>
                <p>
                    The service controlling what goes into the MongoDB is a Ktor
                    micro-service created using Kotlin. Through REST endpoints,
                    prints can be queued into the database, which eventually is
                    received by the controller.
                </p>
            </section>
        ),
        links: []
    },
}

const ProjectLi = styled.li<{ active: boolean }>`
    ${({ active }) =>
        active ? '&::before { content: "> "; text-decoration: none; }' : ''}
`

const NewPortfolio = () => {
    const [projectView, setProjectView] = useState<Project>()

    const presentProjectView = () => {
        if (projectView) {
            const { title, subtitle, body, links } = projectView!!

            return (
                <article>
                    <h2>{title}</h2>
                    {links.length > 0 && (
                        <p>
                            {links.map(({ url, name }, index) => (
                                <>
                                    <a href={url} target="_blank">
                                        {name}
                                    </a>
                                    {index - 1 !== links.length && <>, </>}
                                </>
                            ))}
                        </p>
                    )}
                    <h3>{subtitle}</h3>

                    {body}
                </article>
            )
        } else return <></>
    }

    return (
        <Layout>
            <PortfolioStyle>
                <section id="projects-list">
                    <h2>Projects</h2>
                    <a href="/">go back</a>
                    <ul>
                        {Object.keys(projects).map((key) => (
                            <ProjectLi
                                active={
                                    projectView?.title &&
                                    projectView.title.toLowerCase() ===
                                        key.toLowerCase()
                                }
                                onClick={() => setProjectView(projects[key])}
                            >
                                {key}
                            </ProjectLi>
                        ))}
                    </ul>
                </section>
                <section id="projects-view">
                    {projectView ? (
                        presentProjectView()
                    ) : (
                        <p>Please select a project.</p>
                    )}
                </section>
            </PortfolioStyle>
        </Layout>
    )
}

export default NewPortfolio
