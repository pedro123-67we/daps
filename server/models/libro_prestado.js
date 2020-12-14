const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let libro_prestadoSchema = new Schema({

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro'
    }
});

module.exports = mongoose.model('Libro_prestado', libro_prestadoSchema);