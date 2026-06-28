/**
 * QUINIELA COMPADRES — Crear el Google Form de la RONDA 4 (DIECISEISAVOS) automáticamente.
 *
 * CÓMO USARLO (≈2 min, solo autorizas):
 *   1. Ve a https://script.google.com  →  "Nuevo proyecto".
 *   2. Borra lo que haya y PEGA todo este archivo.
 *   3. Arriba selecciona la función  crearRonda4  y pulsa  ▶ Ejecutar.
 *   4. Google te pedirá AUTORIZAR (tu cuenta) → acepta.
 *   5. Abre  Ver → Registros (Execution log) y COPIA el bloque
 *      entre "===== PEGA ESTO EN EL CHAT =====" y pásamelo.
 *
 * Crea UN formulario con los 16 cruces de dieciseisavos (formato "quién avanza",
 * 2 opciones por partido, sin empate) + Nombre, le conecta una hoja de respuestas,
 * la comparte para lectura, y te imprime la URL de envío, los entry IDs y el CSV.
 */
function crearRonda4() {
  var form = FormApp.create('Quiniela Compadres · Ronda 4 (Dieciseisavos)');
  form.setDescription('Pronostica QUIÉN AVANZA en cada uno de los 16 cruces de dieciseisavos del Mundial 2026. (No hay empate.) 🍻');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  var nombre = form.addTextItem().setTitle('Nombre completo').setRequired(true);

  // Los 16 cruces en el MISMO orden que ronda4.html.
  // [ título exacto , [opciónA, opciónB] ]  — el que avanza.
  var partidos = [
    ['Sudafrica vs Canada',                  ['Sudafrica','Canada']],
    ['Brasil vs Japon',                      ['Brasil','Japon']],
    ['Alemania vs Paraguay',                 ['Alemania','Paraguay']],
    ['Paises Bajos vs Marruecos',            ['Paises Bajos','Marruecos']],
    ['Costa de Marfil vs Noruega',           ['Costa de Marfil','Noruega']],
    ['Francia vs Suecia',                    ['Francia','Suecia']],
    ['Mexico vs Ecuador',                    ['Mexico','Ecuador']],
    ['Inglaterra vs RD del Congo',           ['Inglaterra','RD del Congo']],
    ['Belgica vs Senegal',                   ['Belgica','Senegal']],
    ['Estados Unidos vs Bosnia y Herzegovina',['Estados Unidos','Bosnia y Herzegovina']],
    ['Espana vs Austria',                    ['Espana','Austria']],
    ['Portugal vs Croacia',                  ['Portugal','Croacia']],
    ['Suiza vs Argelia',                     ['Suiza','Argelia']],
    ['Australia vs Egipto',                  ['Australia','Egipto']],
    ['Argentina vs Cabo Verde',              ['Argentina','Cabo Verde']],
    ['Colombia vs Ghana',                    ['Colombia','Ghana']]
  ];

  var mc = [];
  partidos.forEach(function (p) {
    mc.push(form.addMultipleChoiceItem().setTitle(p[0]).setChoiceValues(p[1]).setRequired(true));
  });

  var ss = SpreadsheetApp.create('Quiniela Compadres R4 — respuestas');
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
