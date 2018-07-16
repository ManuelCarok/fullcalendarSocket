// Inyección de dependencias
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
const mysql = require('mysql')
require('events').EventEmitter.defaultMaxListeners = Infinity;

// Inyección de archivos
//Configuración
let config = require('./config')

//Controllers
let fullcalendarController = require('./controllers/fullcalendar.js')

// Inicialización de la aplicación
var app = express()

// Confituración de nuestra API
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())
app.set('port', config.port)

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', config.domain)
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE')
  res.setHeader('Content-Type', 'application/json')
  next()
});

// Iniciamos las rutas de nuestro servidor/API
let rutas = express.Router()

// Ruta de bienvenida
rutas.get('/', function(req, res) {
  res.send({
    'Mensaje': 'Bienvenido a la API REST de FullCalendar'
  })
})

//------- start: ------------------------------------------
rutas.route('/eventos')
.get(fullcalendarController.RescatarEventos)
.post(fullcalendarController.InsertarEventos)
.delete(fullcalendarController.EliminarEventos)
.put(fullcalendarController.ModificarEventos)
//------- end: ------------------------------------------

app.use(rutas)

// Inicialización del servicio
app.listen(config.port, function() {
  console.log(`Node server ejecutandose en http://localhost:${config.port}`)
  //conectar();
})
