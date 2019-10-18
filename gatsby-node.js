/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: ['null-loader']
          },
        ],
      }
    })
  }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      codes: allAirtable(filter: { table: { eq: "Codes" } }) {
        edges {
          node {
            data {
              Name
              Zone
            }
          }
        }
      }
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
  `)

  let zones = result.data.codes.edges.map(e => e.node.data)

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

  let uses = result.data.uses.edges.map(e => e.node.data)

  uses.forEach(u => {
    createPage({
      path: `/use/${u.Slug}`,
      component: path.resolve("./src/templates/use-page.js"),
      context: {
        slug: u.Slug
      },
    })
  })  
}
