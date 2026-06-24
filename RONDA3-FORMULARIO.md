# 📝 Ronda 3 (Jornada 3 de grupos) — Estructura de los formularios

> ✅ **FORMA RECOMENDADA (un solo form, automático):** usa el script
> **`APPS-SCRIPT-RONDA3.gs`** — crea el formulario único con los 24 partidos + nombre +
> goleada, lo conecta a una hoja y te imprime la URL, los entry IDs y el CSV. Solo lo
> pegas en script.google.com, Ejecutas y Autorizas. Lo de abajo (dos forms a mano) queda
> solo como referencia del texto exacto de preguntas/opciones.

La J3 arranca el **24 jun**, así que el **cierre de pronósticos debe ser antes** (ver `DEADLINE`).
La página `ronda3.html` es **un solo enlace** con los 24 partidos.

> ⚠️ **CLAVE:** el **título de cada pregunta** y el **texto de cada opción** deben ir
> EXACTAMENTE como aparecen aquí (sin acentos, igual que R2). El título de la pregunta
> se vuelve el encabezado de columna del CSV y así es como `tabla.html` lo califica.
> Cada partido es opción única con 3 respuestas: **EquipoA / Empate / EquipoB**.

Ambos formularios deben empezar con una pregunta de texto corto:
**`Nombre completo`** (obligatoria; el participante debe escribirlo igual que en rondas previas).

---

## 🟢 FORMULARIO 1 — "Ronda 3 · Principal" (12 preguntas)
| # | Grupo | Título exacto de la pregunta | Opciones |
|---|---|---|---|
| 1 | A | `Mexico vs Chequia` | Mexico / Empate / Chequia |
| 2 | B | `Canada vs Suiza` | Canada / Empate / Suiza |
| 3 | C | `Brasil vs Escocia` | Brasil / Empate / Escocia |
| 4 | D | `Estados Unidos vs Turquia` | Estados Unidos / Empate / Turquia |
| 5 | E | `Alemania vs Ecuador` | Alemania / Empate / Ecuador |
| 6 | F | `Paises Bajos vs Tunez` | Paises Bajos / Empate / Tunez |
| 7 | G | `Belgica vs Nueva Zelanda` | Belgica / Empate / Nueva Zelanda |
| 8 | H | `Espana vs Uruguay` | Espana / Empate / Uruguay |
| 9 | I | `Francia vs Noruega` | Francia / Empate / Noruega |
| 10 | J | `Argentina vs Jordania` | Argentina / Empate / Jordania |
| 11 | K | `Portugal vs Colombia` | Portugal / Empate / Colombia |
| 12 | L | `Inglaterra vs Panama` | Inglaterra / Empate / Panama |

**(Opcional) La especial:** `Habra una goleada (3+ goles de diferencia) en la jornada 3?` → Si / No

## 🔵 FORMULARIO 2 — "Ronda 3 · Complemento" (12 preguntas)
| # | Grupo | Título exacto de la pregunta | Opciones |
|---|---|---|---|
| 1 | A | `Corea del Sur vs Sudafrica` | Corea del Sur / Empate / Sudafrica |
| 2 | B | `Bosnia y Herzegovina vs Catar` | Bosnia y Herzegovina / Empate / Catar |
| 3 | C | `Marruecos vs Haiti` | Marruecos / Empate / Haiti |
| 4 | D | `Australia vs Paraguay` | Australia / Empate / Paraguay |
| 5 | E | `Costa de Marfil vs Curazao` | Costa de Marfil / Empate / Curazao |
| 6 | F | `Suecia vs Japon` | Suecia / Empate / Japon |
| 7 | G | `Egipto vs Iran` | Egipto / Empate / Iran |
| 8 | H | `Cabo Verde vs Arabia Saudita` | Cabo Verde / Empate / Arabia Saudita |
| 9 | I | `Irak vs Senegal` | Irak / Empate / Senegal |
| 10 | J | `Argelia vs Austria` | Argelia / Empate / Austria |
| 11 | K | `RD del Congo vs Uzbekistan` | RD del Congo / Empate / Uzbekistan |
| 12 | L | `Croacia vs Ghana` | Croacia / Empate / Ghana |

---

## 📤 Qué necesito de ti para conectar todo (por cada formulario)
1. **URL de envío**: la que termina en `.../d/e/XXXXXXXX/formResponse`.
2. **Los `entry.` IDs** de cada pregunta (Nombre + cada partido + la especial si la pones).
   Truco: en el form → "⋮" → **"Obtener vínculo pre-rellenado"**, lo llenas con valores de
   prueba, "Obtener vínculo", y de esa URL copias los `entry.NNNN=valor`.
3. **El CSV de respuestas**: en la hoja vinculada, `Archivo → Compartir → Publicar en la web`
   (o el link gviz `.../d/HOJA_ID/gviz/tq?tqx=out:csv`).

Con eso construyo `ronda3.html` + `ronda3c.html` y dejo `tabla.html` sumando R1+R2+R3.

## ✅ Verificación de las parejas (método)
En fase de grupos cada equipo juega contra los otros 3, así que la J3 es la pareja que falta.
Validado contra el calendario oficial del 24 jun (Suiza–Canadá, Bosnia–Catar, Escocia–Brasil,
Marruecos–Haití) y las fuentes del 26–27 jun (Nueva Zelanda–Bélgica, Uruguay–España,
Noruega–Francia, Jordania–Argentina, Colombia–Portugal, Panamá–Inglaterra, Croacia–Ghana).
