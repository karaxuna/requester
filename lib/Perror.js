function Perror(message) {
    var self = this;
    self.name = 'Perror';
    self.message = message || 'სერვერის შეცდომა';
}

Perror.prototype = Object.create(Error.prototype);
Perror.prototype.constructor = Perror;

module.exports = Perror;