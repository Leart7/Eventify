import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function EventMapLocation({ event }) {
  return (
    <div className="h-96 rounded-md">
      <MapContainer
        center={[event.latitude, event.longitude]}
        zoom={14}
        scrollWheelZoom={false}
        className="relative h-modal w-full"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" className="absolute" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[event.latitude, event.longitude]} />
      </MapContainer>
    </div>
  );
}

export default EventMapLocation;
