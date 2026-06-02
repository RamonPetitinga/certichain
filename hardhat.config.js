/*
 * Copyright (c) 2026 Web3irede
 * SPDX-License-Identifier: MIT
 * O texto completo da licença está no arquivo LICENSE na raiz do projeto.
 */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
