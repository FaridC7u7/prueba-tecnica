'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        window.location.reload();
    };

    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800"></h1>
                <div className="flex space-x-4">
                    {!isAuthenticated && (
                        <>
                            <Button
                                text="Iniciar sesión"
                                onClick={() => window.location.href = '/login'}
                                className="bg-blue-500 text-white hover:bg-blue-600"
                            />
                            <Button
                                text="Registrarte"
                                onClick={() => window.location.href = '/register'}
                                className="bg-green-500 text-white hover:bg-green-600"
                            />
                        </>
                    )}

                    {isAuthenticated && (
                        <Button
                            text="Cerrar sesión"
                            onClick={handleLogout}
                            className="bg-red-500 text-white hover:bg-red-600"
                        />
                    )}
                </div>
            </div>
        </header>
    );
}