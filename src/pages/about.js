import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = (props) => (
    <Layout>
        <SEO title="About Us | Hola Cabo" description="Learn why we love Cabo and our mission in sharing the best of the Baja with you." />
        <div class="page">
            <h1>About</h1>

            <p>Say <span role="img" aria-label="Wave">👋</span> to the best of Los Cabos.</p>

            <p>
                Whether you are visiting Cabo for the first time, a seasonal regular or lifetime local, Hola Cabo is here to share everything there is to know about the hidden gems of the Baja Sur.
            </p>

            <p>
                <a href="https://instagram.com/holacabo">Follow us on Instagram</a> as we share our first-hand view of the best:
            </p>

            <p>•••</p>
            <ul style={{ listStyle: 'none' }}>
                <li>Restaurants in town, for all occasions</li>
                <li>Happy hours, drink specials, and deals</li>
                <li>Upcoming events, concerts, spots for live music</li>
                <li>Beautiful beaches, boat rides, fishing, whale watching and more</li>
                <li>Hidden gems, prop tips, and anything else we feel worthy of sharing!</li>
            </ul>
            <p>•••</p>

            <p>
                Looking to have your business or offering featured on Hola Cabo? <a href="/contact">Say hola</a>, we'd love to hear from you!
            </p>

            <p>Hasta luego,</p>
            <p>The Hola Cabo Team</p>
        </div>
        <footer style={{ height: '100px', backgroundColor: '#F6F8FA', position: 'absolute', bottom: '-400px', width: '100%', padding: '10px', textAlign: 'center', fontSize: '0.75rem' }}>
            <p style={{ marginTop: '20px' }}>A project by <a href="https://blueprintdigital.co" target="_blank" rel="noopener noreferrer">Blueprint Digital</a></p>
        </footer>
    </Layout>
)

export default AboutPage
