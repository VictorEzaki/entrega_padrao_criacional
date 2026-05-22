# entrega_padrao_criacional
Repositório destinado à entrega da aula de padrões criacionais de padrões de projeto


# Padrões Criacionais

## Singleton
Arquivo:
- Singleton.js

# Como executar

```bash
node Singleton.js
```

Por que faz sentido?
Uma aplicação normalmente precisa flar com o banco várias vezes(requisições HTTP, jobs, serviçoes internos etc.). Se cada parte do sistema criasse sua própria conexão, você teria várias conexões abertas ao mesmo tempo sem necessidade.

Com Singleton, você garante:

- uma única conexão (ou pool gerenciado de forma central)
- reutilização dessa conexão em toda a aplicação
- controle centralizado do acesso ao banco


## Factory Method
Arquivo:
- FactoryMethod.js

# Como executar

```bash
node FactoryMethod.js
```

O padrão Factory Method é utilizado para criar objetos sem que o código cliente conheça diretamente as classes concretas.

Neste exemplo:

A interface Pagamento define o comportamento comum.
As classes CartaoCredito, Pix e Boleto implementam esse comportamento.
A PagamentoFactory é responsável por decidir qual objeto criar.
O código principal utiliza apenas a factory, sem depender das implementações concretas.

Isso facilita:

manutenção do código;
reutilização;
expansão do sistema;
inclusão de novos métodos de pagamento futuramente.


### O que foi implementado
- Classe abstrata Pagamento
- Implementações:
  - CartaoCredito
  - Pix
  - Boleto
- PagamentoFactory
- Código cliente desacoplado das classes concretas

## Builder
Arquivo:
- Builder.js

# Como executar

```bash
node Builder.js
```

## Por que o Builder é mais adequado do que um construtor com muitos parâmetros?

O padrão Builder é mais adequado nesse contexto porque ele facilita a construção de objetos complexos, como um Pedido, sem a necessidade de utilizar um construtor com muitos parâmetros, o que pode tornar o código difícil de entender e manter.

---

### 1. Evita construtores com muitos parâmetros

Quando usamos apenas um construtor, ele pode crescer conforme novas propriedades são adicionadas:

```javascript
new Pedido(itens, endereco, pagamento, desconto, frete, observacao)
```

Isso torna o código confuso e difícil de manter, além de aumentar a chance de erros.

---

### 2. Melhora a legibilidade

Com o Builder, a criação do objeto fica mais clara e organizada:

```javascript
new PedidoBuilder()
  .adicionarItem(...)
  .setEndereco(...)
  .setPagamento(...)
  .build();
```

Cada método deixa explícito o que está sendo configurado.

---

### 3. Permite flexibilidade com parâmetros opcionais

No construtor tradicional, parâmetros opcionais exigem o uso de `null` ou `undefined`, o que pode gerar confusão.

Com Builder, você apenas chama os métodos necessários, sem obrigatoriedade de todos os campos.

---

### 4. Facilita validações

O Builder permite centralizar regras de validação antes de criar o objeto final:

```javascript
if (this.itens.length === 0) {
    throw new Error('Pedido inválido');
}
```

Isso mantém o construtor limpo e evita objetos inválidos.

---

### 5. Evita erros de ordem de parâmetros

Em construtores grandes, é fácil passar valores na ordem errada:

```javascript
new Pedido("PIX", "Rua X", itens) // erro comum
```

No Builder, isso não acontece, pois cada valor é definido por método nomeado:

```javascript
.setPagamento("PIX")
.setEndereco("Rua X")
```