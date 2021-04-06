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
camPosX = 0; camPosY = 1; camPosZ = 2;
camLAX = 0; camLAY = 1; camLAZ = 0;

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
let rc = new RollerCoaster();
rc.position.set(0,3,-8)
scene.add(rc);
let island = new Island(16, 0.4, 0, 0.2, 0, 20, 4, 8);
island.position.set(0,0,0)
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
document.onkeydown = function(kdEvent){keydown(kdEvent)};

// Rendering and Animation
let t = 0;
function animate() {
    renderer.render(scene, camera);

    //rc.rotation.set(0, t, 0);
    rc.update(t);
	island.update();
	
	camera.position.x = camPosX;
	camera.position.y = camPosY;
	camera.position.z = camPosZ;
	camera.lookAt(camLAX, camLAY, camLAZ);
	teapot.position.set(camLAX, camLAY, camLAZ);

    t += 0.002;

    requestAnimationFrame(animate);
}

function keydown(kdEvent){
	switch(kdEvent.keyCode){
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
		case 104: //8
			camPosZ++;
			break;
		case 98: //2
			camPosZ--;
			break;
		case 100: //4
			camPosX++;
			break;
		case 102: //6
			camPosX--;
			break;
		case 105: //9
			camPosY++;
			break;
		case 99: //3
			camPosY--;
			break;
	}
}


animate();
