# Weather Forecast App
A clean, responsive React app that shows live weather for anywhere on the planet. Smooth UI, subtle animations, and the details you actually care about, without the clutter.

# What This Project Does?
As a User type a city, ZIP/postal code, GPS coordinates (Latitudes, logitudes (example format- 4521488, -4555784)), or a well‑known place, and you’ll get accurate weather on the spot. The web app shows current conditions, a 5‑day outlook, and key stats like humidity, wind, pressure, and visibility. It can also use your device location to auto‑detect where you are and load the forecast instantly.

# Deployed in Git hub pages
- **Live Demo** - https://harshithreddy01.github.io/PM-Accelerator--Test-1/

## Features

- **Live Weather** – Get up-to-the-minute conditions plus a clear 5-day forecast.
- **Flexible Search** – Look up weather by city, ZIP/postal code, coordinates, or a well-known spot.
- **Auto Location** – Let the app detect where you are and pull your local forecast instantly.
- **Celsius/Fahrenheit Toggle** – Switch between units whenever you want.
- **Fully Responsive** – Looks and works great on desktop, tablet, or phone.
- **Clean, Modern UI** – Minimal glass-morphism style with smooth, natural animations.
- **Video Backdrops** – Weather pages come alive with dynamic background videos.
- **Accessible for All** – Built with ARIA labels, keyboard navigation, and screen reader support.

## Technologies Used

- **React 19.1.1** – Functional components with hooks.
- **React Router 7.8.0** – Handles page navigation without reloads.
- **React Icons 5.5.0** – Crisp weather and UI icons.
- **OpenWeatherMap API** – Reliable source for global weather data.
- **CSS3** – Custom styles and glass-morphism effects.
- **HTML5** – Semantic structure and video backgrounds.

## Prerequisites

Before you run this project, make sure you've got:

- **Node.js** version 14 or higher
- **npm** (comes with Node.js)
- **Git** to clone the repository

## Installation

Here's how to get it running on your machine.

### 1. Clone the repository
### 2. Install dependencies

This pulls in everything from package.json, including:
- react
- react-dom
- react-router-dom
- react-icons
- react-scripts

### 3. Add your API key

Create a `.env` file in the root folder and drop in your OpenWeatherMap API key, or any other open source key.

To get a key:

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Find your API keys in your profile
4. Copy one and paste it into .env

or Your desired platform.

### 4. Start the app

```bash
npm start
```

Your browser should open at `http://localhost:3000`.

## Available Scripts

- `npm start` – Development mode
- `npm build` – for production
- `npm test` – Runs tests
- `npm eject` – Exposes the config (Careful with it)

## Project Structure

```
src/
├── components/          
│   ├── SearchBar.js         # Search field and controls
│   ├── WeatherDisplay.js    # Current conditions
│   ├── ForecastDisplay.js   # 5-day forecast
│   ├── LoadingSpinner.js    # Shows while fetching data
│   └── ErrorMessage.js      # Displays errors
├── App.js                  
├── App.css                 
└── index.js                

public/
├── index.html              
├── favicon.svg             
└── Assests/                # Video backgrounds
```

## How to Use

1. Type a city, ZIP, coordinates, or landmark in the search bar
2. Or click the location button to auto-detect your weather
3. See current temp, humidity, wind, and more
4. Scroll for the 5-day forecast
5. Switch between Celsius and Fahrenheit anytime

## API Integration

This app talks to the OpenWeatherMap API for:

- Current conditions
- 5-day forecast
- Geocoding (turns place names into coordinates)
- Coordinate-based lookups

## Design Details

- Glass-morphism cards with soft blur
- Fully responsive for any screen size
- Smooth hover and transition effects
- Background videos that change by page
- Clean typography (Inter) with clear hierarchy

## Browser Support

Runs on all major browsers:

- Chrome (best experience)
- Firefox
- Safari
- Edge

## Troubleshooting

**App won't start** – Check Node.js is installed and run `npm install` again

**No weather data** – Make sure your API key is valid in .env and you're online

**Location not working** – Enable location access and use HTTPS in production

**Build errors** – Delete node_modules and run `npm install`

## Contributing

free to use and modify.

## Acknowledgments

- OpenWeatherMap for the weather data
- React for the framework
- Weather Icons for the icons
- The open-source community for tools and libraries

## About Me

Check out my portfolio: [https://harshithreddy01.github.io/My-Web/](https://harshithreddy01.github.io/My-Web/)

## Special Thanks

Thanks for the opportunity PM Accelerator Team!
