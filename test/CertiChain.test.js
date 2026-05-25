const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertiChain", function () {
  it("deve registrar e verificar certificado", async function () {
    const CertiChain = await ethers.getContractFactory("CertiChain");
    const contrato = await CertiChain.deploy();

    const hash = ethers.sha256(ethers.toUtf8Bytes("certificado-teste"));

    await contrato.registrarCertificado(
      hash,
      "Aluno Teste",
      "Curso Blockchain",
      "Instituicao Teste"
    );

    const resultado = await contrato.verificarCertificado(hash);

    expect(resultado[0]).to.equal(true);
    expect(resultado[1]).to.equal("Aluno Teste");
    expect(resultado[2]).to.equal("Curso Blockchain");
  });

  it("deve revogar certificado", async function () {
    const CertiChain = await ethers.getContractFactory("CertiChain");
    const contrato = await CertiChain.deploy();

    const hash = ethers.sha256(ethers.toUtf8Bytes("certificado-revogado"));

    await contrato.registrarCertificado(
      hash,
      "Aluno Revogado",
      "Curso Blockchain",
      "Instituicao Teste"
    );

    await contrato.revogarCertificado(hash);

    const resultado = await contrato.verificarCertificado(hash);
    expect(resultado[0]).to.equal(false);
  });
});
