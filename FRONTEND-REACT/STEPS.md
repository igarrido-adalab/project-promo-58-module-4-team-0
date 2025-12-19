# Pasos para incorporar el Router

1. En la terminal lanzamos un install:

```bash
npm i react-router
```

2. En el fichero `/src/main.jsx` (el que nunca se toca), envolvemos `<App />` con un `<HashRouter>`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { HashRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
```

3. En el componente App, vamos a poner los <Route> dentro de <Routes>. Tenemos 2 rutas (2 páginas):

1. Página de Landing -> ruta: / componente: LandingPage
1. Página del formulario -> ruta: /creator componente: CreatorPage

Entonces el código dentro del main de App va a ser:

```jsx
<Routes>
  <Route path='/' element={<LandingPage />} />
  <Route path='/creator' element={<CreatorPage />} />
</Routes>
```
