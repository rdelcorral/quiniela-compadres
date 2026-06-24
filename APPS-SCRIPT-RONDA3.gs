/**
 * QUINIELA COMPADRES — Crear el Google Form de la RONDA 3 automáticamente.
 *
 * CÓMO USARLO (≈2 min, solo autorizas):
 *   1. Ve a https://script.google.com  →  "Nuevo proyecto".
 *   2. Borra lo que haya y PEGA todo este archivo.
 *   3. Arriba selecciona la función  crearRonda3  y pulsa  ▶ Ejecutar.
 *   4. Google te pedirá AUTORIZAR (tu cuenta) → acepta. (No compartes contraseñas.)
 *   5. Cuando termine, abre  Ver → Registros (o "Ejecuciones") y COPIA todo el
 *      bloque entre "===== PEGA ESTO EN EL CHAT =====" y pásamelo.
 *
 * Crea UN solo formulario con los 24 partidos + Nombre + la especial de goleada,
 * le conecta una hoja de respuestas, la comparte para lectura, y te imprime:
 * la URL de envío, los entry IDs de cada pregunta y el CSV para la tabla.
 */
function crearRonda3() {
  var form = FormApp.create('Quiniela Compadres · Ronda 3 (Jornada 3 de grupos)');
  form.setDescription('Pronostica los 24 partidos de la jornada 3 de grupos del Mundial 2026. ¡Suerte! 🍻');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  // Nombre (texto corto, obligatorio)
  var nombre = form.addTextItem().setTitle('Nombre completo').setRequired(true);

  // Los 24 partidos en el MISMO orden que la página ronda3.html.
  // [ título exacto de la pregunta , [opciónA, 'Empate', opciónB] ]
  var partidos = [
    ['Mexico vs Chequia',                ['Mexico','Empate','Chequia']],
    ['Corea del Sur vs Sudafrica',       ['Corea del Sur','Empate','Sudafrica']],
    ['Canada vs Suiza',                  ['Canada','Empate','Suiza']],
    ['Bosnia y Herzegovina vs Catar',    ['Bosnia y Herzegovina','Empate','Catar']],
    ['Brasil vs Escocia',                ['Brasil','Empate','Escocia']],
    ['Marruecos vs Haiti',               ['Marruecos','Empate','Haiti']],
    ['Estados Unidos vs Turquia',        ['Estados Unidos','Empate','Turquia']],
    ['Australia vs Paraguay',            ['Australia','Empate','Paraguay']],
    ['Alemania vs Ecuador',              ['Alemania','Empate','Ecuador']],
    ['Costa de Marfil vs Curazao',       ['Costa de Marfil','Empate','Curazao']],
    ['Paises Bajos vs Tunez',            ['Paises Bajos','Empate','Tunez']],
    ['Suecia vs Japon',                  ['Suecia','Empate','Japon']],
    ['Belgica vs Nueva Zelanda',         ['Belgica','Empate','Nueva Zelanda']],
    ['Egipto vs Iran',                   ['Egipto','Empate','Iran']],
    ['Espana vs Uruguay',                ['Espana','Empate','Uruguay']],
    ['Cabo Verde vs Arabia Saudita',     ['Cabo Verde','Empate','Arabia Saudita']],
    ['Francia vs Noruega',               ['Francia','Empate','Noruega']],
    ['Irak vs Senegal',                  ['Irak','Empate','Senegal']],
    ['Argentina vs Jordania',            ['Argentina','Empate','Jordania']],
    ['Argelia vs Austria',               ['Argelia','Empate','Austria']],
    ['Portugal vs Colombia',             ['Portugal','Empate','Colombia']],
    ['RD del Congo vs Uzbekistan',       ['RD del Congo','Empate','Uzbekistan']],
    ['Inglaterra vs Panama',             ['Inglaterra','Empate','Panama']],
    ['Croacia vs Ghana',                 ['Croacia','Empate','Ghana']]
  ];

  var mc = [];
  partidos.forEach(function (p) {
    mc.push(form.addMultipleChoiceItem().setTitle(p[0]).setChoiceValues(p[1]).setRequired(true));
  });

  // Especial
  var esp = form.addMultipleChoiceItem()
    .setTitle('Habra una goleada (3+ goles de diferencia) en la jornada 3?')
    .setChoiceValues(['Si','No']).setRequired(true);

  // Hoja de respuestas + compartir para lectura (para el CSV de la tabla)
  var ss = SpreadsheetApp.create('Quiniela Compadres R3 — respuestas');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  DriveApp.getFileById(ss.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Saca el entry ID de cada pregunta vía URL pre-rellenada
  function entryId(item, val) {
    var resp = (item.getType() === FormApp.ItemType.TEXT)
      ? item.asTextItem().createResponse(val)
      : item.asMultipleChoiceItem().createResponse(val);
    var url = form.createResponse().withItemResponse(resp).toPrefilledUrl();
    var m = url.match(/entry\.(\d+)/);
    return m ? m[1] : '???';
  }

  var out = [];
  out.push('===== PEGA ESTO EN EL CHAT =====');
  out.push('FORM_URL = ' + form.getPublishedUrl().replace('/viewform', '/formResponse'));
  out.push('E_NOMBRE = ' + entryId(nombre, 'X'));
  out.push('E_ESP = ' + entryId(esp, 'Si'));
  out.push('--- partidos (titulo => entry) ---');
  partidos.forEach(function (p, i) {
    out.push(p[0] + ' => ' + entryId(mc[i], 'Empate'));
  });
  out.push('CSV = https://docs.google.com/spreadsheets/d/' + ss.getId() + '/gviz/tq?tqx=out:csv');
  out.push('FORM_PARA_REVISAR = ' + form.getPublishedUrl());
  out.push('================================');
  Logger.log(out.join('\n'));
}
