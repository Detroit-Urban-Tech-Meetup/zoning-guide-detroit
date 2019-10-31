import { graphql } from "gatsby"
import _ from "lodash"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ZoneBadge from "../components/ZoneBadge"

const IndexPage = ({ data }) => {
  // grab the zones from the GraphQL query
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
      <h1>Home</h1>
      <SEO title="Detroit Zoning" />
      <section style={sectionStyle}>
        <p>{data.site.siteMetadata.description}</p>
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
    uses: allAirtable(
      sort: { order: ASC, fields: data___Name }
      filter: { table: { eq: "Uses" } }
    ) {
      edges {
        node {
          data {
            Name
            Type
            Subgroup
            Slug
            Definition
            Use_Regulations
            complete
          }
        }
      }
    }
  }
`

export default IndexPage
