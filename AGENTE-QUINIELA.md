# 🤖 Agente "Actualizar Quiniela" — Playbook

Instrucciones para la **sesión programada de Claude Code** que mantiene al día la
tabla de posiciones (`tabla.html`). Una sesión recurrente solo necesita decir:

> **"Sigue las instrucciones de `AGENTE-QUINIELA.md` y actualiza la quiniela."**

---

## 🎯 Misión

Después de que termina cada partido del Mundial 2026, buscar el marcador final en
la web y capturarlo en `tabla.html` para que las posiciones se recalculen solas.

## ⏱️ Cadencia y la regla de los 30 minutos

- La sesión debe correr **varias veces al día** (sugerido: **11:00 y 23:00 hora CDMX**,
  más opcionalmente al mediodía). Así capta lo de la mañana y lo de la noche.
- Solo captura un partido cuando **ya terminó hace al menos ~30 minutos**. Como un
  partido dura ~2 horas, la regla práctica es: **actúa solo si el saque inicial fue
  hace 2.5 horas o más.** Si un partido sigue en juego o acaba de terminar, déjalo
  en `null` y se capturará en la siguiente corrida.
- **Nunca inventes un marcador.** Si no encuentras el resultado final confirmado en
  fuentes confiables, déjalo en `null`.
- Es **idempotente**: si un partido ya está capturado, déjalo como está. Solo tocas
  los que siguen en `null` y ya tienen resultado final.

## 🔧 Procedimiento

1. Revisa qué partidos de la lista de abajo siguen en `null` y ya deberían haber terminado.
2. Busca en la web el **marcador final** de cada uno (ESPN, Olympics.com, ClaroSports,
   El Tiempo, etc. — verifica con 2 fuentes si hay duda).
3. En `tabla.html` edita (la **Ronda 3 / J3 es lo único pendiente** ahora):
   - **`RESULTS_R3`**: cambia el `null` por el **ganador** o `"Empate"`. Texto SIN acentos,
     EXACTO como la clave (la calificación ignora acentos/mayúsculas, pero respeta el formato).
   - **`SCORES_R3`**: agrega el marcador `"L-V"` con los goles en el **orden de la clave**
     (local primero). Ej.: clave `"Corea del Sur vs Sudafrica"` que ganó Sudáfrica 1-0 → `"0-1"`.
4. **Goleada de la jornada 3** (clave `"Habra una goleada (3+ goles de diferencia) en la jornada 3?"`
   en `RESULTS_R3`): vale `"Si"` en cuanto algún partido de J3 tenga **3+ goles de diferencia**.
   (Ya está en `"Si"` por Brasil 3-0 Escocia.)
5. ⚠️ **NO toques** `KICKOFF_R3`, `parseStamp` ni la lógica de marca de tiempo: ya están
   completos para los 24 partidos y son los que hacen justo el conteo por participante
   (a quien envía tarde no le suman los partidos ya jugados). Solo llenas `RESULTS_R3`/`SCORES_R3`.
6. Haz **commit y push directo a `main`** (Vercel despliega solo). **No abras PR.**
7. En el commit resume lo capturado, ej.: `Capturar J3 26 jun: Francia X-Y Noruega, ...`

## 🗓️ Partidos pendientes de la Jornada 3 (claves exactas en `RESULTS_R3`)

> **Ronda 1 y Ronda 2 están COMPLETAS** — no las toques. Lo único por capturar es la J3.
> Horarios CDMX (verifica en la web el estado real; captura ~30 min tras finalizar).

### 26 jun
| Clave en el código | Hora aprox. |
|---|---|
| `Francia vs Noruega` | 1:00 pm |
| `Irak vs Senegal` | 1:00 pm |
| `Espana vs Uruguay` | 6:00 pm |
| `Cabo Verde vs Arabia Saudita` | 6:00 pm |
| `Belgica vs Nueva Zelanda` | 9:00 pm |
| `Egipto vs Iran` | 9:00 pm |

### 27 jun
| Clave en el código | Hora aprox. |
|---|---|
| `Inglaterra vs Panama` | 3:00 pm |
| `Croacia vs Ghana` | 3:00 pm |
| `Portugal vs Colombia` | 5:30 pm |
| `RD del Congo vs Uzbekistan` | 5:30 pm |
| `Argentina vs Jordania` | 8:00 pm |
| `Argelia vs Austria` | 8:00 pm |

### ✅ Ya capturados de la J3 (no tocar)
24 jun: México 3-0 Chequia, Sudáfrica 1-0 Corea, Suiza 2-1 Canadá, Bosnia 3-1 Catar,
Brasil 3-0 Escocia; goleada J3 = `"Si"`. (Marruecos–Haití del 24 jun: capturar si falta.)
25 jun: Grupos D/E/F (`Estados Unidos vs Turquia`, `Alemania vs Ecuador`,
`Paises Bajos vs Tunez`, `Suecia vs Japon`, `Australia vs Paraguay`,
`Costa de Marfil vs Curazao`) — capturar conforme se jueguen.

## 🏆 Premios de fin de torneo (Ronda 1 — solo al final)
Estas claves en `RESULTS` se quedan en `null` hasta que el torneo defina:
`¿Qué selección tendrá la mejor participación de CONCACAF?`,
`¿Cúal será el campeón del Mundial 2026?`, `¿Cuál será el subcampeón del Mundial 2026?`,
`¿Quién será el máximo goleador del Mundial?`, `¿Qué selección será la sorpresa del Mundial?`.

## 👥 Fusión de nombres (solo manual)
Si aparecen dos filas que son la misma persona con el nombre escrito distinto entre
rondas, se agrega la equivalencia en el objeto `NAME_FIX` de `tabla.html` (clave =
variante en minúsculas/sin acentos, valor = nombre a mostrar). Esto requiere ver el
nombre exacto y **no** se puede automatizar desde el sandbox (no hay acceso a los CSV
de Google), así que se hace a mano cuando el dueño lo reporte. Ej. ya hecho:
`"elma celia": "Elma Celis"`.

## ⚙️ Cómo se dispara este agente (configuración única)
En la app web de **Claude Code** → proyecto `quiniela-compadres` → **Schedule/Triggers**:
crea (o reutiliza la tarea `actualizar-quiniela-mundial`) un horario recurrente con el
prompt: _"Sigue las instrucciones de `AGENTE-QUINIELA.md` y actualiza la quiniela."_
La sesión necesita **acceso de red para búsquedas web** (WebSearch).
Docs: https://code.claude.com/docs/en/claude-code-on-the-web
