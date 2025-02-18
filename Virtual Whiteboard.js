const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

let drawing = false;
let currentColor = "#000000";
let currentThickness = 3;
let erasing = false;

let history = [];
let redoStack = [];

function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function draw(event) {
    if (!drawing) return;
    
    ctx.lineWidth = currentThickness;
    ctx.lineCap = "round";
    ctx.strokeStyle = erasing ? "#fff" : currentColor;
    
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    history.push(canvas.toDataURL());
}

function changeColor(color) {
    currentColor = color;
    erasing = false;
}

function changeThickness(thickness) {
    currentThickness = thickness;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    history = [];
    redoStack = [];
}

function toggleEraser() {
    erasing = !erasing;
}

function undo() {
    if (history.length > 0) {
        redoStack.push(history.pop());
        let img = new Image();
        img.src = history.length > 0 ? history[history.length - 1] : "";
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

function redo() {
    if (redoStack.length > 0) {
        history.push(redoStack.pop());
        let img = new Image();
        img.src = history[history.length - 1];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

function downloadCanvas() {
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
// Back Button Function
function goBack() {
    window.history.back(); // Navigates to the previous page
}