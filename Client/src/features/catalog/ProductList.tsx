import Grid from '@mui/material/Grid2';
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface ProductProps {
    products: Product[]
}
export default function ProductList({ products }: ProductProps) {
    return (
        <Grid container spacing={4}>
            {products.map((item: Product) => (
                <Grid container spacing={2} key={item.id}>
                    <ProductCard item={item} />
                </Grid>
            ))}
        </Grid>
        
    )
}