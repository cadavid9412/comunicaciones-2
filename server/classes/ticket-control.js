const fs = require('fs'); //sirve para grabar en un archivo de texto
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate(); //para obtener el dia exacto
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return
    }
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    atenderticket() {
        if (this.tickets.length === 0) { //se verifica si hay tickets por atender
            return 'no hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimina la primera posicion del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio); //es el ticket que se sumara a ultimos4
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) { //verifica que existan solo 4 tickets en este arreglo
            this.ultimos4.splice(-1, 1); //sirve para borrar el ultimo ticket 
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket();
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('se ha iniciado');
        this.grabarArchivo();
    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        console.log('se ha iniciado');
    }
}

module.exports = {
    TicketControl
}