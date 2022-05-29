import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import 'typeface-open-sans/index.css'
import '@fontsource/caveat'
import "./layout.css"

class Layout extends React.Component {

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                logo
                menuLinks {
                  name
                  link
                }
                socialLinks {
                  name
                  link
                  icon
                }
              }
            }
          }
        `}
        render={data => (
          <>
            <Header
              siteTitle={data.site.siteMetadata.title}
              siteLogo={data.site.siteMetadata.logo}
              menuLinks={data.site.siteMetadata.menuLinks}
              socialLinks={data.site.siteMetadata.socialLinks} />

            <div
              style={{
                margin: `0 auto`,
                maxWidth: "100vw",
                paddingTop: 0,
                paddingLeft: "2px",
                paddingRight: "2px"
              }}
            >
              <main style={{ marginTop: '20px' }}>
                {this.props.children}
              </main>
            </div>
          </>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
