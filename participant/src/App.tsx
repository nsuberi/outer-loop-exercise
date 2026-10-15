import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { CuisineDiscovery, CuisinePage } from './features/cuisine/CuisineDiscovery';
import { ProductPage } from './features/equipment/EquipmentLinks';
import { VideoPage } from './features/videos/VideoLibrary';

function NotFound() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h2">That page is not in our demo.</Typography>
      <Button component={Link} to="/" sx={{ mt: 3 }}>Browse cuisines</Button>
    </Container>
  );
}

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#193B32' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 2 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
              <Box aria-hidden="true" sx={{ fontSize: 28 }}>✳</Box>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-.03em' }}>Technique Table</Typography>
            </Stack>
            <Button component={Link} to="/" color="inherit" variant="outlined" sx={{ borderColor: '#8DA69D', color: 'white' }}>Explore cuisines</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<CuisineDiscovery />} />
          <Route path="/cuisines/:cuisineId" element={<CuisinePage />} />
          <Route path="/shop/:productId" element={<ProductPage />} />
          <Route path="/videos/:videoId" element={<VideoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Box component="footer" sx={{ py: 3, bgcolor: '#E9EDE6', mt: 7 }}>
        <Container maxWidth="lg">
          <Typography color="text.secondary" variant="body2">Technique Table · Workshop simulation only. Products and video previews are fictional. No orders or external video playback.</Typography>
        </Container>
      </Box>
    </Box>
  );
}
