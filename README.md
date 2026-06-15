# Quiniela Compadres · Mundial 2026

Sitio estático de la quiniela del Mundial 2026 entre compadres. Alojado en **Vercel**
(proyecto `quiniela-compadres`, URL pública https://quiniela-compadres-palmas.vercel.app).

## Archivos
- **`index.html`** → formulario de la **Ronda 1** (pronósticos previos al torneo: campeón, goleador, partidos jornada 1, etc.). Postea a un Google Form.
- **`tabla.html`** (`/tabla`) → tabla de posiciones. Lee las respuestas de los Google Forms (CSV), las califica contra los objetos `RESULTS` (Ronda 1) y `RESULTS_R2` (Ronda 2) incrustados, y **suma R1 + R2 por nombre del participante**. Tiene botón "🔄 Actualizar" (recalcula desde el CSV) y desglose de puntos al hacer clic en cada participante.
- **`ronda2.html`** (`/ronda2`) → formulario de la **Ronda 2** (jornada 2 de grupos). Postea a un segundo Google Form.
- **`vercel.json`** → `{ "cleanUrls": true }` (permite `/tabla` y `/ronda2` sin `.html`).

## Cómo se capturan los resultados
Los marcadores NO se obtienen automáticamente en el navegador. Se editan a mano en `tabla.html`:
- En `RESULTS` / `RESULTS_R2`: cambiar el valor del partido de `null` al ganador o `"Empate"` (el texto debe coincidir EXACTO con la opción del Google Form; Ronda 1 con acentos, Ronda 2 sin acentos).
- En `SCORES` / `SCORES_R2`: agregar el marcador `"X-Y"` (solo para mostrar).

Una **tarea programada de Claude** (`actualizar-quiniela-mundial`, corre 4pm y 10pm) busca los resultados finales en la web y hace estos cambios. **Importante:** revisar que TODA pregunta del formulario tenga su clave en `RESULTS` (las claves deben ser idénticas a las columnas del CSV de respuestas).

## Despliegue
Con este repo conectado a Vercel, cada `git push` a la rama principal **despliega solo**. Ya no hace falta usar la API de Vercel a mano.

## Datos de los formularios (Ronda 2)
- Form publicado: `1FAIpQLScneAjEmxshDy58tCUx5XUHvLBADza-lCN8Zw4qhpkb8YMtdw`
- Hoja de respuestas: `1lvNjjSdaNMRkORnnoIcr27oMZkz369gmyAdxTSvaaa4` (CSV vía gviz)
