import { Link } from 'react-router'
import PhotoGallery from '../features/photos/PhotoGallery'

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function Home() {
    return (
        <section className="home">
            <p>Student at the University of Minnesota studying Computer Science.</p>
            <p>
                Teaching Assistant at the{' '}
                <a href="https://cse.umn.edu" {...external}>College of Science and Engineering</a> and IT Lead at
                the <a href="https://it.umn.edu" {...external}>Office of Information Technology</a>. Previously
                at <a href="https://www.rbcwealthmanagement.com/en-us/" {...external}>RBC</a> working on
                Premium Savings.
            </p>
            <p>
                See more of my <Link to="/projects">projects</Link>.
            </p>

            <ul className="contact">
                <li><a href="mailto:aj@knei.sl"><strong>aj@knei.sl</strong></a></li>
                <li><a href="https://github.com/ajkneisl" {...external}>GitHub ↗</a></li>
                <li><a href="https://linkedin.com/in/ajkn" {...external}>LinkedIn ↗</a></li>
            </ul>

            <PhotoGallery />
        </section>
    )
}
