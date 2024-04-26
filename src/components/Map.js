import React, { useState, useEffect } from "react";
import TextContainer from "./Route";
import car from "../car.png";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import FooterComponent from "./Footer";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -1.939826787816454,
  lng: 30.0445426438232,
};

const GoogleMapPolyline = () => {
  const [directions, setDirections] = useState(null);
  const [driverPosition, setDriverPosition] = useState({});
  const [eta, setEta] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
    libraries: "geometry",
  });

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = { lat: -1.939826787816454, lng: 30.0445426438232 };
    const destination = { lat: -1.9365670876910166, lng: 30.13020167024439 };
    const waypoints = [
      { location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
      { location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
      { location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
      { location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
      { location: { lat: -1.9487480402200394, lng: 30.126596781356923 } },
    ];

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (directions && directions.routes && directions.routes.length > 0) {
      const allSteps = directions.routes[0].legs.flatMap((leg, legIndex) =>
        leg.steps.map((step, stepIndex) => ({ legIndex, stepIndex, step }))
      );
      let currentStepIndex = 0;

      // Function to update driver's position
      const updateDriverPosition = () => {
        // Get the current step
        const { legIndex, step } = allSteps[currentStepIndex];

        // Decode the polyline points of the current step
        const driverRoutes = decodePolyline(step.polyline.points);

        // Loop through the decoded points
        for (let driverLoc = 0; driverLoc < driverRoutes.length; driverLoc++) {
          // Set the driver's position with a delay
          setTimeout(() => {
            // Pass the leg information along with the driver's position
            setDriverPosition({
              position: driverRoutes[driverLoc],
              endAddress: directions.routes[0].legs[legIndex].end_address,
            });

            setEta(
              calculateETA(
                driverRoutes[driverLoc],
                directions.routes[0].legs[legIndex].end_location
              )
            );
          }, driverLoc * 500); // Update every 500ms
        }

        // Increment the current step index
        currentStepIndex++;

        // If there are more steps, schedule the next update
        if (currentStepIndex < allSteps.length) {
          setTimeout(updateDriverPosition, driverRoutes.length * 500); // Update every 500ms per step
        }
      };

      // Start updating driver's position
      updateDriverPosition();
    }
  }, [directions]);

  // Function to calculate ETA
  const calculateETA = (start, end) => {
    // Calculate distance between two points (in meters)
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(start, end);

    // Calculate time in seconds (assuming average speed of 5 m/s)
    const timeInSeconds = distance / 5;

    // Convert time to minutes and round to nearest integer
    const timeInMinutes = Math.round((timeInSeconds / 60) * 100) / 100;

    return timeInMinutes;
  };

  // Function to decode a polyline encoded string
  function decodePolyline(polyline) {
    var index = 0,
      len = polyline.length,
      lat = 0,
      lng = 0,
      coordinates = [];

    while (index < len) {
      var b,
        shift = 0,
        result = 0;

      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      var dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      var dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      coordinates.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return coordinates;
  }

  return isLoaded ? (
    <>
      <div>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {/* =====Polyline===== */}
          <Polyline
            path={
              directions
                ? decodePolyline(directions.routes[0].overview_polyline)
                : {}
            }
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
          {/* =======Direction routes======= */}
          {directions && <DirectionsRenderer directions={directions} />}
          {/* =====Marker===== */}
          {driverPosition && (
            <Marker position={driverPosition.position} icon={car} />
          )}
        </GoogleMap>
      </div>
      <TextContainer eta={eta} endAddress={driverPosition.endAddress} />
      <FooterComponent />
    </>
  ) : (
    <></>
  );
};

export default GoogleMapPolyline;
