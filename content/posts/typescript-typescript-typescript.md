---
title: "Typescript, typescript, typescript..."
description: "Typescript, typescript, typescript, typescript, typescript, typescript, typescript, typescript."
date: "07 de outubro de 2024"
coverImage: "/post3.jpg"
---

Recentemente, eu criei uma biblioteca e publiquei no npm. É algo que eu vinha pensando há um tempo, mas foi uma daquelas ideias que só faz sentido mesmo quando você percebe que o que você quer não existe... então você decide criar.

&nbsp;
&nbsp;

## O que a biblioteca faz?

&nbsp;

A biblioteca é um **gerador de senhas aleatórias** que, diferente de outros, é feito para **TypeScript**. O objetivo foi criar algo **seguro** e com **personalização flexível**, usando o que o **Node.js** oferece de melhor em termos de geração de números aleatórios: o módulo **crypto**.

&nbsp;
&nbsp;

A ideia surgiu porque, sinceramente, não encontrei nenhuma biblioteca que atendesse exatamente o que eu precisava. Eu estava procurando algo que:

&nbsp;
&nbsp;

- Não dependesse de funções não seguras;
- Fosse fortemente tipado, não só na execução;
- Fosse personalizável (tamanho da senha, incluir/excluir caracteres, definir padrões, entre outras opções).

&nbsp;
&nbsp;

Basicamente, eu queria um gerador de senhas que fosse **feito para TypeScript**, sem gambiarras.

&nbsp;
&nbsp;

## Usar o módulo crypto do Node.js foi a escolha certa

&nbsp;

O `Math.random()` é simples de usar, mas não é exatamente seguro para a geração de senhas. Ele usa um algoritmo pseudoaleatório, o que significa que o valor gerado é baseado em um número-semente (seed). Em certos casos, se você souber o seed, consegue prever os próximos números gerados. Isso é um pesadelo quando falamos de segurança.

&nbsp;
&nbsp;

Por outro lado, o `crypto` do Node.js usa um gerador de números aleatórios que depende de fontes de entropia reais, geralmente obtidas do sistema operacional. Isso significa que os números gerados não seguem um padrão previsível. O crypto usa funções baseadas em criação de chaves criptográficas, fazendo com que os números gerados sejam seguros o suficiente para serem usados em criptografia, autenticação e, no meu caso, geração de senhas seguras. Basicamente, ele usa mecanismos que exploram variações no sistema físico, como o comportamento do hardware, pra gerar os números.

&nbsp;
&nbsp;

## Por que Typescript?

&nbsp;

**TypeScript** foi a chave para acelerar meu desenvolvimento nessa biblioteca. Diferente do JavaScript, onde você só descobre os erros depois de rodar o código ou, pior, em produção, com o TypeScript **os erros aparecem enquanto você escreve**. Isso significa que eu sabia imediatamente se estava passando algum parâmetro errado ou se faltava algo.

&nbsp;
&nbsp;

O TypeScript faz um trabalho bem sofisticado de inferência de tipos. Ou seja, mesmo que você não declare explicitamente os tipos de tudo, ele consegue deduzir com base no contexto do código. Isso significa menos repetição e mais segurança ao programar. No caso da minha biblioteca, onde o usuário pode definir vários parâmetros (como tamanho da senha, caracteres permitidos, etc.), saber que cada parâmetro tem seu tipo e sua validação garantida no momento da escrita é um alívio enorme.

&nbsp;
&nbsp;

Outra coisa interessante é que, ao invés de apenas compilar para JavaScript, o TypeScript adiciona uma etapa de checagem de tipos antes da execução do código. Isso traz uma camada extra de confiança, algo que você nunca terá com JavaScript puro. A própria criação do TypeScript nasceu da necessidade de ter uma linguagem que pudesse dar mais estrutura e previsibilidade ao caos do JavaScript.

&nbsp;
&nbsp;

A biblioteca tem uma boa quantidade de opções de personalização — você pode definir o tamanho da senha, incluir números, símbolos, caracteres específicos e até padrões como "deve começar com" ou "deve terminar com". Isso cria uma certa complexidade no código. No entanto, o TypeScript me ajudou a **organizar essa complexidade**, deixando o código claro e livre de erros.

&nbsp;
&nbsp;

Outro ponto interessante foi disponibilizar a biblioteca **diretamente em TypeScript**, sem transpilar para JavaScript puro. Isso faz com que qualquer desenvolvedor que for usar a biblioteca tenha acesso imediato aos tipos, e não passe parâmetros errados sem perceber.

&nbsp;
&nbsp;

Aqui está um exemplo de como o TypeScript avisa se você passar algo errado:

&nbsp;
&nbsp;

```typescript
generatePassword(5, { mustHave: "a" });
```

&nbsp;
&nbsp;

Neste caso, o TypeScript logo vai dizer:

&nbsp;
&nbsp;

```
Argument of type 'string' is not assignable to parameter of type 'string[]'.
```

&nbsp;
&nbsp;

## A quantidade de configurações é absurda

&nbsp;

Vou ser sincero: configurar TypeScript pra funcionar com todo o ecossistema que usamos hoje em dia ainda é um pesadelo. Não é nada direto, e é fácil acabar com mais arquivos de configuração do que o próprio código que você quer escrever. Só pra fazer a integração com Jest, ESLint, e as outras ferramentas, eu precisei de um arsenal de arquivos e pacotes apenas para o TS:

&nbsp;
&nbsp;

- tsconfig.json
- @types/jest
- @types/node
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- tsconfig-paths
- jestconfig.mjs
- .eslintrc.json

&nbsp;
&nbsp;

Sendo que, o código da lib inteira está em um único arquivo...

&nbsp;
&nbsp;

![Imagem de tokens](/postmeme.jpeg)

&nbsp;
&nbsp;

Então é isso. Criar essa biblioteca me fez perceber o quanto **TypeScript** é poderoso, mas também o quanto ainda temos que melhorar quando o assunto é **integração** com outras ferramentas. E se você está pensando em começar a usar TypeScript, minha dica é: vá em frente. Mesmo com as dificuldades, a segurança e a clareza que ele traz para o desenvolvimento valem muito a pena.

&nbsp;
&nbsp;

Agora que a biblioteca está rodando bonitinha no npm, o próximo plano é criar uma versão `CLI` pra gerar senhas direto no terminal. Vai ser uma mão na roda pra quem só quer algo rápido sem precisar escrever código.

&nbsp;
&nbsp;

Aqui estão os links, caso queira dar uma olhada no projeto:

&nbsp;
&nbsp;

- [Pacote no npm](https://npmjs.com/package/random-password-typescript)

- [Repositório no GitHub](https://github.com/brunoaseff/random-password-typescript)

&nbsp;
&nbsp;
