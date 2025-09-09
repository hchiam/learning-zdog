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

let illo = new Zdog.Illustration({
  element: "canvas",
  dragRotate: true,
});

new Zdog.Shape({
  addTo: illo,
  path: [{ x: -50 }, { x: 50 }, { x: 50, y: 100 }, { x: 50, y: 100, z: 100 }],
  closed: false,
  translate: { z: 2 },
  rotate: { x: -Zdog.TAU / 10, y: -Zdog.TAU / 10 },
  stroke: 50,
  color: "lime",
});

function animate() {
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
```
