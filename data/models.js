const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  nombre: String,
  apellidos: String,
  telefono: Number,
  username: String,
  email: String,
  password: String,
  fecha_nacimiento: Date
});

const User = mongoose.model('user', userSchema);


module.exports = {
  User
  //Trabajos
};
