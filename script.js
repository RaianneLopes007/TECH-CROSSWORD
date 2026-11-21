/* =====================================================================
   TECH CROSSWORD — Cruzadinha de Arquitetura Computacional
   JavaScript puro (Vanilla), sem frameworks.

   O tabuleiro abaixo foi gerado e validado externamente:
   - 16 palavras posicionadas em grade 16 x 16;
   - cada palavra cruza pelo menos uma outra;
   - letras iguais em todos os cruzamentos;
   - nenhuma sobreposição indevida.
   ===================================================================== */

'use strict';

/* ------------------------- DADOS DO TABULEIRO ------------------------- */

const ROWS = 16;
const COLS = 16;

/*
  Estrutura de cada palavra:
  number      → numeração da pista (posição inicial no tabuleiro)
  answer      → grafia exata no tabuleiro (sem acentos/espaços)
  clue        → pista objetiva (máx. 15 palavras, sem revelar a resposta)
  orientation  → horizontal | vertical
  row, col    → coordenadas da casa inicial (linha, coluna)
*/
const WORDS = [
  { number: 1,  answer: 'DMA',             orientation: 'vertical',   row: 0,  col: 3,  clue: 'Procedimento que transfere blocos de dados sem ocupar o processador' },
  { number: 2,  answer: 'DUALCORE',        orientation: 'vertical',   row: 0,  col: 5,  clue: 'Processador com dois núcleos de execução simultânea' },
  { number: 3,  answer: 'CACHE',           orientation: 'horizontal', row: 0,  col: 7,  clue: 'Memória pequena e ultrarrápida que acelera o acesso do processador' },
  { number: 3,  answer: 'CPU',             orientation: 'vertical',   row: 0,  col: 7,  clue: 'Cérebro do computador que interpreta e executa as instruções de um programa' },
  { number: 4,  answer: 'MEMORIADEMASSA',  orientation: 'vertical',   row: 0,  col: 15, clue: 'Armazenamento permanente de grande capacidade, como discos rígidos' },
  { number: 5,  answer: 'DATABUS',         orientation: 'horizontal', row: 2,  col: 2,  clue: 'Via compartilhada pela qual os dados trafegam entre componentes' },
  { number: 6,  answer: 'ULA',             orientation: 'vertical',   row: 3,  col: 11, clue: 'Parte do processador responsável por realizar cálculos e operações lógicas' },
  { number: 7,  answer: 'MICROCONTROLADOR',orientation: 'horizontal', row: 4,  col: 0,  clue: 'Versão compacta de um computador montada em um único chip para tarefas fixas' },
  { number: 8,  answer: 'ROM',             orientation: 'vertical',   row: 4,  col: 9,  clue: 'Memória que guarda o firmware de inicialização e não se perde' },
  { number: 9,  answer: 'ADDRESSBUS',      orientation: 'vertical',   row: 6,  col: 7,  clue: 'Conjunto de linhas que carrega os endereços buscados pelos componentes' },
  { number: 10, answer: 'QUADCORE',        orientation: 'vertical',   row: 6,  col: 12, clue: 'Processador com quatro núcleos trabalhando em paralelo' },
  { number: 11, answer: 'UC',              orientation: 'horizontal', row: 7,  col: 12, clue: 'Bloco que comanda a execução das instruções e sincroniza os demais circuitos' },
  { number: 12, answer: 'EEPROM',          orientation: 'vertical',   row: 8,  col: 3,  clue: 'Tipo de memória apagável por meio de tensão elétrica, usado em configurações' },
  { number: 13, answer: 'REGISTRADORES',   orientation: 'horizontal', row: 11, col: 3,  clue: 'Conjunto de células internas que guardam valores durante a execução' },
  { number: 14, answer: 'RAM',             orientation: 'horizontal', row: 13, col: 1,  clue: 'Memória de trabalho volátil, apagada ao desligar o equipamento' },
  { number: 15, answer: 'FLASH',           orientation: 'horizontal', row: 15, col: 4,  clue: 'Memória muito usada em pen drives e cartões portáteis' },
];

/* ------------------------- ESTADO DO JOGO ------------------------- */

const TOTAL = WORDS.length;
const cellMap = new Map();   // "linha,coluna" → { r, c, words: [], number }
const cellEls = new Map();   // "linha,coluna" → elemento .cell
const wordCells = [];        // índice da palavra → ["linha,coluna", ...]
const wordState = [];        // índice da palavra → null | 'correct' | 'wrong'

let selectedWord = 0;        // palavra destacada no momento
let currentKey = null;       // casa com o cursor
let lastClickedKey = null;   // usada para alternar horizontal/vertical

