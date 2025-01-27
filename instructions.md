Inside netflix directory

I want to create a Netflix-like UI using React and the TMDB (The Movie Database) API for fetching data. The app should be modular, with every feature broken down into reusable components to avoid redundant code. Follow best practices for component organization, state management, and performance optimization.

Core Requirements:

Layout: Design a responsive layout that resembles Netflix, including:

A navigation bar with categories (e.g., Movies, TV Shows, My List, etc.).

A hero section for featured content.

A grid-based layout for media cards (e.g., movie/TV show thumbnails).

Media Cards:

Create reusable media card components to display details such as thumbnails, titles, and ratings.

Include hover effects for media cards that reveal additional details (e.g., genres, brief descriptions).

Smooth animations for hover transitions using Framer Motion.

API Integration:

Use the TMDB API to fetch movies, TV shows, genres, and other details.

Implement React Query for efficient API calls, caching, and state management.

Smooth Transitions and Animations:

Utilize Framer Motion for all animations, ensuring they are smooth and visually appealing. Examples include:

Hover effects on media cards.

Slide-in transitions for modals and sections.

Fade effects when switching categories.

Step 1: Create Layout and Media Card

Build the Netflix-like layout with:

A navigation bar for categories and search functionality.

A dynamic hero section for featured media (e.g., latest or trending content).

Rows of media cards categorized by genres or themes (e.g., "Popular Movies," "Top Rated," "Upcoming").

Each row should be horizontally scrollable with smooth animations.

Build a reusable media card component with the following features:

Displays the media's thumbnail image, title, and rating.

On hover, expand to show a brief description and genre(s).

Add smooth hover animations using Framer Motion.

Step 2: Media Details and Episode Selector Modal

Create a Media Details Modal:

When a media card is clicked, show a modal with details about the selected movie or TV show, including:

Title, synopsis, release date, cast, and trailer (if available).

Smooth slide-in animation for the modal.

Use the TMDB API to fetch and display the selected media's details dynamically.

Create an Episode Selector Modal for TV Shows:

When a user views details for a TV show, allow them to select a season and episode.

Include dropdowns for season selection and a list of episodes for the selected season.

Smooth animations for dropdowns and transitions between seasons.

Additional Notes:

Follow best practices for folder and component structure.Example structure:

Ensure the app is fully responsive across devices (desktop, tablet, mobile).

Use lazy loading for images to optimize performance.

Implement error handling and loading states for API requests.

This rewritten prompt provides clarity and step-by-step details for your AI code editor to build the project efficiently.
