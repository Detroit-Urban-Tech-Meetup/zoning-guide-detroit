import _ from "lodash"
import mapboxgl from "mapbox-gl"
import React, { useEffect } from "react"

import 'mapbox-gl/dist/mapbox-gl.css';

import Layout from "../components/layout"
import style from "../components/style"

const Map = ({ data }) => {
  let zones = data.allAirtable.edges
    .map(e => e.node.data)

  // group them into a new object by Group
  let zonesGrouped = _.groupBy(zones, "Group")

  // get those group names
  let zoneGroups = Object.keys(zonesGrouped)

  // zone color stops, for the mapbox style
  let zoneColors = Array.from(
    zones.map(z => [z.Zone, z.Color ? z.Color : "red"])
  )

  // zone text color stops, for the mapbox style
  let zoneTextColors = Array.from(
    zones.map(z => [z.Zone, z.TextColor ? z.TextColor : "red"])
  )

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA"

    let map = new mapboxgl.Map({
      container: "map",
      style: style,
      center: [-83.074369, 42.361489],
      zoom: 10.5, // starting zoom,
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
          "fill-opacity": 0.7,
        },
      })
      map.addLayer({
        id: "zoning-label",
        type: "symbol",
        source: "zoning",
        "source-layer": "zoninggeojson",
        layout: {
          "text-field": ["get", "zoning_rev"],
          "text-padding": 40,
          "text-font": ["Inter Bold"],
          "text-size": {
            "base": 1,
            "stops": [[12.25, 10], [12.26, 12], [17, 24]]
          }        },
        paint: {
          "text-color": {
            property: "zoning_rev",
            type: "categorical",
            stops: zoneTextColors,
          },
          "text-opacity": {
            "base": 1,
            "stops": [[12.25, 0], [12.26, 1]]
          },
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
          "line-opacity": {
            "base": 1,
            "stops": [[13, 0], [14, 0.1], [16, 1]]
          },
          "line-width": 1,
        },
      })
    })
  }, [])

  return (
    <Layout fullscreen>
      <h1>Map</h1>
      <div id="map" style={{ height: "60vh", width: "100%" }}></div>
      <section style={{marginTop: '1em', background: 'rgba(0,0,50,0.15)', padding: '1em'}}>
        <div style={{fontWeight: 'bold'}}>Legend</div>
      {zoneGroups.map(zg => (
        <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{minWidth: 180, margin: 0}}>{zg}</div>
        {zonesGrouped[zg].map(z => (
          <div style={{width: 60, height: 40, display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontWeight: 700, margin: 0, textAlign: 'center', verticalAlign: 'middle', background: z.Color, color: z.TextColor}}>{z.Zone}</div>
          ))}
        </div>
      ))}
      </section>
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
