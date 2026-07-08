/**
 * QUINIELA COMPADRES — Crear el Google Form de la RONDA 6 (CUARTOS) automáticamente.
 *
 * CÓMO USARLO (≈2 min, solo autorizas):
 *   1. Ve a https://script.google.com  →  "Nuevo proyecto".
 *   2. Borra lo que haya y PEGA todo este archivo.
 *   3. Selecciona la función  crearRonda6  y pulsa  ▶ Ejecutar.
 *   4. AUTORIZA con tu cuenta.
 *   5. Abre  Ver → Registros (Execution log) y COPIA EL BLOQUE COMO TEXTO
 *      entre "===== PEGA ESTO EN EL CHAT =====" y pásamelo (no captura, para evitar errores).
 *
 * Crea UN formulario con los 4 cruces de cuartos (formato "quién avanza", 2 opciones,
 * sin empate) + Nombre, conecta una hoja de respuestas, la comparte para lectura,
 * e imprime la URL de envío, los entry IDs y el CSV.
 */
function crearRonda6() {
  var form = FormApp.create('Quiniela Compadres · Ronda 6 (Cuartos de final)');
  form.setDescription('Pronostica QUIÉN AVANZA a semifinales en los 4 cruces de cuartos del Mundial 2026. (No hay empate.) 🍻');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  var nombre = form.addTextItem().setTitle('Nombre completo').setRequired(true);

  // Los 4 cruces en el MISMO orden que ronda6.html.
  var partidos = [
    ['Francia vs Marruecos',   ['Francia','Marruecos']],
    ['Espana vs Belgica',      ['Espana','Belgica']],
    ['Noruega vs Inglaterra',  ['Noruega','Inglaterra']],
    ['Argentina vs Suiza',     ['Argentina','Suiza']]
  ];

  var mc = [];
  partidos.forEach(function (p) {
    mc.push(form.addMultipleChoiceItem().setTitle(p[0]).setChoiceValues(p[1]).setRequired(true));
  });

  var ss = SpreadsheetApp.create('Quiniela Compadres R6 — respuestas');
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
