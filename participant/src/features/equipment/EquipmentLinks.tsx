import { Box, Button, Card, CardContent, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../../data/catalog';
import type { EquipmentRecommendation } from '../../types';
import { findProductBySlug, productHref } from './productLinks';

export function EquipmentLinks({ recommendations }: { recommendations: EquipmentRecommendation[] }) {
  return (
    <Grid container spacing={2}>
      {recommendations.map(({ productId, reason }) => {
        const product = getProduct(productId);
        if (!product) return null;
        return (
          <Grid key={productId} size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%', bgcolor: '#FAFBF9' }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ fontSize: 33 }} aria-hidden="true">{product.emoji}</Box>
                <Box>
                  <Typography fontWeight={700}>{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>{reason}</Typography>
                  <Button component={Link} variant="outlined" size="small" to={productHref(productId)}>Shop {product.name.toLowerCase()} →</Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

export function ProductPage() {
  const { productId } = useParams();
  const product = findProductBySlug(productId);
  if (!product) return <Container sx={{ py: 7 }}><Typography variant="h2">Product not found</Typography><Button component={Link} to="/">Explore cuisines</Button></Container>;
  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Button component={Link} to="/" sx={{ mb: 2 }}>← Browse techniques</Button>
      <Chip label="Simulated storefront" color="primary" sx={{ mb: 3 }} />
      <Card>
        <Grid container>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ bgcolor: '#DDE8DB', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110 }} aria-label={`${product.name} demo illustration`} role="img">{product.emoji}</Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="overline" color="text.secondary">Technique Table · Local marketplace demo</Typography>
              <Typography variant="h2" component="h1" sx={{ mt: 1 }}>{product.name}</Typography>
              <Typography variant="h5" color="secondary.main" fontWeight={700} sx={{ my: 2 }}>{product.price}</Typography>
              <Typography sx={{ mb: 2 }}>{product.description}</Typography>
              <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                {product.features.map((feature) => <Typography component="li" key={feature}>{feature}</Typography>)}
              </Box>
              <Button disabled variant="contained">Checkout unavailable in this demo</Button>
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2 }}>This is not Amazon. No purchase is possible.</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
