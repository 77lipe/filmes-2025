/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de premiações dos filmes
 * Data: 15/04/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


//INSERT DO PREMIAÇÕES
const inserirPremiacao = async function (premiacao) {
     
    try {
        
        let sql = `insert into tbl_premiacao (  
                                            nome
                                        )
                                        values(
                                            '${premiacao.nome}'

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

//UPDATE DO PREMIAÇÃO
const atualizarPremiacao = async function (premiacao) {
    try {
        let sql = `update tbl_premiacao set         sexo = '${premiacao.nome}',
                                              where id = ${premiacao.id}`

        let resultPremiacao = await prisma.$executeRawUnsafe(sql)

        if (resultPremiacao)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//DELETE DO PREMIAÇÃO
const deletePremiacao = async function (id) {

    try {
        let sql = 'delete from tbl_premiacao where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {

    }
}

//RETORNAR TODOS AS PREMIAÇÕES EXISTENTES
const selectAllPremiacao = async function () {

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_premiacao order by id desc'

        //Executa o ScriptSQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//BUSCAR UM PREMIAÇÃO PELO ID
const selectByIdPremiacao = async function (id) {

    try {

        let sql = `SELECT * FROM tbl_premiacao WHERE id = ${id}`

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
    inserirPremiacao,
    atualizarPremiacao,
    deletePremiacao,
    selectAllPremiacao,
    selectByIdPremiacao
}