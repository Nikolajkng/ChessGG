// Import the required modules from Three.js
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import {
    GLTFLoader
} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {
    OrbitControls
} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);


// Set the size of the renderer and append it to the DOM
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

light();

// Instantiate a loader for the .glb file
const loader = new GLTFLoader();
let model;
let model2;
loadFigure(loader);


// Set the camera position
camera.position.z = 5; // Depth (zoom)
camera.position.y = -2;
camera.position.x = 0;


// Set up OrbitControls for better navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Animation damping
controls.dampingFactor = 0.25; // Damping factor for smoothness
controls.screenSpacePanning = false; // Disable screen space panning


// Start the animation loop
animate();

// Adjust objects position on resize of window
handleWindowResize();


//////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////
// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Object movement logic for the first model (moon_walk)
    if (model) {
        model.rotation.y += 0.01;
        model.position.z -= 0.001
    }

    // Object movement logic for the second model (cosmonaut)
    if (model2) {
        model2.position.x += 0.05;
        model2.position.z -= 0.0005;
        
        // Calculate screen boundaries
        const screenRightEdge = camera.position.x + (window.innerWidth / 2) / 100;
        const screenLeftEdge = camera.position.x - (window.innerWidth / 2) / 100;
        console.log(model2.position.x)
    
        // Check if the object has moved beyond the right edge
        if (model2.position.x > screenRightEdge) {
            model2.position.x = screenLeftEdge; // Move to the left side
        }
    }

    // Update controls and render the scene
    controls.update();
    renderer.render(scene, camera);
}


function light() {
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // White light with a moderate intensity
    scene.add(ambientLight);

    // Add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light with full intensity
    directionalLight.position.set(1, 1, 1).normalize(); // Set position and normalize
    scene.add(directionalLight);
}

function loadFigure(loader) {

    // Load the GLB file
    loader.load(
        'visualModels/moon_walk.glb',
        function (gltf) {
            console.log('GLTF Model loaded:', gltf);

            // Store the loaded model and configure it
            model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5);
            model.position.x = 2.5;
            model.position.z = 3;
            scene.add(model); 
        },
        function (xhr) {
            // Log loading progress
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            // Log errors
            console.error('An error occurred while loading the GLTF model:', error);
        }
    ); // Load the cosmonaut on a rocket model
    loader.load(
        'visualModels/cosmonaut_on_a_rocket.glb',
        function (gltf) {
            console.log('GLTF model2 loaded:', gltf);

            model2 = gltf.scene;
            model2.scale.set(0.005, 0.005, 0.005);
            model2.position.set(-2, -1, 2);
            scene.add(model2);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error occurred while loading the GLTF model2:', error);
        }
    );


}

function handleWindowResize() {
    // Handle window resize events
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

}