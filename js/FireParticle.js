class FireParticle {
    constructor(x, y, scale = 1.0) { // Добавили аргумент scale для общего масштаба
        this.x = x;
        this.y = y;

        // Меньше разлет и скорость — меньше огонь. Больше — выше пламя.
        this.vx = random(-0.8, 0.8) * scale;
        this.vy = random(-3, -1.5) * scale;

        this.life = 255;

        // Множитель размера частиц
        this.size = random(15, 35) * scale;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 8; // Скорость затухания (если уменьшить, например до 4, огонь будет выше)
        this.size *= 0.96;
    }

    show() {
        noStroke();
        fill(255, random(100, 200), 0, this.life);
        ellipse(this.x, this.y, this.size);
    }

    isDead() {
        return this.life <= 0;
    }
}
// --- ИСПОЛЬЗОВАНИЕ В ИГРЕ ---
let particles = [];

function updateAndDrawFire(originX, originY, scale = 1.0) {
    // Если нужен огонь поменьше, можно спавнить по 1 частице вместо двух
    particles.push(new FireParticle(originX + random(-5 * scale, 5 * scale), originY, scale));

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();

        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
}