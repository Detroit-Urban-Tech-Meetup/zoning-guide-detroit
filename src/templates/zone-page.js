import { graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import ZoneMap from '../components/ZoneMap'

export default ({ data, pageContext }) => {
  let zone = data.airtable

  let headerStyle = {
    margin: 0
  }

  let sectionStyle = {
    padding: "1em 0 1em 0",
    margin: `.5em 0 .5em 0`,
    color: "#222",
    
  }

  return (
    <Layout>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: zone.data.Color, color: zone.data.TextColor, padding: 10}}>
      <h1 style={headerStyle}>{zone.data.Zone}</h1>
      <h2 style={headerStyle}>{zone.data.Name}</h2>
      </div>
      <section style={sectionStyle}>
        <h3>Zone description</h3>
        <p>{zone.data.Description}</p>
      </section>
      <section style={sectionStyle}>
        <h3>Zone map</h3>
        <ZoneMap zone={zone.data} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($zone: String!) {
    airtable(data: { Zone: { eq: $zone } }) {
      id
      data {
        Description
        Name
        Zone
        Group
        Color
        TextColor
        By_right_uses {
          data {
            Name
            Type
            Subgroup
          }
        }
        Conditional_uses {
          data {
            Name
            Type
            Subgroup
          }
        }
        Legislative_approval_uses {
          data {
            Name
            Type
            Subgroup
          }
        }
      }
    }
  }
`
