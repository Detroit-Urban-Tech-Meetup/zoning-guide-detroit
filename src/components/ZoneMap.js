import _ from "lodash"
import mapboxgl from "mapbox-gl"
import React, { useEffect } from "react"
import style from "../components/style"

const ZoneMap = ({ zone }) => {

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
          "text-padding": 20,
        },
        paint: {
          "text-halo-color": "black",
          "text-halo-width": 1,
          "text-color": "white",
          "text-opacity": {
            "base": 1,
            "stops": [[16.25, 0], [16.26, 0.1], [16.5, 1]]
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
