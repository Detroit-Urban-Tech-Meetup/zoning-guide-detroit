import { graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"

export default ({ data, pageContext }) => {
  let zone = data.airtable

  console.log(zone)

  return (
    <Layout>
      <h1>{zone.data.Zone}</h1>
      <h2>{zone.data.Name}</h2>
      <p>{zone.data.Description}</p>
    </Layout>
  )
}

export const query = graphql`
  query($zone: String!) {
    airtable(data: { Zone: { eq: $zone } }) {
      id
      data {
        By_right_uses
        Conditional_uses
        Description
        Name
        Site_plan_review
        Zone
      }
    }
  }
`
