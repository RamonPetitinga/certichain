# CertiChain — Verificação Pública de Certificados em Blockchain

## 1. Problema

Certificados acadêmicos e profissionais podem ser falsificados, alterados ou apresentados sem validação confiável. Em muitos casos, a verificação ainda depende de e-mails, planilhas, documentos físicos ou contato manual com a instituição emissora.

## 2. Solução

O CertiChain é um MVP que permite registrar o hash de um certificado em blockchain. O arquivo original fica fora da blockchain, mas sua prova de existência e integridade fica registrada publicamente em uma testnet.

## 3. Por que blockchain?

Blockchain faz sentido neste problema porque oferece registro imutável, carimbo de tempo, verificação pública, rastreabilidade e redução da dependência de validação manual.

## 4. O que fica on-chain

- hash do certificado;
- nome do aluno usado na demonstração;
- nome do curso;
- instituição emissora;
- data do registro;
- endereço do emissor;
- status ativo ou revogado.

Em uma versão real, dados pessoais poderiam ser substituídos por identificadores ou hashes.

## 5. O que fica off-chain

- arquivo PDF original;
- documentos anexos;
- dados sensíveis;
- banco interno da instituição, se existir.

## 6. Tecnologias

- Solidity;
- Hardhat;
- Sepolia Testnet;
- MetaMask;
- Ethers.js;
- HTML, CSS e JavaScript.

## 7. Como rodar

Instale as dependências:

```bash
npm install
```

Compile o contrato:

```bash
npm run compile
```

Execute os testes:

```bash
npm test
```

Crie um arquivo `.env` baseado no `.env.example`:

```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/yiIYu9yFbP9ppbWJQBVm8
PRIVATE_KEY=private key
CONTRACT_ADDRESS=0x794d96f24069C57C80Ad1ce35CC5205B12e2DfCE
```

Faça o deploy na Sepolia:

```bash
npm run deploy:sepolia
```

Copie o endereço exibido no terminal e coloque no `.env` e também no arquivo `frontend/app.js`.

Substitua:

```js
const CONTRACT_ADDRESS = "0x70775d932D678ceD0128e34b977c3eebAD29E756ATO";
```

pelo endereço real do contrato.

## 8. Como testar pelo frontend

Abra a pasta `frontend` com a extensão Live Server do VS Code ou outro servidor local simples.

Fluxo de teste:

1. Conectar MetaMask na rede Sepolia.
2. Selecionar um PDF de certificado.
3. Preencher aluno, curso e instituição.
4. Registrar na blockchain.
5. Selecionar o mesmo PDF na área de verificação.
6. Verificar se o certificado aparece como válido.

## 9. Fluxo principal

```text
PDF do certificado
      ↓
Geração do hash SHA-256
      ↓
Registro do hash no contrato
      ↓
Consulta pública pelo mesmo hash
      ↓
Resultado: válido, inexistente ou revogado
```

## 10. Endereço do contrato

Preencher após o deploy:

```text
Contrato Sepolia
Link Etherscan
```

## 11. Evidências de funcionamento

Inserir no repositório:

- print do deploy;
- print da transação de registro;
- print da verificação no frontend;
- link do vídeo-pitch;
- link do contrato na testnet.

## 12. Observação

Este projeto é um MVP acadêmico. Ele não deve ser usado em produção sem auditoria, controle de acesso mais robusto e tratamento adequado de dados pessoais.
