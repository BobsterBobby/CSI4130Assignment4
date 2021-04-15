// Authors: Shize Li and Robert Zhang

import {FirstPersonControls} from './node_modules/three/examples/jsm/controls/FirstPersonControls.js';

import {RollerCoaster} from "./RollerCoaster.js";
import {Island} from "./Island.js";
import {Water} from "./Water.js";
import {Cannon} from "./Cannon.js"
import {Bomb} from "./Bomb.js"

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const canvas = renderer.domElement;
document.getElementById("canvas_container").appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);

const clock = new THREE.Clock();

// First person controls
let controls = new FirstPersonControls(camera, canvas);

controls.movementSpeed = 10;
controls.lookSpeed = 0.125;
controls.lookVertical = true;

// Cam Direction
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
	controls.handleResize();
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
// var axes = new THREE.AxesHelper(10);
// scene.add(axes);

// Models
let roller_coaster = new RollerCoaster(8);
roller_coaster.position.set(0, 3, -4);
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

let cannon1 = new Cannon(0.2);
cannon1.position.set(10,0.65,5);
scene.add(cannon1);

let cannon2 = new Cannon(0.2);
cannon2.position.set(-10,0.65,5);
scene.add(cannon2);

let bombPlace = new Bomb(0.19,0,0,0);
bombPlace.position.copy(cannon1.getBarrelOpening());
//dsdwbombPlace.rotateX(-Math.PI/2);
scene.add(bombPlace);

// Rendering and Animation
let t = 0;
function animate() {
	
    renderer.render(scene, camera);

	controls.update(clock.getDelta());

    roller_coaster.update(t);
	island.update();
	water.update();
	// bombPlace.update(t);

    t += 0.002;

    setTimeout(() => requestAnimationFrame(animate), 1000/60);
}
animate();
