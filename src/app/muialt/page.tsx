import { fetchWeather } from "@/lib/api";
import { Box, Typography } from "@mui/material";


export default async function Home() {
const weatherResponse = await fetchWeather();
  

return (
    <main style={{ minHeight: "100vh" }}> 

        <Box
        sx={{
          position: "relative", 
          height: "600px", 
         
          backgroundSize: "cover", 
          backgroundPosition: "center",
           
        }}
      >
        {/* Hero Content */}
        <Box sx={{ textAlign: "center", mx: "auto", py: 16 }}>
         
          <Typography variant="h2" fontWeight="bold" mb={4} mt={4}>
            Explore The Beauty of Phuket 
          </Typography>
        
          <Typography variant="h5" mb={4}>
            Phuket, a popular holiday destination in southern Thailand, provides various sights and activities.
          </Typography>
        </Box>
      {/* Weather Section inside the Hero */}
      <Box
          sx={{
            position: "absolute", 
            bottom: 0, 
            left: 0, 
            right: 0, 
            color: "white", 
            py: 5, 
            px: 12, 
           
          }}
        >
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: "1rem" }}>
            Phuket 
          </Typography>
          
          
          <Typography variant="body1" mb={1}>
            {weatherResponse.current.condition.text} 
          </Typography>

          
          <Typography variant="body1" fontWeight="bold" mb={1}>
            {weatherResponse.current.tempC}°C 
          </Typography>
        </Box>
      </Box>
    </main>
);
}