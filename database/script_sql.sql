#Cria banco
create database db_controle_filmes_ab;

#Ativa/entrar banco
use db_controle_filmes_ab;

#Criar tabela
create table tbl_filme(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200)
);


--genero
create table tbl_genero(
	id int not null primary key auto_increment,
    genero varchar(45) not null
);


--idade indicativa
create table tbl_idadeIndicativa(
    id int not null primary key auto_increment,
    idadeIndicativa varchar(15) not null,
    descricao TEXT not null
);


--idioma
create table tbl_idioma(
    id int not null primary key auto_increment,
    idioma varchar(45) not null,
    codigo_iso varchar(10) not null
);


--sexo
create table tbl_sexo(
    id int not null primary key auto_increment,
    sexo varchar(35) not null
);


-- premiação
create table tbl_premiacao(
    id int not null primary key auto_increment,
    nome varchar(45) not null
);


--linguagem
create table tbl_linguagem(
    id int not null primary key auto_increment,
    linguagem varchar(45) not null
);



show tables;

desc tbl_filme;

select * from tbl_filme