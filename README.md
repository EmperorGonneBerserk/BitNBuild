# Outfit Inspiration App

Outfit Inspiration is a React Native application that allows users to explore fashion outfit inspirations. The app fetches images from the Pexels API and displays different outfit ideas, providing users with inspiration for their wardrobe. Additionally, users can input custom wardrobe descriptions or occasions to get AI-powered outfit suggestions, and they can schedule their outfits using an integrated calendar.

## Features

- *Outfit Inspiration*: Browse a curated list of outfit ideas fetched from the Pexels API.
- *AI Outfit Suggestions*: Get personalized outfit suggestions based on wardrobe descriptions or occasions using an AI model.
- *Calendar Integration*: Plan and schedule outfits for specific dates using an interactive calendar.
- *Smooth UI/UX*: Modern design with smooth transitions and responsive layouts for an optimal user experience.

## Screens

1. *Outfit Inspiration Screen*: Displays a list of outfit ideas with images and photographer credits.
2. *Outfit Suggestions Screen*: Allows users to input wardrobe details or describe an occasion to get AI-generated outfit suggestions.
3. *Calendar Integration Screen*: Lets users select a date from the calendar and navigate to outfit creation for that specific day.
4. *Search Clothes Screen*: Allows users to browse their camera roll, choose clothing items, or search online for fashion-related content.

## Tech Stack

- *React Native*: Cross-platform mobile app development framework.
- *Expo*: Platform for building and deploying React Native apps quickly.
- *Pexels API*: Source for fetching fashion-related images.
- *Axios*: Library for making HTTP requests to the Pexels API.
- *OpenAI GPT-3*: Used for generating personalized outfit suggestions based on user input.
- *react-native-calendars*: Calendar integration for scheduling outfits.
- *react-native-image-picker*: Allows users to select images from their device gallery.

## Installation

To run this app locally, follow these steps:

### Prerequisites

- Node.js installed
- Expo CLI installed
- A valid Pexels API key
- OpenAI API key (for AI-powered outfit suggestions)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/outfit-inspiration-app.git
   cd outfit-inspiration-app
   npm install
   
PEXELS_API_KEY=your-pexels-api-key
OPENAI_API_KEY=your-openai-api-key

Usage
Outfit Inspiration: Open the app and navigate to the "Outfit Inspiration" tab. Browse through the list of outfits fetched from the Pexels API.
Get AI Suggestions: Navigate to the "Outfit Suggestions" screen, type in a wardrobe description or occasion, and get personalized outfit recommendations.
Plan Outfits: Use the "Calendar" screen to pick a date and plan what to wear in advance.

API Integration
Pexels API
The app fetches outfit inspiration from Pexels using the /v1/search endpoint. For example:

js
Copy code
axios.get('https://api.pexels.com/v1/search?query=outfit&per_page=10', {
  headers: {
    Authorization: API_KEY,
  },
});
OpenAI API
AI outfit suggestions are generated using OpenAI's GPT-3 model by passing a custom wardrobe description or occasion.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Contributions are welcome! Feel free to open a pull request or raise issues if you encounter any bugs or want to suggest features.

