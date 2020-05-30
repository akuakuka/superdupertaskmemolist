import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, Marker, TileLayer, Popup } from "react-leaflet"
import {  Button } from '@chakra-ui/core';
import { RootState } from '../../state/rootReducer';
import { getLocations,deleteLocation } from '../../state/thunks/mapThunk';
import { NavBar } from '../NavBar';


export const MapView = () => {
  const position = { lat: 60.205238, lng: 24.654079 }
  const markerState = useSelector((state: RootState) => state.mapState.locations);
  const handleDelete = async (locationID:string) => {
    await dispatch(deleteLocation(locationID))
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLocations())
  }, [dispatch])
  return (
    <div>
      <NavBar />
      <Map
        center={position}
        zoom={7}
        style={{ height: "100vh", marginLeft:"5rem" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerState.map(loc => {
          return (
            <Marker key={loc.locationID} position={[parseFloat(loc.latitude), parseFloat(loc.longitude)]}>
              <Popup>
                LocationID: {loc.locationID}
                <Button variantColor="teal" variant="outline" onClick={() => handleDelete(loc.locationID)}>Delete</Button>
                </Popup>
            </Marker>
          )

        })}
      </Map>
    </div>
  )

}
