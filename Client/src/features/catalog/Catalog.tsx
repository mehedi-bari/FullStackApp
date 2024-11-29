
import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


export default function Catalog() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5263/v1/api/Products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []);

  function addProducts() {
    setProducts(prevState => [...prevState,
      {
      id: prevState.length>0 ? Math.max(...prevState.map(product => product.id)) + 1 : 1,
      name: 'product' + (prevState.length + 1), 
      price: (prevState.length + 1) * 100
      }
    ])
  }
    return (
        <>
            <ProductList products={products}/>
            <Button variant='contained' onClick={addProducts}>Add product</Button>
        </>
    );
}
