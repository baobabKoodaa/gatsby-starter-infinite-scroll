import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import 'typeface-open-sans/index.css'
import "./layout.css"
import ribbon from "../../static/forkme_right_orange_ff7600.png"

const Layout = ({ children }) => (
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

        {/* GitHub Ribbon */}
        <a href="https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll">
          <img
            src={ribbon}
            alt="Fork me on GitHub"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              border: 0
            }}>
          </img>
        </a>
        
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: "100vw",
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
