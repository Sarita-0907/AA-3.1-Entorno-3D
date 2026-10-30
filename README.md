# Práctica AA3.1 — Desafíos resueltos con Three.js

Este proyecto parte de los archivos que entregaste en `AA3.1_Manual.zip`.
La estructura de escena, cámara, renderizador, iluminación, animación y responsividad se ha conservado.

## Cómo ejecutarlo en Visual Studio Code

1. Abre esta carpeta en Visual Studio Code.
2. Abre **Terminal > Nueva terminal**.
3. Ejecuta:

   ```bash
   npm install
   npm run dev
   ```

4. Abre la dirección que aparece (normalmente `http://localhost:5173/`).

## Las tres vistas disponibles

- `http://localhost:5173/` — **Ambos desafíos** al mismo tiempo (`main.js`).
- `http://localhost:5173/semaforo.html` — **Desafío 1**, semáforo solo (`semaforo.js`).
- `http://localhost:5173/corazon.html` — **Desafío 2**, cubo que palpita (`corazon.js`).

Los nombres y las direcciones dependen del puerto asignado por Vite.

## Qué se hizo

**Desafío 1, Semáforo:** un `THREE.BoxGeometry` alargado en vertical y tres
`THREE.SphereGeometry`, con las posiciones `y = 1.2`, `y = 0` y `y = -1.2`.
Se agrupan con `THREE.Group()` para mover el semáforo completo.

**Desafío 2, Corazón:** se recupera el cubo ORIGINAL del proyecto manual: tamaño `1.5 × 1.5 × 1.5`, color rojo (`0xff0000`), `roughness: 0.3`, `metalness: 0.8`, fondo gris claro y velocidad de rotación original. Para cumplir la actividad también utiliza `wireframe: true` y cambia de tamaño con
`1 + Math.sin(Date.now() * 0.003) * 0.3` dentro de `animate()`.

**Importante:** Aunque el desafío se titula *Corazón*, en las instrucciones
del PDF se pide un **cubo o esfera** con efecto de palpitación, no una
geometría con silueta de corazón. Esta implementación sigue la instrucción
literal del documento.

Para tomar capturas de cada actividad, usa las páginas individuales.

## Archivos

- `index.html`, `main.js`, `style.css`: vista de los dos desafíos juntos.
- `semaforo.html`, `semaforo.js`: versión independiente del semáforo.
- `corazon.html`, `corazon.js`: versión independiente del cubo que palpita.
- `package.json`, `package-lock.json`: dependencias del proyecto original.

> `node_modules` no se incluye para reducir el tamaño de la descarga.
> Se genera al ejecutar `npm install`.

> Si quieres observarlo exactamente sólido como en tu versión inicial, cambia `wireframe: true` a `wireframe: false` en `corazon.js`. Para entregar el desafío deja `true`, como pide la actividad.
