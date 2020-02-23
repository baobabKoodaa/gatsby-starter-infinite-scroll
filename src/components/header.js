
import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import DynamicIcon from './dynamicIcon';

const Header = ({ siteTitle, siteLogo, menuLinks, socialLinks }) => (
  <header
    style={{
      background: `white`,
      minHeight: `100px`,
    }}
  >
    <div
      style={{
        padding: `0.5rem`,
        justifyItems: "space-between",
      }}
    >
      {/* Brand Logo */}
      <img class="logo" height={100} width={'auto'} src={siteLogo}></img>

      <div class="navigation" style={{ display: 'flex', float: 'right', marginTop: '25px' }}>
        {/* Navigation Menu */}
        <nav>
          <ul style={{ display: "flex", flex: 1 }}>
            {menuLinks.map(link => (
              <li
                key={link.name}
                class="navigationItem"
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
                  class="navigationItem"
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
