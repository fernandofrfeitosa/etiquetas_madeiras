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
document.getElementById('lm').addEventListener('input', function () {
  const lmCode = this.value.trim();

  // Referência aos campos de entrada
  const codigoBarrasInput = document.getElementById("codigoBarras");
  const qrCodeInput = document.getElementById("qrCode");

  // Limpa os campos de entrada anteriores
  codigoBarrasInput.value = "";
  qrCodeInput.value = "";

  if (lmCode) {
    // Define o caminho das imagens baseado no código LM
    const imagePath_qr = `imagens/${lmCode}_qr.png`;
    const imagePath_cb = `imagens/${lmCode}_cb.png`;

    // Preenche os campos com o caminho gerado
    codigoBarrasInput.value = imagePath_cb;
    qrCodeInput.value = imagePath_qr;
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (etiquetaIndex >= TOTAL_ETIQUETAS) {
    alert("Você atingiu o limite de 32 etiquetas por página.");
    return;
  }

  const lm = document.getElementById('lm').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const preco = document.getElementById('preco').value.trim();
  const unidade = document.getElementById('unidade').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value.trim(), 10) || 1;

  // Obtém os caminhos das imagens
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
});

document.addEventListener('DOMContentLoaded', criarGradeInicial);
