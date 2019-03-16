import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import 'typeface-open-sans/index.css'
import "./layout.css"
import ribbon from "../../static/forkme_right_orange_ff7600.png"

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
                {/* GitHub Ribbon */}
                <a href="https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll">
                  <img
                    src={ribbon}
                    alt="Fork me on GitHub"
                    className="ribbon"
                  >
                  </img>
                  <style jsx>{`
                    .ribbon {
                      position: fixed;
                      top: 0;
                      right: 0;
                      border: 0;
                      z-index: 1000;
                      transition: 0.2s ease-in-out;

                      :hover {
                        transform: scale(1.2);
                      }
                    }
                  `}
                  </style>
                </a>
                
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
