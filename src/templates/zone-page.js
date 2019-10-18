import { Link, graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import ZoneMap from "../components/ZoneMap"

export default ({ data, pageContext }) => {
  let zone = data.airtable.data

  let headerStyle = {
    margin: 0,
  }

  let sectionStyle = {
    padding: "1em 0 1em 0",
    margin: `.5em 0 .5em 0`,
    color: "#222",
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: zone.Color,
          color: zone.TextColor,
          padding: 10,
        }}
      >
        <h1 style={headerStyle}>{zone.Zone}</h1>
        <h2 style={headerStyle}>{zone.Name}</h2>
      </div>
      <section style={sectionStyle}>
        <h3>Zone description</h3>
        <p>{zone.Description}</p>
      </section>
      <section style={sectionStyle}>
        <h3>Zone map</h3>
        <ZoneMap zone={zone} />
      </section>
      {zone.By_right_uses && (
        <section>
          <h3>By-right uses</h3>
          <ul>
            {zone.By_right_uses.map(u => (
              <li>
                <Link to={`/use/${u.data.Slug}`}>{u.data.Name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
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
            Slug
          }
        }
        Conditional_uses {
          data {
            Name
            Type
            Subgroup
            Slug
          }
        }
        Legislative_approval_uses {
          data {
            Name
            Type
            Subgroup
            Slug
          }
        }
      }
    }
  }
`
