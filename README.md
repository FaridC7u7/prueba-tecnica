# Catálogo de Productos Web

## Tecnologías Utilizadas

- **Frontend:** Next.js (React) con TypeScript y Tailwind CSS.
- **Estilos e Interactividad:** Tailwind CSS, react-toastify para notificaciones, react-icons para íconos.
- **Generación de PDFs:** pdf-lib para crear archivos PDF dinámicos.
- **Autenticación:** LocalStorage para simular el estado de sesión.
- **API:** Rutas API de Next.js para manejar login, registro, descarga de PDF y almacenamiento de correos.
- **Base de Datos:** Archivos JSON locales para simular usuarios, productos y emails.

## Cómo Ejecutar la Aplicación Localmente

1. **Clonar el repositorio:**
```bash
git clone https://github.com/FaridC7u7/prueba-tecnica.git
cd prueba-tecnica
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar la aplicación:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
Visita [http://localhost:3000](http://localhost:3000).

## Funcionalidades Implementadas

### Catálogo de Productos
- Listado de productos con nombre, descripción e imagen.
- **Visibilidad del precio:**
  - **No autenticado:** “No muestra precio.”.
  - **Autenticado:** Muestra el precio real del producto.

### Autenticación (Login/Registro)
- Formulario de registro e inicio de sesión.
- Validación básica de usuarios con datos almacenados en un archivo JSON.
- Estado de sesión simulado con LocalStorage.

### Descarga de Ficha Técnica en PDF
- **Usuario autenticado:** Descarga directa de la ficha técnica.
- **Usuario no autenticado:** Aparece un modal para ingresar el correo. Al enviar el correo, se registra (simulado) y luego se habilita la descarga del PDF.

### Detalles Técnicos
- **Componentización:** Separación clara de componentes reutilizables (botones, inputs, tarjetas de producto).
- **Páginas dinámicas:** Página de detalle del producto con ruta dinámica `/products/[id]`.
- **Validaciones:** Verificación de datos en formularios y control de errores en la API.
- **Diseño responsivo:** Adaptado para dispositivos móviles y pantallas grandes con Tailwind CSS.

## Decisiones de Diseño e Implementación
- **Simulación de base de datos:** Usar JSON local para simplificar la prueba y mantener la lógica clara.
- **Generación de PDF en el servidor:** Manejar la generación del PDF en una API para mantener los datos seguros.
- **UX Mejorada:** Notificaciones con toast, modales elegantes y mensajes claros para cada estado de usuario.
