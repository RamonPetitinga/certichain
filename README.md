# CertiChain — Verificação Pública de Certificados em Blockchain

## Sobre o desafio

Este projeto foi desenvolvido para o desafio **ProofChain**, da trilha Blockchain do Hackathon Web3 RESTIC 29.

O objetivo do desafio é construir uma solução auditável utilizando blockchain, com foco em registro on-chain, consulta pública, rastreabilidade, transparência e verificação de informações relevantes.

## Sobre o projeto

O **CertiChain** é um MVP para registro e verificação pública de certificados digitais utilizando blockchain.

A solução permite que uma instituição emissora registre o hash de um certificado em um smart contract deployado em testnet pública. Posteriormente, qualquer pessoa pode verificar se determinado certificado possui registro on-chain, comprovando sua autenticidade e integridade.

O arquivo PDF do certificado não é armazenado diretamente na blockchain. O sistema calcula o hash do documento e registra esse hash no contrato inteligente. Assim, se o certificado for alterado, mesmo que minimamente, o hash será diferente e a verificação falhará.

## Problema

Certificados digitais podem ser falsificados, alterados ou apresentados sem validação confiável. Em muitos casos, a conferência ainda depende de e-mails, planilhas, contatos manuais com instituições ou sistemas centralizados.

Esse processo gera problemas como:

- risco de falsificação;
- demora na validação;
- dependência de conferência manual;
- dificuldade de auditoria;
- baixa transparência;
- ausência de rastreabilidade pública.

## Solução

O CertiChain utiliza blockchain para registrar uma prova digital do certificado.

O fluxo principal é:

1. A instituição seleciona o certificado em PDF.
2. O sistema calcula o hash do arquivo.
3. A instituição registra o hash na blockchain.
4. O smart contract armazena os dados principais do certificado.
5. Qualquer pessoa pode enviar o mesmo PDF para verificação.
6. O sistema recalcula o hash e consulta o contrato.
7. Se o hash existir e estiver ativo, o certificado é considerado válido.

## Por que blockchain?

A blockchain foi utilizada porque agrega:

- **imutabilidade:** o registro não pode ser alterado após ser gravado;
- **rastreabilidade:** cada registro possui uma transação pública;
- **verificação pública:** qualquer pessoa pode consultar a autenticidade;
- **auditabilidade:** o histórico pode ser conferido na testnet;
- **confiança descentralizada:** a validação não depende apenas de uma autoridade central.

## Requisitos mínimos do desafio

| Requisito                     | Situação                |
| ----------------------------- | ----------------------- |
| Registro on-chain             | Implementado            |
| Consulta pública              | Implementada            |
| Contrato deployado em testnet | Implementado na Sepolia |

## Tecnologias utilizadas

- Solidity
- Hardhat
- Sepolia Testnet
- Ethers.js
- MetaMask
- HTML
- CSS
- JavaScript
- Node.js

## Estrutura do projeto

```text
CertiChain-ProofChain
├── contracts
│   └── CertiChain.sol
├── frontend
│   ├── index.html
│   ├── style.css
│   └── app.js
├── scripts
│   ├── deploy.js
│   ├── registrar-demo.js
│   └── verificar-demo.js
├── test
│   └── CertiChain.test.js
├── docs
│   └── arquitetura.md
├── pitch
│   └── video
├── hardhat.config.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Smart contract

O contrato principal é o `CertiChain.sol`.

Ele permite:

- registrar certificados;
- consultar certificados;
- verificar autenticidade;
- revogar certificados;
- identificar a carteira emissora;
- manter histórico auditável on-chain.

O contrato utiliza o hash do certificado como chave de consulta.

```solidity
mapping(bytes32 => Certificado) private certificados;
```

Apenas a carteira emissora autorizada pode registrar ou revogar certificados. Qualquer usuário pode consultar a autenticidade de um certificado.

## Contrato deployado

Rede utilizada:

```text
Sepolia Testnet
```

Endereço do contrato:

```text
0x70775d932D678ceD0128e34b977c3eebaD29E756
```

Carteira emissora:

```text
0xAD79786C9605DD7D123a53f62863124943d998E4
```

## Certificado registrado para demonstração

Hash do certificado:

```text
0xac8afdc500dcb1986328cc93fb9b29a160136daa39e48299bd1d588820865b99
```

Transação de registro:

```text
0x7ea0391b6870bcf776fb8eb01a21ae1d8ee9a3af1778a57254bd96636e2a2ba5
```

Dados registrados:

```text
Aluno: Ramon Leite
Curso: Web 3.0
Instituição: IREDE
Rede: Sepolia Testnet
```

## Como iniciar o projeto

### 1. Instalar dependências

Na pasta raiz do projeto, execute:

```bash
npm install
```

### 2. Compilar contratos

```bash
npx hardhat compile
```

### 3. Rodar testes

```bash
npx hardhat test
```

ou:

```bash
npm test
```

## Configuração do ambiente

Adicione a PRIVATE KEY, no arquivo .env

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/yiIYu9yFbP9ppbWJQBVm8
PRIVATE_KEY=SUA PRIVATE KEY SEM
CONTRACT_ADDRESS=0x70775d932D678ceD0128e34b977c3eebaD29E756
```

