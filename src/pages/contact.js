import React from "react"
import { Location } from '@reach/router'
import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = (props) => (
    <Layout>
        <h1>Contact Us</h1>
        <div>
            <form method="post" action="https://getform.io/{your-unique-getform-endpoint}">
                ...
            <label>
                    Email
                <input type="email" name="email" />
                </label>
                <label>
                    Name
                <input type="text" name="name" />
                </label>
                <label>
                    Message
                <input type="text" name="message" />
                </label>
                ...
            </form>
        </div>
    </Layout>
)

export default ContactPage
