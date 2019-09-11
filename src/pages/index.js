import { Link, graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  let zones = data.allAirtable.edges.map(e => e.node.data)

  return (
    <Layout>
      <SEO title="Detroit zoning guide" />
      <ul>
        {zones.map(z => (
          <Link key={z.Name} to={`/zone/${z.Zone}`}>
            <li>
              {z.Zone} {z.Name}
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Codes" } }) {
      edges {
        node {
          data {
            Name
            Zone
          }
        }
      }
    }
  }
`

export default IndexPage
