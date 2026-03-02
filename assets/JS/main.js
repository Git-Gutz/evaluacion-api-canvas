/**
 * main.js - Barrio N°6 (Versión Delineado Suave)
 */

window.onload = function() {
    const canvas = document.getElementById("miCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // --- EL CAMBIO CLAVE PARA EL DELINEADO SUAVE ---
    // Usamos semi-transparencia (0.3 = 30% opacidad) para el efecto "degradado"
    ctx.strokeStyle = "rgba(51, 26, 5, 0.3)"; 
    // Reducimos el grosor a lo mínimo (1 pixel)
    ctx.lineWidth = 1; 

    // --- FUNCIÓN UTILITARIA PARA SOMBRAS ---
    function setShadow(active) {
        if (active) {
            ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 4;
        } else {
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
    }

    // --- FUNCIONES DE ELEMENTOS (Se mantienen igual, heredan el stroke global) ---

    function drawHouse(x, y, scaleX, scaleY = scaleX, conVentana = true, conPuerta = true) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scaleX, scaleY);
        
        setShadow(true);
        // Cuerpo
        ctx.fillStyle = "#c19a6b"; 
        ctx.fillRect(0, 0, 100, 75);
        ctx.strokeRect(0, 0, 100, 75); // Delineado suave heredado

        // Techo
        ctx.fillStyle = "#8b4513"; 
        ctx.beginPath();
        ctx.moveTo(-15, 0); ctx.lineTo(50, -45); ctx.lineTo(115, 0); 
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Delineado suave heredado
        
        setShadow(false);
        
        // Ventana
        if (conVentana) {
            ctx.fillStyle = "white"; 
            ctx.fillRect(15, 25, 20, 20);
            ctx.strokeRect(15, 25, 20, 20); // Delineado suave heredado
        }
        
        // Puerta
        if (conPuerta) {
            ctx.fillStyle = "#5d3a1a"; 
            ctx.fillRect(70, 45, 18, 30);
            ctx.strokeRect(70, 45, 18, 30); // Delineado suave heredado
        }
        
        ctx.restore();
    }

    function drawCactus(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        
        setShadow(true);
        ctx.fillStyle = "#2d9c2d";
        const parts = [
            [0, 0, 22, 100],      // Tronco
            [-18, 40, 18, 12],    // Brazo Izq 1
            [-18, 15, 12, 35],    // Brazo Izq 2
            [22, 55, 18, 12],     // Brazo Der 1
            [28, 30, 12, 35]      // Brazo Der 2
        ];

        parts.forEach(p => {
            ctx.fillRect(...p);
            ctx.strokeRect(...p); // Delineado suave heredado
        });
        
        setShadow(false);
        // Brillos (sin delineado)
        ctx.fillStyle = "#63c363"; 
        ctx.fillRect(13, 5, 8, 35); 
        ctx.fillRect(34, 35, 6, 18); 
        ctx.restore();
    }

    function drawBush(x, y) {
        ctx.save();
        setShadow(true);
        ctx.fillStyle = "#209024";
        
        const parts = [
            {dx: 18, dy: -15, r: 22}, {dx: 45, dy: -12, r: 20},
            {dx: 0, dy: 10, r: 25}, {dx: 32, dy: 10, r: 28}, {dx: 62, dy: 10, r: 25}
        ];

        parts.forEach(p => {
            ctx.beginPath(); 
            ctx.arc(x + p.dx, y + p.dy, p.r, 0, Math.PI * 2); 
            ctx.fill();
            ctx.stroke(); // Delineado suave heredado
        });
        
        ctx.restore();
    }

    // --- RENDERIZADO POR CAPAS ---

    // 1. Cielo
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Sol
    const sX = 600, sY = 95;
    const grad = ctx.createRadialGradient(sX, sY, 40, sX, sY, 90);
    grad.addColorStop(0, "rgba(255, 223, 0, 1)"); 
    grad.addColorStop(1, "rgba(255, 223, 0, 0)");
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(sX, sY, 110, 0, Math.PI * 2); ctx.fill();
    
    ctx.fillStyle = "#ffdf00"; 
    ctx.beginPath(); 
    ctx.arc(sX, sY, 55, 0, Math.PI * 2); 
    ctx.fill();
    ctx.stroke(); // Delineado suave heredado

    // 3. Montañas
    ctx.fillStyle = "#607d8b";
    const mtEquilateral = (x, w, baseY) => {
        const h = w * (Math.sqrt(3) / 2); 
        ctx.beginPath(); 
        ctx.moveTo(x, baseY); 
        ctx.lineTo(x + w / 2, baseY - h); 
        ctx.lineTo(x + w, baseY); 
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Delineado suave heredado
    };
    
    mtEquilateral(-20, 320, 300); 
    mtEquilateral(100, 320, 320); 
    mtEquilateral(570, 320, 320); 

    // Funciones genérica para dunas delineadas
    const drawDune = (color, startY, cp1x, cp1y, cp2x, cp2y, endY) => {
        setShadow(true);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, 800, endY);
        ctx.lineTo(800, 450); ctx.lineTo(0, 450);
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Delineado suave heredado
        setShadow(false);
    };

    drawDune("#e5b164", 140, 360, 0, 500, 240, 210); // Duna 1
    drawDune("#dbb171", 120, 200, 320, 600, 60, 140); // Duna 2
    drawDune("#ddbb87", 200, 310, 60, 450, 270, 200);  // Duna 3

    // 7. Suelo
    ctx.fillStyle = "#dbd299";
    ctx.fillRect(0, 320, 800, 130);
    ctx.strokeRect(0, 320, 800, 130); // Delineado suave heredado

    // 8. Elementos
    drawHouse(180, 280, 0.75, 0.75, false, false);
    drawHouse(250, 300, 1.00, 0.80);
    drawHouse(500, 285, 0.75, 0.75, false, false);
    drawHouse(640, 290, 0.75, 0.75, false, false);
    drawHouse(560, 305, 1.00);

    drawCactus(80, 250, 1.4);  
    drawCactus(740, 270, 1.3); 

    drawBush(180, 395);
    drawBush(650, 405);
};