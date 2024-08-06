document.addEventListener("DOMContentLoaded", () => {
  runProgram();
});

function runProgram() {
  let scale = 1;
  const minScale = 0.95;
  const maxScale = 4;
  let panning = false;
  let pointX = 0;
  let pointY = 0;
  let start = { x: 0, y: 0 };
  const zoom = document.getElementById("zoom");

  const setTransform = () => {
    zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
  };

  zoom.onmousedown = (e) => {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
  };

  zoom.onmouseup = () => {
    panning = false;
  };

  zoom.onmousemove = (e) => {
    e.preventDefault();
    if (!panning) return;
    pointX = e.clientX - start.x;
    pointY = e.clientY - start.y;
    setTransform();
  };

  zoom.onwheel = (e) => {
    e.preventDefault();

    const xs = (e.clientX - pointX) / scale;
    const ys = (e.clientY - pointY) / scale;
    const delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;

    // Calculate new scale
    const newScale = delta > 0 ? scale * 1.2 : scale / 1.2;

    // Ensure new scale is within bounds
    if (newScale < minScale || newScale > maxScale) return;

    scale = newScale;
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;

    setTransform();
  };

  zoom.ondblclick = (e) => {
    console.log(e);
  };
}
