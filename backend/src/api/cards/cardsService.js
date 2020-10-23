const Card = require('./cards');

Card.methods(['get', 'post', 'put', 'delete']);
Card.updateOptions({ new: true, runValidators: true });

module.exports = Card;
