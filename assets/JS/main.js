/**
 * Proyecto: Evaluación API Canvas
 * Alumno: Leonardo
 * Carrera: Ingeniería en Sistemas
 * Institución: Instituto Tecnológico de Pachuca
 * Materia: Graficación
 * Fecha: 1 de marzo de 2026
 * Descripción: Recreación fiel de paisaje urbano retrofuturista nocturno.
 * Se utilizan ciclos para generar un sistema de ventanas detallado y naves con estelas.
 */

const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// --- DATOS DE LOS EDIFICIOS (Para automatizar el dibujo de ventanas) ---
const edificios = [
    { x: 30,  w: 60, h: 180, color: "#2e5eaa", techo: "domo",  vColor: "#fcf000" },
    { x: 100, w: 50, h: 240, color: "#6a329f", techo: "domo",  vColor: "#fcf000" },
    { x: 170, w: 60, h: 320, color: "#6a329f", techo: "domo",  vColor: "#fcf000" },
    { x: 245, w: 50, h: 140, color: "#38b449", techo: "rect",  vColor: "#fcf000" },
    { x: 310, w: 70, h: 350, color: "#2e5eaa", techo: "domo",  vColor: "#fcf000" },
    { x: 395, w: 55, h: 200, color: "#2e5eaa", techo: "domo",  vColor: "#fcf000" },
    { x: 470, w: 70, h: 310, color: "#38b449", techo: "pico",  vColor: "#fcf000" },
    { x: 555, w: 50, h: 120, color: "#38b449", techo: "rect",  vColor: "#fcf000" },
    { x: 620, w: 60, h: 260, color: "#6a329f", techo: "pico",  vColor: "#fcf000" },
    { x: 695, w: 65, h: 320, color: "#2e5eaa", techo: "domo",  vColor: "#fcf000" },
    { x: 775, w: 55, h: 280, color: "#38b449", techo: "pico",  vColor: "#fcf000" }
];

// --- FUNCIONES DE DIBUJO ---

function dibujarCieloYFondo() {
    // Cielo azul profundo
    ctx.fillStyle = "#1a3a8a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Luna
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(620, 100, 70, 0, Math.PI * 2);
    ctx.fill();

    // Estrellas (Círculos pequeños)
    const estrellas = [[40,40], [150,80], [280,30], [450,110], [750,70], [200,150]];
    estrellas.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Carretera inferior
    ctx.fillStyle = "#0a1a3a";
    ctx.fillRect(0, 420, canvas.width, 80);
    
    // Líneas de carretera (Perspectiva)
    ctx.strokeStyle = "#00f2ff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(350, 500); ctx.lineTo(430, 420);
    ctx.moveTo(450, 500); ctx.lineTo(470, 420);
    ctx.stroke();
}

function dibujarEdificiosYVentanas() {
    edificios.forEach(ed => {
        // Cuerpo del edificio
        ctx.fillStyle = ed.color;
        ctx.fillRect(ed.x, 420 - ed.h, ed.w, ed.h);

        // Techos (Domo, Pico o Rect)
        ctx.fillStyle = ed.color;
        if (ed.techo === "domo") {
            ctx.beginPath();
            ctx.arc(ed.x + ed.w/2, 420 - ed.h, ed.w/2, Math.PI, 0);
            ctx.fill();
        } else if (ed.techo === "pico") {
            ctx.beginPath();
            ctx.moveTo(ed.x, 420 - ed.h);
            ctx.lineTo(ed.x + ed.w/2, 420 - ed.h - 40);
            ctx.lineTo(ed.x + ed.w, 420 - ed.h);
            ctx.fill();
        }

        // VENTANAS (Ciclos para generar muchas figuras)
        ctx.fillStyle = ed.vColor;
        let columnas = 3;
        let filas = Math.floor(ed.h / 20) - 2;
        for (let i = 0; i < columnas; i++) {
            for (let j = 0; j < filas; j++) {
                ctx.fillRect(ed.x + 10 + (i * 15), (420 - ed.h + 20) + (j * 18), 8, 10);
            }
        }
    });
}

function dibujarMonorriel() {
    // Puente (Línea gruesa)
    ctx.fillStyle = "#00f2ff";
    ctx.fillRect(0, 310, canvas.width, 10);

    // Columnas de soporte
    ctx.fillRect(320, 320, 10, 100);
    ctx.fillRect(520, 320, 10, 100);

    // Vagón del monorriel
    ctx.fillStyle = "#00c4cc";
    ctx.fillRect(650, 305, 40, 12);
}

function dibujarNaves() {
    const naves = [
        { x: 100, y: 180, color: "#9b59b6", estela: "#5dade2" },
        { x: 500, y: 220, color: "#3498db", estela: "#5dade2" },
        { x: 750, y: 150, color: "#2ecc71", estela: "#5dade2" }
    ];

    naves.forEach(n => {
        // Estela de luz
        let grad = ctx.createLinearGradient(n.x, n.y, n.x - 60, n.y);
        grad.addColorStop(0, n.estela);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(n.x - 60, n.y + 2, 60, 10);

        // Cuerpo de la nave (Cápsula)
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.ellipse(n.x, n.y + 7, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Cabina
        ctx.fillStyle = "#f1c40f";
        ctx.beginPath();
        ctx.arc(n.x + 10, n.y + 5, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

// --- RENDERIZADO ---

function renderizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    dibujarCieloYFondo();
    dibujarEdificiosYVentanas();
    dibujarMonorriel();
    dibujarNaves();
}

window.onload = renderizar;