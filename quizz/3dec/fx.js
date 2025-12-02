class SnowFX {
    constructor(containerId, flakeCount = 80) {
        this.container = document.getElementById(containerId);
        this.flakeCount = flakeCount;
        this.flakes = [];

        this.colors = ["yellow", "white", "cyan"];
        this.shapes = [
            "shape-circle",
            "shape-diamond",
            "shape-star",
            "shape-blob"
        ];
    }

    init() {
        for (let i = 0; i < this.flakeCount; i++) {

            const flake = document.createElement("div");
            flake.classList.add("snowflake");

            // random shape
            const shapeClass =
                this.shapes[Math.floor(Math.random() * this.shapes.length)];
            flake.classList.add(shapeClass);

            // Random size
            const size = Math.random() * 12 + 6;

            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            // Random color
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];

            // Style
            flake.style.width = size + "px";
            flake.style.height = size + "px";
            flake.style.left = x + "px";
            flake.style.top = y + "px";
            flake.style.backgroundColor = color;

            const flakeData = {
                el: flake,
                x,
                y,
                size,
                speedY: 0.5 + Math.random() * 1.5,
                speedX: (Math.random() - 0.5) * 0.5,
                opacityDir: Math.random() > 0.5 ? 1 : -1
            };

            this.flakes.push(flakeData);
            this.container.appendChild(flake);
        }
    }

    draw() {
        this.flakes.forEach(flake => {
            // movement
            flake.y += flake.speedY;
            flake.x += flake.speedX;

            if (flake.x < -20) flake.x = window.innerWidth + 20;
            if (flake.x > window.innerWidth + 20) flake.x = -20;

            if (flake.y > window.innerHeight + 20) {
                flake.y = -flake.size;
                flake.x = Math.random() * window.innerWidth;
            }

            flake.el.style.top = flake.y + "px";
            flake.el.style.left = flake.x + "px";

            // opacity pulse
            let op = parseFloat(flake.el.style.opacity);
            op += (flake.opacityDir > 0 ? 0.02 : -0.02);

            if (op >= 1) flake.opacityDir = -1;
            if (op <= 0.4) flake.opacityDir = 1;

            flake.el.style.opacity = op;
        });
    }

    start() {
        const loop = () => {
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();
    }
}
