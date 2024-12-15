// Made with Zdog

const element = ".zdog-canvas";

const TAU = Zdog.TAU;
const offWhite = "#FED";
const gold = "#EA0";
const garnet = "#C25";
const eggplant = "#636";

let illo = new Zdog.Illustration({
  element: element,
  zoom: 10,
  rotate: { x: -TAU / 8, y: TAU / 16 },
  dragRotate: true,
});

// ----- model ----- //

var hipX = 3;
// hips
var hips = new Zdog.Shape({
  addTo: illo,
  path: [{ x: -hipX }, { x: hipX }],
  translate: { y: 2 },
  stroke: 4,
  color: eggplant,
});

// ----- legs ----- //

var leg = new Zdog.Shape({
  addTo: hips,
  path: [{ y: 0 }, { y: 12 }],
  translate: { x: -hipX },
  rotate: { x: TAU / 4 },
  color: eggplant,
  stroke: 4,
});

// foot
var foot = new Zdog.RoundedRect({
  addTo: leg,
  width: 2,
  height: 4,
  cornerRadius: 1,
  translate: { y: 14, z: 2 },
  rotate: { x: TAU / 4 },
  color: garnet,
  fill: true,
  stroke: 4,
});

var leftLeg = leg.copy({
  translate: { x: hipX },
  rotate: { x: -TAU / 8 },
});

foot.copy({
  addTo: leftLeg,
  // rotate: { x: -TAU/8 },
});

// ----- upper body ----- //

var spine = new Zdog.Anchor({
  addTo: hips,
  rotate: { x: TAU / 8 },
});

var chest = new Zdog.Shape({
  addTo: spine,
  path: [{ x: -1.5 }, { x: 1.5 }],
  translate: { y: -6.5 },
  stroke: 9,
  color: garnet,
});

var head = new Zdog.Shape({
  addTo: chest,
  stroke: 12,
  translate: { y: -9.5 },
  color: gold,
});

var eye = new Zdog.Ellipse({
  addTo: head,
  diameter: 2,
  quarters: 2,
  translate: { x: -2, y: 1, z: 4.5 },
  rotate: { z: -TAU / 4 },
  color: eggplant,
  stroke: 0.5,
  backface: false,
});
eye.copy({
  translate: { x: 2, y: 1, z: 4.5 },
});
// smile
new Zdog.Ellipse({
  addTo: head,
  diameter: 3,
  quarters: 2,
  translate: { y: 2.5, z: 4.5 },
  rotate: { z: TAU / 4 },
  closed: true,
  color: "#FED",
  stroke: 0.5,
  fill: true,
  backface: false,
});

// ----- arms ----- //

var armSize = 6;

// arm on left
var upperArm = new Zdog.Shape({
  addTo: chest,
  path: [{ y: 0 }, { y: armSize }],
  translate: { x: -5, y: -2 },
  rotate: { x: -TAU / 4 },
  color: eggplant,
  stroke: 4,
});

var forearm = new Zdog.Shape({
  addTo: upperArm,
  path: [{ y: 0 }, { y: armSize }],
  translate: { y: armSize },
  rotate: { x: TAU / 8 },
  color: gold,
  stroke: 4,
});

// hand
new Zdog.Shape({
  addTo: forearm,
  translate: { z: 1, y: armSize },
  stroke: 6,
  color: gold,
});

// arm on right
var rightUpperArm = upperArm.copyGraph({
  translate: { x: 5, y: -2 },
  rotate: { x: TAU / 4 },
});

let diff = 0.05;
let isHovering = false;
function animate() {
  if (!isHovering) {
    /*
  x = left
  y = down
  z = into page
  upperArm.rotate.x is relative to the item, not relative to absolute coordinates
  */
    upperArm.rotate.x += diff;
    rightUpperArm.rotate.x -= diff;
    leg.rotate.x -= diff * 0.75;
    leftLeg.rotate.x += diff * 0.75;

    // other fancier stuff:
    // upperArm.rotate.x = upperArm.rotate.x % Zdog.TAU;

    // other fancier stuff:
    if (diff > 0 && upperArm.rotate.x >= Zdog.TAU / 4) {
      diff = -diff;
    } else if (diff < 0 && upperArm.rotate.x <= -Zdog.TAU / 4) {
      diff = -diff;
    }
  }
  // note that this is outside of if (!isHovering), in case of dragging to rotate:
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
  animateCallback();
}

animate();

function animateCallback() {
  $("#output input").val(Math.round(upperArm.rotate.x * 10) / 10);
}

$(element).on("mouseover", () => {
  isHovering = true;
  $(element).addClass("isHovering");
  illo.zoom = 11;
});

$(element).on("mouseleave", () => {
  isHovering = false;
  $(element).removeClass("isHovering");
  illo.zoom = 10;
});
