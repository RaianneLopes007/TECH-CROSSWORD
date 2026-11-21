## DESENVOLVIMENTO DE JOGO: CRUZADINHA DE ARQUITETURA COMPUTACIONAL

Atue como um desenvolvedor Front-end Sênior, especialista em HTML5, CSS3, JavaScript e desenvolvimento de interfaces interativas.

Sua tarefa é desenvolver um jogo de palavras cruzadas (cruzadinha) funcional, executado diretamente no navegador, seguindo rigorosamente os requisitos descritos neste prompt e no documento da atividade acadêmica.

## 1. OBJETIVO DO PROJETO

Desenvolver um jogo educativo de palavras cruzadas sobre Arquitetura Computacional, permitindo que o jogador descubra termos relacionados ao funcionamento e à estrutura dos computadores por meio de pistas.

O projeto deve possuir uma identidade visual moderna, criativa e profissional, inspirada no universo da Tecnologia da Informação.

O resultado deve parecer um jogo digital desenvolvido por uma equipe de tecnologia, e não apenas uma tabela simples com letras.

## 2. TECNOLOGIAS OBRIGATÓRIAS

Utilize exclusivamente:
- HTML5
- CSS3
- JavaScript puro (Vanilla JavaScript)

Não utilize frameworks ou bibliotecas externas, como React, Angular, Vue ou Bootstrap.

O jogo deve funcionar sem necessidade de backend ou banco de dados.

## 3. IDENTIDADE VISUAL E FRONT-END

Crie uma interface com temática de Tecnologia da Informação, utilizando referências visuais como:
- Circuitos eletrônicos;
- Placas-mãe;
- Processadores;
- Linhas de conexão;
- Elementos de programação;
- Interfaces de sistemas operacionais;
- Terminais e códigos.

### Paleta de cores sugerida:
- Azul-marinho escuro: #10172A;
- Azul tecnológico: #2563EB;
- Ciano: #22D3EE;
- Roxo: #7C3AED;
- Branco: #F8FAFC;
- Cinza azulado: #334155.

### Diretrizes de design:
- Interface moderna, intuitiva e visualmente agradável.
- Fundo escuro com elementos tecnológicos discretos.
- Cards com transparência ou tons escuros.
- Bordas suaves e efeitos de iluminação.
- Tipografia moderna e de fácil leitura.
- Animações sutis em botões e elementos interativos.
- Destaque visual para o tabuleiro.
- Layout responsivo para computadores, tablets e celulares.

Evite excesso de informações, efeitos exagerados ou elementos que prejudiquem a legibilidade.

## 4. ESTRUTURA DA PÁGINA

Organize a interface da seguinte maneira:

### Cabeçalho
- Nome do jogo: TECH CROSSWORD.
- Subtítulo: Desafie seus conhecimentos em Arquitetura Computacional.
- Ícone ou elemento visual relacionado à tecnologia.
- Indicador de progresso da atividade.

### Área principal do jogo

Divida a área principal em duas seções:

**Seção 1: Tabuleiro**
- Apresente a cruzadinha em formato de grade.
- Utilize casas quadradas e uniformes.
- Casas sem letras devem possuir fundo escuro.
- Casas disponíveis para preenchimento devem ser claras.
- Casas que pertencem a mais de uma palavra devem permitir o cruzamento correto.
- Cada palavra deve possuir numeração inicial correspondente às pistas.
- O jogador deve conseguir digitar diretamente nas casas.

**Seção 2: Painel de pistas**
- Separe as pistas em duas categorias:
  - Horizontais;
  - Verticais.
- Numere as pistas de acordo com a posição inicial de cada palavra.
- Apresente as pistas de maneira organizada.
- Ao selecionar uma pista, destaque visualmente as casas correspondentes no tabuleiro.
- Ao selecionar uma casa, identifique a palavra relacionada.

## 5. PALAVRAS OBRIGATÓRIAS

Utilize no mínimo 12 das 16 palavras abaixo. Dê preferência à utilização das 16 palavras, desde que seja possível construir um tabuleiro válido e com cruzamentos reais.

| Termo | Grafia no tabuleiro |
|---|---|
| CPU | CPU |
| ULA | ULA |
| UC (Unidade de Controle) | UC |
| Registradores | REGISTRADORES |
| RAM | RAM |
| ROM | ROM |
| EEPROM | EEPROM |
| Flash | FLASH |
| Cache | CACHE |
| Memória de massa | MEMORIADEMASSA |
| DMA | DMA |
| Address Bus | ADDRESSBUS |
| Data Bus | DATABUS |
| Microcontrolador | MICROCONTROLADOR |
| Dual Core | DUALCORE |
| Quad Core | QUADCORE |

Todas as palavras devem ser armazenadas sem acentos, espaços ou caracteres especiais, utilizando letras maiúsculas.

## 6. REGRAS PARA CONSTRUÇÃO DAS PISTAS

Crie pistas objetivas e educativas para cada palavra utilizada.

As pistas devem:
- Ter no máximo 15 palavras;
- Não conter a resposta;
- Não apresentar parte da resposta;
- Não apresentar a sigla por extenso;
- Ser conceitualmente corretas;
- Permitir identificar uma única resposta.

Não utilize pistas que entreguem diretamente o termo.

Exemplo:

Resposta: ULA.

Pista: Parte do processador responsável por realizar cálculos e operações lógicas.

## 7. FUNCIONALIDADES OBRIGATÓRIAS

Implemente todas as funcionalidades abaixo:

