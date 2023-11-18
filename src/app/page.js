
'use client'

//import styles from './page.module.css'
import '@radix-ui/themes/styles.css';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ScatterplotLayer} from '@deck.gl/layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {Box} from '@radix-ui/themes';
import { useState } from 'react';
import { NavBar } from './NavBar';


const hexagonLayerNYC = () => {
  return new HexagonLayer({
    id: 'hexagon-layer',
    data:'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
    pickable: true,
    extruded: true,
    radius: 50,
    elevationScale: 4,
    getPosition: d => d.the_geom.coordinates
  })
};

const getLocation = (city) =>{

    switch(city){
      case 'LA':
        return{
          latitude: 34.137197, 
          longitude: -118.347238,
          zoom: 13,
          pitch: 0,
          bearing: 0
        }
      case 'NYC':
        return {
          latitude: 40.712776, 
          longitude: -74.005974,
          zoom: 13,
          pitch: 0,
          bearing: 0
        }
        default:
          return{
            latitude: 40.712776, 
            longitude: -74.005974,
            zoom: 13,
            pitch: 0,
            bearing: 0
          }
    }
    
}

const NYCTree1995 = {
  id: "NYCTree1995",
  displayName: "1995 Street Tree Census"
}

const NYCTree2015 = {
  id: "NYCTree1995",
  displayName: "2015 Street Tree Census"
}

const LAActiveBusiness = {
  id: "LAActiveBusiness",
  displayName: "Active Business"
}

const LAMyLA311 = {
  id: "LAMyLA311",
  displayName: "LAMyLA311 Service Request"
}


const datasetOptions = {
  NYC: [NYCTree1995.displayName, NYCTree2015.displayName],
  LA: [LAActiveBusiness.displayName, LAMyLA311.displayName]
};


const scatterplotLayerNYC = (datasetId) => new ScatterplotLayer({
  id: 'scatterplot-layer',  
  data: datasetId === NYCTree1995.id ? 'https://data.cityofnewyork.us/resource/kyad-zm4j.json' : 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
  getPosition: d => [parseFloat(d.longitude),parseFloat(d.latitude)],
  getRadius: d => Math.sqrt(d.exits),
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 1,
  radiusMaxPixels: 100,
  lineWidthMinPixels: 1,
  getFillColor: d => [255, 140, 255],
  getLineColor: d => [255, 0, 0],
})



const scatterplotLayerLA = (datasetId) => {
  return new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: datasetId === LAActiveBusiness.id ? 'https://data.lacity.org/resource/6rrh-rzua.json?$limit=150000&$WHERE=within_box(location_1, 33.7035, -118.6682, 34.8233, -117.6464) AND location_1 IS NOT NULL' : 'https://data.lacity.org/resource/rq3b-xjk8.json',
    getPosition: datasetId === LAActiveBusiness.id  ? d => [ parseFloat(d.location_1.longitude),parseFloat(d.location_1.latitude)] : d => [ parseFloat(d.longitude),parseFloat(d.latitude)],
    getRadius: d => Math.sqrt(d.exits),
    pickable: true,
    opacity: 0.2,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getFillColor: d => [255, 240, 255],
    getLineColor: d => [255, 0, 0],
    // onDataLoad: finishLoading
  })
};




const layers = {
  NYC: {
    [NYCTree1995.displayName]: scatterplotLayerNYC(NYCTree1995.id),
    [NYCTree2015.displayName]: scatterplotLayerNYC(NYCTree2015.id)
  },
  LA: {
    [LAActiveBusiness.displayName]: scatterplotLayerLA(LAActiveBusiness.id),
    [LAMyLA311.displayName]: scatterplotLayerLA(LAMyLA311.id)
  }
};



export default function Home() {
  const [city, setCity] = useState('NYC')
  const [dataset, setDataset] = useState('')

  console.log({city, dataset})

  const location = getLocation(city)
  
  return (
    <Box width="100%" height="100%">
      <br></br>
        <DeckGL
          style = {{position: 'relative'}}
          initialViewState={location}
          controller={true}      
            layers={layers[city][dataset]}
          >
             <NavBar
                 city={city}
                 setCity={setCity}
                 datasetOptions={datasetOptions[city]}
                 dataset={dataset}
                 setDataset={setDataset}
                /> 
            <Map
              mapboxAccessToken="pk.eyJ1IjoieXV5YWZ1amltb3RvIiwiYSI6ImNsbm5wNXVwMzA3Y3Iya3Ftd2c1MW92djkifQ.gJHn2MuzuWqhlTnVg018Eg"           
              style={{width: '100vw', height: '100vh'}}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        </DeckGL>
    </Box>

  )
}




