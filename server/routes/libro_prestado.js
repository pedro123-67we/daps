const express = require('express');
const _ = require('underscore');
const Libro_prestado = require('../models/libro_prestado');
const app = express();

app.get('/librop', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 20;

    Libro_prestado.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', 'nombre')
        .populate('libro', 'titulo')
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de Libros Prestados obtenida con exito',
                conteo: libros.length,
                libros
            });
        });
});

app.post('/librop', function (req, res) {//req = obtener datos mandados por el cliente, res = mandar una respuesta
    let body = req.body;
    console.log(body)
    let libp = new Libro_prestado({
        usuario: req.body.usuario,
        libro: req.body.libro
    });

    libp.save((err, libpDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }

        return res.json({
            ok: true,
            msg: 'Libro insertado con exito',
            libpDB
        });
    });
});

app.put('/librop/:id', function (req, res) {//se pueden declara variables dentro de la url usadas para modificar
    let id = req.params.id;
    let body = _.pick(req.body, ['titulo', 'autor', 'editorial', 'disponible']);


    Libro_prestado.findByIdAndUpdate(id, body,
        { new: true, runValidators: true, context: 'query' },
        (err, libpDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Libro actualizado con exito',
                usuario: libpDB
            });
        });
});

app.delete('/librop/:id', function (req, res) {//se pueden declara variables dentro de la url usadas para eliminar
    let id = req.params.id;

    Libro_prestado.findByIdAndUpdate(id, { context: 'query' }, (err, libpDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrió un error al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Libro eliminado con éxito',
            libpDB
        });
    })
});

module.exports = app;