# VitalCare - Frontend

Frontend del sistema de gestion de citas medicas **VitalCare**. Consume una API
REST de Spring Boot ya existente en `http://localhost:8080/api`.

## Stack

- Vite + React 19
- React Router v7
- Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- Axios
- lucide-react (iconos)

## Requisitos

- **Node.js 22 LTS** recomendado (minimo Node 20.19+). Comprueba con `node -v`.
- npm 10+ (viene con Node 22).

## Puesta en marcha

```bash
npm install
npm run dev
```

El dev server queda en http://localhost:5173

Otros comandos:

```bash
npm run build     # build de produccion en dist/
npm run preview   # sirve el build para revisarlo
```

## Estructura

```
src/
  api/          Cliente axios + funciones por endpoint (stubs con TODO)
    axios.js      Instancia base + interceptor que agrega Authorization: Bearer <token>
    auth.js       login / register
    citas.js      citas del paciente
    agenda.js     agenda del doctor
    chat.js       chatbot
    admin.js      doctores y especialidades
  components/    Navbar, ProtectedRoute, AppLayout, AuthAside, Field, PageHeader
  context/      AuthContext (token JWT + usuario, persistido en localStorage)
  pages/        Una carpeta por pagina
    Login/  Registro/  Citas/  Chat/  Agenda/  Admin/  NotFound/
  App.jsx       Definicion de rutas
  main.jsx      Bootstrap (BrowserRouter + AuthProvider)
```

## Rutas

| Ruta        | Acceso                | Descripcion                          |
|-------------|-----------------------|--------------------------------------|
| `/login`    | publica               | Layout de dos columnas               |
| `/registro` | publica               | Alta de usuario (username/pass/rol)  |
| `/citas`    | `PACIENTE`            | Lista de citas del paciente          |
| `/chat`     | cualquier autenticado | Chat con el asistente                |
| `/agenda`   | `DOCTOR`              | Citas asignadas al doctor            |
| `/admin`    | `ADMIN`               | Gestion de doctores/especialidades   |

## Pendiente (lo conectas tu)

Las paginas usan **datos placeholder**. La logica real esta marcada con `// TODO`:

1. `src/api/*.js` - descomentar las llamadas `api.get/post/...` y ajustar rutas.
2. `pages/Login` y `pages/Registro` - llamar a `api/auth.js` y, tras el login,
   `useAuth().login(token, { username, rol })`.
3. `pages/Citas`, `pages/Agenda`, `pages/Admin`, `pages/Chat` - cargar datos con
   `useEffect` (ejemplos comentados dentro de cada archivo).
4. `src/api/axios.js` - interceptor de response para manejar `401` (token expirado).

El interceptor de request (adjuntar el JWT) **ya funciona**: lee el token de
`localStorage` (clave `vitalcare.auth`), la misma que persiste el `AuthContext`.
