import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.13.4/+esm";

const CONTRACT_ADDRESS = "0x70775d932D678ceD0128e34b977c3eebAD29E756";

const abi = [
  "function registrarCertificado(bytes32 certHash, string aluno, string curso, string instituicao)",
  "function verificarCertificado(bytes32 certHash) view returns (bool valido, string aluno, string curso, string instituicao, uint256 dataEmissao, address emissor)",
];

let contrato;

document.getElementById("btnConectar").onclick = conectarCarteira;
document.getElementById("btnRegistrar").onclick = registrarCertificado;
document.getElementById("btnVerificar").onclick = verificarCertificado;

async function conectarCarteira() {
  if (!window.ethereum) {
    alert("MetaMask não encontrada");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  contrato = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  document.getElementById("conta").innerText =
    "Carteira conectada: " + (await signer.getAddress());
}

async function gerarHashArquivo(inputId) {
  const input = document.getElementById(inputId);
  const arquivo = input.files[0];

  if (!arquivo) {
    throw new Error("Selecione um arquivo");
  }

  const buffer = await arquivo.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function registrarCertificado() {
  try {
    if (!contrato) throw new Error("Conecte a MetaMask primeiro");

    const hash = await gerarHashArquivo("arquivoRegistro");
    const aluno = document.getElementById("aluno").value;
    const curso = document.getElementById("curso").value;
    const instituicao = document.getElementById("instituicao").value;

    const tx = await contrato.registrarCertificado(
      hash,
      aluno,
      curso,
      instituicao,
    );
    await tx.wait();

    document.getElementById("saidaRegistro").innerText =
      "Certificado registrado com sucesso\nHash: " + hash + "\nTx: " + tx.hash;
  } catch (erro) {
    document.getElementById("saidaRegistro").innerText =
      "Erro: " + erro.message;
  }
}

async function verificarCertificado() {
  try {
    if (!contrato) throw new Error("Conecte a MetaMask primeiro");

    const hash = await gerarHashArquivo("arquivoVerificacao");
    const resultado = await contrato.verificarCertificado(hash);

    if (!resultado[0]) {
      document.getElementById("saidaVerificacao").innerText =
        "Certificado não encontrado ou revogado\nHash: " + hash;
      return;
    }

    const data = new Date(Number(resultado[4]) * 1000);

    document.getElementById("saidaVerificacao").innerText =
      "Certificado válido\n" +
      "Hash: " +
      hash +
      "\n" +
      "Aluno: " +
      resultado[1] +
      "\n" +
      "Curso: " +
      resultado[2] +
      "\n" +
      "Instituição: " +
      resultado[3] +
      "\n" +
      "Data: " +
      data.toLocaleString() +
      "\n" +
      "Emissor: " +
      resultado[5];
  } catch (erro) {
    document.getElementById("saidaVerificacao").innerText =
      "Erro: " + erro.message;
  }
}
