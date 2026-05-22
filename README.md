# entrega_padrao_criacional
Repositório destinado à entrega da aula de padrões criacionais de padrões de projeto


# Padrões Criacionais

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
