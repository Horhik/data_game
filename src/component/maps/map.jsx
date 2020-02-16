import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {YMaps, Map, Polygon, Placemark} from "react-yandex-maps";
const YMap = (props) => {
    const [mapData, setMapData] = useState([])
    const [hoveredIndex, setHoveredIndex] = useState(Number);
    const [poly, setPoly] = useState({coord: [55.76, 37.64] , show: false});
    useEffect(async () => {
        const fetching = await fetch('https://eco-map.herokuapp.com/districts');
        const data = await fetching.json();
        setMapData(data)
        console.log(data)

    }, [])

    const showInfo = (coord) => {
        setPoly({coord: coord, show: true})
        alert(coord)
    }
    return(
        <div>
            <YMaps>
              <Map
                className={"map"}
                defaultState={{ center: poly.coord,  zoom: 10 }}
              >
                  {/*{placemarks.map(mark => {*/}
                  {/*    return (*/}
                  {/*        <Placemark*/}
                  {/*            geometry={mark.geo_data.coordinates}/>*/}
                  {/*    )*/}
                  {/*})}*/}

                  {mapData.map((area, index) => {
                      return(
                      <Polygon
                          key={index}
                              onClick={() => setPoly({coord: area.geo_data.coordinates[0][0]})}
                          onHover={() => {setHoveredIndex(index)}}
                          geometry={area.geo_data.coordinates}
                          options={{
                              fillColor: 'rgb(64,175, 79)',
                              strokeColor: '#20Ae4e',
                              opacity: index === hoveredIndex? 0.7: 0.5,
                              strokeWidth: 4,
                          }}
                      />
                      )
                  })}

              </Map>
            </YMaps>

            </div>
    )
}

export default connect()(YMap)