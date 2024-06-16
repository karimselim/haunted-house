import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/examples/jsm/Addons.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

console.log(Sky);

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Textures
const textureLoader = new THREE.TextureLoader();

//Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "./floor/textures/rocks_ground_02_col_1k.png"
);
const floorArmTexture = textureLoader.load(
  "./floor/textures/rocks_ground_02_arm_1k.jpg"
);
const floorDispTexture = textureLoader.load(
  "./floor/textures/rocks_ground_02_height_1k.jpg"
);
const floorNormTexture = textureLoader.load(
  "./floor/textures/rocks_ground_02_nor_gl_1k.jpg"
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

//Walls
const wallsColorTexture = textureLoader.load(
  "./walls/rock_wall_10_1k/rock_wall_10_diff_1k.jpg"
);
const wallsArmTexture = textureLoader.load(
  "./walls/rock_wall_10_1k/rock_wall_10_arm_1k.jpg"
);
const wallsNormalTexture = textureLoader.load(
  "./walls/rock_wall_10_1k/rock_wall_10_nor_gl_1k.jpg"
);

wallsColorTexture.colorSpace = THREE.SRGBColorSpace;

//Roof
const roofColorTexture = textureLoader.load(
  "./roof/cobblestone_floor_06_1k/cobblestone_floor_06_diff_1k.jpg"
);
const roofArmTexture = textureLoader.load(
  "./roof/cobblestone_floor_06_1k/cobblestone_floor_06_arm_1k.jpg"
);
const roofNormalTexture = textureLoader.load(
  "./roof/cobblestone_floor_06_1k/cobblestone_floor_06_nor_gl_1k.jpg"
);

roofColorTexture.repeat.set(3, 1);
roofArmTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofArmTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

//bushes
const bushColorTexture = textureLoader.load(
  "./bush/forest_leaves_03_1k/forest_leaves_03_diff_1k.jpg"
);
const bushArmTexture = textureLoader.load(
  "./bush/forest_leaves_03_1k/forest_leaves_03_arm_1k.jpg"
);
const bushNormalTexture = textureLoader.load(
  "./bush/forest_leaves_03_1k/forest_leaves_03_nor_gl_1k.jpg"
);

bushColorTexture.repeat.set(2, 1);
bushArmTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushArmTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

//Graves ( i namesd it push by wrong)
const pushColorTexture = textureLoader.load(
  "./push/cracked_concrete_wall_1k/cracked_concrete_wall_diff_1k.jpg"
);
const pushArmTexture = textureLoader.load(
  "./push/cracked_concrete_wall_1k/cracked_concrete_wall_arm_1k.jpg"
);
const pushNormalTexture = textureLoader.load(
  "./push/cracked_concrete_wall_1k/cracked_concrete_wall_nor_gl_1k.jpg"
);

pushColorTexture.colorSpace = THREE.SRGBColorSpace;

//Door
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorAmbientOcclusionrTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */
//house container
const house = new THREE.Group();
scene.add(house);

//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallsColorTexture,
    aoMap: wallsArmTexture,
    roughnessMap: wallsArmTexture,
    metalnessMap: wallsArmTexture,
    normalMap: wallsNormalTexture,
  })
);

walls.position.y += 1.25;

house.add(walls);

//Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofArmTexture,
    roughnessMap: roofArmTexture,
    metalnessMap: roofArmTexture,
    normalMap: roofNormalTexture,
  })
);

roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI / 4;
house.add(roof);

//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionrTexture,
    displacementMap: doorHeightTexture,
    displacementBias: -0.04,
    displacementScale: 0.15,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughness: doorRoughnessTexture,
  })
);

door.position.y = 1;
door.position.z = 2.01;

house.add(door);

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMatreial = new THREE.MeshStandardMaterial({
  color: 0xccffcc,
  map: bushColorTexture,
  aoMap: bushArmTexture,
  roughnessMap: bushArmTexture,
  metalnessMap: bushArmTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMatreial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMatreial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMatreial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMatreial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;
house.add(bush1, bush2, bush3, bush4);

//Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: pushColorTexture,
  aoMap: pushArmTexture,
  roughnessMap: pushArmTexture,
  metalnessMap: pushArmTexture,
  normalMap: pushNormalTexture,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  //Mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  grave.rotation.x = Math.random() * 0.5 * 0.4;
  grave.rotation.y = Math.random() * 0.5 * 0.4;
  grave.rotation.z = Math.random() * 0.5 * 0.4;

  graves.add(grave);
}

//Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorArmTexture,
    metalnessMap: floorArmTexture,
    normalMap: floorNormTexture,
    displacementMap: floorDispTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);

floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floor.rotation.x = -Math.PI / 2;

scene.add(floor);

gui.add(floor.material, "displacementScale", 0, 1, 0.001);
gui.add(floor.material, "displacementBias", -1, 1, 0.001);

gui.hide();

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
house.add(doorLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Shadows
 */
//Renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

//cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;

floor.receiveShadow = true;

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

//Mapping ( reduce the resolution of the shadows bcs that's better for performance)
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.mapSize.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.mapSize.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.mapSize.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.setScalar(100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

/**
 * Fog
 */
// scene.fog = new THREE.Fog("#02343f", 10, 13);
scene.fog = new THREE.FogExp2("#02343f", 0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  //Ghost
  const ghost1Angle = elapsedTime;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(elapsedTime) *
    Math.sin(elapsedTime * 2.34) *
    Math.sin(elapsedTime * 3.45);

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(elapsedTime) *
    Math.sin(elapsedTime * 2.34) *
    Math.sin(elapsedTime * 3.45);

  const ghost3Angle = elapsedTime * 0.23;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(elapsedTime) *
    Math.sin(elapsedTime * 2.34) *
    Math.sin(elapsedTime * 3.45);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
