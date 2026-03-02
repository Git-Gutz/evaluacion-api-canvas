# 🏙️  Evaluación API Canvas 2D

![Status](https://img.shields.io/badge/Status-Finalizado-ccff00?style=for-the-badge)
![Author](https://img.shields.io/badge/Autor-Leonardo%20Gutiérrez-ffcc00?style=for-the-badge)
![Institution](https://img.shields.io/badge/ITP-Sistemas-white?style=for-the-badge)

Este proyecto es una aplicación web interactiva que renderiza un paisaje desértico estilizado titulado **"Dibujo API Canvas"**, desarrollado para la materia de **Graficación** en el **Instituto Tecnológico de Pachuca**. 

La interfaz y el diseño visual están fuertemente inspirados en la estética *Urban Cyberpunk* de **Zenless Zone Zero (ZZZ)**, utilizando efectos de neón, líneas de escaneo y un layout tipo monitor industrial.

---

## 🚀 Características Técnicas

* **Renderizado por Capas:** Implementación del *Algoritmo del Pintor* para gestionar la profundidad, desde el cielo hasta el primer plano.
* **Modularidad:** Uso de funciones especializadas (`drawHouse`, `drawCactus`, `drawBush`) para una construcción lógica y limpia.
* **Geometría Compleja:** Integración de **Curvas de Bézier** para dunas orgánicas y trazados poligonales para montañas.
* **Diseño Moderno:** Estructura responsiva con **Bootstrap 5.3.3** y una hoja de estilos personalizada con variables CSS y pseudo-elementos neón.

---

## 📊 Inventario de Figuras (Recuento Lógico)

Para cumplir con la rúbrica de evaluación, el dibujo se compone de un total de **44 figuras lógicas** identificables:

| Elemento | Piezas Lógicas | Cantidad |
| :--- | :--- | :---: |
| **Cielo** | Rectángulo de fondo | 1 |
| **Clima** | Halo de resplandor y núcleo solar | 2 |
| **Geografía** | 3 Montañas, 3 Dunas y 1 Suelo base | 7 |
| **Arquitectura** | 5 Casas (Cuerpos, techos, puertas y ventanas) | 14 |
| **Vegetación** | 2 Cactus (10 piezas) y 2 Arbustos (10 piezas) | 20 |
| **TOTAL** | | **44** |

---

## 🛠️ Estructura del Proyecto

El proyecto sigue una organización impecable de carpetas para facilitar su rastreo:

```text
📂 root
├── 📄 index.html        # Estructura principal y maquetación UI
├── 📄 README.md         # Documentación del proyecto
└── 📂 assets
    ├── 📂 css
    │   └── 📄 styles.css # Estilos temáticos ZZZ y efectos neón
    ├── 📂 js
    │   └── 📄 main.js   # Lógica de renderizado API Canvas
    └── 📂 img
        ├── 🖼️ imagen.jpg # Referencia visual original
        └── 🖼️ favicon.png # Icono de la aplicación