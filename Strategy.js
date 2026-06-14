class EstrategiaFrete {
    calcular(peso) {
        throw new Error('Método calcular() deve ser implementado');
    }
}

class FreteCorreios extends EstrategiaFrete {
    calcular(peso) {
        return 12 + (peso * 4);
    }
}

class FreteJadlog extends EstrategiaFrete {
    calcular(peso) {
        return 8 + (peso * 8);
    }
}

class FreteRetirada extends EstrategiaFrete {
    calcular(peso) {
        return 0;
    }
}

class Carrinho {
    constructor(estrategiaFrete) {
        this.estrategiaFrete = estrategiaFrete;
    }

    setFrete(estrategiaFrete) {
        this.estrategiaFrete = estrategiaFrete;
    }

    calcularFrete(peso) {
        return this.estrategiaFrete.calcular(peso);
    }
}

/*
|--------------------------------------------------------------------------
| Código cliente
|--------------------------------------------------------------------------
*/

const pesoPedido = 3;
const carrinho = new Carrinho(new FreteCorreios());

console.log(`Frete Correios: R$ ${carrinho.calcularFrete(pesoPedido).toFixed(2)}`);

carrinho.setFrete(new FreteJadlog());
console.log(`Frete Jadlog: R$ ${carrinho.calcularFrete(pesoPedido).toFixed(2)}`);

carrinho.setFrete(new FreteRetirada());
console.log(`Frete Retirada: R$ ${carrinho.calcularFrete(pesoPedido).toFixed(2)}`);
