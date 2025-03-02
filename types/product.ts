export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image?: string;
}

export interface ProductCardProps {
    product: Product;
    isAuthenticated: boolean;
}