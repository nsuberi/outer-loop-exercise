import { Box, Button, Card, CardContent, Chip, Container, Paper, Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getVideo } from '../../data/catalog';
import { useState } from 'react';

export function VideoLink({ videoId }: { videoId: string }) {
  const video = getVideo(videoId);
  if (!video) return null;
  return (
    <Paper variant="outlined" sx={{ p: 2, bgcolor: '#FAFBF9' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
        <Box>
          <Typography fontWeight={700}>{video.title}</Typography>
          <Typography variant="body2" color="text.secondary">{video.duration} · Simulated video lesson</Typography>
        </Box>
        <Button component={Link} variant="contained" to={`/videos/${video.id}`}>View video preview →</Button>
      </Stack>
    </Paper>
  );
}

export function VideoPage() {
  const { videoId } = useParams();
  const video = getVideo(videoId);
  const [isShowingPreview, setIsShowingPreview] = useState(false);
  if (!video) return <Container sx={{ py: 7 }}><Typography variant="h2">Video not found</Typography><Button component={Link} to="/">Explore cuisines</Button></Container>;
  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Button component={Link} to="/" sx={{ mb: 2 }}>← Browse techniques</Button>
      <Chip label="Simulated video page" color="primary" sx={{ mb: 2 }} />
      <Typography variant="h2" component="h1" sx={{ mb: 1 }}>{video.title}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>{video.duration} · {video.teaser}</Typography>
      <Card>
        <Box sx={{ background: video.gradient, minHeight: { xs: 270, sm: 390 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" aria-label="Play video preview" onClick={() => setIsShowingPreview(true)} sx={{ fontSize: 28, width: 85, height: 85, borderRadius: '50%', bgcolor: '#193B32', '&:hover': { bgcolor: '#2E5D4D' } }}>▶</Button>
          <Typography sx={{ fontWeight: 700, color: '#193B32', textAlign: 'center', px: 2 }}>{isShowingPreview ? 'Preview only — video playback is simulated' : 'Press play to view demo state'}</Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6">What this lesson covers</Typography>
          <Box component="ol" sx={{ pl: 3 }}>
            {video.keyFrames.map((frame) => <Typography component="li" key={frame} sx={{ my: 1 }}>{frame}</Typography>)}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
