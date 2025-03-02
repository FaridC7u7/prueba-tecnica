'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import ProductDetail from '@/components/ProductDetail';

export default function ProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch('/api/products');
                const products: Product[] = await res.json();
                const foundProduct = products.find((p) => p.id === parseInt(params.id)) || null;
                setProduct(foundProduct);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return <h1 className="text-2xl text-center mt-10">Cargando...</h1>;
    }

    if (!product) {
        return <h1 className="text-2xl text-center mt-10 text-red-500">Producto no encontrado</h1>;
    }

    return (
        <div className="container mx-auto p-6">
            <ProductDetail product={product} />
        </div>
    );
}
