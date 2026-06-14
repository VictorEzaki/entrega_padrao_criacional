class Comando {
    executar() {
        throw new Error('Método executar() deve ser implementado');
    }

    desfazer() {
        throw new Error('Método desfazer() deve ser implementado');
    }
}

class Pedido {
    constructor(id, status, enderecoEntrega) {
        this.id = id;
        this.status = status;
        this.enderecoEntrega = enderecoEntrega;
    }
}

class CancelarPedidoComando extends Comando {
    constructor(pedido) {
        super();
        this.pedido = pedido;
        this.statusAnterior = pedido.status;
    }

    executar() {
        this.statusAnterior = this.pedido.status;
        this.pedido.status = 'cancelado';
    }

    desfazer() {
        this.pedido.status = this.statusAnterior;
    }
}

class AtualizarEnderecoComando extends Comando {
    constructor(pedido, novoEndereco) {
        super();
        this.pedido = pedido;
        this.novoEndereco = novoEndereco;
        this.enderecoAnterior = pedido.enderecoEntrega;
    }

    executar() {
        this.enderecoAnterior = this.pedido.enderecoEntrega;
        this.pedido.enderecoEntrega = this.novoEndereco;
    }

    desfazer() {
        this.pedido.enderecoEntrega = this.enderecoAnterior;
    }
}

class GerenciadorComandos {
    constructor() {
        this.historico = [];
    }

    executar(comando) {
        comando.executar();
        this.historico.push(comando);

        console.log(`Auditoria: comando ${comando.constructor.name} executado.`);
    }

    desfazerUltimo() {
        const comando = this.historico.pop();

        if (!comando) {
            console.log('Auditoria: não há comandos para desfazer.');
            return;
        }

        comando.desfazer();

        console.log(`Auditoria: comando ${comando.constructor.name} desfeito.`);
    }
}

/*
|--------------------------------------------------------------------------
| Código cliente
|--------------------------------------------------------------------------
*/

const pedido = new Pedido(1, 'confirmado', 'Rua das Flores, 123');
const gerenciador = new GerenciadorComandos();

console.log('Estado inicial do pedido:');
console.log(pedido);

gerenciador.executar(new CancelarPedidoComando(pedido));
console.log('Após cancelar o pedido:');
console.log(pedido);

gerenciador.desfazerUltimo();
console.log('Após desfazer o cancelamento:');
console.log(pedido);

gerenciador.executar(new AtualizarEnderecoComando(pedido, 'Avenida Central, 500'));
console.log('Após atualizar o endereço:');
console.log(pedido);

gerenciador.desfazerUltimo();
console.log('Após desfazer a atualização de endereço:');
console.log(pedido);
