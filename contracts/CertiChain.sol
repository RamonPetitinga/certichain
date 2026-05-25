// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertiChain {
    address public owner;

    struct Certificado {
        string aluno;
        string curso;
        string instituicao;
        uint256 dataEmissao;
        bool ativo;
        address emissor;
        bool existe;
    }

    mapping(bytes32 => Certificado) private certificados;

    event CertificadoRegistrado(bytes32 indexed certHash, string curso, address indexed emissor);
    event CertificadoRevogado(bytes32 indexed certHash);

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas emissor autorizado");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registrarCertificado(
        bytes32 certHash,
        string memory aluno,
        string memory curso,
        string memory instituicao
    ) public onlyOwner {
        require(certHash != bytes32(0), "Hash invalido");
        require(!certificados[certHash].existe, "Certificado ja registrado");

        certificados[certHash] = Certificado({
            aluno: aluno,
            curso: curso,
            instituicao: instituicao,
            dataEmissao: block.timestamp,
            ativo: true,
            emissor: msg.sender,
            existe: true
        });

        emit CertificadoRegistrado(certHash, curso, msg.sender);
    }


