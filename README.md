# Movie Explorer Web App

A modern React-based movie explorer application built with Vite, React Router, and Tailwind CSS. This app allows users to browse movies, search by title, filter by genre, view detailed information, and manage their favorite movies.

## Features

### Core Features
- **Movie Browsing**: Browse a collection of movies from TVMaze API
- **Search Functionality**: Search movies by title in real-time
- **Genre Filtering**: Filter movies by genre/category
- **Movie Details**: View detailed information about each movie
- **Favorites Management**: Add/remove movies to/from favorites with localStorage persistence
- **Responsive Design**: Fully responsive UI that works on all devices

### Technical Implementation
- **React Hooks**: useState, useEffect, useContext, useMemo
- **Custom Hooks**: useFetchMovies, useFavorites
- **React Router**: Client-side routing with dynamic routes
- **Context API**: Global state management for favorites
- **LocalStorage**: Persistent favorites across sessions
- **Conditional Rendering**: Smart UI based on data state
- **List Rendering**: Efficient rendering with proper keys
- **Props & Event Handling**: Component communication

##  File Structure


movie-app/
- ├── public/
- │   └── vite.svg
- ├── src/
- │   ├── components/
- │   │   ├── Navbar.jsx           
- │   │   ├── MovieCard.jsx        
- │   │   ├── SearchBar.jsx    
- │   │   └── CategoryFilter.jsx   
- │   ├── pages/
- │   │   ├── Home.jsx             
- │   │   ├── MovieDetails.jsx     
- │   │   └── Favorites.jsx       
- │   ├── hooks/
- │   │   ├── useFetchMovies.jsx   
- │   │   └── useFavorites.jsx    
- │   ├── utils/
- │   │   └── api.js               # API utility functions
- │   ├── App.jsx                  # Main app component with routing
- │   ├── main.jsx                 # App entry point
- │   └── index.css              
- ├── index.html                   # HTML entry point
- ├── package.json              
- ├── vite.config.js               # Vite configuration
- ├── eslint.config.js             
- └── README.md                    # This file

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5174
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Concepts Demonstrated

### 1. React Components & JSX
- Functional components with modern React syntax
- Dynamic JSX rendering
- Component composition and reusability

### 2. Props & Data Flow
- Passing data between parent and child components
- Event handler props
- Prop validation and default values

### 3. State Management
- Local state with `useState`
- Global state with Context API
- Derived state with `useMemo`

### 4. Side Effects & Data Fetching
- `useEffect` for API calls
- Cleanup functions for cancelled requests
- Loading and error states

### 5. Routing
- React Router v6 implementation
- Dynamic route parameters
- Navigation with Link components

### 6. Custom Hooks
- **useFetchMovies**: Handles movie data fetching with loading/error states
- **useFavorites**: Manages favorites with localStorage persistence

### 7. Conditional Rendering
- Show/hide elements based on state
- Empty state messages
- Loading indicators

### 8. List Rendering
- `.map()` for rendering lists
- Unique keys for list items
- Filtering and searching lists

## UI Components

### Navbar
- Displays app logo
- Navigation links (Home, Favorites)
- Shows favorites count

### MovieCard
- Movie poster image
- Movie title and genres
- Add/Remove from favorites button
- Link to details page

### SearchBar
- Controlled input component
- Real-time search functionality
- Clean, accessible design

### CategoryFilter
- Dropdown select for genres
- Dynamic genre list from API data
- "All Genres" option

### Home Page
- Search and filter controls
- Grid layout for movie cards
- Loading and error states
- "No movies found" message

### Movie Details Page
- Large movie poster
- Full movie information
- HTML summary rendering
- Add/Remove favorites
- Back navigation


