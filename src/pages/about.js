import React from "react"
import { Location } from '@reach/router'
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = (props) => (
    <Layout>
        <div class="page">
            <h1>About</h1>

            <p>Say 👋 to the best of Los Cabos.</p>

            <p>
                Whether you are visiting Cabo for the first time, a seasonal regular or lifetime local, Hola Cabo is here to share everything there is to know about the hidden gems of the Baja Sur.
            </p>

            <p>
                <a href="https://instagram.com/holacabo">Follow us on Instagram</a> as we share our first-hand view of the best:
            </p>

            <ul style={{ listStyle: 'none' }}>
                <li>🌮 Restaurants in town, for all occassions</li>
                <li>🍹Happy hours, drink specials, and deals</li>
                <li>📅 Upcoming events, concerts, spots for live music</li>
                <li>🏖️ Beautiful beaches, boat rides, fishing, whale watching and more</li>
                <li>💎 Hidden gems, prop tips, and anything else we feel worthy of sharing!</li>
            </ul>
            <p>Hasta luego,</p>
            <p>The Hola Cabo Team</p>
        </div>
    </Layout>
)

export default AboutPage
