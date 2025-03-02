import { useState, useEffect } from 'react';
import '@/styles/globals.css';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { Product } from '@/types/product';
import { FaFilePdf } from 'react-icons/fa';

export default function ProductDetail({ product }: { product: Product }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    const handleDownload = async () => {
        try {
            const response = await fetch('/api/download_pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ficha-tecnica.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error al descargar PDF:', error);
        }
    };

    const handleEmailSubmit = () => {
        if (!email) {
            toast.warn('Por favor, ingresa tu correo');
            return;
        }

        fetch('/api/store-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        toast.success('Correo registrado, descarga iniciada');
        setShowModal(false);
        handleDownload();
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center min-h-screen">
            <img
                src={product.image || '/placeholder.png'}
                alt={product.name || 'Producto sin nombre'}
                className="w-full h-100 object-cover mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-4 text-center">{product.name}</h2>
            <p className="text-center mb-6">{product.description}</p>

            <Button
                text=""
                onClick={() => {
                    isAuthenticated ? handleDownload() : setShowModal(true);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
            >
                <FaFilePdf /> Descargar Ficha Técnica
            </Button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Ingresa tu correo para descargar</h3>
                        <InputField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                        />
                        <div className="flex justify-end mt-4">
                            <Button
                                text="Cancelar"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
                            />
                            <Button
                                text="Enviar y Descargar"
                                onClick={handleEmailSubmit}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}