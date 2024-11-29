import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";



export default function ProductDetails() {
    const { Id } = useParams<{ Id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5263/v1/api/Products/${Id}`)
            .then(response => response.json())
            .then(response => setProduct(response))
            .catch(error => console.warn(error))
            .finally( () => setLoading(false))
    }, [Id])

  if (loading) return <h3>Loading</h3>
  if(!product) return <h3>Product Not found</h3>
  
  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Quantity in stock', value: product.quantityInStock },
  ];
    return (
    <Grid2 container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
        <Grid2 size={6}>
            <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
        </Grid2>
        <Grid2 size={6}>
            <Typography variant="h4">{product.name}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
            <TableContainer>
                <Table sx={{
                    '& td': { fontSize: '1rem' }
                }}>
                <TableBody>
                    {productDetails.map((detail, index) => (
                    <TableRow key={index}>
                        <TableCell sx={{ fontWeight: 'bold' }}>{detail.label}</TableCell>
                        <TableCell>{detail.value}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Grid2>
    </Grid2>
  )
}