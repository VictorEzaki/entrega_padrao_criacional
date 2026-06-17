// Subsistemas (stubs)
class EstoqueService {
    verificar(pedido) {
        console.log(`[Estoque]    Estoque verificado para o pedido #${pedido.id}.`);
        return true;
    }
}

class PagamentoService {
    processar(pedido) {
        console.log(`[Pagamento]  Pagamento de R$ ${pedido.valor.toFixed(2)} processado para o pedido #${pedido.id}.`);
        return true;
    }
}

class CarrinhoService {
    limpar(pedido) {
        console.log(`[Carrinho]   Carrinho atualizado — itens do pedido #${pedido.id} removidos.`);
    }
}

class EmailService {
    enviarConfirmacao(pedido) {
        console.log(`[E-mail]     Confirmação enviada para ${pedido.emailCliente} (pedido #${pedido.id}).`);
    }
}


// Facade
class CheckoutFacade {
    constructor() {
        this.estoque = new EstoqueService();
        this.pagamento = new PagamentoService();
        this.carrinho = new CarrinhoService();
        this.email = new EmailService();
    }

    finalizar(pedido) {
        console.log(`\n=== Finalizando pedido #${pedido.id} ===`);

        if (!this.estoque.verificar(pedido)) {
            console.log('[Checkout]   Pedido cancelado — produto sem estoque.');
            return false;
        }

        if (!this.pagamento.processar(pedido)) {
            console.log('[Checkout]   Pedido cancelado — falha no pagamento.');
            return false;
        }

        this.carrinho.limpar(pedido);
        this.email.enviarConfirmacao(pedido);

        console.log(`[Checkout]   Pedido #${pedido.id} finalizado com sucesso!\n`);
        return true;
    }
}

// Código cliente (controller) — chama apenas a fachada
class Pedido {
    constructor(id, valor, emailCliente) {
        this.id = id;
        this.valor = valor;
        this.emailCliente = emailCliente;
    }
}

const facade = new CheckoutFacade();

const pedido1 = new Pedido(2001, 199.90, 'joao@email.com');
facade.finalizar(pedido1);

const pedido2 = new Pedido(2002, 89.50, 'maria@email.com');
facade.finalizar(pedido2);
