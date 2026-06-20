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
3. En `tabla.html` edita:
   - **`RESULTS` / `RESULTS_R2` / `RESULTS_R2C`**: cambia el `null` por el **ganador**
     o `"Empate"`. El texto debe coincidir EXACTO con la opción del Google Form:
     **Ronda 1 con acentos, Ronda 2 y Complemento SIN acentos.** (La calificación
     ignora acentos/mayúsculas, pero respeta el formato por claridad.)
   - **`SCORES` / `SCORES_R2` / `SCORES_R2C`**: agrega el marcador `"L-V"` con los
     goles en el **orden de la clave** (local primero, visitante después). Ej.: para
     la clave `"Escocia vs Marruecos"` que terminó 0-1 a favor de Marruecos, pon `"0-1"`.
4. **Goleada de la jornada 2** (clave `"Habra una goleada (3+ goles de diferencia) en la jornada 2?"`
   en `RESULTS_R2`): vale `"Si"` en cuanto algún partido de J2 tenga **3+ goles de
   diferencia**; si no, `"No"` cuando la jornada termine. (Ya está en `"Si"`.)
5. Haz **commit y push directo a `main`** (Vercel despliega solo). **No abras PR.**
6. En el commit resume lo capturado, ej.: `Capturar J2 20 jun: Alemania X-Y C.Marfil, ...`

## 🗓️ Partidos pendientes de la Jornada 2 (claves exactas)

> Horarios aproximados (CDMX/ET) — **verifica en la web** la hora y el estado real.
> Cuando todos estos queden capturados, la J2 está completa.

### Ronda 2 — objeto `RESULTS_R2` (marcador en `SCORES_R2`)
| Clave en el código | Fecha aprox. |
|---|---|
| `Alemania vs Costa de Marfil` | sáb 20 jun |
| `Paises Bajos vs Suecia` | sáb 20 jun |
| `Espana vs Arabia Saudita` | dom 21 jun |
| `Belgica vs Iran` | dom 21 jun |
| `Francia vs Irak` | lun 22 jun |
| `Argentina vs Austria` | lun 22 jun |
| `Portugal vs Uzbekistan` | mar 23 jun |
| `Inglaterra vs Ghana` | mar 23 jun |

### Ronda 2 Complemento — objeto `RESULTS_R2C` (marcador en `SCORES_R2C`)
| Clave en el código | Fecha aprox. |
|---|---|
| `Ecuador vs Curazao` | sáb 20 jun |
| `Tunez vs Japon` | sáb 20 / dom 21 jun (verificar) |
| `Uruguay vs Cabo Verde` | dom 21 jun |
| `Nueva Zelanda vs Egipto` | dom 21 jun |
| `Noruega vs Senegal` | lun 22 jun |
| `Jordania vs Argelia` | lun 22 jun |
| `Panama vs Croacia` | mar 23 jun |
| `Colombia vs RD del Congo` | mar 23 jun |

### ✅ Ya capturados (no tocar)
J1 completa (Ronda 1). De J2: México 1-0 Corea, Canadá 6-0 Catar, Chequia 1-1 Sudáfrica,
Suiza 4-1 Bosnia, USA 2-0 Australia, Brasil 3-0 Haití, Marruecos 1-0 Escocia,
Paraguay 1-0 Turquía, y goleada J2 = `"Si"`.

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
