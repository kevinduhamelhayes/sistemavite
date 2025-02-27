# Sistema de Gestión de Kiosco/Mercado

Sistema de gestión para kioscos y pequeños mercados que permite administrar ventas, inventario, y generar reportes.

## Características

- Gestión de productos y categorías
- Control de stock
- Punto de venta (POS)
- Historial de ventas
- Reportes y estadísticas
- Gestión de usuarios y roles

## Tecnologías

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication

### Frontend
- React
- Vite
- TailwindCSS
- React Query
- Zustand
- React Router DOM

## Requisitos

- Node.js >= 18
- PostgreSQL >= 12
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd mi-proyecto
```

2. Instalar dependencias del backend:
```bash
cd api
npm install
```

3. Instalar dependencias del frontend:
```bash
cd ../front
npm install
```

4. Configurar variables de entorno:
- Copiar `.env.example` a `.env` en la carpeta `api`
- Copiar `.env.example` a `.env` en la carpeta `front`
- Ajustar las variables según tu entorno

5. Iniciar la base de datos:
```bash
# Asegúrate de tener PostgreSQL corriendo y crear la base de datos
createdb kiosco_db
```

6. Iniciar el backend:
```bash
cd api
npm run dev
```

7. Iniciar el frontend:
```bash
cd front
npm run dev
```

## Estructura del Proyecto

```
mi-proyecto/
├── api/                # Backend
│   ├── src/
│   │   ├── config/    # Configuraciones
│   │   ├── models/    # Modelos de la base de datos
│   │   ├── routes/    # Rutas de la API
│   │   ├── controllers/# Controladores
│   │   ├── middleware/# Middlewares
│   │   ├── utils/     # Utilidades
│   │   └── services/  # Servicios
│   └── index.js       # Punto de entrada
└── front/             # Frontend
    ├── src/
    │   ├── components/# Componentes React
    │   ├── pages/     # Páginas
    │   ├── layouts/   # Layouts
    │   ├── services/  # Servicios API
    │   ├── store/     # Estado global
    │   ├── hooks/     # Hooks personalizados
    │   └── utils/     # Utilidades
    └── index.html     # Punto de entrada
```

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. 