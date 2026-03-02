/**
 * Proyecto: Evaluación API Canvas 2D - Paisaje "Barrio N°6"
 * Materia: Graficación
 * Institución: Instituto Tecnológico de Pachuca
 * Alumno: Leonardo Gutiérrez Jiménez
 * Matrícula: 24200089
 * Fecha: 1 de marzo de 2026
 * Descripción: Aplicación modular que renderiza un paisaje desértico estilizado.
 * Se utilizan transformaciones de contexto y un recuento de 44 figuras lógicas.
 */

window.onload = function() {
    // --- 1. INICIALIZACIÓN Y CONFIGURACIÓN ---
    const canvas = document.getElementById("miCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Configuración estética de trazo global (Delineado suave)
    ctx.strokeStyle = "rgba(51, 26, 5, 0.3)"; 
    ctx.lineWidth = 1; 

    /**
     * Gestiona el estado de las sombras para optimizar el renderizado.
     * @param {boolean} active - Activa o desactiva la sombra proyectada.
     */
    function setShadow(active) {
        if (active) {
            ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 4;
        } else {
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
        }
    }

    // --- 2. LIBRERÍA DE ELEMENTOS MODULARES (Recuento por pieza lógica) ---

    /**
     * Dibuja una casa: Compuesta por hasta 4 figuras lógicas.
     */
    function drawHouse(x, y, scaleX, scaleY = scaleX, conVentana = true, conPuerta = true) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scaleX, scaleY);
        
        setShadow(true);
        // FIGURA [A]: Cuerpo de la casa (Rectángulo)
        ctx.fillStyle = "#c19a6b"; 
        ctx.fillRect(0, 0, 100, 75);
        ctx.strokeRect(0, 0, 100, 75);

        // FIGURA [B]: Techo (Polígono/Triángulo)
        ctx.fillStyle = "#8b4513"; 
        ctx.beginPath();
        ctx.moveTo(-15, 0); ctx.lineTo(50, -45); ctx.lineTo(115, 0); 
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); 
        
        setShadow(false);
        
        // FIGURA [C]: Ventana (Opcional)
        if (conVentana) {
            ctx.fillStyle = "white"; 
            ctx.fillRect(15, 25, 20, 20);
            ctx.strokeRect(15, 25, 20, 20);
        }
        
        // FIGURA [D]: Puerta (Opcional)
        if (conPuerta) {
            ctx.fillStyle = "#5d3a1a"; 
            ctx.fillRect(70, 45, 18, 30);
            ctx.strokeRect(70, 45, 18, 30);
        }
        
        ctx.restore();
    }

    /**
     * Dibuja un cactus: Compuesto por 5 figuras lógicas (Cuerpo + 4 brazos).
     */
    function drawCactus(x, y, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        
        setShadow(true);
        ctx.fillStyle = "#2d9c2d";
        // FIGURAS [E, F, G, H, I]: Estructura de 5 rectángulos lógicos
        ctx.fillRect(0, 0, 22, 100);    // Tronco
        ctx.fillRect(-18, 40, 18, 12);  // Brazo 1
        ctx.fillRect(-18, 15, 12, 35);  // Brazo 2
        ctx.fillRect(22, 55, 18, 12);   // Brazo 3
        ctx.fillRect(28, 30, 12, 35);   // Brazo 4
        
        // Se aplican trazos suaves heredados
        ctx.strokeRect(0, 0, 22, 100); ctx.strokeRect(-18, 40, 18, 12);
        ctx.strokeRect(-18, 15, 12, 35); ctx.strokeRect(22, 55, 18, 12);
        ctx.strokeRect(28, 30, 12, 35);

        setShadow(false);
        // Detalles estéticos internos (Brillos)
        ctx.fillStyle = "#63c363"; 
        ctx.fillRect(13, 5, 8, 35); ctx.fillRect(34, 35, 6, 18); 
        ctx.restore();
    }

    /**
     * Dibuja un arbusto: Compuesto por 5 figuras lógicas (Círculos).
     */
    function drawBush(x, y) {
        ctx.save();
        setShadow(true);
        ctx.fillStyle = "#209024";
        
        // FIGURAS [J, K, L, M, N]: 5 Arcos circulares que forman el follaje
        const arcs = [
            {dx: 18, dy: -15, r: 22}, {dx: 45, dy: -12, r: 20},
            {dx: 0, dy: 10, r: 25}, {dx: 32, dy: 10, r: 28}, {dx: 62, dy: 10, r: 25}
        ];

        arcs.forEach(p => {
            ctx.beginPath(); 
            ctx.arc(x + p.dx, y + p.dy, p.r, 0, Math.PI * 2); 
            ctx.fill();
            ctx.stroke();
        });
        
        ctx.restore();
    }

    // --- 3. RENDERIZADO POR CAPAS (ALGORITMO DEL PINTOR) ---

    // CAPA 1: Cielo. FIGURA [1] (Rectángulo de fondo)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // CAPA 2: Sol. FIGURAS [2, 3] (Halo resplandor y Núcleo circular)
    const sX = 600, sY = 95;
    const grad = ctx.createRadialGradient(sX, sY, 40, sX, sY, 90);
    grad.addColorStop(0, "rgba(255, 223, 0, 1)"); 
    grad.addColorStop(1, "rgba(255, 223, 0, 0)");
    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(sX, sY, 110, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffdf00"; ctx.beginPath(); ctx.arc(sX, sY, 55, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // CAPA 3: Montañas. FIGURAS [4, 5, 6] (3 Triángulos)
    // Geometría: $$h = w \cdot \frac{\sqrt{3}}{2}$$
    ctx.fillStyle = "#607d8b";
    const mt = (x, w, baseY) => {
        const h = w * (Math.sqrt(3) / 2); 
        ctx.beginPath(); ctx.moveTo(x, baseY); ctx.lineTo(x + w / 2, baseY - h); 
        ctx.lineTo(x + w, baseY); ctx.closePath(); ctx.fill(); ctx.stroke();
    };
    mt(-20, 320, 300); mt(100, 320, 320); mt(570, 320, 320); 

    // CAPA 4: Dunas. FIGURAS [7, 8, 9] (3 Caminos de arena con Bézier)
    const drawDune = (color, startY, cp1x, cp1y, cp2x, cp2y, endY) => {
        ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, 800, endY);
        ctx.lineTo(800, 450); ctx.lineTo(0, 450); ctx.closePath(); ctx.fill(); ctx.stroke();
    };
    drawDune("#e5b164", 140, 360, 0, 500, 240, 210); 
    drawDune("#dbb171", 120, 200, 320, 600, 60, 140);
    drawDune("#ddbb87", 200, 310, 60, 450, 270, 200);

    // CAPA 5: Suelo. FIGURA [10] (Rectángulo base)
    ctx.fillStyle = "#dbd299";
    ctx.fillRect(0, 320, 800, 130);
    ctx.strokeRect(0, 320, 800, 130);

    // CAPA 6: Elementos Finales
    // CASAS: H1(2 piezas) + H2(4 piezas) + H3(2 piezas) + H4(2 piezas) + H5(4 piezas)
    // FIGURAS [11 a 24] (Total 14 piezas arquitectónicas)
    drawHouse(180, 280, 0.75, 0.75, false, false); 
    drawHouse(250, 300, 1.00, 0.80);               
    drawHouse(500, 285, 0.75, 0.75, false, false); 
    drawHouse(640, 290, 0.75, 0.75, false, false); 
    drawHouse(560, 305, 1.00);                     

    // CACTUS: 2 ejemplares x 5 piezas cada uno. FIGURAS [25 a 34] (Total 10 piezas)
    drawCactus(80, 250, 1.4);  
    drawCactus(740, 270, 1.3); 

    // ARBUSTOS: 2 ejemplares x 5 piezas cada uno. FIGURAS [35 a 44] (Total 10 piezas)
    drawBush(180, 395);
    drawBush(650, 405);
};

// TOTAL DE FIGURAS LÓGICAS QUE COMPONEN LA IMAGEN: 44