// script.js atualizado

const form = document.getElementById('form-etiqueta');
const container = document.getElementById('etiquetas-container');
const TOTAL_ETIQUETAS = 32;
let etiquetaIndex = 0;

const etiquetas = new Array(TOTAL_ETIQUETAS).fill(null);

function criarGradeInicial() {
  for (let i = 0; i < TOTAL_ETIQUETAS; i++) {
    const div = document.createElement('div');
    div.className = 'etiqueta';
    div.dataset.index = i;
    container.appendChild(div);
  }
}

function atualizarVisual() {
  document.querySelectorAll('.etiqueta').forEach((div, i) => {
    const item = etiquetas[i];
    if (item) {
      div.classList.add('preenchida');
      div.innerHTML = `
        <div>
          <div class="preco-linha">
            R$ ${item.preco} <span class="unidade">${item.unidade || ''}</span>
          </div>
          <div class="descricao">${item.descricao}</div>
          <div class="lm">LM ${item.lm}</div>
        </div>
        <div class="img-row">
          <img src="${item.codigoBarras}" class="codigo-imagem" alt="Código de Barras"/>
          <img src="${item.qrCode}" class="qr-imagem" alt="QR Code"/>
        </div>
      `;
    }
  });
}

// Preenchimento automático com base no código LM
const lmSelect = document.getElementById('lm');
lmSelect.addEventListener('change', function () {
  const lmCode = this.value.trim();
  const lmOption = this.selectedOptions[0];
  const detalhe = lmOption ? lmOption.textContent.split(' ').slice(1).join(' ') : '';

  // Define o caminho das imagens baseado no código LM
  const imagePath_qr = `imagens/${lmCode}_qr.png`;
  const imagePath_cb = `imagens/${lmCode}_cb.png`;

  // Preenche os campos com o caminho gerado
  document.getElementById("codigoBarras").value = imagePath_cb;
  document.getElementById("qrCode").value = imagePath_qr;

  // Armazena o detalhe temporariamente para uso posterior
  this.dataset.detalhe = detalhe;
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (etiquetaIndex >= TOTAL_ETIQUETAS) {
    alert("Você atingiu o limite de 32 etiquetas por página.");
    return;
  }
  
  const comprimento = document.getElementById('comprimento').value.trim();
const largura = document.getElementById('largura').value.trim();
const medida = `${comprimento}x${largura}`;

  const lm = lmSelect.value.trim();
  const detalhe = lmSelect.dataset.detalhe || '';
  //const medida = document.getElementById('medida').value.trim();
  const descricao = `${detalhe} ${medida}`;
  const preco = document.getElementById('preco').value.trim();
  const unidade = document.getElementById('unidade').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value.trim(), 10) || 1;
  const codigoBarrasPath = document.getElementById('codigoBarras').value;
  const qrCodePath = document.getElementById('qrCode').value;

  if (!codigoBarrasPath || !qrCodePath) {
    alert("Por favor, verifique se os caminhos de Código de Barras e QR Code estão preenchidos.");
    return;
  }

  if (etiquetaIndex + quantidade > TOTAL_ETIQUETAS) {
    alert(`Você pode adicionar no máximo ${TOTAL_ETIQUETAS - etiquetaIndex} etiqueta(s).`);
    return;
  }

  for (let i = 0; i < quantidade; i++) {
    etiquetas[etiquetaIndex] = {
      lm,
      descricao,
      preco,
      unidade,
      codigoBarras: codigoBarrasPath,
      qrCode: qrCodePath
    };
    etiquetaIndex++;
  }
  atualizarVisual();
  form.reset();
  document.getElementById('botao-imprimir').style.display = 'inline-block';
  document.getElementById('botao-recarregar').style.display = 'inline-block';
});

function calcularAreaAuto() {
  const comp = parseFloat(document.getElementById('comprimento').value.replace(',', '.'));
  const larg = parseFloat(document.getElementById('largura').value.replace(',', '.'));

  if (!isNaN(comp) && !isNaN(larg)) {
    const area = (comp * larg) / 10000;
    const areaFormatada = area.toFixed(2).replace('.', ',') + ' m²';
    document.getElementById('unidade').value = areaFormatada;
  }
}

// Detectar saída dos campos
document.getElementById('comprimento').addEventListener('blur', calcularAreaAuto);
document.getElementById('largura').addEventListener('blur', calcularAreaAuto);



document.addEventListener('DOMContentLoaded', criarGradeInicial);
