const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Eduardo:edimir123@cluster0.al4jeme.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('Conexión exitosa a MongoDB')).catch(err => console.log('Error al conectar a MongoDB: ', err));

module.exports = mongoose;