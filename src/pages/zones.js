import { Link } from "gatsby"
import _ from "lodash"
import React from "react"

import Layout from "../components/layout"
import ZoneBadge from "../components/ZoneBadge"

const Zones = ({ data }) => {
  let zones = data.zones.edges.map(e => e.node.data)

  // group them into a new object by Group
  let zonesGrouped = _.groupBy(zones, "Group")

  // get those group names
  let zoneGroups = Object.keys(zonesGrouped)

  let sectionStyle = {
    padding: ".5em",
    marginBottom: `.5em`,
    color: "#222",
  }

  return (
    <Layout>
      <h1>Zones</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(420px, 1fr))`,
          gridGap: `1em`,
        }}
      >
        {zoneGroups.map(zg => (
          <div
            key={zg}
            style={{ background: "rgba(0,0,50,0.15)", padding: "1em" }}
          >
            <h3>{zg}</h3>
            {zonesGrouped[zg].map(z => (
              <ZoneBadge zone={z} link />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    zones: allAirtable(
      sort: { order: ASC, fields: data___Zone }
      filter: { table: { eq: "Codes" } }
    ) {
      edges {
        node {
          data {
            Name
            Zone
            Color
            TextColor
            Group
          }
        }
      }
    }
  }
`

export default Zones
