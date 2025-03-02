'use client';

import { useRouter } from 'next/navigation';
import { ProductCardProps } from '@/types/product';
import Button from '@/components/Button';

export default function ProductCard({ product, isAuthenticated }: ProductCardProps) {
    const router = useRouter();

    const handleDetail = () => {
        router.push(`/products/${product.id}`);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <img
                src={product.image || '/placeholder.png'}
                alt={product.name || 'Producto sin nombre'}
                className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>

            {isAuthenticated && <p className="text-green-500 font-bold">{product.price}</p>}

            <Button
                text="Ver Detalle"
                className="bg-blue-600 text-white mt-4"
                onClick={handleDetail}
            />
        </div>
    );
}
