/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      allAirtable(filter: { table: { eq: "Codes" } }) {
        edges {
          node {
            id
            data {
              Name
              Zone
            }
          }
        }
      }
    }
  `)

  let zones = result.data.allAirtable.edges.map(e => e.node.data)

  zones.forEach(z => {
    createPage({
      path: `/zone/${z.Zone}`,
      component: path.resolve("./src/templates/zone-page.js"),
      context: {
        name: z.Name,
        zone: z.Zone,
      },
    })
  })
}
