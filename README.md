# TECH CROSSWORD — Cruzadinha de Arquitetura Computacional

## 🎯 Objetivo

Jogo educativo de palavras cruzadas sobre **Arquitetura Computacional**. O jogador descobre termos relacionados ao funcionamento e à estrutura dos computadores por meio de pistas conceituais, em um tabuleiro interativo com cruzamentos reais.

## 🛠 Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript puro (Vanilla JavaScript)**

Sem frameworks, bibliotecas, backend ou banco de dados. O jogo roda 100% no navegador.

## ▶️ Como jogar

1. **Clique em uma pista** (Horizontais ou Verticais) — a palavra correspondente é destacada no tabuleiro e o cursor vai para a primeira casa vazia.
2. **Clique em uma casa** do tabuleiro para selecionar a palavra que passa por ela. Em casas de cruzamento, **clique novamente** para alternar entre horizontal e vertical.
3. **Digite as letras** diretamente nas casas. Cada casa aceita apenas uma letra; o cursor avança automaticamente para a próxima casa da palavra.
4. **Navegue pelo teclado** com as setas ↑ ↓ ← → (o cursor pula as casas escuras) e use **Backspace** para apagar.
5. **Conferir** — destaca em 🟩 verde as palavras corretas e em 🟥 vermelho as incorretas/incompletas, e atualiza o contador ("X de 16 palavras corretas"). As respostas nunca são reveladas automaticamente.
6. **Reiniciar** — limpa todo o progresso (com confirmação prévia).
7. Ao acertar **todas as 16 palavras**, aparece a mensagem de conclusão e você pode iniciar uma nova partida.

## 📝 Palavras e pistas

### Horizontais

| Nº | Palavra | Pista |
|---|---|---|
| 3 | **CACHE** | Memória pequena e ultrarrápida que acelera o acesso do processador |
| 5 | **DATABUS** | Via compartilhada pela qual os dados trafegam entre componentes |
| 7 | **MICROCONTROLADOR** | Versão compacta de um computador montada em um único chip para tarefas fixas |
| 11 | **UC** | Bloco que comanda a execução das instruções e sincroniza os demais circuitos |
| 13 | **REGISTRADORES** | Conjunto de células internas que guardam valores durante a execução |
| 14 | **RAM** | Memória de trabalho volátil, apagada ao desligar o equipamento |
| 15 | **FLASH** | Memória muito usada em pen drives e cartões portáteis |

### Verticais

| Nº | Palavra | Pista |
|---|---|---|
| 1 | **DMA** | Procedimento que transfere blocos de dados sem ocupar o processador |
| 2 | **DUALCORE** | Processador com dois núcleos de execução simultânea |
| 3 | **CPU** | Cérebro do computador que interpreta e executa as instruções de um programa |
| 4 | **MEMORIADEMASSA** | Armazenamento permanente de grande capacidade, como discos rígidos |
| 6 | **ULA** | Parte do processador responsável por realizar cálculos e operações lógicas |
| 8 | **ROM** | Memória que guarda o firmware de inicialização e não se perde |
| 9 | **ADDRESSBUS** | Conjunto de linhas que carrega os endereços buscados pelos componentes |
| 10 | **QUADCORE** | Processador com quatro núcleos trabalhando em paralelo |
| 12 | **EEPROM** | Tipo de memória apagável por meio de tensão elétrica, usado em configurações |

> Todas as 16 palavras obrigatórias foram utilizadas. Cada palavra cruza pelo menos uma outra no tabuleiro (validado automaticamente no carregamento do jogo).

## 💻 Executar localmente

Não há dependências nem etapa de instalação. Basta abrir o `index.html` no navegador:

**Opção 1 — Duplo clique**

1. Baixe/clone o repositório.
2. Abra o arquivo `index.html` com um navegador (Chrome, Edge, Firefox ou Safari).

**Opção 2 — Servidor local (opcional)**

```bash
# com Python
python -m http.server 8000

# ou com Node (npx)
npx serve .
```

Depois acesse `http://localhost:8000`.

## 🚀 Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos do projeto:

   ```bash
   git init
   git add .
   git commit -m "TECH CROSSWORD - cruzadinha de Arquitetura Computacional"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

2. No GitHub, abra o repositório → **Settings** → **Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/ (root)` → **Save**.
5. Aguarde alguns segundos; o jogo ficará disponível em:

   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

   > 🔗 **Link de publicação:** _preencher após a publicação_
   >
   > `https://________________________________`

> O `index.html` está na raiz do projeto justamente para que o GitHub Pages funcione sem configuração extra.

## 📁 Estrutura do projeto

```
/
├── index.html    → página principal (raiz, obrigatória para o GitHub Pages)
├── style.css     → identidade visual (temática de circuitos/IT)
├── script.js     → dados do tabuleiro, renderização e mecânica do jogo
└── README.md     → esta documentação
```

## ✅ Validação

- 16 palavras no tabuleiro (mínimo exigido: 12).
- Todos os cruzamentos verificados (letras iguais, sem sobreposição indevida).
- Cada palavra cruza ao menos uma outra.
- Numeração das pistas gerada a partir das posições iniciais.
- Layout responsivo (computador, tablet e celular) e navegação por teclado.
