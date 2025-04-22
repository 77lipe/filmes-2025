/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de idade indicativa dos filmes
 * Data: 15/04/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


//INSERT DA IDADE
const inserirIdadeInd = async function (idade) {

    try {

        let sql = `insert into tbl_idadeIndicativa (  
                                            idadeIndicativa,
                                            descricao
                                        )
                                        values(
                                            '${idade.idadeIndicativa}',
                                            '${idade.descricao}'
                                        )`

        // Executa o scriptSQL no BD e aguarda o retorno no mesmo para saber se deu certo
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}
// console.log(inserirIdadeInd("Livre","TESTE"))

//UPDATE DA IDADE
const atualizarIdadeInd = async function (idade) {
    try {
        let sql = `update tbl_idadeIndicativa set         idadeIndicativa = '${idade.idadeIndicativa}', descricao = '${idade.descricao}'
                                              where id = ${idade.id}`

        let resultIdadeInd = await prisma.$executeRawUnsafe(sql)

        if (resultIdadeInd)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//DELETE DO GENERO
const deleteIdadeInd = async function (id) {

    try {
        let sql = 'delete from tbl_idadeIndicativa where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {

    }
}

//RETORNAR TODOS OS FILMES EXISTENTES
const selectAllIdadeInd = async function () {

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_idadeIndicativa order by id desc'

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

//RETORNAR FILME POR ID
const selectByIdIdadeInd = async function (id) {

    try {

        let sql = `SELECT * FROM tbl_idadeIndicativa WHERE id = ${id}`

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
    inserirIdadeInd,
    atualizarIdadeInd,
    deleteIdadeInd,
    selectAllIdadeInd,
    selectByIdIdadeInd
}