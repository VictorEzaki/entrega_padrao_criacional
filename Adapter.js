// Interface alvo (reutilizada da Atividade 03)
class Pagamento {
    processar(valor) {
        throw new Error('Método processar() deve ser implementado');
    }
}


// Gateway legado de terceiros — NÃO ALTERAR
class GatewayLegado {
    efetuarCobranca(quantia, moeda) {
        return `[LEGADO] Cobrança de ${moeda} ${quantia.toFixed(2)} autorizada pelo gateway legado.`;
    }
}

// Adapter: adapta GatewayLegado para Pagamento
class GatewayAdapter extends Pagamento {
    constructor() {
        super();
        this.gatewayLegado = new GatewayLegado();
    }

    processar(valor) {
        // Traduz a chamada do contrato moderno para a API legada
        return this.gatewayLegado.efetuarCobranca(valor, 'BRL');
    }
}

// Código cliente — conhece apenas a interface Pagamento
class Pedido {
    constructor(id, valor) {
        this.id = id;
        this.valor = valor;
    }

    pagar(pagamento) {
        const resultado = pagamento.processar(this.valor);
        console.log(`Pedido #${this.id} → ${resultado}`);
    }
}

// Pedido usa o adapter sem saber que existe um gateway legado por trás
const pedido = new Pedido(1001, 349.90);
pedido.pagar(new GatewayAdapter());
