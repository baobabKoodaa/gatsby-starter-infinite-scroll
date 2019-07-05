import React from "react"
import { Location } from '@reach/router'
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = (props) => (
  <Layout>
    <Location>

      {({ location }) => {
        if (!location || !location.href) return <></>
        const url = location.href.split("?id=")[1]
        return (
          <>
            <SEO title="Second Page" />
            <center>
              <br/><br/>

              <p>This page exists to demonstrate behavior when you click back (infinite scroll state is maintained).</p>

              <img
                src={url}
                alt="Larger version"
                title="Image from Unsplash"
                style={{
                  maxWidth: "80vw",
                  maxHeight: "70vh"
                }}
              />
            </center>
          </>
        )
      }}
    </Location>
  </Layout>
)

export default SecondPage
