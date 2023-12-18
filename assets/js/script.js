const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const image1 = new Image();
image1.src = './assets/img/fWilhelm.jpg';

const image2 = new Image();
image2.src = './assets/img/flowertest.jpg';

const circleSize = 5;
const circles = [];
let currentImage = image1;

image1.onload = function () {
    // Draw the initial image on the canvas
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Create circles based on image data
    for (let y = 0; y < canvas.height; y += circleSize) {
        for (let x = 0; x < canvas.width; x += circleSize) {
            const index = (y * canvas.width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            circles.push({
                x: x,
                y: y,
                color: `rgb(${r},${g},${b})`
            });
        }
    }

    // Add mousemove event listener
    canvas.addEventListener('mousemove', handleMouseMove);
};

function handleMouseMove(event) {
    // Update circle positions based on mouse movement
    circles.forEach(circle => {
        const dx = circle.x - event.clientX + canvas.offsetLeft;
        const dy = circle.y - event.clientY + canvas.offsetTop;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
            // Move the circle away from the mouse
            circle.x += (dx / distance) * 5;
            circle.y += (dy / distance) * 5;
        }
    });

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the current image on the canvas
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

    // Draw circles with updated positions
    circles.forEach(circle => {
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleSize / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}