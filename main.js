import {
  animate,
  createDrawable,
  createDraggable,
  createSpring,
} from 'https://esm.sh/animejs@4';

const HELLO_DURATION = 4500;
const SUN_ROTATION_MS = 2200;
const WORLD_BOB_MS = 4800;
const WORLD_TRAVEL = 36;

const sun = document.getElementById('sun');
const sunPivot = document.getElementById('sun-pivot');
const sunRotator = document.getElementById('sun-rotator');
const world = document.getElementById('world');
const poster = document.getElementById('poster');

const sunBox = sun.getBBox();
const sunCx = sunBox.x + sunBox.width / 2;
const sunCy = sunBox.y + sunBox.height / 2;

sunPivot.setAttribute('transform', `translate(${sunCx} ${sunCy})`);
sunRotator.setAttribute('transform', `translate(${-sunCx} ${-sunCy})`);

animate(sunRotator, {
  rotate: { from: 0, to: -360 },
  duration: SUN_ROTATION_MS,
  ease: 'linear',
  loop: true,
});

const [helloBlue] = createDrawable('#hello-blue');
const [helloWhite] = createDrawable('#hello-white');

helloBlue.draw = '0 0';
helloWhite.draw = '0 0';

animate(helloBlue, {
  draw: '0 1',
  duration: HELLO_DURATION,
  ease: 'inOutQuad',
});

animate(helloWhite, {
  draw: '0 1',
  duration: HELLO_DURATION,
  ease: 'inOutQuad',
  delay: HELLO_DURATION,
});

const worldDrag = createDraggable(world, {
  trigger: world,
  container: poster,
  x: false,
  y: true,
  releaseStiffness: 180,
  releaseDamping: 16,
  releaseEase: createSpring({ stiffness: 220, damping: 18 }),
  cursor: {
    onHover: 'grab',
    onGrab: 'grabbing',
  },
  onGrab: () => world.classList.add('is-grabbed'),
  onRelease: () => world.classList.remove('is-grabbed'),
});

animate(worldDrag.animate, {
  translateY: [0, -WORLD_TRAVEL, WORLD_TRAVEL, -WORLD_TRAVEL * 0.4, 0],
  duration: WORLD_BOB_MS,
  ease: 'inOutSine',
}).then(() => {
  worldDrag.setY(0, true);
});
