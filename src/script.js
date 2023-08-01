import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/* 
//CURSOR — Personal exploration:
let mouseX,
	mouseY,
	diffX = 0,
	diffY = 0;

let isMouseDown = false;

window.addEventListener("mousedown", (event) => {
	isMouseDown = true;
	//prevent initial jerky movement:
	mouseX = event.clientX;
	mouseY = event.clientY;
});
window.addEventListener("mouseup", () => {
	isMouseDown = false;
});

window.addEventListener("mousemove", (event) => {
	if (isMouseDown) {
		diffX = mouseX - event.clientX;
		diffY = event.clientY - mouseY;
		mouseX = event.clientX;
		mouseY = event.clientY;
		console.log("diffX: " + diffX + " diffY: " + diffY);
		camera.position.x += diffX * 0.01;
		camera.position.y += diffY * 0.01;
		camera.lookAt(mesh.position);
	}
});
 */

// Cursor - Bruno
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);

	console.log(cursor.x, cursor.y);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xcccccc);
// scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

/* 
for (let i = 0; i < 100; i++) {
	let mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
		new THREE.MeshBasicMaterial({ color: 0xff0000 })
	);
	mesh.position.x = Math.random() * 100;
	mesh.position.y = 0;
	mesh.position.z = Math.random() * 100;
	scene.add(mesh);
}
 */

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
// mesh.position.set(2, 2, 2);
scene.add(mesh);

//Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1,
	100
);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	1,
// 	999
// );

// camera.position.x = 3;
// camera.position.y = 3;
camera.position.z = 5;
camera.lookAt(mesh.position);
scene.add(camera);

//Axes Helper
const AxesHelper = new THREE.AxesHelper(100);
scene.add(AxesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	// mesh.rotation.y = elapsedTime;

	/* 
	// Update camera
	camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	camera.position.y = cursor.y * 5;
	camera.lookAt(mesh.position);
     */

	//Update controls
	controls.update();

	// Render

	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();

/* 
// Camera Frustum
function FrustumUpdate() {
	console.log("Frustum function was called: " + this.id);

	if (this.id == "cf-near") {
		camera.near = parseInt(this.value);
	} else {
		camera.far = parseInt(this.value);
	}
	camera.updateProjectionMatrix();
}

document.getElementById("cf-near").addEventListener("input", FrustumUpdate);
document.getElementById("cf-far").addEventListener("input", FrustumUpdate);
 */
