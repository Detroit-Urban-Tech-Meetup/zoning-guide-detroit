import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

let linkStyle = {
  textDecoration: `underline dotted`,
  color: '#444',
  padding: '10px 0px',
  marginRight: '1em',
  fontWeight: 700
}

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: 'rgba(0,0,50,0.25)',
      marginBottom: `1.05rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1080,
        padding: `1.05rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    <div style={{display: 'flex'}}>
      <Link to={`/`} style={linkStyle}>Home</Link>
      <Link to={`/map`} style={linkStyle}>Map</Link>
      <Link to={`/about`} style={linkStyle}>About</Link>
      <Link to={`/links`} style={linkStyle}>Links</Link>
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
