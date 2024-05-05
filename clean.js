const fs = require('fs');
const path = require('path');
const os = require('os');
const rimraf = require('rimraf');

// Função para alterar as permissões de um diretório
function alterarPermissoesDiretorio(diretorio) {
  console.log(`------------- Iniciando as permissao de diretório:------------- `);
  try {
    fs.chmodSync(diretorio, '777'); // Altera as permissões do diretório para 777 (leitura, escrita e execução para todos os usuários)
     
    console.log(`✔️ - Permissões alteradas para o diretório ${diretorio}`);
  } catch (error) {
    console.error(`✖️ - Erro ao alterar permissões do diretório ${diretorio}: ${error.message}`);
  }
}

// Função para remover um diretório com tratamento de erros
function removerDiretorioComTratamento(diretorio) {
  return new Promise((resolve, reject) => {
    rimraf(diretorio, (err) => {
      if (err) {
        console.error(`✖️ - Erro ao remover o diretório ${diretorio}: ${err.message}`);
        resolve(); // Resolve a promessa mesmo se ocorrer um erro
      } else {
        console.log(`✔️ - ${diretorio} removido com sucesso.`);
        resolve(); // Resolve a promessa se a remoção for bem-sucedida
      }
    });
  });
}

// Diretórios que você deseja remover
const nomeComputador = os.hostname();
const diretoriosParaRemover = [
  `C:\\Users\\${nomeComputador}\\Downloads`, // Diretório de Downloads
  `C:\\$Recycle.Bin`, // Diretório de Lixeira
  `C:\\Users\\${nomeComputador}\\AppData\\Local\\Temp`, // Diretório Temp do Windows
  `C:\\Windows\\Installer`, // Diretório Temp do Windows
  `C:\\Windows\\Logs`, // Diretório Temp do Windows
  `C:\\Users\\${nomeComputador}\\AppData\\Local\\Temp\\Logs`, // Diretório Temp do Windows
  `C:\\Users\\${nomeComputador}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Cache`, // Cache do Google Chrome
  `C:\\Users\\${nomeComputador}\\AppData\\Local\\Microsoft\\Windows\\INetCache`, // Cache do Internet Explorer
  
];

// Alterar permissões dos diretórios antes de removê-los
diretoriosParaRemover.forEach(diretorio => {
  alterarPermissoesDiretorio(diretorio);
});

// Remover os diretórios com tratamento de erros
async function removerDiretorios() {
  for (const diretorio of diretoriosParaRemover) {
    await removerDiretorioComTratamento(diretorio);
  }
}

removerDiretorios().then(() => {
  console.log("Todos os diretórios foram removidos com sucesso.");
}).catch((error) => {
  console.error(`Erro ao remover os diretórios: ${error.message}`);
  console.error("ok ");
});