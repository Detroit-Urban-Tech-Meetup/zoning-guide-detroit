import React, { useEffect } from "react"
import mapboxgl from "mapbox-gl"
import _ from 'lodash';
import Layout from "../components/layout"
import style from "../components/style"
import Zones from '../components/zones'

const Map = () => {
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

    map.on('load', () => {
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
          "visibility": "visible",
        },
        paint: {
          "fill-color": {
            property: "zoning_rev",
            type: "categorical",
            stops: _.zip(_.keys(Zones), _.map(Zones, "color")),
          },
          "fill-opacity": 0.5
        },
      })
    })


  }, [])


    const gridStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(275px, 1fr))`,
      gridGap: `.5em`,
      boxSizing: "border-box",
      padding: 0,
      WebkitOverflowScrolling: "touch"
    };

  return (
    <Layout>
      <div id="map" style={{ height: "50vh", width: "100%" }}></div>
      <div style={gridStyle}>
        {Object.keys(Zones).map(z => (
          <div style={{background: Zones[z].color, padding: '.25em'}}>
          <h4>{z}</h4>
          <span style={{display: 'block'}}>{Zones[z].name}</span>
          </div>
        ))}
      </div>
    </Layout>
  )
}

class ClickTest extends React.Component{

  render(){
    <button 
    onClick={() => this.setState()}

  }
  
}

export default Map