## Como registrar um certificado

O registro pode ser feito pelo frontend ou por script.

### Pelo frontend

1. Abra o frontend "index.html no navegador.
2. Conecte a MetaMask.
3. Selecione a rede Sepolia.
4. Escolha o PDF do certificado.
5. Preencha os dados do aluno, curso e instituição.
6. Clique em **Registrar na blockchain**.
7. Confirme a transação na MetaMask.

### Por script

```bash
npx hardhat run scripts/registrar-demo.js --network sepolia
```

## Como verificar um certificado

### Pelo frontend

1. Selecione o mesmo PDF registrado.
2. Clique em **Verificar autenticidade**.
3. O sistema calcula o hash do arquivo.
4. O smart contract é consultado.
5. Se o hash estiver registrado e ativo, o certificado será exibido como válido.

### Por script

```bash
npx hardhat run scripts/verificar-demo.js --network sepolia
```

## Demonstração funcional

Na demonstração, o projeto comprova:

1. o certificado é selecionado no frontend;
2. o hash do PDF é calculado;
3. o hash é registrado na blockchain;
4. a transação é confirmada na Sepolia;
5. o mesmo PDF é verificado com sucesso;
6. qualquer alteração no arquivo gera outro hash e impede validação indevida.

## Dados on-chain e off-chain

### Dados on-chain

- hash do certificado;
- aluno;
- curso;
- instituição;
- data do registro;
- carteira emissora;
- status do certificado.

### Dados off-chain

- arquivo PDF original;
- documentos completos;
- eventuais dados complementares;

Em uma versão de produção, dados pessoais poderiam ser substituídos por identificadores ou hashes, reduzindo exposição de informações sensíveis.

## Segurança e limitações

Este projeto é um MVP acadêmico desenvolvido para testnet.

Limitações atuais:

- apenas uma carteira emissora registra certificados;
- dados básicos são armazenados em texto aberto;
- não há painel administrativo completo;
- não há integração com banco de dados institucional;
- não há verificação profissional de segurança do contrato.

## Melhorias futuras

Possíveis melhorias pesquisadas, tanto no Google, quanto com AI.

- suporte a múltiplas instituições emissoras;
- uso de OpenZeppelin AccessControl;
- geração de QR Code para verificação;
- integração com IPFS para evidências;
- painel administrativo para emissão em lote;
- registro de motivo de revogação;
- dashboard de certificados emitidos;
- verificação pública por link;
- proteção avançada de dados pessoais.

## Uso de Inteligência Artificial

Durante o desenvolvimento, foi utilizada ferramenta de inteligência artificial generativa como apoio para estruturação do projeto, organização da documentação, correção de erros na lógica.

A equipe revisou, testou e validou o funcionamento do código e da solução, mantendo responsabilidade sobre a entrega final.

## Equipe

```text
Nome: Ramon Leite
Função: Desenvolvimento, testes, documentação e apresentação.
Nome: Delano Sarmento
Função: Desenvolvimento.
Nome: Lorenzo Baroni
Função: Desenvolvimento, documentação.
Nome: Rayane Queiroz
Função: testes, documentação.
```

```text
Link vídeo: https://www.youtube.com/watch?v=gXdTAKlids0
```

## Status do projeto

MVP funcional desenvolvido para o desafio ProofChain.

O projeto demonstra, de forma prática, como blockchain pode ser utilizada para registro, consulta e verificação pública de certificados digitais.
