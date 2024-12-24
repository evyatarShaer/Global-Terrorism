import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { fetchHighestCasualtyRegions } from "../store/features/terrorSlice";
import React from "react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";
import "leaflet/dist/leaflet.css";
import { NewHighestCasualtyRegionsModel } from "../types/highestCasualtyRegions";

const HighestCasualtyRegions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const HighestCasualtyRegionsList = useSelector(
    (state: RootState) =>
      state.highestCasualtyRegions.HighestCasualtyRegionsList
  );
  const status = useSelector(
    (state: RootState) => state.highestCasualtyRegions.status
  );
  const error = useSelector(
    (state: RootState) => state.highestCasualtyRegions.error
  );

  const newList: NewHighestCasualtyRegionsModel[] = [];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHighestCasualtyRegions("country_txt"));
    }
  }, [status, error, dispatch, HighestCasualtyRegionsList]);

  console.log(HighestCasualtyRegionsList);

  HighestCasualtyRegionsList.forEach((point) => {
    if (point.latitude && point.longitude) {
      newList.push({
        _id: point._id,
        averageCasualties: point.averageCasualties,
        latitude: point.latitude,
        longitude: point.longitude,
      });
    }
  });

  return (
    <div className="map_div">
      {status === "loading" && <p>Loading data...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {HighestCasualtyRegionsList.length > 0 && (
        <MapContainer
          center={[51.505, -0.09]}
          zoom={5}
          className="leaflet-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {newList.map((point, index) => (
            <Marker key={index} position={[point.latitude, point.longitude]}>
              <Popup>
                <strong>Country: {point._id}</strong>
                <br />
                <p>Average Casualties: {point.averageCasualties}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      <h3>לחץ על האייקון להצגת הנתונים</h3>
    </div>
  );
};

export default HighestCasualtyRegions;
