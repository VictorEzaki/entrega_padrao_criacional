class Pedido {
    constructor(itens, enderecoEntrega, formaPagamento) {
        this.itens = itens;
        this.enderecoEntrega = enderecoEntrega;
        this.formaPagamento = formaPagamento;
    }
}

class PedidoBuilder {
    constructor() {
        this.itens = [];
        this.enderecoEntrega = '';
        this.formaPagamento = '';
    }

    adicionarItem(nome, quantidade, preco) {
        this.itens.push({
            nome,
            quantidade,
            preco
        });

        return this;
    }

    setEndereco(endereco) {
        this.enderecoEntrega = endereco;

        return this;
    }

    setPagamento(pagamento) {
        this.formaPagamento = pagamento;

        return this;
    }

    build() {
        // Validação
        if (this.itens.length === 0) {
            throw new Error('O pedido deve possuir pelo menos um item.');
        }

        return new Pedido(
            this.itens,
            this.enderecoEntrega,
            this.formaPagamento
        );
    }
}

/*
|--------------------------------------------------------------------------
| Código cliente
|--------------------------------------------------------------------------
*/

try {
    const pedido = new PedidoBuilder()
        .adicionarItem('Notebook', 1, 3500)
        .adicionarItem('Mouse', 2, 150)
        .setEndereco('Rua das Flores, 123')
        .setPagamento('Cartão de Crédito')
        .build();

    console.log(pedido);

} catch (error) {
    console.error(error.message);
}