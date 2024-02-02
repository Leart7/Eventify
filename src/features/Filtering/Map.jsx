import {
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGeolocation } from "../../hooks/useGeolocation";
import { createRef, useEffect, useRef, useState } from "react";
import L from "leaflet";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../redux/userLocationSlice";
import { setActiveLocationFilter } from "../../redux/activeLocationFilterSlice";
import { setAreaLocation } from "../../redux/mapAreaSlice";

const createColoredIcon = (color) => {
  const coloredSvgString = `
    <svg class="interactive-map-marker" xmlns="http://www.w3.org/2000/svg" width="29" height="35" tabindex="1" role="button">
      <style>
        .interactive-map-marker { fill: ${color}; stroke: ${color}; stroke-width: 2px; }
      </style>
      <path fill-rule="evenodd" d="M12.1230385,-1 C19.3706925,-1 25.2460769,4.87538444 25.2459656,12.1379605 L25.2401352,12.5211513 C25.1417542,15.8138369 23.8238074,18.9122297 21.5647242,21.2360825 L12.1362691,31.7952232 L11.3902364,30.962093 L2.71888509,21.2780022 L2.45764552,20.9990107 C0.221261174,18.5423325 -1,15.4205261 -1,12.1230385 C-1,4.87538444 4.87538444,-1 12.1230385,-1 Z" stroke="${color}" stroke-width="2px" transform="translate(2 2)"></path>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(coloredSvgString)}`;
};

const customIcon = L.icon({
  iconUrl: createColoredIcon("#2D2E3B"),
  iconSize: [29, 35],
  iconAnchor: [14, 35],
});

const largerIcon = L.icon({
  iconUrl: createColoredIcon("#3d64ff"),
  iconSize: [35, 42],
  iconAnchor: [17, 42],
});

const userLocationIcon = L.icon({
  iconUrl: "/userLocationIcon.png",
  iconSize: [26, 26],
  iconAnchor: [16, 32],
});

const cityLocationIcon = L.icon({
  iconUrl: "/cityLocationIcon.png",
  iconSize: [26, 26],
  iconAnchor: [16, 32],
});

