/**
 * QUINIELA COMPADRES — Crear el Google Form de la RONDA 8 (FINAL + 3er lugar) automáticamente.
 *
 * CÓMO USARLO (≈2 min, solo autorizas):
 *   1. Ve a https://script.google.com  →  "Nuevo proyecto".
 *   2. Borra lo que haya y PEGA todo este archivo.
 *   3. Selecciona la función  crearRonda8  y pulsa  ▶ Ejecutar.
 *   4. AUTORIZA con tu cuenta.
 *   5. Abre  Ver → Registros (Execution log) y COPIA EL BLOQUE COMO TEXTO
 *      entre "===== PEGA ESTO EN EL CHAT =====" y pásamelo (no captura).
 *
 * Crea UN formulario con la Final y el 3er lugar (formato "quién gana", 2 opciones,
 * sin empate) + Nombre, conecta una hoja de respuestas, la comparte para lectura,
 * e imprime la URL de envío, los entry IDs y el CSV.
 */
function crearRonda8() {
  var form = FormApp.create('Quiniela Compadres · Ronda 8 (Final + 3er lugar)');
  form.setDescription('Pronostica al CAMPEÓN del Mundial 2026 y el 3er lugar. (No hay empate — cuenta quién gana.) 🏆🍻');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  var nombre = form.addTextItem().setTitle('Nombre completo').setRequired(true);

  // Mismo orden que ronda8.html.
  var partidos = [
    ['Argentina vs Espana',     ['Argentina','Espana']],
    ['Francia vs Inglaterra',   ['Francia','Inglaterra']]
  ];

  var mc = [];
  partidos.forEach(function (p) {
    mc.push(form.addMultipleChoiceItem().setTitle(p[0]).setChoiceValues(p[1]).setRequired(true));
  });

  var ss = SpreadsheetApp.create('Quiniela Compadres R8 — respuestas');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  function entryId(item, val) {
    var resp = item.createResponse(val);
    var url = form.createResponse().withItemResponse(resp).toPrefilledUrl();
    var m = url.match(/entry\.(\d+)/);
    return m ? m[1] : '???';
  }

  var out = [];
  out.push('===== PEGA ESTO EN EL CHAT =====');
  out.push('FORM_URL = ' + form.getPublishedUrl().replace('/viewform', '/formResponse'));
  out.push('E_NOMBRE = ' + entryId(nombre, 'X'));
  out.push('--- partidos (titulo => entry) ---');
  partidos.forEach(function (p, i) {
    out.push(p[0] + ' => ' + entryId(mc[i], p[1][0]));
  });
  out.push('CSV = https://docs.google.com/spreadsheets/d/' + ss.getId() + '/gviz/tq?tqx=out:csv');
  out.push('FORM_PARA_REVISAR = ' + form.getPublishedUrl());
  out.push('================================');
  Logger.log(out.join('\n'));
}
