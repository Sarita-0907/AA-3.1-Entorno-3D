import * as THREE from 'three';

// Escena, cámara y renderizador.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111827);
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Desafío 1: caja vertical y tres esferas.
const semaforo = new THREE.Group();
scene.add(semaforo);

const caja = new THREE.Mesh(
  new THREE.BoxGeometry(1.25, 4.15, 0.65),
  new THREE.MeshStandardMaterial({ color: 0x202734, roughness: 0.55 })
);
semaforo.add(caja);

function crearEsfera(color) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(0.47, 32, 24),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.28 })
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

// Iluminación.
scene.add(new THREE.AmbientLight(0xffffff, 1.5));
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);
  const t = Date.now();
  semaforo.position.y = Math.sin(t * 0.0015) * 0.12;
  semaforo.rotation.y = Math.sin(t * 0.0007) * 0.12;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
