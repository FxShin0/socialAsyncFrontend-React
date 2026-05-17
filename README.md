# socialAsync Frontend

Frontend de **socialAsync**, una pequeña red social desarrollada como proyecto de práctica full stack utilizando React.

> ⚠️ El proyecto sigue en desarrollo.
> Algunas funcionalidades del backend ya existen pero todavía no fueron implementadas en el frontend.

---

## 🌐 Deploy

El frontend se encuentra deployado en Vercel: https://social-async-frontend-react.vercel.app


---

## 🚀 Funcionalidades actuales

Actualmente el frontend permite:

* Registro de usuarios
* Login
* Persistencia de sesión mediante JWT
* Visualización del feed
* Creación de posts
* Comentarios en publicaciones
* Navegación mediante React Router

---

## ⚠️ Estado actual del proyecto

El proyecto todavía no representa la visión final de socialAsync.

Actualmente faltan varias funcionalidades importantes, especialmente relacionadas a la interacción social entre usuarios.

### Features pendientes

* Sistema de amistades
* Solicitudes de amistad
* Búsqueda de usuarios
* Visualización de perfiles
* Eliminación de posts
* Eliminación de comentarios
* Responsive design
* Refactors de componentes
* Separación de lógica utilizando custom hooks

---

## 🛠️ Stack utilizado

### Frontend

* React
* Vite
* Redux Toolkit
* RTK Query
* React Router
* Styled Components
* Formik
* Yup

### Backend/API

El frontend consume una API REST desarrollada con:

* Node.js
* Express
* TypeScript
* MongoDB
* JWT

Link al repositorio del backend: https://github.com/FxShin0/socialAsync

Documentacion de la API: https://documenter.getpostman.com/view/45555457/2sBXqNkyDN#intro

---

## 🔐 Autenticación

Actualmente la autenticación se maneja utilizando JWT almacenados en `localStorage`.

Sé que no es la solución más segura comparado con cookies `httpOnly`, pero prioricé simplicidad y velocidad de desarrollo para enfocarme principalmente en practicar React y la comunicación frontend/backend.

---

## 📦 Instalación local

```bash
npm install
npm run dev
```

---

## 🎯 Objetivo del proyecto

La idea de socialAsync fue crear una red social pequeña pero suficientemente compleja como para practicar:

* Manejo de estado global
* Consumo de APIs
* Autenticación
* Routing
* Arquitectura frontend/backend
* Manejo de formularios
* Validaciones
* Diseño de componentes reutilizables

---

## 📌 Notas

* El frontend actualmente no es responsive.
* El proyecto utiliza una interfaz oscura por diseño, por lo que no planeo agregar light mode.
* Muchas partes del código todavía necesitan refactors y desacoplamiento de lógica/renderizado.

---

## 📷 Capturas

## 📷 Capturas

### Login

![Login](./screenshots/login.jpg)


### Feed

![Feed](./screenshots/feed.jpg)

---

## 📚 Estado del proyecto

🛠️ En desarrollo activo.
