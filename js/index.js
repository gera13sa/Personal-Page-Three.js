const canvas = document.getElementById("bg");

let lastDistFromTop = 0;
let scale = 2.3;
let fovScale = 1;
const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

let mousePos = { x: undefined, y: undefined };

let arrow = document.querySelector(".fa.fa-angle-double-down");

let firstCardHeight = document.getElementById("firstCard").offsetHeight;
let secondCardHeight = document.getElementById("secondCard").offsetHeight;

//This hack is for showing first four card in full width on mobile display and allows to scroll further ...
if (isMobile) {
  fovScale = 1.2;
  document.getElementById("fourthCard").style.marginLeft = "7%";
  document.getElementById("fourthCard").style.width = "100%";
  document.getElementById("secondCard").style.top +=
    "calc(10% + " + firstCardHeight + "px)";
  document.getElementById("thirdCard").style.top +=
    "calc(15% + " + firstCardHeight + "px + " + secondCardHeight + "px)";
}

// ... and hack is for keeping even spacing between card, because their width changes depending on screens width
document.getElementById("secondCard").style.top +=
  "calc(20% + " + firstCardHeight + "px)";
document.getElementById("thirdCard").style.top +=
  "calc(25% + " + firstCardHeight + "px + " + secondCardHeight + "px)";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75 * fovScale,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 16 * scale;

var light = new THREE.PointLight(0xffffff);
light.position.set(0, 0, -1);
scene.add(light);

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
//document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(2 * scale, 64, 5);
const sunMaterial = new THREE.MeshLambertMaterial({
  color: 0xffff55,
  emissive: 0xffff55,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//Generating 8 orbits around the sun
for (let i = 1; i < 9; i++) {
  const curvei = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    (2 + i) * scale,
    (2 + i) * scale // xRadius, yRadius
  );
  const pointsi = curvei.getPoints(64);
  const curveiGeometry = new THREE.BufferGeometry().setFromPoints(pointsi);
  const curveiMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const orbiti = new THREE.Line(curveiGeometry, curveiMaterial);
  scene.add(orbiti);
}

//Manual planet creation
const mercuryPlanetGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const mercuryMaterial = new THREE.MeshStandardMaterial({ color: 0x775555 });
const mercury = new THREE.Mesh(mercuryPlanetGeometry, mercuryMaterial);
scene.add(mercury);

const venusPlanetGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const venusMaterial = new THREE.MeshStandardMaterial({ color: 0xaa7733 });
const venus = new THREE.Mesh(venusPlanetGeometry, venusMaterial);
scene.add(venus);

const earthPlanetGeometry = new THREE.SphereGeometry(0.4, 16, 16);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x008faa });
const earth = new THREE.Mesh(earthPlanetGeometry, earthMaterial);
scene.add(earth);

const moonPlanetGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const moonMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
const moon = new THREE.Mesh(moonPlanetGeometry, moonMaterial);
scene.add(moon);

const marsPlanetGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const marsMaterial = new THREE.MeshStandardMaterial({ color: 0xcc4400 });
const mars = new THREE.Mesh(marsPlanetGeometry, marsMaterial);
scene.add(mars);

const jupiterPlanetGeometry = new THREE.SphereGeometry(0.8, 16, 16);
const jupiterMaterial = new THREE.MeshStandardMaterial({ color: 0xaa5500 });
const jupiter = new THREE.Mesh(jupiterPlanetGeometry, jupiterMaterial);
scene.add(jupiter);

const saturnPlanetGeometry = new THREE.SphereGeometry(0.6, 16, 16);
const saturnMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc88 });
const saturn = new THREE.Mesh(saturnPlanetGeometry, saturnMaterial);
const curveSaturn = new THREE.EllipseCurve(
  0,
  0, // ax, aY
  0.4 * scale,
  0.4 * scale // xRadius, yRadius
);
const pointsSaturn = curveSaturn.getPoints(64);
const curveSaturnGeometry = new THREE.BufferGeometry().setFromPoints(
  pointsSaturn
);
const curveSaturnMaterial = new THREE.LineBasicMaterial({ color: 0xffcc88 });
const orbitSaturn = new THREE.Line(curveSaturnGeometry, curveSaturnMaterial);
orbitSaturn.rotation.x = 0.35;
scene.add(orbitSaturn);
scene.add(saturn);

const uranusPlanetGeometry = new THREE.SphereGeometry(0.4, 16, 16);
const uranusMaterial = new THREE.MeshStandardMaterial({ color: 0x22bbbb });
const uranus = new THREE.Mesh(uranusPlanetGeometry, uranusMaterial);
scene.add(uranus);

const neptunePlanetGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const neptuneMaterial = new THREE.MeshStandardMaterial({ color: 0x2222aa });
const neptune = new THREE.Mesh(neptunePlanetGeometry, neptuneMaterial);
scene.add(neptune);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function animate() {
  requestAnimationFrame(animate);
  var time = Date.now();

  sun.rotation.y += 0.001;
  sun.rotation.x += 0.005;
  sun.rotation.z += 0.003;

  mercury.position.x =
    Math.cos((time * (1 / 0.4)) / 1000) * 3 * scale + sun.position.x;
  mercury.position.y =
    Math.sin((time * (1 / 0.4)) / 1000) * 3 * scale + sun.position.y;

  venus.position.x =
    Math.cos((time * (1 / 0.61)) / 1000) * 4 * scale + sun.position.x;
  venus.position.y =
    Math.sin((time * (1 / 0.61)) / 1000) * 4 * scale + sun.position.y;

  earth.position.x =
    Math.cos((time * (1 / 1)) / 1000) * 5 * scale + sun.position.x;
  earth.position.y =
    Math.sin((time * (1 / 1)) / 1000) * 5 * scale + sun.position.y;
  moon.position.x =
    Math.cos((time * (1 / 0.5)) / 1000) * 0.3 * scale + earth.position.x;
  moon.position.y =
    Math.sin((time * (1 / 0.5)) / 1000) * 0.3 * scale + earth.position.y;

  mars.position.x =
    Math.cos((time * (1 / 1.88)) / 1000) * 6 * scale + sun.position.x;
  mars.position.y =
    Math.sin((time * (1 / 1.88)) / 1000) * 6 * scale + sun.position.y;

  jupiter.position.x =
    Math.cos((time * (1 / 11.9)) / 1000) * 7 * scale + sun.position.x;
  jupiter.position.y =
    Math.sin((time * (1 / 11.9)) / 1000) * 7 * scale + sun.position.y;

  saturn.position.x =
    Math.cos((time * (1 / 29.4)) / 1000) * 8 * scale + sun.position.x;
  saturn.position.y =
    Math.sin((time * (1 / 29.4)) / 1000) * 8 * scale + sun.position.y;
  orbitSaturn.position.x = saturn.position.x;
  orbitSaturn.position.y = saturn.position.y;

  uranus.position.x =
    Math.cos((time * (1 / 83.8)) / 1000) * 9 * scale + sun.position.x;
  uranus.position.y =
    Math.sin((time * 1) / 83.8 / 1000) * 9 * scale + sun.position.y;

  neptune.position.x =
    Math.cos((time * (1 / 163.7)) / 1000) * 10 * scale + sun.position.x;
  neptune.position.y =
    Math.sin((time * (1 / 163.7)) / 1000) * 10 * scale + sun.position.y;

  renderer.render(scene, camera);
}

function updateCamera() {
  const distFromTop = document.body.getBoundingClientRect().top;

  if (distFromTop > -1000) {
    camera.rotation.x = distFromTop * -0.0006;
    camera.position.y = distFromTop * 0.029;
    camera.position.x = distFromTop * 0.015;
    camera.position.z = 16 * scale + distFromTop * 0.005;

    if (distFromTop >= 0) arrow.classList.remove("fade-out");
    else arrow.classList.add("fade-out");

    lastDistFromTop = distFromTop;
    return;
  }

  if (distFromTop < -2550) {
    document.querySelector(".aboutThisSiteP").classList.add("fade-in");

    if (distFromTop < -2700) {
      if (lastDistFromTop * 0.029 - (distFromTop + 2700) * 0.029 <= 0.5)
        camera.rotation.x =
          lastDistFromTop * -0.0006 - (distFromTop + 2700) * -0.0006;

      if (lastDistFromTop * 0.029 - (distFromTop + 2700) * 0.029 <= 0.5)
        camera.position.y =
          lastDistFromTop * 0.029 - (distFromTop + 2700) * 0.027;

      document.querySelector(".fa.fa-github").classList.add("fade-in");
      if (distFromTop < -2900)
        document.querySelector(".fa.fa-vk").classList.add("fade-in");
      if (distFromTop < -3040)
        document.querySelector(".fa.fa-instagram").classList.add("fade-in");

      return;
    }
    document.querySelector(".aboutThisSiteP").classList.remove("fade-in");
    document.querySelector(".fa.fa-github").classList.remove("fade-in");
    document.querySelector(".fa.fa-vk").classList.remove("fade-in");
    document.querySelector(".fa.fa-instagram").classList.remove("fade-in");
  }
}

//Parallax effect on mousemove
document.addEventListener("mousemove", (e) => {
  if (!isMobile) {
    scene.position.x = -(e.clientX - window.innerWidth / 2) / 400;
    scene.position.y = (e.clientY - window.innerHeight / 2) / 400;
  }
});

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 3, 2);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(600).fill().forEach(addStar);

document.body.onscroll = updateCamera;
animate();
