# VintageTone - Audio Gear API

Backend de **VintageTone**, una API RESTful profesional diseñada para una plataforma de e-commerce de equipos de audio premium. Desarrollada con **Node.js**, **Express** y **MongoDB**, esta API proporciona una base robusta, escalable y, sobre todo, segura para aplicaciones web modernas.

---

## Introducción

Este proyecto ha sido diseñado como una pieza central para un portfolio profesional, demostrando un dominio avanzado del desarrollo backend. Se enfoca en la creación de servicios modulares y la implementación de estándares de seguridad industriales.

---

## Tecnologías Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)


| Tecnología | Propósito |
| :--- | :--- |
| **Node.js + Express** | API REST robusta y escalable. |
| **MongoDB + Mongoose** | Base de datos NoSQL con modelado de esquemas y validaciones. |
| **JWT (jsonwebtoken)** | Autenticación y autorización segura basada en tokens. |
| **bcryptjs** | Hashing seguro de contraseñas y credenciales sensibles. |
| **Zod** | Validación estricta de datos de entrada y reglas de negocio. |
| **Helmet** | Endurecimiento de seguridad mediante headers HTTP. |
| **Express Rate Limit** | Protección contra abuso de requests y ataques de fuerza bruta. |
| **CORS** | Control de acceso entre dominios (Frontend ↔ Backend). |
| **Cookie Parser** | Manejo seguro de cookies HTTP. |
| **Multer** | Manejo y validación de subida de archivos. |
| **Cloudinary** | Almacenamiento y gestión segura de imágenes en la nube. |
| **Mercado Pago SDK** | Integración de pagos y procesamiento de transacciones. |
| **Morgan** | Logging de requests para monitoreo y debugging. |
| **dotenv / cross-env** | Gestión de variables de entorno según el entorno de ejecución. |

---

### ☁️ Infraestructura y Deploy

| Tecnología | Propósito |
| :--- | :--- |
| **Vercel** | Hosting del frontend con soporte SPA y despliegue continuo. |
| **Render** | Hosting del backend con gestión de servicios y escalado automático. |
| **MongoDB Atlas** | Base de datos en la nube con alta disponibilidad. |
| **Cloudinary CDN** | Distribución optimizada de assets multimedia. |

---

## Enfoque en Seguridad y Robustez

La seguridad es el pilar fundamental de esta API. Se han implementado múltiples capas de protección para garantizar la integridad de los datos y la privacidad de los usuarios:

*   **Autenticación Blindada**: Uso de **JSON Web Tokens (JWT)** transmitidos exclusivamente a través de **Cookies HttpOnly**. Esto mitiga ataques de Cross-Site Scripting (XSS) al impedir que el frontend acceda al token mediante JavaScript.
*   **Validaciones Estrictas con Zod**: Cada petición de entrada es validada mediante esquemas de **Zod**, asegurando que solo los datos con el formato y tipo correcto lleguen a la base de datos.
*   **Encabezados de Seguridad (Helmet)**: Implementación de **Helmet.js** para configurar automáticamente encabezados HTTP que protegen contra ataques comunes como Clickjacking y MIME-sniffing.
*   **Control de Accesos**: Middlewares personalizados para diferenciar entre usuarios autenticados y administradores, protegiendo rutas sensibles de creación, edición y borrado.
*   **Manejo de Errores Centralizado**: Un sistema global de captura de excepciones que evita la fuga de información técnica (stack traces) en entornos de producción, proporcionando respuestas claras y controladas al cliente.
*   **Protección de Datos Sensibles**: Encriptación de contraseñas utilizando **Bcrypt.js** con un factor de costo optimizado.

---

## Características Principales

### Gestión de Usuarios y Perfiles
*   Registro e inicio de sesión seguro.
*   Gestión de avatares con persistencia local y servido de archivos estáticos.
*   Middleware de autorización para rutas privadas.

### Sistema de Productos y Contenido
*   CRUD completo de productos (restringido a administradores).
*   Integración con **Cloudinary** para la gestión profesional de imágenes.
*   Búsqueda avanzada y filtrado por categorías, subcategorías y marcas.

### Interacción y Reseñas
*   Sistema de calificaciones y comentarios por producto.
*   Lógica de negocio para permitir una única reseña por usuario y producto.

---

## Estructura del Proyecto

La arquitectura sigue un patrón modular para facilitar el mantenimiento y la escalabilidad:

```bash
src/
├── config/         # Configuración de BD y variables de entorno
├── controllers/    # Lógica de negocio y manejo de peticiones
├── middlewares/    # Seguridad, autenticación y gestión de archivos
├── models/         # Definición de esquemas de Mongoose
├── routes/         # Definición de puntos de entrada de la API
├── schemas/        # Esquemas de validación de datos (Zod)
├── utils/          # Utilidades (Cloudinary, catchAsync para errores)
└── uploads/        # Almacenamiento temporal de archivos
```

---

## Guía de Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/vintagetone-api-rest.git
    cd vintagetone-api-rest
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configuración de Variables de Entorno**:
    Crea un archivo `.env` en la raíz con la siguiente estructura:
    ```env
    PORT=3000
    MONGODB_URI=tu_cadena_de_conexion_mongodb
    JWT_SECRET=tu_clave_secreta_para_jwt
    USER_ADMIN=email_del_administrador@ejemplo.com
    FRONTEND_URL=https://tu-frontend.vercel.app
    
    # Configuración de Cloudinary
    CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    ```

4.  **Ejecución**:
    *   Desarrollo: `npm run dev`
    *   Producción: `npm start`

---

## Autor

**Lautaro R. Collins**
