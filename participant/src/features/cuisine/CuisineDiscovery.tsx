import { Box, Button, Card, CardContent, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { cuisines, getCuisine } from '../../data/catalog';
import { EquipmentLinks } from '../equipment/EquipmentLinks';
import { VideoLink } from '../videos/VideoLibrary';

export function CuisineDiscovery() {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ mt: 5, mb: 5, px: { xs: 3, md: 6 }, py: { xs: 5, md: 7 }, bgcolor: '#193B32', color: 'white', overflow: 'hidden', position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: -30, top: -60, fontSize: 170, opacity: 0.18 }} aria-hidden="true">🍲</Box>
        <Chip label="A little knowledge goes a long way" sx={{ mb: 2, bgcolor: '#EAD9AE', color: '#193B32', fontWeight: 700 }} />
        <Typography variant="h1" sx={{ maxWidth: 690 }}>Learn the techniques behind the food.</Typography>
        <Typography sx={{ mt: 2, maxWidth: 620, color: '#D7E5DC', fontSize: 18 }}>Choose a cuisine to explore what to practice, what equipment helps, and short video lessons.</Typography>
      </Paper>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h2">Start with a cuisine</Typography>
        <Typography color="text.secondary">Hands-on foundations, organized for curious home cooks.</Typography>
      </Stack>
      <Grid container spacing={3}>
        {cuisines.map((cuisine) => (
          <Grid key={cuisine.id} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <Box sx={{ bgcolor: cuisine.color, p: 3, fontSize: 54, lineHeight: 1.5 }} role="img" aria-label={`${cuisine.name} cuisine illustration`}>{cuisine.emoji}</Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3">{cuisine.name}</Typography>
                <Typography color="text.secondary" sx={{ my: 1, minHeight: 50 }}>{cuisine.tagline}</Typography>
                <Chip size="small" label={`${cuisine.techniques.length} techniques`} sx={{ mb: 2 }} />
                <Box><Button component={Link} to={`/cuisines/${cuisine.id}`} variant="contained">Explore {cuisine.name} cooking →</Button></Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export function CuisinePage() {
  const { cuisineId } = useParams();
  const cuisine = getCuisine(cuisineId);
  if (!cuisine) return <Container sx={{ py: 7 }}><Typography variant="h2">Cuisine not found</Typography><Button component={Link} to="/">Back to cuisines</Button></Container>;
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Button component={Link} to="/" sx={{ mb: 2 }}>← All cuisines</Button>
      <Paper sx={{ p: { xs: 3, md: 5 }, mb: 4, bgcolor: cuisine.color }}>
        <Typography sx={{ fontSize: 50 }} aria-hidden="true">{cuisine.emoji}</Typography>
        <Typography variant="h1">{cuisine.name} cooking</Typography>
        <Typography sx={{ mt: 1, fontSize: 18, maxWidth: 700 }}>{cuisine.intro}</Typography>
      </Paper>
      <Stack spacing={4}>
        {cuisine.techniques.map((technique, index) => (
          <Card key={technique.id} id={technique.id} component="section" aria-label={technique.name}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                <Chip label={`Technique ${index + 1}`} color="primary" />
                <Chip label={technique.level} variant="outlined" />
                <Chip label={`${technique.minutes} min`} variant="outlined" />
              </Stack>
              <Typography variant="h2">{technique.name}</Typography>
              <Typography sx={{ mt: 1, mb: 2, fontSize: 17 }} color="text.secondary">{technique.summary}</Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>The method</Typography>
              <Box component="ol" sx={{ pl: 3, mb: 3 }}>
                {technique.steps.map((step) => <Typography component="li" key={step} sx={{ mb: 1 }}>{step}</Typography>)}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Recommended equipment</Typography>
              <EquipmentLinks recommendations={technique.equipment} />
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Watch the technique</Typography>
              <VideoLink videoId={technique.videoId} />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
