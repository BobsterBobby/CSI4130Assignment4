// Authors: Shize Li and Robert Zhang

import {RollerCoaster} from "./RollerCoaster.js";
import {Island} from "./Island.js";

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;

document.getElementById("canvas_container").appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);

//Cam Direction
var camPosX, camPosY, camPosZ, camLAX, camLAY, camLAZ;
camPosX = 0; camPosY = 8; camPosZ = 0;
camLAX = 0; camLAY = 1; camLAZ = -7;

camera.position.x = camPosX;
camera.position.y = camPosY;
camera.position.z = camPosZ;
camera.lookAt(camLAX, camLAY, camLAZ);

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

var axes = new THREE.AxesHelper(10);
scene.add(axes);

// Models
let roller_coaster = new RollerCoaster(4);
roller_coaster.position.set(0, 3, -8);
scene.add(roller_coaster);

let island = new Island(16, 0.4, 0, 0.2, 0, 20, 4, 8);
island.position.set(0, 0, 0);
scene.add(island);

var teapotGeometry = new THREE.TeapotGeometry(0.05, 15, true, true, true, false, false);
var teapot = new THREE.Mesh(teapotGeometry, new THREE.MeshBasicMaterial({ color: 'pink' }));
teapot.position.set(camLAX, camLAY, camLAZ);
scene.add(teapot);

var planeGeometry = new THREE.PlaneGeometry(100,100);
var planeMaterial = new THREE.MeshBasicMaterial({color: 'blue', side: THREE.DoubleSide});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, -0.05, 0);
plane.rotation.x = -Math.PI/2;
scene.add(plane);


// Event Handler
document.onkeydown = (kdEvent) => {

    switch (kdEvent.keyCode) {
		case 87: //W
			camLAZ++;
			break;
		case 83: //S
			camLAZ--;
			break;
		case 65: //A
			camLAX++;
			break;
		case 68: //D
			camLAX--;
			break;
		case 69: //E
			camLAY++;
			break;
		case 81: //Q
			camLAY--;
			break;
		case 73: //I
			camPosZ++;
			break;
		case 75: //K
			camPosZ--;
			break;
		case 74: //J
			camPosX++;
			break;
		case 76: //L
			camPosX--;
			break;
		case 79: //O
			camPosY++;
			break;
		case 85: //U
			camPosY--;
			break;
	}

	teapot.position.set(camLAX, camLAY, camLAZ);
	camera.position.set(camPosX, camPosY, camPosZ);
	camera.lookAt(teapot.position);
}

// Rendering and Animation
let t = 0;
function animate() {
	
    renderer.render(scene, camera);

    roller_coaster.update(t);
	island.update();

    t += 0.001;

    requestAnimationFrame(animate);
}
animate();