const el = (id) => document.getElementById(id);
const keyOf = (r, c) => r + ',' + c;
const isHorizontal = (w) => w.orientation === 'horizontal';

/* ------------------------- VALIDAÇÃO DO TABULEIRO -------------------------
   Verifica, antes de iniciar, se todos os cruzamentos são válidos
   (letras iguais) e se cada palavra cruza ao menos uma outra.           */

function validateBoard() {
  const letters = new Map();
  const crossings = new Array(TOTAL).fill(0);
  let ok = true;

  WORDS.forEach((w, wi) => {
    const dr = isHorizontal(w) ? 0 : 1;
    const dc = isHorizontal(w) ? 1 : 0;
    for (let i = 0; i < w.answer.length; i++) {
      const k = keyOf(w.row + dr * i, w.col + dc * i);
      if (letters.has(k) && letters.get(k) !== w.answer[i]) {
        console.error('Cruzamento inválido em', k);
        ok = false;
      }
      letters.set(k, w.answer[i]);
    }
  });

  // conta cruzamentos: cada casa compartilhada por 2 palavras
  const owner = new Map();
  WORDS.forEach((w, wi) => {
    const dr = isHorizontal(w) ? 0 : 1;
    const dc = isHorizontal(w) ? 1 : 0;
    for (let i = 0; i < w.answer.length; i++) {
      const k = keyOf(w.row + dr * i, w.col + dc * i);
      if (owner.has(k)) {
        const other = owner.get(k);
        crossings[wi]++;
        crossings[other]++;
      } else {
        owner.set(k, wi);
      }
    }
  });

  crossings.forEach((n, wi) => {
    if (n === 0) {
      console.error('Palavra sem cruzamento:', WORDS[wi].answer);
      ok = false;
    }
  });

  if (ok) console.info('Tabuleiro validado: ' + TOTAL + ' palavras, todos os cruzamentos corretos.');
  return ok;
}

/* ------------------------- ÍNDICES AUXILIARES ------------------------- */

function buildIndexes() {
  WORDS.forEach((w, wi) => {
    const dr = isHorizontal(w) ? 0 : 1;
    const dc = isHorizontal(w) ? 1 : 0;
    const cells = [];
    for (let i = 0; i < w.answer.length; i++) {
      const r = w.row + dr * i;
      const c = w.col + dc * i;
      const k = keyOf(r, c);
      cells.push(k);
      if (!cellMap.has(k)) cellMap.set(k, { r, c, words: [], number: null });
      const info = cellMap.get(k);
      info.words.push(wi);
      if (i === 0) info.number = w.number;   // casa inicial recebe a numeração
    }
    wordCells.push(cells);
    wordState.push(null);
  });
}

/* ------------------------- RENDERIZAÇÃO DO TABULEIRO ------------------------- */

function renderBoard() {
  const board = el('board');
  const frag = document.createDocumentFragment();

  // Colunas do tabuleiro definidas pelos dados (16 casas por linha)
  board.style.gridTemplateColumns = 'repeat(' + COLS + ', var(--cell))';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const k = keyOf(r, c);
      if (!cellMap.has(k)) {
        // Casa sem letras: fundo escuro
        const block = document.createElement('div');
        block.className = 'block';
        block.setAttribute('aria-hidden', 'true');
        frag.appendChild(block);
        continue;
      }

      const info = cellMap.get(k);
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.key = k;

      if (info.number !== null) {
        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = info.number;
        cell.appendChild(num);
      }

      // O jogador digita diretamente na casa
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'letter';
      input.maxLength = 1;
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.setAttribute('aria-label', 'Linha ' + (r + 1) + ', coluna ' + (c + 1));
      input.setAttribute('autocapitalize', 'characters');
      input.setAttribute('enterkeyhint', 'next');
      cell.appendChild(input);

      attachCellEvents(cell, input, k);
      cellEls.set(k, cell);
      frag.appendChild(cell);
    }
  }

  board.appendChild(frag);
}

/* ------------------------- RENDERIZAÇÃO DAS PISTAS ------------------------- */

function renderClues() {
  const listH = el('cluesH');
  const listV = el('cluesV');

  WORDS.forEach((w, wi) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'clue';
    btn.dataset.wi = wi;
    btn.setAttribute('aria-pressed', 'false');

    const num = document.createElement('span');
    num.className = 'clue-num';
    num.textContent = w.number;

    const text = document.createElement('span');
    text.className = 'clue-text';
    text.textContent = w.clue;

    btn.append(num, text);
    btn.addEventListener('click', () => selectWord(wi, { focusKey: firstEmptyCell(wi) }));
    li.appendChild(btn);
    (isHorizontal(w) ? listH : listV).appendChild(li);
  });
}

/* ------------------------- SELEÇÃO DE PALAVRAS ------------------------- */

