/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de filmes
 * Data: 18/02/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

//INSERT DO NOVO FILME
const insertFilme = async function(filme){
    //Instancia (criar um objt a ser utilizado) a biblioteca do prisma/client
    try {
        
            let sql = `insert into tbl_filme (  
                                                nome,
                                                duracao,
                                                sinopse,
                                                data_lancamento,
                                                foto_capa,
                                                link_trailer
                                            )
                                            values(
                                                '${filme.nome}',
                                                '${filme.duracao}',
                                                '${filme.sinopse}',
                                                '${filme.data_lancamento}',
                                                '${filme.foto_capa}',
                                                '${filme.link_trailer}'
                                            )`

            // Executa o scriptSQL no BD e aguarda o retorno no mesmo para saber se deu certo
            let result = await prisma.$executeRawUnsafe(sql)
            
        if(result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

//ATUALIZAR UM FILME EXISTENTE
const updateFilme = async function(filme){
    try {
        let sql = `update tbl_filme set         nome = '${filme.nome}',
                                                duracao = '${filme.duracao}',
                                                sinopse = '${filme.sinopse}',
                                                data_lancamento = '${filme.data_lancamento}',
                                                foto_capa = '${filme.foto_capa}',
                                                link_trailer = '${filme.link_trailer}'
                                where id = ${filme.id}`

    let resultFilme = await prisma.$executeRawUnsafe(sql)

    if(resultFilme)
        return true
    else 
        return false
    } catch (error) {
        return false
    }
}

//EXCLUIR UM FILME EXISTENTE
const deleteFilme = async function(id){

    try {
        let sql = 'delete from tbl_filme where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)
    
        if (result){
            return true 
        }else{
            return false
        }
    } catch (error) {
        
    }
}

//RETORNAR TODOS OS FILMES EXISTENTES
const selectAllFilme = async function(){

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_filme order by id desc'

        //Executa o ScriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//BUSCAR UM FILME PELO ID
const selectByIdFilme = async function(id){

    try {

        let sql = `SELECT * FROM tbl_filme WHERE id = ${id}`
    
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
        } catch (error) {
            return false
        }


}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilme,
    selectByIdFilme
}