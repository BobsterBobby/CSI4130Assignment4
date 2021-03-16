// Authors: Shize Li and Robert Zhang

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;

document.getElementById("canvas_container").appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);

camera.position.z = 1;

// Update on window resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas, true);

// Lights
const amb_light = new THREE.AmbientLight(0xffffff, 0.3);
const dir_light = new THREE.DirectionalLight();
dir_light.position.set(-2, 4, 2);
scene.add(amb_light);
scene.add(dir_light);

// Models
let teapotGeometry = new THREE.TeapotGeometry(0.1, 15, true, true, true, false, false);
let teapot = new THREE.Mesh(teapotGeometry, new THREE.MeshStandardMaterial({ color: 'pink' }));
scene.add(teapot);

// Draw
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
