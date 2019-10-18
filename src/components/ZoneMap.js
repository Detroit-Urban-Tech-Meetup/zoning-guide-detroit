import mapboxgl from "mapbox-gl"
import React, { useEffect } from "react"
import style from "../components/style"

const ZoneMap = ({ zone }) => {

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiam1jYnJvb20iLCJhIjoianRuR3B1NCJ9.cePohSx5Od4SJhMVjFuCQA"

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
        filter: ['==', "zoning_rev", zone.Zone],
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": {
            property: "zoning_rev",
            type: "categorical",
            stops: [[zone.Zone, zone.Color]],
          },
          "fill-opacity": 0.6,
        },
      })
      map.addLayer({
        id: "zoning-label",
        type: "symbol",
        source: "zoning",
        "source-layer": "zoninggeojson",
        filter: ['==', "zoning_rev", zone.Zone],
        layout: {
          "text-field": ["get", "zoning_rev"],
          "text-padding": 30,
          "text-font": ["Inter Bold"],
          "text-size": {
            "base": 1,
            "stops": [[12.25, 10], [12.26, 12], [17, 24]]
          }
        },
        paint: {
          "text-color": zone.TextColor,
          "text-opacity": {
            "base": 1,
            "stops": [[12.25, 0], [12.26, 0.1], [15.5, 0.8]]
          },
        },
      })

      map.addLayer({
        id: "zoning-line",
        type: "line",
        source: "zoning",
        "source-layer": "zoninggeojson",
        filter: ['==', "zoning_rev", zone.Zone],
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
      <div id="map" style={{ height: "50vh", width: "100%" }}></div>
  )
}

export default ZoneMap
