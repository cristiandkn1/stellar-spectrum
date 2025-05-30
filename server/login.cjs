const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('./conexion.cjs'); // Tu conexión

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4321');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});
app.use(session({
  secret: 'un-secreto-superseguro',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/api/login', (req, res) => {
  const { correo, clave } = req.body;
  db.query('SELECT * FROM usuario WHERE correo = ?', [correo], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = results[0];
    // *** HASH ÉSTA CONTRASEÑA ANTES DE COMPARAR ***
    const claveIngresadaHash = crypto.createHash('sha256').update(clave).digest('hex');

    // Logs para depuración:
    console.log('Clave ingresada hash:', claveIngresadaHash);
    console.log('Clave guardada:', usuario.clave);
    console.log('Coinciden?', usuario.clave === claveIngresadaHash);

    if (usuario.clave !== claveIngresadaHash) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    req.session.userId = usuario.id;
    req.session.userName = usuario.nombre;
    req.session.userRol = usuario.rol;
    res.json({ success: true, user: { nombre: usuario.nombre, rol: usuario.rol } });
  });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
