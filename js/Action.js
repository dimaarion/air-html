class Action{
    Bodies = Matter.Bodies
    Composite = Matter.Composite
    Body = Matter.Body
    Constraint = Matter.Constraint
    scene

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