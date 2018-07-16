let db = require('../providers/mysql')

exports.RescatarEventos = async function (req, res) {

    var data = []
    var json = {}

    db.query(`CALL spRec_eventos()`, data).then((result) => {
        json.data  = result[0];
        json.affectedRows = result[1].affectedRows
        json.insertId = result[1].insertId
        json.error = false;
        json.err   = [];

        res.status(200).json(json);
    }).catch((err) => {
        json.data  = [];
        json.error = true;
        json.err   = err;
        res.status(500).json(json);
    });
}

exports.InsertarEventos = async function (req, res) {

    var data = [req.body.title, req.body.start, req.body.end]
    var json = {}

    db.query(`CALL spIns_agregarEvento(?,?,?)`, data).then((result) => {
        json.data  = [];
        json.affectedRows = result.affectedRows
        json.insertId = result.insertId
        json.error = false;
        json.err   = [];

        res.status(200).json(json);
    }).catch((err) => {
        json.data  = [];
        json.error = true;
        json.err   = err;
        res.status(500).json(json);
    });
}

exports.EliminarEventos = async function (req, res) {

    var data = [req.body.id]
    var json = {}

    db.query(`CALL spDel_eliminarEvento(?)`, data).then((result) => {
        json.data  = [];
        json.affectedRows = result.affectedRows
        json.insertId = result.insertId
        json.error = false;
        json.err   = [];

        res.status(200).json(json);
    }).catch((err) => {
        json.data  = [];
        json.error = true;
        json.err   = err;
        res.status(500).json(json);
    });
}

exports.ModificarEventos = async function (req, res) {

    var data = [req.body.id, req.body.title, req.body.start, req.body.end]
    var json = {}

    db.query(`CALL spMod_modificarEvento(?,?,?,?)`, data).then((result) => {
        json.data  = [];
        json.affectedRows = result.affectedRows
        json.insertId = result.insertId
        json.error = false;
        json.err   = [];

        res.status(200).json(json);
    }).catch((err) => {
        json.data  = [];
        json.error = true;
        json.err   = err;
        res.status(500).json(json);
    });
}