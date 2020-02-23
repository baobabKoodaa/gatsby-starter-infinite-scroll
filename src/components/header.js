import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
    }}
  >
    <div
      style={{
        margin: `0 auto 2px`,
        padding: `0.5rem`,
      }}
    >
      <img style={{ margin: '0 auto', paddingLeft: '20px' }} height={100} width={'auto'} src="https://nightlife2-webapp.s3.amazonaws.com/HolaCabo%20Logo%20Final%201024.png"></img>
      {/* <nav>
        <ul style={{ display: "flex", flex: 1, float: 'right' }}>
          <li
            key='Hey'
            style={{
              listStyleType: `none`,
              padding: `1rem`,
            }}
          >
            <Link style={{ color: `white` }} to={''}>
              {'Cool stuff'}
            </Link>
          </li>
        </ul>
      </nav> */}
    </div>

  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
