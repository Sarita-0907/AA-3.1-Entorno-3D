import * as THREE from 'three';

// ESCENA (se conserva la estructura del manual).
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Fondo del proyecto original

// CÁMARA.
const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = window.innerWidth < 650 ? 12 : 8;

// RENDERIZADOR.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// ============================================================
// DESAFÍO 1: SEMÁFORO FLOTANTE
// ============================================================
const semaforo = new THREE.Group();
semaforo.position.x = -1.8; // A la izquierda de la escena.
scene.add(semaforo);

// Caja negra, alargada verticalmente.
const caja = new THREE.Mesh(
  new THREE.BoxGeometry(1.25, 4.15, 0.65),
  new THREE.MeshStandardMaterial({ color: 0x202734, roughness: 0.55 })
);
semaforo.add(caja);

// Función para reutilizar la misma geometría con tres colores.
function crearEsfera(color) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(0.47, 32, 24),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.28,
      roughness: 0.3
    })
  );
}

const esferaRoja = crearEsfera(0xff3347);
esferaRoja.position.y = 1.2;
esferaRoja.position.z = 0.42;
semaforo.add(esferaRoja);

const esferaAmarilla = crearEsfera(0xffd33d);
esferaAmarilla.position.y = 0;
esferaAmarilla.position.z = 0.42;
semaforo.add(esferaAmarilla);

const esferaVerde = crearEsfera(0x23d96d);
esferaVerde.position.y = -1.2;
esferaVerde.position.z = 0.42;
semaforo.add(esferaVerde);

// ============================================================
// DESAFÍO 2: CORAZÓN (CUBO QUE PALPITA)
// El PDF llama «Corazón» a la animación de escala de un cubo
// o esfera; no exige una geometría literal con forma de corazón.
// ============================================================
// Se utiliza exactamente el cubo de tu práctica inicial (color, tamaño y acabado).
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  roughness: 0.3,
  metalness: 0.8,
  wireframe: true // Requisito del desafío: visualizar el cubo en malla de alambre.
});

const cubo = new THREE.Mesh(geometry, material);
cubo.position.x = 1.8; // A la derecha de la escena.
scene.add(cubo);

// ILUMINACIÓN (igual que en la estructura del manual).
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// ANIMACIÓN.
function animate() {
  requestAnimationFrame(animate);

  // El semáforo flota suavemente, sin perder su orientación frontal.
  const tiempo = Date.now();
  semaforo.position.y = Math.sin(tiempo * 0.0015) * 0.12;
  semaforo.rotation.y = Math.sin(tiempo * 0.0007) * 0.12;

  // Corazón: el cubo cambia de tamaño, como una palpitación.
  let escala = 1 + Math.sin(Date.now() * 0.003) * 0.3;
  cubo.scale.set(escala, escala, escala);
  cubo.rotation.x += 0.01;
  cubo.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// RESPONSIVIDAD.
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.position.z = window.innerWidth < 650 ? 12 : 8;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
