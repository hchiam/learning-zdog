# Learning [Zdog](https://zzz.dog)

Zdog - pseudo-3D for canvas and SVG

Just one of the things I'm learning. <https://github.com/hchiam/learning>

<https://github.com/metafizzy/zdog>

<https://codepen.io/hchiam/full/VYZmWQP>

<https://codepen.io/hchiam/full/vEByZrZ>

<https://zzz.dog>

<https://zzz.dog/api>

Minimal example:

```js
import Zdog from "zdog";

const illo = new Zdog.Illustration({
  element: "canvas",
  dragRotate: true,
});

const anchor = new Zdog.Anchor({
  addTo: illo,
  rotate: { x: -Zdog.TAU / 10, y: Zdog.TAU / 10 },
});

new Zdog.Shape({
  addTo: anchor,
  path: [
    { x: 0, y: 0, z: 0 },
    { x: 100 },
    { x: 0, y: 0, z: 0 },
    { y: -100 },
    { x: 0, y: 0, z: 0 },
    { z: 100 },
  ],
  closed: false,
  stroke: 50,
  color: "lime",
});

function animate() {
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
```
