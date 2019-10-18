import { graphql } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import ZoneBadge from "../components/ZoneBadge"

// import ZoneMap from '../components/ZoneMap'

export default ({ data, pageContext }) => {
  let use = data.airtable.data

  console.log(use)

  let headerStyle = {
    marginBottom: 10,
  }

  let subheaderStyle = {
    marginBottom: 10,
    fontWeight: 500,
  }

  let sectionStyle = {
    padding: "1em",
    margin: `.5em 0 .5em 0`,
    color: "#222",
    background: `rgba(0,0,50,0.05)`,
  }

  return (
    <Layout>
      {/* {use.Name} */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // padding: `10px 0px`,
        }}
      >
        <h3 style={headerStyle}>{use.Name}</h3>
        <div>
          <h4 style={subheaderStyle}>Type: {use.Type}</h4>
          <h4 style={subheaderStyle}>Subtype: {use.Subgroup}</h4>
        </div>
      </div>
      {use.Definition && (
        <section style={sectionStyle}>
          <h4>Definition</h4>
          <span>{use.Definition}</span>
        </section>
      )}
      {use.Use_Regulations && (
        <section style={sectionStyle}>
          <h4>Use regulations</h4>
          <span>{use.Use_Regulations}</span>
        </section>
      )}
      {use.By_right_in && (
        <section style={sectionStyle}>
          <h4>By-right in these zones:</h4>
          {use.By_right_in.map(z => (
            <ZoneBadge zone={z.data} />
          ))}
        </section>
      )}
      {use.Conditional_in && (
        <section style={sectionStyle}>
          <h4>Conditional in these zones:</h4>
          {use.Conditional_in.map(z => (
            <ZoneBadge zone={z.data} />
          ))}
        </section>
      )}
      {use.Legislative_approval_in && (
        <section style={sectionStyle}>
          <h4>Legislative approval in these zones:</h4>
          {use.Legislative_approval_in.map(z => (
            <ZoneBadge zone={z.data} />
          ))}
        </section>
      )}
      {/* <section style={sectionStyle}>
        <h3>Zone description</h3>
        <p>{zone.data.Description}</p>
      </section>
      <section style={sectionStyle}>
        <h3>Zone map</h3>
        <ZoneMap zone={zone.data} />
      </section> */}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    airtable(data: { Slug: { eq: $slug } }) {
      data {
        Name
        Type
        Subgroup
        Definition
        Use_Regulations
        By_right_in {
          data {
            Zone
            Name
            Color
            TextColor
          }
        }
        Conditional_in {
          data {
            Zone
            Name
            Color
            TextColor
          }
        }
        Legislative_approval_in {
          data {
            Zone
            Name
            Color
            TextColor
          }
        }
      }
    }
  }
`
