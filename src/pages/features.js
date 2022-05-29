import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const FeaturesPage = (props) => (
    <Layout>
        <SEO title="Featured Spots in Cabo San Lucas | Hola Cabo" description="Learn why we love Cabo and our mission in sharing the best of the Baja with you." />
        <div class="page">
            <h1>Features</h1>
            <p>•••</p>
            <ul style={{ listStyle: 'none' }}>
                <li>Restaurants in town, for all occassions</li>
                <li>Happy hours, drink specials, and deals</li>
                <li>Upcoming events, concerts, spots for live music</li>
                <li>Beautiful beaches, boat rides, fishing, whale watching and more</li>
                <li>Hidden gems, prop tips, and anything else we feel worthy of sharing!</li>
            </ul>
            <p>•••</p>

            <p>
                Looking to have your business or offering featured on Hola Cabo? <a href="/contact">Say hola</a>, we'd love to hear from you!
            </p>
        </div>
    </Layout>
)

export default FeaturesPage
