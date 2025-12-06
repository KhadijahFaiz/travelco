import { fetchWeather } from "@/lib/api"; // Importing the function to fetch weather data from the API
import Footer from "@/components/Footer"; // Importing the Footer component
import { Box, Typography } from "@mui/material"; // Importing MUI components Box (for layout) and Typography (for text)

export default async function Home() {
  const weatherResponse = await fetchWeather(); // Fetching weather data asynchronously using the fetchWeather function

  const heroImage = // Assigning the image URL for the hero section
    "https://cdn.techneapp-staging.site/destinations/103/image/b1dea6cf-5438-4915-8459-9458e653a6f8.jpg?height=590&width=1330";

  return (
    <main style={{ minHeight: "100vh" }}> {/* Main wrapper with a minHeight of 100vh to cover the full viewport */}
      
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative", // Setting position to relative to place other elements inside it
          height: "500px", // Setting the height of the hero section to 500px
          backgroundImage: `url(${heroImage})`, // Setting the background image to the heroImage variable
          backgroundSize: "cover", // Ensuring the background image covers the entire hero section
          backgroundPosition: "center", // Centering the background image
        }}
      >
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute", // Positioning absolutely inside the parent Box
            inset: 0, // Makes the gradient overlay span the entire hero section
            background: "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))", // Applying a dark gradient overlay to make text readable
            zIndex: 1, // Placing the gradient overlay behind other content
          }}
        />
        
        {/* Hero Content */}
        <Box
          sx={{
            position: "relative", // Keeping the hero content on top of the gradient overlay
            zIndex: 2, // Ensuring the hero content is above the overlay
            textAlign: "center", // Centering the content
            color: "white", // Setting the text color to white to contrast with the dark background
            maxWidth: "lg", // Setting a maximum width for the content
            mx: "auto", // Centering the content horizontally
            py: 16, // Adding padding vertically to the hero section
          }}
        >
          {/* Main heading in the Hero */}
          <Typography variant="h2" fontWeight="bold" mb={4}>
            Explore The Beauty of Phuket {/* Title of the page */}
          </Typography>
          {/* Description text under the heading */}
          <Typography variant="h6" mb={4}>
            Phuket, a popular holiday destination in southern Thailand, provides various sights and activities.
          </Typography>
        </Box>

        {/* Weather Section inside the Hero */}
        <Box
          sx={{
            position: "absolute", // Positioning the weather section absolutely inside the hero
            bottom: 0, // Placing the section at the bottom of the hero
            left: 0, // Aligning to the left
            right: 0, // Aligning to the right
            color: "white", // Setting the text color to white
            py: 5, // Adding vertical padding for the weather section
            px: 12, // Adding horizontal padding to space the content from the sides
            zIndex: 2, // Ensuring the weather section is above the gradient overlay
          }}
        >
          {/* Location Name */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: "1rem" }}>
            Phuket {/* The name of the location */}
          </Typography>
          
          {/* Weather Condition */}
          <Typography variant="body1" mb={1}>
            {weatherResponse.current.condition.text} {/* Fetching and displaying the weather condition */}
          </Typography>

          {/* Temperature */}
          <Typography variant="body1" fontWeight="bold" mb={1}>
            {weatherResponse.current.tempC}°C {/* Fetching and displaying the temperature */}
          </Typography>
        </Box>
      </Box>

      {/* Footer Section */}
      <Footer /> {/* Footer component to display the website's footer */}
    </main>
  );
}
