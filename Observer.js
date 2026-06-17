// Interface Observer
class Observer {
    /**
     * @param {Pedido} pedido
     */
    atualizar(pedido) {
        throw new Error('Método atualizar() deve ser implementado');
    }
}

// Implementações de Observer
class EmailObserver extends Observer {
    atualizar(pedido) {
        console.log(`[E-mail]   Confirmação de compra enviada para o cliente — Pedido #${pedido.id} (${pedido.status}).`);
    }
}

class EstoqueObserver extends Observer {
    atualizar(pedido) {
        console.log(`[Estoque]  Baixa de estoque realizada para os itens do Pedido #${pedido.id}.`);
    }
}

class LogObserver extends Observer {
    atualizar(pedido) {
        const timestamp = new Date().toISOString();
        console.log(`[Log]      [${timestamp}] Pedido #${pedido.id} alterado para status "${pedido.status}".`);
    }
}

// Subject — Pedido com suporte a observers
class Pedido {
    constructor(id) {
        this.id = id;
        this.status = 'pendente';
        this._observers = [];
    }

    registrar(observer) {
        this._observers.push(observer);
    }

    remover(observer) {
        this._observers = this._observers.filter(o => o !== observer);
    }

    notificar() {
        for (const observer of this._observers) {
            observer.atualizar(this);
        }
    }

    confirmar() {
        this.status = 'confirmado';
        console.log(`\n>>> Pedido #${this.id} confirmado. Notificando observers...\n`);
        this.notificar();
    }

    cancelar() {
        this.status = 'cancelado';
        console.log(`\n>>> Pedido #${this.id} cancelado. Notificando observers...\n`);
        this.notificar();
    }
}

// Demonstração — registro e disparo dos observers
const pedido = new Pedido(3001);

// Registra os três observers
pedido.registrar(new EmailObserver());
pedido.registrar(new EstoqueObserver());
pedido.registrar(new LogObserver());

// Confirma o pedido — todos os observers são disparados automaticamente
pedido.confirmar();

// Novo pedido sem o EstoqueObserver (demonstra remoção dinâmica)
const pedido2 = new Pedido(3002);
const emailObs = new EmailObserver();
const estoqueObs = new EstoqueObserver();
const logObs = new LogObserver();

pedido2.registrar(emailObs);
pedido2.registrar(estoqueObs);
pedido2.registrar(logObs);

// Remove o observer de estoque antes de cancelar
pedido2.remover(estoqueObs);

pedido2.cancelar();
