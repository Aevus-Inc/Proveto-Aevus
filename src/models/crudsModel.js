var database = require("../database/config");

function listarFuncionarios() {
  var instrucaoSql = `
    SELECT 
      u.idUsuario,
      p.nome,
      p.cpf,
      p.telefone,
      p.dataNascimento,
      p.sexo,
      p.endereco,
      u.email,
      u.tipoUsuario,
      u.dataContratacao,
      u.status
    FROM Usuario u
    JOIN Pessoa p ON u.fkPessoa = p.idPessoa;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function carregarDetalhesFuncionario(idUsuario) {
  var instrucaoSql = `
    SELECT 
      u.idUsuario,
      p.nome,
      p.cpf,
      p.telefone,
      p.dataNascimento,
      p.sexo,
      p.endereco,
      u.email,
      u.tipoUsuario,
      u.dataContratacao,
      u.status
    FROM Usuario u
    JOIN Pessoa p ON u.fkPessoa = p.idPessoa
    WHERE u.idUsuario = ${idUsuario};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarFuncionario(idUsuario, nome, cpf, telefone, dataNascimento, sexo, endereco, email, tipoUsuario, dataContratacao, status) {
  var instrucaoSql = `
    UPDATE Pessoa p
    JOIN Usuario u ON p.idPessoa = u.fkPessoa
    SET 
      p.nome = '${nome}',
      p.cpf = '${cpf}',
      p.telefone = '${telefone}',
      p.dataNascimento = '${dataNascimento}',
      p.sexo = '${sexo}',
      p.endereco = '${endereco}',
      u.email = '${email}',
      u.tipoUsuario = '${tipoUsuario}',
      u.dataContratacao = '${dataContratacao}',
      u.status = '${status}'
    WHERE u.idUsuario = ${idUsuario};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function excluirFuncionario(idUsuario) {
  var instrucaoSql = `
    DELETE FROM Usuario WHERE idUsuario = ${idUsuario};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarUsuario(nome, cpf, telefone, dataNascimento, sexo, endereco, email, tipoUsuario, dataContratacao, status) {
  var instrucaoPessoa = `
    INSERT INTO Pessoa (nome, cpf, telefone, dataNascimento, sexo, endereco)
    VALUES ('${nome}', '${cpf}', '${telefone}', '${dataNascimento}', '${sexo}', '${endereco}');
  `;

  return database.executar(instrucaoPessoa).then(resultado => {
    var idPessoa = resultado.insertId;
    var instrucaoUsuario = `
      INSERT INTO Usuario (email, tipoUsuario, dataContratacao, status, fkPessoa)
      VALUES ('${email}', '${tipoUsuario}', '${dataContratacao}', '${status}', ${idPessoa});
    `;
    return database.executar(instrucaoUsuario);
  });
}

module.exports = {
  listarFuncionarios,
  carregarDetalhesFuncionario,
  atualizarFuncionario,
  excluirFuncionario,
  cadastrarUsuario
};