function Map({
  state,
  events,
  setActiveEvent,
  activeEvent,
  eventRef,
  setState,
}) {
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const dispatch = useDispatch();
  const { userLocation } = useSelector((store) => store.userLocation);
  const { activeLocationFilter } = useSelector(
    (store) => store.activeLocationFilter,
  );

  const { location: mapAreaLocation } = useSelector((store) => store.mapArea);

  const [searchParams, setSearchParams] = useSearchParams();

  const [recenter, setRecenter] = useState(false);
  const [searchClicked, setSearchClicked] = useState([false, ""]);
  const [bounds, setBounds] = useState(null);

  const markerRef = useRef(null);
  const secondMarkerRef = useRef(null);

  const eventRefs = useRef([]);

  const filteredEvents = events?.events?.filter((e) => e.latitude !== null);

  useEffect(() => {
    eventRefs.current = Array(filteredEvents?.length)
      .fill()
      .map((_, index) => eventRefs.current[index] || createRef());
  }, [filteredEvents?.length]);

  const handleClick = () => {
    getPosition();
    setRecenter(true);

    setTimeout(() => {
      setRecenter(false);
    }, 1000);
  };

  const handleSearch = () => {
    setSearchClicked([true, ""]);

    setTimeout(() => {
      setSearchClicked([false, ""]);
    }, 1);
  };

  const [position, setPosition] = useState([42.591209, 20.803775]);
  const [zoom, setZoom] = useState(13);
  const [loading, setLoading] = useState(true);
  const [cityMarkerPosition, setCityMarkerPosition] = useState([]);

  useEffect(() => {
    const handleSearch = () => {
      if (searchParams.get("box") !== null) {
        let latPos;
        let lngPos;
        if (searchParams.get("city") !== null) {
          latPos = searchParams.get("city").split("&")[0];
          lngPos = searchParams.get("city").split("&")[1];
        } else {
          const queryArr = searchParams.get("box")?.split("&");
          latPos = (+queryArr[1] + +queryArr[3]) / 2;
          lngPos = (+queryArr[0] + +queryArr[2]) / 2;
        }

        setTimeout(() => {
          setPosition([latPos, lngPos]);
          setZoom(+searchParams.get("zoom"));
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    };

    handleSearch();
  }, [searchParams]);

  useEffect(
    function () {
      if (geolocationPosition)
        dispatch(
          setUserLocation([geolocationPosition?.lat, geolocationPosition?.lng]),
        );
    },
    [geolocationPosition, dispatch],
  );

  useEffect(
    function () {
      if (mapAreaLocation.length !== 0) {
        setRecenter(true);
        setSearchClicked([true, "12"]);

        setTimeout(() => {
          setSearchClicked([false, ""]);
          setRecenter(false);
          dispatch(setAreaLocation([]));
        }, 1000);
      }
    },
    [mapAreaLocation.length],
  );

  useEffect(
    function () {
      if (searchParams.get("city")) {
        const arr = searchParams.get("city").split("&");
        setCityMarkerPosition([arr[0], arr[1]]);
      }
    },
    [searchParams],
  );

  return (
    <div className="fixed right-0 top-12 hidden h-full  bg-gray-300  xl:left-[70%] xl:block  2xl:left-[60%]">
      {loading ? (
        <p></p>
      ) : (
        searchParams.get("Online") === null && (
          <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={false}
            className="relative h-modal w-full"
            zoomControl={false}
          >
            <button
              onClick={() => {
                handleSearch();
                dispatch(setActiveLocationFilter("area"));
                searchParams.delete("city");
                setSearchParams(searchParams);
              }}
              className="hover:bg-stone-5 absolute left-1/2 top-7 z-[999] -translate-x-1/2 transform rounded-md border-2 border-gray-400 bg-stone-50 px-7 py-2 text-sm font-medium transition-all duration-150 hover:border-gray-500 hover:bg-gray-100"
            >
              Search this area
            </button>
            <button
              onClick={() => {
                handleClick();
                dispatch(setActiveLocationFilter("currentLocation"));
                searchParams.delete("city");
                searchParams.delete("box");

                setSearchParams(searchParams);
              }}
              className="absolute bottom-[5.62rem] right-[0.71rem] z-[999] h-[2.1rem] w-[2.1rem] rounded-md border-2 border-stone-300 bg-white hover:bg-stone-100"
            >
              <FontAwesomeIcon
                icon={faLocationCrosshairs}
                className={`${
                  activeLocationFilter === "currentLocation" && "text-blue-700"
                } pt-1 text-sm`}
              />
            </button>
            <ZoomControl position="bottomright" className="absolute" />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredEvents?.map((event, index) => (
              <Marker
                className="marker"
                key={event.id}
                position={[event?.latitude, event?.longitude]}
                icon={
                  state.length !== 0 &&
                  eventRefs.current[index]?.current?._latlng.lat === state[0] &&
                  eventRefs.current[index]?.current?._latlng.lng === state[1]
                    ? largerIcon
                    : customIcon
                }
                ref={eventRefs.current[index]}
                eventHandlers={{
                  mouseover: () => {
                    eventRefs.current[index].current?.setIcon(largerIcon);
                  },
                  mouseout: () => {
                    eventRefs.current[index].current?.setIcon(customIcon);
                  },
                  mousedown: () => {
                    setState([event.latitude, event.longitude]); // Set the state here
                    setActiveEvent(event.id);
                  },
                }}
              />
            ))}

            {userLocation.length !== 0 && (
              <>
                <Marker position={userLocation} icon={userLocationIcon} />
                <MapBox setBounds={setBounds} zoom={searchClicked[1]} />
              </>
            )}
            {recenter &&
              userLocation.length !== 0 &&
              activeLocationFilter === "currentLocation" && (
                <ChangeCenter position={userLocation} />
              )}
            {recenter && mapAreaLocation.length !== 0 && (
              <ChangeCenter position={mapAreaLocation} />
            )}
            {searchClicked[0] && (
              <MapBox setBounds={setBounds} zoom={searchClicked[1]} />
            )}
            {searchParams.get("city") && cityMarkerPosition.length !== 0 && (
              <Marker position={cityMarkerPosition} icon={cityLocationIcon} />
            )}
          </MapContainer>
        )
      )}
    </div>
  );
}

function MapBox({ setBounds, zoom }) {
  const map = useMap();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const result = map.getBounds();
    const zoomLevel = map.getZoom();
    setBounds([
      result._northEast.lat,
      result._northEast.lng,
      result._southWest.lat,
      result._southWest.lng,
    ]);

    searchParams.set(
      "box",
      [
        result._southWest.lng,
        result._southWest.lat,
        result._northEast.lng,
        result._northEast.lat,
      ].join("&"),
    );

    if (zoom.length !== 0) {
      searchParams.set("zoom", +zoom);
    } else {
      searchParams.set("zoom", zoomLevel);
    }

    setSearchParams(searchParams);
  }, [map, zoom]);

  return null;
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  map.flyTo(position, 13);

  return null;
}

export default Map;
