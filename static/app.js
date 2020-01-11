const canvas = document.getElementById("jsCanvas"),
    ctx = canvas.getContext("2d"),
    colors = document.getElementsByClassName("jsColor"),
    range = document.getElementById("jsRange"),
    mode = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c",
    CANVAS_WIDTH = 1200,
    CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// canvas manipulate style
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        // draw a path
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // draw a line
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
// change color
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
// change brush size
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
// change brush mode
function handleModeClick() {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
// fill canvas
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
// prevent the right click, for saving
function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    canvas
}
// if color click -> change brush color
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

// if range changed -> change brush size
if (range) {
    range.addEventListener("input", handleRangeChange);
}
// if mode changed -> change brush mode
if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}