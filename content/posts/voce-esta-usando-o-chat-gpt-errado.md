---
title: "Você está usando o ChatGPT errado"
description: "Muitas pessoas têm expectativas irreais sobre o ChatGPT, utilizando-o para tarefas que ele não foi projetado para realizar."
date: "30 de setembro de 2024"
coverImage: "/post2.jpg"
---

Nos últimos dias, vi pessoas usarem o ChatGPT pra:

&nbsp;
&nbsp;

- Pesquisar sobre a legislação brasileira
- Procurar dados recentes de eleições
- Resolver cálculos matemáticos

  &nbsp;
  &nbsp;

**O ChatGPT não foi feito pra isso.** Ele não tem acesso a fontes de dados em tempo real, não consulta sites ou verifica fatos ao vivo como um mecanismo de busca faria. Então, se você está usando o ChatGPT dessa forma, é bem provável que as respostas que você obtenha nem sempre estejam corretas.

&nbsp;
&nbsp;

## Então, pra que ele serve?

&nbsp;

Primeiramente, o ChatGPT não funciona como um ser humano. Nós, quando pensamos em uma resposta, recorremos ao nosso conhecimento, verificamos fatos que já sabemos ou até buscamos informações que não temos. O ChatGPT, por outro lado, é diferente. Ele é um modelo de linguagem, o que significa que sua função principal é prever a próxima palavra mais provável numa sequência de texto, com base em tudo que foi treinado.

&nbsp;
&nbsp;

Isso quer dizer que, se você perguntar algo que ele não tem uma resposta exata ou não sabe, ele vai te devolver a “resposta mais provável”. Ele não tem noção de estar certo ou errado — não tem consciência pra isso. E é aí que começa o problema: o ChatGPT pode parecer estar dando uma resposta confiante, mas ele simplesmente não sabe que pode estar "mentindo".

&nbsp;
&nbsp;

## As alucinações…

&nbsp;

Esse fenômeno de a IA gerar respostas erradas, mas que parecem coerentes, tem um nome: **Alucinação.** Não, não é no sentido literal de ver coisas que não existem, mas é parecido. Basicamente, quando o ChatGPT não tem dados concretos ou informação suficiente, ele pode acabar gerando algo que parece verdade, mas que na realidade é um chute, uma "alucinação".

&nbsp;
&nbsp;

Pra você ter uma ideia de como isso é comum, uma startup chamada Vectara, fundada por ex-funcionários do Google, fez uma pesquisa com ferramentas de IA e constatou que essas alucinações ocorrem com uma frequência que varia entre 3% e 27%. Isso é bastante coisa! Dependendo da pergunta ou da situação, a chance de você receber uma resposta que simplesmente não faz sentido pode ser alta.

&nbsp;
&nbsp;

Por exemplo, tem um caso clássico em que o ChatGPT não conseguia contar quantos "r’s" têm na palavra strawberry. É um detalhe pequeno, mas mostra que nem sempre dá pra confiar cegamente.

&nbsp;
&nbsp;

![Imagem do morango](/strawberry.png)

&nbsp;
&nbsp;
&nbsp;

## O que o ChatGPT realmente é: uma LLM

&nbsp;

Agora, vamos entrar um pouco mais na parte técnica. O ChatGPT é o que chamamos de LLM (Large Language Model), ou seja, um modelo de linguagem treinado com uma quantidade gigantesca de dados textuais. A ideia aqui é que, ao ser treinado com uma base de dados imensa (com bilhões de palavras), ele aprende a entender contextos e padrões de linguagem.

&nbsp;
&nbsp;

Isso aí acontece sempre quando você digita uma mensagem e o teclado do seu celular sugere a próxima palavra. Ele faz isso baseado no que você escreveu até aquele ponto e nas palavras mais prováveis que você usaria em seguida. O ChatGPT faz algo semelhante, mas em uma escala muito, muito maior.

&nbsp;
&nbsp;

## Como essas LLMs funcionam

&nbsp;

Pra entender como o ChatGPT gera suas respostas, precisamos entender como ele lê e processa os dados. Tudo começa com os tokens. Um token pode ser uma palavra, uma parte de uma palavra, ou até um caractere individual. As LLMs transformam o texto em tokens e, em seguida, convertem esses tokens em números. Essa transformação é necessária porque o modelo não "entende" texto como nós – ele trabalha só com números, mais precisamente com vetores (direções) de números, que representam cada token de maneira única.

&nbsp;
&nbsp;

![Imagem de tokens](/tokens.png)

&nbsp;
&nbsp;

Então, quando você manda uma pergunta, o modelo converte tudo para essa linguagem numérica. A partir daí, ele processa esses números através de uma arquitetura chamada Transformers (que não tem nada a ver com robôs gigantes). Basicamente, os Transformers ajudam a IA a entender quais tokens são mais relevantes e como eles se relacionam entre si dentro de uma frase ou parágrafo. Isso é o que faz o ChatGPT conseguir manter uma conversa relativamente coerente.

