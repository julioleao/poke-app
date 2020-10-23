const restful = require('node-restful');
const mongoose = restful.mongoose;

const cardsSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Informe o nome da carta'] },
  img: { type: Buffer, required: [true, 'Insira uma imagem'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = restful.model('cards', cardsSchema);
