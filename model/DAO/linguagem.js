/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de linguagens dos filmes
 * Data: 15/04/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


//INSERT DO Linguagens
const inserirLinguagem = async function (linguagem) {
     
    try {
        
        let sql = `insert into tbl_linguagem (  
                                            linguagem
                                        )
                                        values(
                                            '${linguagem.linguagem}',

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

//UPDATE DO LINGUAGUENS
const atualizarLinguagem = async function (linguagem) {
    try {
        let sql = `update tbl_linguagem set         linguagem = '${linguagem.linguagem}',
                                              where id = ${linguagem.id}`

        let resultLinguagem = await prisma.$executeRawUnsafe(sql)

        if (resultLinguagem)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//DELETE DO LINGUAGENS
const deleteLinguagem = async function (id) {

    try {
        let sql = 'delete from tbl_linguagem where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {

    }
}

//RETORNAR TODOS AS LINGUAGENS EXISTENTES
const selectAllLinguagem = async function () {

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_linguagem order by id desc'

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

//BUSCAR UM LINGUAGENS PELO ID
const selectByIdLinguagem = async function (id) {

    try {

        let sql = `SELECT * FROM tbl_linguagem WHERE id = ${id}`

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
    inserirLinguagem,
    atualizarLinguagem,
    deleteLinguagem,
    selectAllLinguagem,
    selectByIdLinguagem
}