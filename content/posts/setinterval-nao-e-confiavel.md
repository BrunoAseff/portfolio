---
title: "setInterval nem sempre é confiável"
description: "O JavaScript pode ser imprevisível se você não souber como ele funciona de verdade."
date: "29 de outubro de 2024"
coverImage: "/post4.png"
---

Pois é, se você não sabe como o Javascript funciona por debaixo dos panos, eventualmente ele vai acabar te dando uma rasteira. Foi exatamente isso que aconteceu comigo.

&nbsp;
&nbsp;

Eu estava desenvolvendo um Pomodoro para um projeto e precisava de um contador preciso para marcar o tempo. Parecia simples: um `setInterval` rodando a cada segundo. Nada que desse muito problema, certo?

&nbsp;
&nbsp;

Bom, eu também achava isso. Até ver que meu contador começou a desviar alguns segundos do tempo real.

&nbsp;
&nbsp;

![Código setInterval ](/setinterval1.png)

&nbsp;
&nbsp;

À primeira vista, o código parece fazer o que promete: aumenta o counter a cada segundo. Porém, com o tempo, esses segundos não ficam exatamente certos. Isso acontece porque o setInterval não é tão preciso quanto parece. À medida que a execução do código continua, o tempo pode começar a acumular pequenas diferenças, causando um atraso.

&nbsp;
&nbsp;

## Por que isso acontence?

&nbsp;

O setInterval parece simples, mas, na prática, o funcionamento dele tem diversas camadas. No Javascript, quando você usa setInterval para uma execução periódica, como com 1000ms, o motor do Javascript não garante que a execução ocorrerá exatamente a cada segundo. Ele apenas tenta agendar a função para rodar a cada intervalo definido. Para entender as limitações, vamos ver o que está por trás dessa execução.

&nbsp;
&nbsp;

Primeiro, precisamos falar das `threads` e do `Call Stack`.

&nbsp;
&nbsp;

O Javascript é uma linguagem de execução em thread única. Isso significa que ele processa cada instrução uma de cada vez na Call Stack (pilha de chamadas). Essa pilha é onde funções e instruções ficam esperando para serem processadas. Quando você usa setInterval, a função a ser executada periodicamente não vai diretamente para a Call Stack. Ela é colocada na Callback Queue, que é uma fila onde todas as funções aguardam sua vez de serem executadas quando o tempo do intervalo chega. É o Event Loop que faz a comunicação entre a Callback Queue e a Call Stack, empurrando a função para a Call Stack somente quando ela está vazia.

&nbsp;
&nbsp;

Mas tem um detalhe: mesmo que a função seja agendada para cada segundo, o Javascript não tem uma precisão exata para respeitar esse intervalo. Por quê? Isso ocorre porque a thread única do Javascript só processa a próxima função na Callback Queue após a execução da função anterior na Call Stack. Isso significa que, se o navegador estiver lidando com outras tarefas ou scripts, o setInterval pode ser atrasado, pois ele não “interrompe” uma função que já está sendo executada para garantir que o tempo seja preciso. Isso é ainda mais comum se você tiver várias abas abertas ou outros processos pesados rodando.

&nbsp;
&nbsp;

E tem mais: a execução do Javascript é afetada pela prioridade que o navegador dá à aba. Se a aba do seu site ou app estiver em segundo plano (não visível na tela), o navegador automaticamente reduz a prioridade dos scripts para economizar recursos, como bateria e memória. Ele pode até “pausar” ou reduzir a frequência do setInterval. Além disso, o Javascript executado no navegador compete por recursos com outros processos, como o carregamento de novas páginas, animações, e qualquer outra atividade que esteja acontecendo nas outras abas.

&nbsp;
&nbsp;

Resumindo, o setInterval não é “impreciso” porque o Javascript é falho; a imprecisão é uma combinação de como o Javascript lida com execução em thread única e como o navegador prioriza o uso de recursos. Cada componente do processo — Call Stack, Callback Queue e Event Loop — trabalha dentro dessas limitações, e é isso que gera o atraso.

&nbsp;
&nbsp;

## Então, como resolver o problema?

&nbsp;

Pra garantir que o tempo fique sempre correto, precisamos ajustar nossa abordagem e contar com uma fonte mais confiável: a data atual. Comparando o tempo real de início com o tempo atual, conseguimos calcular o tempo decorrido sem depender do setInterval pra fazer isso com precisão. Veja como ficaria o código atualizado:

&nbsp;
&nbsp;

![Código setInterval](/setinterval2.png)

&nbsp;
&nbsp;

Aqui, não estamos mais contando diretamente a cada segundo. Em vez disso, calculamos o tempo decorrido desde o início, garantindo que mesmo que o setInterval desvie, o contador continue mostrando o tempo real.

&nbsp;
&nbsp;

## O que mais está acontecendo por baixo dos panos?

&nbsp;

Isso nos leva a outros conceitos essenciais em Javascript: Web APIs, Threads e o já mencionado Event Loop. O Javascript, como mencionamos, roda em uma única thread. Isso significa que ele só consegue executar uma tarefa por vez. Imagine que ele é como um cozinheiro que só consegue fazer uma coisa de cada vez, mas recebe ajuda de algumas Web APIs, como o setTimeout, o setInterval, e a manipulação de DOM.

&nbsp;
&nbsp;

Quando você chama setInterval, o navegador empurra essa função para uma área que não está na thread principal. Essa é uma Web API. Assim que o tempo definido no setInterval termina, a função vai pra Callback Queue, esperando o Event Loop transferi-la pra Call Stack.

&nbsp;
&nbsp;

E por que essa arquitetura existe? É assim que Javascript consegue manter a experiência do usuário fluida, mesmo em um ambiente de thread única. O Event Loop é o que possibilita que o Javascript manuseie interações do usuário e outras operações ao mesmo tempo, sem travar. Mas, como vimos, essa abordagem tem suas limitações, especialmente pra tarefas que exigem precisão de tempo.

&nbsp;
&nbsp;

No final, o que aprendi aqui é que, apesar de parecer uma solução simples, o setInterval carrega um monte de complexidades por trás, e entender essas complexidades é o que realmente permite que você desenvolva funcionalidades de alta qualidade em Javascript.

&nbsp;
&nbsp;
&nbsp;
&nbsp;
