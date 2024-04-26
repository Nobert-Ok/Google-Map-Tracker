# Google Map Polyline Tracker

This project demonstrates real-time tracking of a moving object (simulated by a marker) along a route displayed on a Google Map using React and the Google Maps JavaScript API.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Overview

The Google Map Polyline Tracker is a React application that utilizes the Google Maps JavaScript API to display a map with a route defined by a polyline. It then simulates the movement of a vehicle along this route, updating its position in real-time.

## Features

- Displays a Google Map with a route polyline generated from origin, destination, and waypoints.
- Simulates movement of a vehicle marker along the route.
- Calculates estimated time of arrival (ETA) for reaching each waypoint.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Nobert-Ok/Google-Map-Tracker.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/).

4. Replace `"YOUR_API_KEY"` in `GoogleMapPolyline.js` with your actual API key.

## Usage

To start the application, run:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

## Technologies Used

- React
- React Google Maps API
- Google Maps JavaScript API
- JavaScript (ES6)

## License

This project is licensed under the [MIT License](LICENSE).
