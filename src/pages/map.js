import chroma from "chroma-js"
import _ from "lodash"
import mapboxgl from "mapbox-gl"
import React, { useEffect } from "react"

import Layout from "../components/layout"
import style from "../components/style"

const Map = ({ data }) => {
  let zones = data.allAirtable.edges
    .map(e => e.node.data)
    .sort((a, b) => a.Name < b.Name)

  let zoneColors = Array.from(
    zones.map(z => [z.Zone, z.Color ? z.Color : "red"])
  )
  console.log(zoneColors)

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg"

    let map = new mapboxgl.Map({
      container: "map",
      style: style,
      center: [-83.074369, 42.361489],
      zoom: 10, // starting zoom,
      attributionControl: false,
    })

    map.on("load", () => {
      map.addSource("zoning", {
        type: "vector",
        url: "mapbox://cityofdetroit.5kwrqmxx",
      })
      //mapbox tile reminder - look into this

      map.addLayer({
        id: "zoning",
        type: "fill",
        source: "zoning",
        "source-layer": "zoninggeojson",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": {
            property: "zoning_rev",
            type: "categorical",
            stops: zoneColors,
          },
          "fill-opacity": 0.6,
        },
      })
      map.addLayer({
        id: "zoning-label",
        type: "symbol",
        source: "zoning",
        "source-layer": "zoninggeojson",
        layout: {
          "text-field": ["get", "zoning_rev"],
          "text-padding": 20,
        },
        paint: {
          "text-halo-color": "black",
          "text-halo-width": 1,
          "text-color": "white",
          "text-opacity": 0.85,
        },
      })

      map.addLayer({
        id: "zoning-line",
        type: "line",
        source: "zoning",
        "source-layer": "zoninggeojson",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "black",
          "line-opacity": 0.33,
          "line-width": 1,
        },
      })
    })
  }, [])

  // here's a style that will make a nice grid of <div>s
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(275px, 1fr))`,
    gridGap: `.5em`,
    boxSizing: "border-box",
    padding: 0,
    WebkitOverflowScrolling: "touch",
  }

  return (
    <Layout>
      <div id="map" style={{ height: "50vh", width: "100%" }}></div>
      <div style={gridStyle}>
        {zones.map(z => (
          <div style={{ background: z.Color, padding: ".25em" }}>
            <h4 style={{ display: "inline-block", color: z.TextColor }}>
              {z.Zone}
            </h4>
            <span style={{ display: "inline-block", color: z.TextColor }}>
              {z.Name}
            </span>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(
      sort: { order: ASC, fields: data___Zone }
      filter: { table: { eq: "Codes" } }
    ) {
      edges {
        node {
          data {
            Zone
            Name
            Group
            Color
            TextColor
          }
        }
      }
    }
  }
`

export default Map
