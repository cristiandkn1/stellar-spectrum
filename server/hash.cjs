const mysql = require('mysql2');
const crypto = require('crypto');

// Cambia estos valores:
const correo = 'admin@stellar.com';
const nuevaClave = '1234';

// Generar hash
const hash = crypto.createHash('sha256').update(nuevaClave).digest('hex');

// Conexión
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventarioot'
});

db.query(
  'UPDATE usuario SET clave = ? WHERE correo = ?',
  [hash, correo],
  function (err, result) {
    if (err) {
      console.error('Error al actualizar:', err);
    } else {
      console.log(`Contraseña actualizada para ${correo} (SHA-256: ${hash})`);
    }
    db.end();
  }
);
