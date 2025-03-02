'use client';

import '@/styles/globals.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputFieldLogin from '@/components/InputFieldLogin';
import ButtonLogin from '@/components/ButtonLogin';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            toast.warn('Por favor, completa todos los campos');
            return;
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('isAuthenticated', 'true');
                toast.success(data.message);
                setTimeout(() => window.location.href = '/products', 2000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error al conectar con el servidor');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Inicia sesión en tu cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <InputFieldLogin label="Tu correo electrónico" type="email" placeholder="nombre@empresa.com" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <InputFieldLogin label="Contraseña" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <ButtonLogin text="Iniciar sesión" className="bg-primary-600" onClick={handleLogin} />
                            <ButtonLogin text="Regístrate" className="bg-info-600" onClick={() => toast.info('Redirigiendo a registro...')} />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}