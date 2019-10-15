import chroma from 'chroma-js';

const ZoneColors = {
  "business": "#ca5572",
  "residential": "#6097ce",
  "industrial": "#a265c2",
  "mixed": "#72a553",
  "special": "#c57c3d",
}

const Zones = {
  "B1": {
    "name": "Restricted Business District",
    "color": chroma(ZoneColors.business).desaturate().hex(),
  },
  "B2": {
    "name": "Local Business and Residential District",
    "color": chroma(ZoneColors.business).hex()
  },
  "B3": {
    "name": "Shopping District",
    "color": chroma(ZoneColors.business).saturate().hex()
  },
  "B4": {
    "name": "General Business District",
    "color": chroma(ZoneColors.business).saturate().darken().hex()
  },
  "B5": {
    "name": "Major Business District",
    "color": chroma(ZoneColors.business).darken().hex()
  },
  "B6": {
    "name": "General Services District",
    "color": chroma(ZoneColors.business).saturate().darken(2).hex()
  },
  "M1": {
    "name": "Limited Industrial District",
    "color": chroma(ZoneColors.industrial).desaturate().hex()
  },
  "M2": {
    "name": "Restricted Industrial District",
    "color": chroma(ZoneColors.industrial).hex()
  },
  "M3": {
    "name": "General Industrial District",
    "color": chroma(ZoneColors.industrial).saturate().hex()
  },
  "M4": {
    "name": "Intensive Industrial District",
    "color": chroma(ZoneColors.industrial).darken().hex()
  },
  "M5": {
    "name": "Special Industrial District",
    "color": chroma(ZoneColors.industrial).saturate().darken().hex()
  },
  "P1": {
    "name": "Open Parking District",
    "color": chroma(ZoneColors.mixed).hex()
  },
  "PC": {
    "name": "Public Center District",
    "color": chroma(ZoneColors.mixed).hex()
  },
  "PCA": {
    "name": "Restricted Central Business District",
    "color": chroma(ZoneColors.mixed).hex()
  },
  "PD": {
    "name": "Planned Development District",
    "color": chroma(ZoneColors.mixed).hex()
  },
  "PR": {
    "name": "Parks and Recreation",
    "color": chroma(ZoneColors.mixed).hex()
  },
  "R1": {
    "name": "Single-Family Residential District",
    "color": chroma(ZoneColors.residential).desaturate().hex()
  },
  "R2": {
    "name": "Two-Family Residential District",
    "color": chroma(ZoneColors.residential).hex()
  },
  "R3": {
    "name": "Low Density Residential District",
    "color": chroma(ZoneColors.residential).saturate().hex()
  },
  "R4": {
    "name": "Thoroughfare Residential District",
    "color": chroma(ZoneColors.residential).saturate().darken().hex()
  },
  "R5": {
    "name": "Medium Density Residential District",
    "color": chroma(ZoneColors.residential).darken().hex()
  },
  "R6": {
    "name": "High Density Residential District",
    "color": chroma(ZoneColors.residential).saturate().darken(2).hex()
  },
  "SD1": {
    "name": "Special Development District, Small-Scale Mixed-Use",
    "color": chroma(ZoneColors.special).hex()
  },
  "SD2": {
    "name": "Special Development District, Mixed-Use",
    "color": chroma(ZoneColors.special).hex()
  },
  "SD4": {
    "name": "Special Development District, Riverfront Mixed-Use",
    "color": chroma(ZoneColors.special).hex()
  },
  "SD5": {
    "name": "Special Development District, Casinos",
    "color": chroma(ZoneColors.special).hex()
  },
  "TM": {
    "name": "Transitional-Industrial District",
    "color": chroma(ZoneColors.special).hex()
  },
  "W1": {
    "name": "Waterfront-Industrial District",
    "color": chroma(ZoneColors.special).hex()
  },
}

export default Zones;