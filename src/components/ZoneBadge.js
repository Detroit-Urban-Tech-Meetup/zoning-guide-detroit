import React from "react"
import {Link} from 'gatsby'

const ZoneBadge = ({ zone }) => (
  <div style={{marginBottom: 4}}>
    <span
      style={{
        display: 'inline-block',
        background: zone.Color,
        color: zone.TextColor,
        textAlign: "center",
        fontWeight: 600,
        fontSize: 24,
        letterSpacing: `-1px`,
        width: 80,
        padding: 5,
        border: `3px solid #333`
      }}
    >
      {zone.Zone}
    </span>
    <span style={{fontSize: '1em', fontWeight: 600, padding: 10}}>
      <Link to={`/zone/${zone.Zone}`}>
        {zone.Name.replace("District", "").replace("Special Development", "Special")}
      </Link>
    </span>
  </div>
)

export default ZoneBadge
