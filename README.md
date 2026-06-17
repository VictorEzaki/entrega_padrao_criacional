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

## Adapter
Arquivo:
- Adapter.js

# Como executar

```bash
node Adapter.js
```

O padrão Adapter permite que duas interfaces incompatíveis trabalhem juntas sem que nenhum dos dois lados precise ser alterado. Neste exemplo, o e-commerce usa a interface `Pagamento` com o método `processar(valor)`, mas o gateway de terceiros expõe `efetuarCobranca(quantia, moeda)`. O `GatewayAdapter` traduz uma chamada na outra, tornando o legado transparente para o restante do sistema.

### O que foi implementado
- Interface `Pagamento` (reutilizada da Atividade 03)
- `GatewayLegado` — API de terceiros com método diferente (não alterada)
- `GatewayAdapter` — implementa `Pagamento` e adapta a chamada para o legado
- `Pedido` chama apenas `pagamento.processar(valor)`, sem saber que existe um gateway legado por trás

## Sem o Adapter, o que você teria que fazer para integrar o gateway legado? Como o Adapter preserva o princípio Open/Closed?

Sem o Adapter, existiriam basicamente duas saídas, e nenhuma delas é boa.

A primeira seria alterar o `GatewayLegado` para que ele implemente a interface `Pagamento`. Isso não é permitido quando se trata de código de terceiros e, mesmo quando possível, viola o contrato original da classe.

A segunda seria modificar cada ponto do sistema que chama `processar(valor)` para, no caso do gateway legado, chamar `efetuarCobranca(quantia, moeda)` diretamente. Isso espalharia o conhecimento sobre o legado por todo o código cliente, criando um acoplamento forte. Cada vez que a API do gateway mudasse, seria necessário rastrear e corrigir todos esses pontos.

O Adapter preserva o Open/Closed Principle porque o sistema fica **aberto para integrar novos gateways** simplesmente criando um novo adapter, e **fechado para modificação** no código cliente e nas classes existentes. A classe `Pedido` nunca precisa ser tocada: ela sempre chama `processar(valor)` independentemente de quantos gateways diferentes existam por baixo. O adapter é o único ponto de tradução, isolado e substituível.

---

## Facade
Arquivo:
- Facade.js

# Como executar

```bash
node Facade.js
```

O padrão Facade fornece uma interface simplificada para um conjunto de subsistemas mais complexos. Neste exemplo, a finalização de um pedido envolve quatro subsistemas independentes: verificação de estoque, processamento de pagamento, atualização do carrinho e envio de e-mail. A `CheckoutFacade` orquestra todos eles por trás de um único método `finalizar(pedido)`.

### O que foi implementado
- Subsistemas stub: `EstoqueService`, `PagamentoService`, `CarrinhoService`, `EmailService`
- `CheckoutFacade` com método `finalizar(pedido)` que orquestra todos os subsistemas em sequência
- Controller (código cliente) que chama apenas `facade.finalizar(pedido)`, sem contato direto com nenhum subsistema

## O que aconteceria com o controller se a Facade não existisse e um subsistema mudasse sua API? Como a Facade protege o código cliente de mudanças internas?

Sem a Facade, o controller precisaria conhecer e chamar cada subsistema diretamente:

```javascript
// Sem Facade — controller acoplado a todos os subsistemas
estoqueService.verificar(pedido);
pagamentoService.processar(pedido);
carrinhoService.limpar(pedido);
emailService.enviarConfirmacao(pedido);
```

Se o `EmailService` mudasse o nome do método de `enviarConfirmacao` para `disparar`, ou se o `PagamentoService` passasse a exigir um segundo parâmetro, o controller teria que ser alterado. Agora imagine isso multiplicado por todos os controllers que fazem checkout: a mudança em um subsistema se propagaria por todo o código cliente.

A Facade protege o cliente criando uma camada de indireção. Quando um subsistema muda internamente, apenas a `CheckoutFacade` precisa ser atualizada para absorver essa mudança. O controller continua chamando `facade.finalizar(pedido)` da mesma forma que antes. Isso reduz o acoplamento, centraliza a lógica de orquestração e facilita testes, já que o controller pode ser testado com uma Facade substituta sem precisar subir nenhum subsistema real.

---

## Observer
Arquivo:
- Observer.js

# Como executar

```bash
node Observer.js
```

O padrão Observer define uma dependência de um-para-muitos entre objetos: quando o estado de um objeto muda, todos os seus dependentes são notificados automaticamente. Neste exemplo, ao confirmar um pedido, a classe `Pedido` notifica todos os observers registrados sem saber quem são eles ou o que fazem.

### O que foi implementado
- Interface `Observer` com método `atualizar(pedido)`
- Classe `Pedido` com lista interna de observers, métodos `registrar()`, `remover()` e `notificar()`
- Três implementações: `EmailObserver`, `EstoqueObserver`, `LogObserver`
- Demonstração de registro, disparo e remoção dinâmica de observers

## O que muda no código quando você precisa adicionar um novo observer (ex: SMS)? Compare com uma implementação sem o padrão, onde Pedido chamaria cada serviço diretamente.

Com o Observer, adicionar um `SmsObserver` exige apenas criar a nova classe e registrá-la no pedido:

```javascript
class SmsObserver extends Observer {
    atualizar(pedido) {
        console.log(`[SMS] Mensagem enviada ao cliente — Pedido #${pedido.id} confirmado.`);
    }
}

pedido.registrar(new SmsObserver());
```

A classe `Pedido` não é tocada. Ela não sabe quantos observers existem nem o que cada um faz. Isso respeita diretamente o Open/Closed Principle: o sistema está aberto para receber novos comportamentos sem modificar o que já funciona.

Sem o padrão, `Pedido` chamaria cada serviço de forma explícita dentro do método `confirmar()`:

```javascript
confirmar() {
    this.status = 'confirmado';
    emailService.enviar(this);
    estoqueService.baixar(this);
    logService.registrar(this);
    // Para adicionar SMS: smsService.enviar(this) — modifica Pedido
}
```

Cada novo serviço exige abrir a classe `Pedido` e adicionar mais uma linha. Com o tempo, `Pedido` acumula dependências de serviços que não são responsabilidade dela: sabe sobre e-mail, estoque, log, SMS. O acoplamento cresce junto com o sistema. Com o Observer, `Pedido` delega tudo para a lista de observers e nunca precisa ser modificada para suportar novos comportamentos de notificação.