function firstEmptyCell(wi) {
  const cells = wordCells[wi];
  for (const k of cells) {
    if (!inputOf(k).value) return k;
  }
  return cells[0];
}

function inputOf(k) {
  return cellEls.get(k).querySelector('.letter');
}

/* Destaca a palavra no tabuleiro e no painel de pistas. */
function selectWord(wi, opts = {}) {
  selectedWord = wi;
  lastClickedKey = null;   // seleção vinda de pista/navegação não alterna direção

  document.querySelectorAll('.cell.selected').forEach((c) => c.classList.remove('selected'));
  wordCells[wi].forEach((k) => cellEls.get(k).classList.add('selected'));

  document.querySelectorAll('.clue').forEach((b) => {
    const active = Number(b.dataset.wi) === wi;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });

  if (opts.focusKey) focusInput(opts.focusKey);
}

function focusInput(k) {
  currentKey = k;
  inputOf(k).focus();
}

/* Escolhe a palavra de uma casa: alterna horizontal/vertical nos cruzamentos. */
function chooseWordFor(k, reClick) {
  const words = cellMap.get(k).words;
  if (words.length === 1) return words[0];

  const [a, b] = words;
  // Reclique na mesma casa de um cruzamento → alterna a direção
  if (reClick && (selectedWord === a || selectedWord === b)) {
    return selectedWord === a ? b : a;
  }
  // Mantém a direção atual sempre que possível
  if (selectedWord === a || selectedWord === b) return selectedWord;
  const want = WORDS[selectedWord].orientation;
  return words.find((w) => WORDS[w].orientation === want) ?? words[0];
}

/* ------------------------- EVENTOS DAS CASAS ------------------------- */

function attachCellEvents(cell, input, k) {
  // Clique na casa: identifica/alterna a palavra relacionada
  cell.addEventListener('click', () => {
    const wi = chooseWordFor(k, lastClickedKey === k);
    selectWord(wi, { focusKey: k });
    lastClickedKey = k;   // próximo clique na mesma casa alterna a direção
  });

  // Foco via teclado (Tab): garante que a palavra do cursor esteja selecionada
  input.addEventListener('focus', () => {
    currentKey = k;
    if (!wordCells[selectedWord].includes(k)) {
      const wi = chooseWordFor(k, false);
      selectWord(wi, { focusKey: null });
    }
  });

  // Digitação: apenas uma letra, sempre maiúscula, avançando na palavra
  input.addEventListener('input', () => {
    const clean = input.value.toUpperCase().replace(/[^A-Z]/g, '');
    input.value = clean.slice(-1);
    markEdited(k);
    if (input.value) advanceWithinWord();
    updateScore();
  });

  // Colar: distribui as letras ao longo da palavra selecionada
  input.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text') || '';
    const letters = text.toUpperCase().replace(/[^A-Z]/g, '');
    if (!letters) return;

    const cells = wordCells[selectedWord];
    let idx = Math.max(0, cells.indexOf(k));
    for (const ch of letters) {
      if (idx >= cells.length) break;
      inputOf(cells[idx]).value = ch;
      markEdited(cells[idx]);
      idx++;
    }
    focusInput(cells[Math.min(idx, cells.length - 1)]);
    updateScore();
  });

  // Teclado: Backspace, setas e navegação entre casas
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace(k);
    } else if (e.key.startsWith('Arrow')) {
      e.preventDefault();
      const dirs = {
        ArrowLeft: [0, -1], ArrowRight: [0, 1],
        ArrowUp: [-1, 0], ArrowDown: [1, 0],
      };
      moveInGrid(...dirs[e.key]);
    }
  });
}

function advanceWithinWord() {
  const cells = wordCells[selectedWord];
  const idx = cells.indexOf(currentKey);
  if (idx >= 0 && idx < cells.length - 1) focusInput(cells[idx + 1]);
}

function handleBackspace(k) {
  const input = inputOf(k);
  const cells = wordCells[selectedWord];
  const idx = cells.indexOf(k);

  if (input.value) {
    input.value = '';
    markEdited(k);
    updateScore();
    if (idx > 0) focusInput(cells[idx - 1]);   // apaga e volta uma casa
  } else if (idx > 0) {
    const prev = cells[idx - 1];
    const prevInput = inputOf(prev);
    if (prevInput.value) {
      prevInput.value = '';
      markEdited(prev);
      updateScore();
    }
    focusInput(prev);
  }
}

