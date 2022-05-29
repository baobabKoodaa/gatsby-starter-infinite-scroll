
import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import DynamicIcon from './dynamicIcon';

function onMouseOver(event) {
  event.currentTarget.src = "https://nightlife2-webapp.s3.amazonaws.com/HolaCabo%20Logo%20Final%201024-Hover.png"
}
function onMouseOut(event) {
  event.currentTarget.src = "https://nightlife2-webapp.s3.amazonaws.com/HolaCabo%20Logo%20Final%201024.png"
}

const Header = ({ siteTitle, siteLogo, menuLinks, socialLinks }) => (
  <header className="header">
    <div
      style={{
        padding: `0.5rem`,
        justifyItems: "space-between",
        whiteSpace: 'nowrap',
        textAlign: 'center',
        margin: '0 auto'
      }}
    >
      {/* Brand Logo */}
      <span className="helper"></span>
      <div className="headerLogoTitleContainer">
        <a href="/"><img alt="Hola Cabo Logo" className="logo" height={100} width={'auto'} src={siteLogo} onMouseOver={onMouseOver} onMouseOut={onMouseOut} /></a>
        <div class="row">
          <h1 className="title">Hola Cabo</h1>
          <h2 className="subtitle">Your locals guide to Los Cabos</h2>
        </div>
      </div>
      <div className="navigation">

        {/* Navigation Menu */}
        <nav>
          <ul style={{ display: "flex", flex: 1 }}>
            {menuLinks.map(link => (
              <li
                key={link.name}
                className="navigationItem"
              >
                <Link
                  to={link.link}
                  activeClassName="navigationItem--active"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {socialLinks.map(link =>
            (
              <li
                key={link.name}
                className="navigationItem"
              >
                <a
                  href={link.link}
                >
                  <DynamicIcon tag={link.icon} />
                </a>
              </li>
            ))}

          </ul>

        </nav>
      </div>
      {/* <h6>food • cocktails • lifestyle • events</h6> */}
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
