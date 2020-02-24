import React from "react"
import { Location } from '@reach/router'
import Layout from "../components/layout"
import SEO from "../components/seo"

const ViewPostDetailPage = (props) => (
  <Layout>
    <Location>

      {({ location }) => {
        if (!location || !location.href) return <></>
        var url = location.href.split("?id=")[1]
        if (url.includes(":/") && !url.includes("://")) {
          /* Something in Gatsby or React sometimes deforms the URL so we need to fix it here. */
          url = url.replace(":/", "://")
        }

        return (
          <>
            <SEO title="Hola Cabo | Post Details" />
            <center>
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

export default ViewPostDetailPage
