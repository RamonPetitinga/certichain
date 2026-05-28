# Arquitetura do CertiChain

## Visão geral

```text
Usuário/Instituição
       ↓
Frontend simples
       ↓
Cálculo do hash do PDF
       ↓
Contrato CertiChain
       ↓
Sepolia Testnet
```

## Componentes

### Frontend

Responsável por conectar MetaMask, calcular hash SHA-256 do arquivo, chamar o contrato e exibir resultado da verificação.

### Smart Contract

Responsável por registrar certificados, verificar certificados, revogar certificados e guardar dados mínimos do registro.

### Blockchain

Responsável por manter registro público, preservar histórico e permitir auditoria.

## Decisão de dados

O arquivo PDF não é enviado para a blockchain. Apenas seu hash é registrado. Isso reduz custo, evita armazenamento indevido de documentos e mantém a verificação pública.
