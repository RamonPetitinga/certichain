require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const endereco = process.env.CONTRACT_ADDRESS;
  if (!endereco) throw new Error("Defina CONTRACT_ADDRESS no .env");

  const contrato = await hre.ethers.getContractAt("CertiChain", endereco);
  const certHash = hre.ethers.sha256(
    hre.ethers.toUtf8Bytes("certificado-demo-web3"),
  );

  const resultado = await contrato.verificarCertificado(certHash);

  console.log("Valido:", resultado[0]);
  console.log("Aluno:", resultado[1]);
  console.log("Curso:", resultado[2]);
  console.log("Instituicao:", resultado[3]);
  console.log("Data:", resultado[4].toString());
  console.log("Emissor:", resultado[5]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
