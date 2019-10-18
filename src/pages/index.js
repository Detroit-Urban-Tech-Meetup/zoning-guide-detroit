import { graphql } from "gatsby"
import React from "react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ZoneBadge from "../components/ZoneBadge"

const IndexPage = ({ data }) => {
  // grab the zones from the GraphQL query
  let zones = data.allAirtable.edges.map(e => e.node.data)

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
      <SEO title="Detroit Zoning" />
      <section style={sectionStyle}>
        <p>{data.site.siteMetadata.description}</p>
      </section>
      <section style={sectionStyle}>
        <h2>Zones</h2>
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
                <ZoneBadge zone={z} link/>
              ))}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allAirtable(
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

export default IndexPage
