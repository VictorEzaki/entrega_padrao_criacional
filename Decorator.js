class Pagamento {
    processar(valor) {
        throw new Error('Método processar() deve ser implementado');
    }
}

// Implementações de pagamento já existentes
class Pix extends Pagamento {
    processar(valor) {
        return `Pagamento de R$ ${valor.toFixed(2)} realizado via PIX.`;
    }
}

class CartaoCredito extends Pagamento {
    processar(valor) {
        return `Pagamento de R$ ${valor.toFixed(2)} realizado com Cartão de Crédito.`;
    }
}

class Boleto extends Pagamento {
    processar(valor) {
        return `Pagamento de R$ ${valor.toFixed(2)} realizado com Boleto.`;
    }
}

class PagamentoDecorator extends Pagamento {
    constructor(pagamento) {
        super();
        this.pagamento = pagamento;
    }

    processar(valor) {
        return this.pagamento.processar(valor);
    }
}

class LogDecorator extends PagamentoDecorator {
    processar(valor) {
        console.log(`Log da transação: valor cobrado R$ ${valor.toFixed(2)}`);

        return super.processar(valor);
    }
}

class DescontoDecorator extends PagamentoDecorator {
    constructor(pagamento, percentual) {
        super(pagamento);
        this.percentual = percentual;
    }

    processar(valor) {
        const valorComDesconto = valor - (valor * this.percentual / 100);

        return super.processar(valorComDesconto);
    }
}


const pagamentoPix = new Pix();
console.log(pagamentoPix.processar(100));

const pixComDesconto = new DescontoDecorator(new Pix(), 10);
console.log(pixComDesconto.processar(100));

const pixComLogEDesconto = new LogDecorator(
    new DescontoDecorator(
        new Pix(),
        15
    )
);

console.log(pixComLogEDesconto.processar(200));

const boletoComLog = new LogDecorator(new Boleto());
console.log(boletoComLog.processar(350.75));
