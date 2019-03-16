import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = (props) => (
  <Layout>
    <SEO title="Second Page" />
    <center>
      <br/><br/>
      <p>This page exists to demonstrate behavior when you click back (infinite scroll state is maintained).</p>
      <br/><br/>
      {props.location.state && props.location.state.img &&
        <img
          src={props.location.state.img}
          alt="Larger version"
          title="Image from Unsplash"
          style={{
            width: "80%",
            height: "auto"
          }}
        />
      }
    </center>
  </Layout>
)

export default SecondPage