### A. Preenchimento do tabuleiro
- O jogador deve digitar diretamente nas casas.
- Cada casa deve aceitar apenas uma letra.
- Ao digitar uma letra, avance automaticamente para a próxima casa da palavra selecionada.
- Permita navegação pelas casas utilizando o teclado.
- Permita apagar letras utilizando Backspace.
- Permita selecionar palavras horizontais e verticais.
- Nas casas compartilhadas, respeite os cruzamentos das palavras.

### B. Seleção de palavras
- Ao clicar em uma pista, destaque a palavra correspondente.
- Ao clicar em uma casa, identifique a palavra que passa por ela.
- Quando uma casa pertencer a duas palavras, permita alternar entre horizontal e vertical.

### C. Botão CONFERIR
Ao clicar no botão:
- Verifique as respostas preenchidas.
- Identifique quais palavras estão completamente corretas.
- Identifique quais palavras estão incorretas ou incompletas.
- Destaque palavras corretas em verde.
- Destaque palavras incorretas em vermelho.
- Não revele automaticamente as respostas.
- Atualize o contador de acertos.

### D. Contador de acertos
Apresente uma informação semelhante a:

"8 de 12 palavras corretas"

Atualize o resultado sempre que o jogador utilizar o botão Conferir.

### E. Botão REINICIAR
- Limpe todas as letras digitadas.
- Remova as marcações de acertos e erros.
- Zere o contador.
- Retorne o jogo ao estado inicial.
- Solicite confirmação antes de apagar o progresso.

### F. Finalização
Quando todas as palavras estiverem corretas:
- Apresente uma mensagem de conclusão.
- Exiba uma animação discreta de sucesso.
- Mostre a quantidade total de palavras encontradas.
- Permita iniciar uma nova partida.

## 8. CONSTRUÇÃO DO TABULEIRO

Esta é uma das partes mais importantes do projeto.

Não construa uma grade aleatória com palavras posicionadas sem respeitar os cruzamentos.

O tabuleiro deve ser uma cruzadinha real, na qual:
- Cada palavra utilizada cruza com pelo menos uma outra palavra.
- As letras dos cruzamentos devem ser iguais.
- Nenhuma palavra pode ocupar casas incompatíveis.
- As palavras não podem se sobrepor de maneira incorreta.
- As numerações devem corresponder às posições iniciais das palavras.
- As pistas devem corresponder exatamente às palavras posicionadas.

Planeje as coordenadas de cada palavra antes de implementar a interface.

Utilize uma estrutura de dados em JavaScript para armazenar:
- Identificador da palavra;
- Resposta;
- Pista;
- Orientação (horizontal ou vertical);
- Coordenada inicial da linha;
- Coordenada inicial da coluna;
- Numeração da pista.

Gere o tabuleiro dinamicamente com base nessa estrutura.

Valide os cruzamentos antes de finalizar o projeto.

## 9. ORGANIZAÇÃO DOS ARQUIVOS

Crie a seguinte estrutura:

/
├── index.html
├── style.css
├── script.js
└── README.md

O arquivo index.html deve obrigatoriamente estar na raiz do projeto, pois a publicação será realizada pelo GitHub Pages.

Mantenha o código organizado, legível e com comentários nos trechos mais importantes.

## 10. RESPONSIVIDADE E ACESSIBILIDADE

- O jogo deve funcionar em diferentes tamanhos de tela.
- No celular, adapte o tabuleiro para permitir preenchimento confortável.
- Evite que as pistas fiquem escondidas.
- Utilize contraste adequado.
- Adicione identificações acessíveis às casas.
- Permita navegação pelo teclado.

## 11. README.md

Crie um README contendo:
- Nome do projeto;
- Objetivo do jogo;
- Tecnologias utilizadas;
- Instruções de como jogar;
- Lista das palavras utilizadas;
- Pistas correspondentes;
- Instruções para executar localmente;
- Instruções para publicar no GitHub Pages.

Não invente o link de publicação. Deixe um campo para preenchimento após a publicação.

## 12. VALIDAÇÃO FINAL

Antes de considerar o projeto concluído, realize uma revisão completa.

Verifique:
1. Se o tabuleiro possui pelo menos 12 palavras.
2. Se todas as palavras possuem pelo menos um cruzamento válido.
3. Se as pistas estão corretamente numeradas.
4. Se as respostas estão posicionadas corretamente.
5. Se o preenchimento funciona.
6. Se a seleção horizontal e vertical funciona.
7. Se o botão Conferir funciona.
8. Se o contador apresenta os resultados corretos.
9. Se o botão Reiniciar limpa o jogo.
10. Se o layout funciona em computadores e celulares.
11. Se não existem erros no console do navegador.
12. Se o projeto pode ser publicado diretamente pelo GitHub Pages.

## 13. ORIENTAÇÕES IMPORTANTES DE EXECUÇÃO

- Primeiro, analise os arquivos existentes no diretório do projeto.
- Não apague arquivos ou funcionalidades existentes sem necessidade.
- Caso o diretório esteja vazio, crie toda a estrutura solicitada.
- Desenvolva o projeto completo, não apenas um protótipo visual.
- Não utilize respostas simuladas ou funcionalidades que não funcionem.
- Não substitua a cruzadinha por um caça-palavras.
- Não utilize imagens estáticas para representar o tabuleiro.
- O tabuleiro deve ser interativo e funcional.
- Não considere o projeto finalizado enquanto os requisitos obrigatórios não estiverem implementados.

Ao terminar, apresente um resumo dos arquivos criados, das funcionalidades implementadas e dos testes realizados. Informe também se existe alguma etapa que ainda depende de configuração manual.

**RESULTADO ESPERADO:** Um jogo de cruzadinha completo, funcional, responsivo e com identidade visual tecnológica, pronto para versionamento no GitHub e publicação no GitHub Pages. 