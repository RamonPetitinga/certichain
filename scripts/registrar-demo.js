require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const endereco = process.env.CONTRACT_ADDRESS;
  if (!endereco) throw new Error("Defina CONTRACT_ADDRESS no .env");

  const contrato = await hre.ethers.getContractAt("CertiChain", endereco);

  const certHash = hre.ethers.sha256(
    hre.ethers.toUtf8Bytes("certificado-demo-web3"),
  );
  const tx = await contrato.registrarCertificado(
    certHash,
    "Aluno Demo",
    "Formacao Web 3.0",
    "Residencia TIC 29",
  );

  await tx.wait();

  console.log("Certificado registrado");
  console.log("Hash:", certHash);
  console.log("Tx:", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