&nbsp;
&nbsp;

O processo de geração de texto envolve prever qual será o próximo token baseado nos tokens anteriores. O ChatGPT passa por isso várias vezes, token por token, até gerar uma resposta completa. E o interessante é que ele não se limita a uma única resposta: se você fizer a mesma pergunta várias vezes, ele pode gerar respostas ligeiramente diferentes, já que está constantemente recalculando a probabilidade de cada token.

&nbsp;
&nbsp;

## Mas o que esses Transformers fazem?

&nbsp;

A principal inovação dos transformers é o mecanismo de atenção, especificamente a atenção multi-cabeça (multi-head attention). Mas o que isso quer dizer? Tá, imagina que o modelo está processando uma frase longa. Nem todas as palavras dessa frase têm a mesma importância para entender o contexto. O mecanismo de atenção permite que o modelo foque em diferentes partes da frase de forma independente. Cada "cabeça" de atenção processa um aspecto diferente, permitindo que o modelo veja relações entre palavras que podem estar distantes entre si no texto.

&nbsp;
&nbsp;

Por exemplo, na frase "O gato que estava no telhado olhou para o cachorro", o modelo precisa entender que "gato" e "olhou" estão relacionados, mesmo que haja outras palavras entre eles. O mecanismo de atenção facilita isso, permitindo que o ChatGPT capture essas dependências de maneira muito mais eficaz do que modelos anteriores, como o RNN (Redes Neurais Recorrentes) e o LSTM (Long Short-Term Memory), que tinham limitações em capturar dependências de longo prazo.

&nbsp;
&nbsp;

Dentro de um transformer, o texto de entrada (que já foi convertido em tokens e números) passa por várias camadas de processamento. Cada camada tem duas partes principais:

&nbsp;
&nbsp;

- **Camada de Atenção:** Aqui, o modelo calcula a relevância de cada token em relação aos outros, utilizando as cabeças de atenção que mencionei antes. Ele literalmente "presta atenção" em diferentes partes da sequência, ajudando a determinar quais tokens são importantes para prever o próximo token.

&nbsp;
&nbsp;

- **Camada Feed-Forward:** Depois de calcular as atenções, os tokens são passados por uma rede neural tradicional que processa essa informação, gerando uma representação mais refinada dos tokens com base nas atenções que foram calculadas.

&nbsp;
&nbsp;

Esse processo se repete ao longo de várias camadas. Quanto mais camadas o modelo tem, mais ele consegue capturar nuances e relacionamentos complexos entre os tokens. O ChatGPT, por exemplo, tem dezenas de camadas, o que permite gerar respostas mais ricas e coerentes.

&nbsp;
&nbsp;

## Base de dados e o treinamento

&nbsp;

Agora, vamos falar sobre o banco de dados do ChatGPT. Na verdade, não é exatamente um banco de dados no sentido tradicional. O ChatGPT não tem um repositório estático de informações para consultar, como uma enciclopédia. O que acontece é que ele foi treinado com uma enorme quantidade de dados textuais que foram coletados de várias fontes na internet, como livros, artigos científicos, sites de notícias e até fóruns. Essa base de dados é usada durante o treinamento, mas não é consultada em tempo real quando você faz uma pergunta.

&nbsp;
&nbsp;

O treinamento é a parte mais intensa do processo. Imagine pegar bilhões de palavras de diferentes contextos e usá-las para ensinar o modelo a prever qual será a próxima palavra em qualquer sequência. Isso é feito utilizando uma técnica chamada aprendizado supervisionado, onde o modelo é alimentado com frases incompletas e precisa adivinhar a próxima palavra. Se ele erra, ajusta-se os pesos das conexões neurais no modelo para melhorar a próxima tentativa.

&nbsp;
&nbsp;

Esse processo de ajuste contínuo, conhecido como backpropagation, se repete bilhões de vezes. Isso permite que o modelo entenda padrões linguísticos complexos, como gramática, sintaxe e até um pouco de "bom senso" no uso da linguagem.

&nbsp;
&nbsp;

Porém, como o ChatGPT não acessa mais esses dados diretamente após o treinamento, ele pode não estar atualizado sobre eventos muito recentes ou informações muito específicas. Quando ele não sabe uma resposta precisa, é aí que ele pode gerar respostas que parecem convincentes, mas estão erradas — ou seja, ele "alucina", como já discutimos.

&nbsp;
&nbsp;

Acho que eu me perdi um pouco do assunto do post, mas se você chegou até aqui, deu pra aprender bastante coisa, né?

&nbsp;
&nbsp;
&nbsp;
&nbsp;
