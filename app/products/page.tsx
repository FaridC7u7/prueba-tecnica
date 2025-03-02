'use client';

import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));

        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Productos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} isAuthenticated={isAuthenticated} />
                    ))}
                </div>
            </div>
        </>
    );
}