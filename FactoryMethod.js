class Pagamento {
    processar(valor) {
        throw new Error('Método processar() deve ser implementado');
    }
}

class CartaoCredito extends Pagamento {
    processar(valor) {
        return `Pagamento de R$ ${valor.toFixed(2)} realizado com Cartão de Crédito.`;
    }
}

class Pix extends Pagamento {
    processar(valor) {
        return `Pagamento de R$ ${valor.toFixed(2)} realizado via PIX.`;
    }
}

class Boleto extends Pagamento {
    processar(valor) {
        return `Pagamento de R$ ${valor.toFixed(2)} realizado com Boleto.`;
    }
}

class PagamentoFactory {
    static criarPagamento(tipo) {
        switch (tipo.toLowerCase()) {
            case 'cartao':
                return new CartaoCredito();

            case 'pix':
                return new Pix();

            case 'boleto':
                return new Boleto();

            default:
                throw new Error('Forma de pagamento inválida!');
        }
    }
}

// Código cliente
try {
    const pagamento1 = PagamentoFactory.criarPagamento('cartao');
    console.log(pagamento1.processar(150));

    const pagamento2 = PagamentoFactory.criarPagamento('pix');
    console.log(pagamento2.processar(89.90));

    const pagamento3 = PagamentoFactory.criarPagamento('boleto');
    console.log(pagamento3.processar(250.50));

} catch (erro) {
    console.error(erro.message);
}
