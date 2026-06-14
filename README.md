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

## Decorator
Arquivo:
- Decorator.js

# Como executar

```bash
node Decorator.js
```

O padrão Decorator permite adicionar novos comportamentos a um objeto de forma dinâmica, sem alterar sua classe original.

Neste exemplo, as classes Pix, CartaoCredito e Boleto representam formas de pagamento já existentes. Elas apenas processam o pagamento recebido e não possuem lógica de log ou desconto.

Os decorators adicionam responsabilidades extras:

- LogDecorator registra o valor cobrado antes de chamar o pagamento real.
- DescontoDecorator aplica um desconto percentual antes de repassar o valor.

Como os decorators seguem a mesma interface de Pagamento, eles podem ser combinados:

```javascript
const pagamento = new LogDecorator(
    new DescontoDecorator(
        new Pix(),
        10
    )
);
```

Nesse caso, o pagamento PIX recebe desconto e também gera log, sem modificar a classe Pix.

## Como adicionar novos comportamentos sem tocar nas classes existentes?

Para adicionar um novo comportamento, como enviar SMS, seria criada uma nova classe decorator, por exemplo SmsDecorator. Essa classe receberia um pagamento no construtor, enviaria a mensagem e depois chamaria o pagamento real.

Assim, não seria necessário alterar Pix, Boleto ou CartaoCredito. O novo comportamento seria apenas encaixado ao redor do objeto original.

Com herança simples, seria necessário criar várias subclasses para cada combinação de comportamento, como PixComLog, PixComDesconto, PixComSms, PixComLogEDesconto e assim por diante. Isso aumenta muito a quantidade de classes.

Com Decorator, os comportamentos são combinados em tempo de execução, deixando o código mais flexível e fácil de expandir.

## Strategy
Arquivo:
- Strategy.js

# Como executar

```bash
node Strategy.js
```

O padrão Strategy permite definir uma família de algoritmos e trocar qual deles será usado em tempo de execução.

Neste exemplo, o Carrinho precisa calcular o frete, mas ele não conhece os detalhes de cálculo de cada transportadora. Ele apenas recebe uma estratégia de frete e chama o método calcular(peso).

As estratégias implementadas são:

- FreteCorreios
- FreteJadlog
- FreteRetirada

Cada estratégia possui sua própria regra de cálculo. A classe Carrinho continua igual, mesmo quando a forma de calcular o frete muda.

Exemplo de troca de estratégia em tempo de execução:

```javascript
const carrinho = new Carrinho(new FreteCorreios());

carrinho.setFrete(new FreteJadlog());
carrinho.setFrete(new FreteRetirada());
```

## Como adicionar uma nova transportadora sem modificar Carrinho?

Para adicionar uma nova transportadora, como DHL, seria criada uma nova classe FreteDHL implementando o método calcular(peso).

Depois disso, bastaria passar essa nova estratégia para o Carrinho:

```javascript
carrinho.setFrete(new FreteDHL());
```

Assim, a classe Carrinho não precisa ser modificada para aceitar uma nova transportadora.

O Strategy ajuda a respeitar principalmente o princípio Open/Closed Principle, do SOLID. Esse princípio diz que uma classe deve estar aberta para extensão, mas fechada para modificação. Ou seja, conseguimos adicionar novos comportamentos criando novas estratégias, sem alterar a classe que já está pronta.

## Command
Arquivo:
- Command.js

# Como executar

```bash
node Command.js
```

O padrão Command transforma uma ação em um objeto. Assim, o sistema consegue executar, guardar no histórico, auditar e desfazer ações sem acoplar o código que solicita a ação ao código que realmente altera o pedido.

Neste exemplo, existe uma interface Comando com os métodos executar() e desfazer().

Os comandos implementados são:

- CancelarPedidoComando
- AtualizarEnderecoComando

O CancelarPedidoComando altera o status do pedido para cancelado e guarda o status anterior para restaurar no undo.

O AtualizarEnderecoComando altera o endereço de entrega e guarda o endereço anterior para desfazer a alteração.

O GerenciadorComandos executa os comandos, mantém um histórico e permite desfazer a última ação executada:

```javascript
gerenciador.executar(new CancelarPedidoComando(pedido));
gerenciador.desfazerUltimo();
```

## Que vantagens o Command traz além do undo?

Além de permitir desfazer ações, o Command facilita histórico, logs, auditoria, reexecução, agendamento, filas de processamento e desacoplamento entre quem solicita uma ação e quem executa.

Por exemplo, a tela administrativa não precisa saber como cancelar um pedido. Ela apenas cria ou envia um comando. Quem executa o comando pode ser outra parte do sistema.

## Como usar Command em uma fila de tarefas assíncronas?

Cada ação poderia ser representada por um comando e colocada em uma fila. Essa fila poderia ficar em memória, no banco de dados ou em uma ferramenta de mensageria.

Depois, um worker buscaria os comandos pendentes e chamaria executar() em cada um deles. Isso permitiria processar tarefas em segundo plano, reexecutar ações em caso de falha e registrar auditoria de tudo que foi processado.
