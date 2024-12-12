---
title: "SSR é caro?"
description: "Server Side Rendering não só não é caro, como pode economizar o seu dinheiro."
date: "11 de dezembro de 2024"
coverImage: "/post5.png"
---

Ultimamente, tenho ouvido muitas pessoas questionando a utilidade do Server-Side Rendering (SSR). A narrativa é sempre a mesma: **"SSR é muito caro."**.

&nbsp;
&nbsp;

SSR não só não é caro como pode economizar dinheiro, melhorar a performance e entregar uma experiência bem melhor para quem usa seu site. Pois é...

&nbsp;
&nbsp;

## O custo do SSR é baixo

&nbsp;

Renderizar JSON como HTML no servidor é barato. Sério. Não é isso que vai te colocar no Serasa. A maioria dos benchmarks que são feitos pra analisar esses frameworks nem considera o custo de chamadas ao banco ou APIs, que é onde está o verdadeiro gasto.

&nbsp;
&nbsp;

Na maiorias dos casos, frameworks como Next.js conseguem transformar dados em HTML em menos de 20ms. Consultas básicas ao banco de dados costumam levar 10x mais que isso. Autenticação e verificações de permissão também são mais demoradas do que renderizar no servidor.

&nbsp;
&nbsp;

E, se você puder usar cache, melhor ainda. Dados que não dependem de autenticação podem ser armazenados no CDN e entregues prontos, sem precisar de novas renderizações. O custo disso, vai ser só a largura de banda.

&nbsp;
&nbsp;

## Menos requests = menos gastos

&nbsp;

Renderizar tudo no cliente parece simples, mas é quase sempre mais caro. Pense numa página com cinco componentes, e cada um precisa de dados para funcionar. Isso significa cinco chamadas de API, cada uma com seu próprio custo:

&nbsp;
&nbsp;

- Criar e encerrar conexões TCP.
- Processar cabeçalhos HTTP.
- Validar tokens de autenticação.
- Conectar ao banco de dados e buscar informações.

&nbsp;
&nbsp;

Agora multiplique isso pelo número de usuários simultâneos. Esse "custo escondido" é bem maior do que parece.

&nbsp;
&nbsp;

"Ah, mas eu agrupo minhas chamadas!" Ok, mas quantos sites realmente evitam todas as requisições redundantes? Se você não está usando algo como Relay, é bem provável que tenha algumas requisições desnecessárias no cliente.

&nbsp;
&nbsp;

Com o SSR, você junta tudo em uma única chamada ao servidor. No Next.js, você envia o conteúdo estático imediatamente e carrega partes dinâmicas quando prontas — sem novas conexões. O resultado disso é menos overhead, menos custos e mais simplicidade.

&nbsp;
&nbsp;

## O SSR melhora a experiência (e não é só por SEO)

&nbsp;

Muita gente pensa que o SSR é só pra SEO. Claro, renderizar no servidor ajuda no ranking dos buscadores, mas os benefícios vão bem além disso. Mesmo que SEO não seja a sua prioridade:

&nbsp;
&nbsp;

- O usuário vê algo na tela quase instantaneamente, mesmo que o JavaScript ainda esteja carregando.
- Você entrega apenas o JavaScript e os estilos CSS que a rota atual precisa. Sem baixar códigos de outras páginas.
- O SSR facilita mostrar estados de carregamento relevantes, sem aquele spinner genérico.
- Menos código pra baixar significa páginas que carregam mais rápido e consomem menos bateria.

Além disso, funcionalidades que dão dor de cabeça no cliente, como o pré-carregamento de dados críticos, ficam bem mais simples com SSR.

&nbsp;
&nbsp;

**"SSR é mais difícil de implementar"**

&nbsp;

Talvez fosse verdade 10 anos atrás. Hoje, frameworks como Next.js fazem quase tudo pra você.

&nbsp;

**"Eu já faço cache no cliente"**

&nbsp;

Ok, mas seus usuários ainda estão baixando mais JavaScript e esperando mais pra ver o conteúdo. Isso realmente vale a pena?

&nbsp;
&nbsp;

Mesmo se você usar SSR apenas para renderizar um shell e fazer TODO O RESTO do lado do cliente, você ainda consegue várias vantagens. Vai ter os metadados específicos da rota, pacotes JS específicos da rota, estilos específicos da rota e até os estados de carregamento específicos da rota.

&nbsp;
&nbsp;

Então, antes de descartar SSR, experimenta construir algo das duas formas: uma com SSR e outra totalmente renderizada no cliente. Compare os resultados e veja por si mesmo.

&nbsp;
&nbsp;

Spoiler: **SSR ganha.**

&nbsp;
&nbsp;
&nbsp;
&nbsp;
