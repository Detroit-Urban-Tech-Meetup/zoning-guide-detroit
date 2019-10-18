import React from 'react';
import Layout from '../components/layout';

const Uses = ({ data }) => {

  let uses = data.uses.edges.map(e => e.node.data)

  return (
    <Layout>
      <h1>Uses</h1>
      {uses.map(u => (
        <div>{u.Name}</div>
      ))}
    </Layout>
  )
}

export const query = graphql`
{
  uses: allAirtable(filter: { table: { eq: "Uses" } }) {
    edges {
      node {
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

export default Uses;