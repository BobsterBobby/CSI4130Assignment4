// Authors: Shize Li and Robert Zhang

import {RollerCoaster} from "./RollerCoaster.js";
import {Island} from "./Island.js";
import {Water} from "./Water.js";

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const canvas = renderer.domElement;
document.getElementById("canvas_container").appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);

//Cam Direction
var camPosX, camPosY, camPosZ, camLAX, camLAY, camLAZ;
camPosX = 0; camPosY = 12; camPosZ = 23;
camLAX = 0; camLAY = 1; camLAZ = 14;

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
dir_light.castShadow = true;

dir_light.shadow.camera.left = -30;
dir_light.shadow.camera.right = 30;
dir_light.shadow.camera.bottom = -30;
dir_light.shadow.camera.top = 30;
dir_light.shadow.camera.near = 0.1;
dir_light.shadow.camera.far = 100;
dir_light.shadow.camera.updateProjectionMatrix();

dir_light.shadow.bias = 0.0001;
dir_light.shadow.mapSize.width = 5000;
dir_light.shadow.mapSize.height = 5000;

scene.add(amb_light);
scene.add(dir_light);

// Background
scene.background = new THREE.Color(0xaaffff);

// Axes
var axes = new THREE.AxesHelper(10);
scene.add(axes);

// Models
let roller_coaster = new RollerCoaster(4);
roller_coaster.position.set(0, 3, -8);
scene.add(roller_coaster);

let island = new Island(16, 0.4, 0, 0.2, 0, 20, 4, 8);
island.position.set(0, 0, 0);
scene.add(island);

let water = new Water();
water.position.set(0, 0.08, 0);
scene.add(water);

var teapotGeometry = new THREE.TeapotGeometry(0.05, 15, true, true, true, false, false);
var teapot = new THREE.Mesh(teapotGeometry, new THREE.MeshBasicMaterial({ color: 'pink' }));
teapot.position.set(camLAX, camLAY, camLAZ);
scene.add(teapot);


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
	water.update();

    t += 0.002;

    setTimeout(() => requestAnimationFrame(animate), 1000/60);
}
animate();
