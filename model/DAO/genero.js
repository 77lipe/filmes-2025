/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de genero dos filmes
 * Data: 15/04/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


//INSERT DO GENERO
const inserirGenero = async function (genero) {

    try {

        let sql = `insert into tbl_genero (  
                                            genero
                                        )
                                        values(
                                            '${genero.genero}'
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

//UPDATE DO GENERO 
const atualizarGenero = async function (genero) {
    try {
        let sql = `update tbl_genero set         genero = '${genero.genero}',
                                              where id = ${genero.id}`

        let resultGenero = await prisma.$executeRawUnsafe(sql)

        if (resultGenero)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//DELETE DO GENERO
const deleteGenero = async function (id) {

    try {
        let sql = 'delete from tbl_genero where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {

    }
}

//RETORNAR TODOS OS GENERO EXISTENTES
const selectAllGenero = async function () {

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_genero order by id desc'

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

//BUSCAR UM GENERO PELO ID
const selectByIdGenero = async function (id) {

    try {

        let sql = `SELECT * FROM tbl_genero WHERE id = ${id}`

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
    inserirGenero,
    atualizarGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}