/* Move o cursor pelas casas do tabuleiro, pulando as casas escuras. */
function moveInGrid(dr, dc) {
  const info = cellMap.get(currentKey);
  if (!info) return;
  let r = info.r + dr;
  let c = info.c + dc;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
    const k = keyOf(r, c);
    if (cellMap.has(k)) {
      const words = cellMap.get(k).words;
      const want = dr !== 0 ? 'vertical' : 'horizontal'; // seta define a direção
      const wi = words.find((w) => WORDS[w].orientation === want) ?? words[0];
      selectWord(wi, { focusKey: k });
      return;
    }
    r += dr;
    c += dc;
  }
}

/* ------------------------- MARCAÇÕES E PLACAR ------------------------- */

/* Uma letra mudou: as palavras que passam pela casa perdem a marcação. */
function markEdited(k) {
  cellMap.get(k).words.forEach((wi) => { wordState[wi] = null; });
  refreshMarks();
}

function refreshMarks() {
  cellMap.forEach((info, k) => {
    const states = info.words.map((wi) => wordState[wi]);
    const cls = states.includes('wrong') ? 'wrong'
      : states.every((s) => s === 'correct') ? 'correct'
      : null;
    const cell = cellEls.get(k);
    cell.classList.toggle('correct', cls === 'correct');
    cell.classList.toggle('wrong', cls === 'wrong');
  });

  document.querySelectorAll('.clue').forEach((b) => {
    const st = wordState[Number(b.dataset.wi)];
    b.classList.toggle('correct', st === 'correct');
    b.classList.toggle('wrong', st === 'wrong');
  });
}

function updateScore() {
  const correct = wordState.filter((s) => s === 'correct').length;
  el('score').textContent = correct + ' de ' + TOTAL + ' palavras corretas';
  el('progressText').textContent = correct + ' / ' + TOTAL;
  el('progressFill').style.width = (correct / TOTAL) * 100 + '%';
  return correct;
}

/* ------------------------- BOTÕES ------------------------- */

function isWordCorrect(wi) {
  const answer = WORDS[wi].answer;
  return wordCells[wi].every((k, i) => inputOf(k).value === answer[i]);
}

/* CONFERIR: destaca acertos (verde) e erros/incompletas (vermelho). */
function checkAnswers() {
  WORDS.forEach((w, wi) => {
    wordState[wi] = isWordCorrect(wi) ? 'correct' : 'wrong';
  });
  refreshMarks();
  const correct = updateScore();

  if (correct === TOTAL) showWin();
}

/* REINICIAR: limpa tudo após confirmação. */
function resetGame(askConfirmation = true) {
  if (askConfirmation && !window.confirm('Tem certeza de que deseja reiniciar? Todo o progresso será apagado.')) {
    return;
  }

  cellEls.forEach((cell) => {
    cell.querySelector('.letter').value = '';
    cell.classList.remove('correct', 'wrong', 'selected');
  });
  wordState.fill(null);
  document.querySelectorAll('.clue').forEach((b) => {
    b.classList.remove('correct', 'wrong', 'active');
    b.setAttribute('aria-pressed', 'false');
  });

  selectedWord = 0;
  currentKey = null;
  lastClickedKey = null;
  hideWin();
  updateScore();
  selectWord(0, { focusKey: null });   // volta ao estado inicial
}

/* ------------------------- FINALIZAÇÃO ------------------------- */

function showWin() {
  el('winCount').textContent = TOTAL + ' de ' + TOTAL;
  el('winOverlay').classList.remove('hidden');
  el('btnNewGame').focus();
}

function hideWin() {
  el('winOverlay').classList.add('hidden');
}

/* ------------------------- TAMANHO RESPONSIVO ------------------------- */

/* Ajusta o tamanho das casas ao espaço disponível (computador e celular). */
function fitBoard() {
  const wrap = document.querySelector('.board-wrap');
  if (!wrap) return;
  const available = wrap.clientWidth;
  let cell = Math.floor(available / COLS);
  cell = Math.max(20, Math.min(46, cell));   // entre 20px e 46px
  document.documentElement.style.setProperty('--cell', cell + 'px');
  // mínimo 16px evita o zoom automático de teclado nos celulares
  document.documentElement.style.setProperty('--cell-font', Math.max(16, Math.round(cell * 0.55)) + 'px');
}

/* ------------------------- INICIALIZAÇÃO ------------------------- */

function init() {
  validateBoard();
  buildIndexes();
  renderBoard();
  renderClues();

  el('btnCheck').addEventListener('click', checkAnswers);
  el('btnReset').addEventListener('click', () => resetGame(true));
  el('btnNewGame').addEventListener('click', () => resetGame(false));

  // ESC fecha o modal de finalização
  el('winOverlay').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideWin();
  });

  window.addEventListener('resize', fitBoard);
  fitBoard();

  selectWord(0, { focusKey: null });   // primeira pista já destacada
  updateScore();
}

init();
