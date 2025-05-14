async function carregarOpcoesLM() {
    try {
      const response = await fetch('cadastro-mdf.json');
      const dados = await response.json();
      const selectLM = document.getElementById('lm');
  
      dados.forEach(item => {
        const option = document.createElement('option');
        option.value = item.lm;
        option.textContent = `${item.lm} - ${item.detalhe}`;
        selectLM.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar os dados do MDF:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', carregarOpcoesLM);
  