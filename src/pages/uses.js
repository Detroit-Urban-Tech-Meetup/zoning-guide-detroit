import { Link } from "gatsby"
import _ from "lodash"
import React from "react"

import Layout from "../components/layout"

const Uses = ({ data }) => {
  let uses = data.uses.edges.map(e => e.node.data).filter(u => u.complete)

  // group initially by Type
  let usesByType = _.groupBy(uses, "Type")

  // object we'll use to map through both Type and Subgroup
  let usesGrouped = {}
  // populate usesGrouped using the Type grouping and also Subgroup.
  // two-level-nested object!
  Object.entries(usesByType).forEach(type => {
    usesGrouped[type[0]] = _.groupBy(type[1], "Subgroup")
  })

  let sectionStyle = {
    padding: ".5em",
    marginBottom: `.5em`,
    color: "#222",
  }

  return (
    <Layout>
      <h1>Uses</h1>
      {Object.keys(usesByType).map(type => {
        return (
          <>
            <h2>{type}</h2>
            {Object.keys(usesGrouped[type]).map(sg => (
              <>
                <h3>{sg}</h3>
                <ul>
                  {usesGrouped[type][sg].map(use =>
                    use.complete ? (
                      <Link to={`/use/${use.Slug}`}>
                        <li>{use.Name}</li>
                      </Link>
                    ) : (
                      <li>{use.Name}</li>
                    )
                  )}
                </ul>
              </>
            ))}
          </>
        )
      })}
      {/* {uses.map(u => (
        <div>{u.Name}</div>
      ))} */}
    </Layout>
  )
}

export const query = graphql`
  {
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

export default Uses
