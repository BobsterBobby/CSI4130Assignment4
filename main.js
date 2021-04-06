// Authors: Shize Li and Robert Zhang

import {RollerCoaster} from "./RollerCoaster.js";

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;

document.getElementById("canvas_container").appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);

camera.position.z = 6;
camera.position.y = 4;
camera.lookAt(0, 0, 0);

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
const amb_light = new THREE.AmbientLight(0xffff99, 0.3);
const dir_light = new THREE.DirectionalLight(0xffffff, 1.5);
dir_light.position.set(-2, 4, 2);
scene.add(amb_light);
scene.add(dir_light);

// Models
let rc = new RollerCoaster();
scene.add(rc);

// Rendering and Animation
let t = 0;
function animate() {
    renderer.render(scene, camera);

    //rc.rotation.set(0, t, 0);
    rc.update(t);

    t += 0.002;

    requestAnimationFrame(animate);
}
animate();
