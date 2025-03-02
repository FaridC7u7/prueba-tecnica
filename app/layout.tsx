'use client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                <title>Catálogo de Productos</title>
            </head>
            <body className="bg-gray-100">
                {children}
            </body>
        </html>
    );
}
