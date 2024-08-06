document.addEventListener("DOMContentLoaded", () => {
  runProgram();
});

function runProgram() {
  let scale = 1;
  const minScale = 0.95;
  const maxScale = 5;
  let panning = false;
  let pointX = 0;
  let pointY = 0;
  let start = { x: 0, y: 0 };
  const zoom = document.getElementById("zoom");
  const zoomInButton = document.getElementById("zoom-in");
  const resetButton = document.getElementById("reset");
  const zoomOutButton = document.getElementById("zoom-out");

  const setTransform = () => {
    if (scale <= 1) {
      pointX = 0;
      pointY = 0;
    }
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
    const delta = e.deltaY > 0 ? -1 : 1;

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
    e.preventDefault();
    if (scale >= maxScale) return;

    const xs = (e.clientX - pointX) / scale;
    const ys = (e.clientY - pointY) / scale;

    // Double-click zooms in by a factor of 1.2
    const newScale = scale * 1.5;
    if (newScale < minScale || newScale > maxScale) return;

    scale = newScale;
    pointX = e.clientX - xs * scale;
    pointY = e.clientY - ys * scale;

    setTransform();
  };

  zoomInButton.onclick = () => {
    if (scale >= maxScale) return;
    if (scale >= maxScale) return;
    const centerX = zoom.clientWidth / 2;
    const centerY = zoom.clientHeight / 2;
    const xs = (centerX - pointX) / scale;
    const ys = (centerY - pointY) / scale;
    scale *= 1.2;
    pointX = centerX - xs * scale;
    pointY = centerY - ys * scale;
    setTransform();
  };

  zoomOutButton.onclick = () => {
    if (scale <= minScale) {
      scale = 1;
      pointX = 0;
      pointY = 0;
      setTransform();
      return;
    }
    const centerX = zoom.clientWidth / 2;
    const centerY = zoom.clientHeight / 2;
    const xs = (centerX - pointX) / scale;
    const ys = (centerY - pointY) / scale;
    scale /= 1.2;
    pointX = centerX - xs * scale;
    pointY = centerY - ys * scale;

    // Recheck
    if (scale <= minScale) {
      scale = 1;
      pointX = 0;
      pointY = 0;
      setTransform();
      return;
    }
    setTransform();
  };

  resetButton.onclick = () => {
    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
  };
}
