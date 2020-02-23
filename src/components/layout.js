import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import 'typeface-open-sans/index.css'
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
              }
            }
          }
        `}
        render={data => (
          <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: `0 auto`,
                maxWidth: "100vw",
                padding: `0px 0px 1.45rem`,
                paddingTop: 0,
                paddingLeft: "2px",
                paddingRight: "2px"
              }}
            >
              <main>{this.props.children}</main>
              <footer>
              </footer>
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
