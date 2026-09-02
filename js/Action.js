class Action{
    Bodies = Matter.Bodies
    Composite = Matter.Composite
    Body = Matter.Body
    Constraint = Matter.Constraint
    Events = Matter.Events
    scene

    getMouseWorldX(offsetX,scale) {
        // Если у вас есть центрирование холста (offsetX) и масштаб (scale):
        // Если камера тоже двигается за игроком, прибавляем смещение камеры (camX):
        // x += (this.camX || 0);

        return (mouseX - (offsetX || 0)) / (scale || 1);
    }

    getMouseWorldY(offsetY,scale) {
        // y += (this.camY || 0);

        return (mouseY - (offsetY || 0)) / (scale || 1);
    }

    pointRect(pointX,pointY,x,y,xW,yW){
        return pointX >= x &&         // right of the left edge AND
            pointX <= x + xW &&    // left of the right edge AND
            pointY >= y &&         // below the top AND
            pointY <= y + yW;

    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomFloat(min, max) {
        return  (Math.random() * (max - min) + min).toFixed(2);
    }

    createArray(num){
       let a = []
        for (let i = 0; i < num; i++){a[i] = i}
        return a
    }

    rect(x,y,width,height,options = {}){
        return  this.Bodies.rectangle(x + width / 2,y + height / 2,width,height,{...options,width:width,height:height})
    }

    circle(x,y,diameter,options = {}){
        return  this.Bodies.circle(x + diameter / 2,y + diameter / 2,diameter / 2,{...options,diameter:diameter})
    }

    createPolygonFromJson(data,objects = {}) {
        let worldX = data.pos[0];
        let worldY = data.pos[1];
        let w = data.size[0];
        let h = data.size[1];

        // Динамически собираем все вершины из массива points любого размера
        let vertices = data.points.map(pt => {
            return {
                x: worldX + pt[0] * w,
                y: worldY + pt[1] * h
            };
        });

        // Создаем тело. Matter.js сам разберет любой массив вершин
        return  this.Bodies.fromVertices(worldX + w / 2, worldY + h / 2, [vertices], {
            ...objects,
            fill:"#" + data.fill,
            border:"#" + data.border,
            thickness:data.thickness,
            name:data.name

        });

    }

    drawJsonPolygon(stoneData, body) {
        if (!body || !body.vertices) return;

        push();
        fill(body.fill); // Цвет камня
        stroke(body.border);
        strokeWeight(body.thickness);
        beginShape();
        // Берем готовые мировые вершины от Matter.js
        let pts = body.vertices;
        for (let i = 0; i < pts.length; i++) {

            vertex(pts[i].x, pts[i].y);
        }

        endShape(this.p5.CLOSE);
        pop();
    }
}