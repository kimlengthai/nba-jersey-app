import { useEffect, useState } from 'react';
import axios from 'axios';

const Catalogue = () => 
    {
        const [products, setProducts] = useState([]);

        useEffect(() =>
        {
            axios.get('http://localhost:3001/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error("Failed to load products:", err));
        }, []);

        return (
            <div className='container py-5'>
            <h2 className='text-center mb-4'>NBA Jersey Catalogue</h2>
            <div className='row'>
            {products.map((product) => 
            (
                <div key={product._id} className='col-md-4 mb-4'>
                    <div className='card h-100 shadow'>
                     <img src={product.imageUrl} className='img-fluid' alt={product.player + ' Jersey'} />
                      <div className='card-body'>
                        <h5 className='card-title'>{product.player}</h5>
                        <p className='card-text'><strong>Team:</strong> {product.team}</p>
                        <p className='card-text'><strong>Price:</strong> {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(product.price)}</p> 
                      </div>
                    </div>
                </div>
            ))}
            </div>
            </div>
        )
    }

export default Catalogue;