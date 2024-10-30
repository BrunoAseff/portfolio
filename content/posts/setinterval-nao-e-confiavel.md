---
title: "setInterval nem sempre é confiável"
description: "O JavaScript pode ser imprevisível se você não souber como ele funciona de verdade."
date: "29 de outubro de 2024"
coverImage: "/post4.png"
---

Pois é, se você não sabe como o Javascript funciona por debaixo dos panos, eventualmente ele vai acabar te dando uma rasteira. Foi exatamente isso que aconteceu comigo.

&nbsp;
&nbsp;

Eu estava desenvolvendo um **Pomodoro** pra um projeto e precisava de um contador preciso pra marcar o tempo. Parecia simples: um `setInterval` rodando a cada segundo. Nada que desse muito problema, certo?

&nbsp;
&nbsp;

Bom, eu também achava isso. Até ver que meu contador começou a desviar alguns segundos do tempo real.

&nbsp;
&nbsp;

![Código setInterval ](/setinterval1.png)

&nbsp;
&nbsp;

À primeira vista, o código parece fazer o que promete: aumenta o counter a cada segundo. Porém, com o tempo, esses segundos não ficam exatamente certos. Isso acontece porque o `setInterval` não é tão preciso quanto parece. À medida que a execução do código continua, o tempo pode começar a acumular pequenas diferenças, causando um atraso.

&nbsp;
&nbsp;

## Por que isso acontece?

&nbsp;

No JavaScript, quando você usa `setInterval` pra rodar algo periodicamente, como a cada 1000ms, o motor de execução não garante que isso vai acontecer exatamente a cada segundo. Na verdade, ele **só tenta agendar a função** pro intervalo que você definiu.

&nbsp;
&nbsp;

Pra entender por que esse agendamento não é tão preciso quanto parece, precisamos falar sobre as `threads` e o `Event Loop`.

&nbsp;
&nbsp;

O JavaScript roda tudo numa única `thread`. Ou seja, ele processa cada instrução uma de cada vez, colocando tudo na **Call Stack** (ou pilha de chamadas). A Call Stack é onde as funções e instruções ficam esperando pra serem executadas, como se fosse uma fila de espera. Só que, quando você usa um `setInterval`, a função que você quer rodando periodicamente não vai direto pra Call Stack.

&nbsp;
&nbsp;

Em vez disso, ela fica guardada na **Callback Queue** — uma fila onde todas as funções aguardam a vez de serem executadas quando o tempo do intervalo chega.

&nbsp;
&nbsp;

É aí que o `Event Loop` entra em cena. Ele é o responsável por fazer a comunicação entre a Callback Queue e a Call Stack. Basicamente, o que o Event Loop faz é checar se a Call Stack está vazia e, se estiver, ele pega a próxima função da Callback Queue e empurra pra Call Stack. Então, se a Call Stack está ocupada, a função do `setInterval` tem que esperar, e é exatamente isso que pode causar os atrasos.

&nbsp;
&nbsp;

![Event loop](/eventloop.jpg)

&nbsp;
&nbsp;

E tem mais: a execução do Javascript é afetada pela **prioridade que o navegador dá à aba.** Se a aba do seu site ou app estiver em segundo plano (não visível na tela), o navegador automaticamente reduz a prioridade dos scripts para economizar recursos, como bateria e memória. Ele pode até pausar ou reduzir a frequência do `setInterval`.

&nbsp;
&nbsp;

O Javascript executado no navegador também compete por recursos com outros processos, como o carregamento de novas páginas, animações, e qualquer outra atividade que esteja acontecendo nas outras abas.

&nbsp;
&nbsp;

## Então, como resolver o problema?

&nbsp;

Pra garantir que o tempo fique sempre correto, precisei ajustar a base do meu contador a partir de uma fonte mais confiável: **a data atual.**

&nbsp;
&nbsp;

Em vez de contar cada segundo usando só o setInterval, eu passei a **comparar o horário de início com o horário atual, a cada segundo.**

&nbsp;
&nbsp;

![Código setInterval](/setinterval2.png)

&nbsp;
&nbsp;

Assim, mesmo que o `setInterval` desvie, o contador vai continuar mostrando o tempo real.

&nbsp;
&nbsp;

## Conclusão?

&nbsp;

Depois de tudo isso, fiquei pensando em quantas outras coisas no JavaScript funcionam de um jeito meio “empurrado com a barriga” quando a gente não conhece o que está rolando nos bastidores. E isso é muito fácil de acontecer, principalmente quando você aprende as coisas por cima, copiando uns códigos daqui e dali e só esperando que funcione.

&nbsp;
&nbsp;

O `setInterval`, que foi o primeiro culpado da história, é só um exemplo de como entender a estrutura do JavaScript faz diferença. A questão é que ele parece algo bem simples, né? A gente lê lá no manual que ele roda uma função a cada intervalo, e pensa: “Perfeito, é tudo o que eu preciso.” Mas é aí que mora a pegadinha — você não vai entender porque ele não está cumprindo o combinado se você não entende as engrenagens por trás.

&nbsp;
&nbsp;

A Call Stack, o Event Loop, a Callback Queue, a prioridade do navegador... tudo isso parece encheção de linguiça até você ver seu código fazendo coisas que não deveria.

&nbsp;
&nbsp;

A maioria dos problemas que aparecem sem aviso vem justamente dessa falta de conhecimento do “mundo interno” do JavaScript. Às vezes, não é nem culpa nossa, é que essa parte mais técnica é quase sempre deixada de lado quando a gente aprende. Falam mais de **o que você pode fazer** e menos de **como o JavaScript realmente processa o que você fez.**

&nbsp;
&nbsp;

No fim das contas, ajustei o Pomodoro e agora está funcionando direitinho, sempre marcando o tempo certo:

&nbsp;
&nbsp;

![Pomodoro](/pomodoro.png)

&nbsp;
&nbsp;
&nbsp;
&nbsp;
