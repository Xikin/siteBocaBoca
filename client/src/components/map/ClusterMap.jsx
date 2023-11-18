import React, { useEffect, useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import { getPlace } from '../../actions/place'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import SuperCluster from 'supercluster'
import './cluster.css'
import { Avatar, Tooltip, Paper } from '@mui/material'
import GeocoderInput from '../sidebar/GeocoderInput'
import PopupRoom from './PopupRoom'

const supercluster = new SuperCluster({
  radius: 75,
  maxZoom: 20,
})

const ClusterMap = () => {
  const { state: { filteredPlaces }, dispatch, mapRef } = useValue()

  const [points, setPoints] = useState([])
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
  const [zoom, setZoom] = useState(0)
  const [popupInfo, setPopupInfo] = useState(null);
  useEffect(() => {
    getPlace(dispatch)
  }, [])

  useEffect(() => {
    const points = filteredPlaces.map(places => ({
      type: 'Feature',
      properties: {
        cluster: false,
        placesId: places._id,
        price: places.price,
        title: places.title,
        description: places.description,
        lng: places.lng,
        lat: places.lat,
        images: places.images,
        uPhoto: places.uPhoto,
        uName: places.uName,
        ratings: places.ratings,
        money: places.money
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(places.lng), parseFloat(places.lat)]
      }
    }))
    setPoints(points)
  }, [filteredPlaces]);

  useEffect(() => {
    supercluster.load(points)
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds])

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current])
  return (
    <ReactMapGL
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
    >
      {clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className="cluster-maker"
                style={{
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`places-${cluster.properties.placesId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip title={cluster.properties.uName}>
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
                onClick={() => setPopupInfo(cluster.properties)}
              />
            </Tooltip>
          </Marker>
        );
      })}
      <GeocoderInput />
      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          maxWidth='auto'
          closeOnClick={false}
          focusAfterOpen={false}
          onClose={() => setPopupInfo(null)}
        >
          <PopupRoom {...{ popupInfo }} />
        </Popup>)}
    </ReactMapGL>
  )
}

export default ClusterMap