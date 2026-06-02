/*
 * Copyright (c) 2026 Web3irede
 * SPDX-License-Identifier: MIT
 * O texto completo da licença está no arquivo LICENSE na raiz do projeto.
 */

const hre = require("hardhat");

async function main() {
  const CertiChain = await hre.ethers.getContractFactory("CertiChain");
  const certiChain = await CertiChain.deploy();

  await certiChain.waitForDeployment();

  console.log("Contrato CertiChain deployado em:");
  console.log(await certiChain.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
