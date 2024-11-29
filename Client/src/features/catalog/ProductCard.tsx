import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, Avatar } from '@mui/material';
import { Product } from "../../app/models/product";
import { Link } from 'react-router-dom';

interface ProductProp {
  item: Product
}
export default function ProductCard({ item }: ProductProp) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }}>
      <CardHeader
        title={item.name}
        avatar={
          <Avatar sx={ {backgroundColor: 'secondary.main'}}>
          </Avatar>
        }
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', backgroundColor: 'primary.main' }}
        image={item.pictureUrl}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          £{(item.price / 1000).toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.brand} / {item.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" component={Link} to={`/catalog/${item.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}