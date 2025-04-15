/*******************************************************************************
 * Objetivo: Criar a comunicação com o banco de dados para fazer CRUD de idioma dos filmes
 * Data: 15/04/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/

//import da biblioteca prisma/client
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


//INSERT DO IDIOMA
const inserirIdioma = async function (idioma) {
     
    try {
        
        let sql = `insert into tbl_idioma (  
                                            idioma,
                                            codigo_iso
                                        )
                                        values(
                                            '${idioma.idioma}',
                                            '${idioma.codigo_iso}'
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

//UPDATE DO IDIOMA
const atualizarIdioma = async function (idioma) {
    try {
        let sql = `update tbl_idioma set         idioma = '${idioma.idioma}', codigo_iso = '${idioma.codigo_iso}',
                                              where id = ${idioma.id}`

        let resultIdioma = await prisma.$executeRawUnsafe(sql)

        if (resultIdioma)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//DELETE DO IDIOMA
const deleteIdioma = async function (id) {

    try {
        let sql = 'delete from tbl_idioma where id = ?'

        let result = await prisma.$executeRawUnsafe(sql, id)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {

    }
}


//RETORNAR TODOS OS IDIOMAS EXISTENTES
const selectAllIdioma = async function () {

    try {
        //ScriptSQL para retornar todos os dados
        let sql = 'select * from tbl_idioma order by id desc'

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

//BUSCAR UM IDIOMA PELO ID
const selectByIdIdioma = async function (id) {

    try {

        let sql = `SELECT * FROM tbl_idioma WHERE id = ${id}`

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
    inserirIdioma,
    atualizarIdioma,
    deleteIdioma,
    selectAllIdioma,
    selectByIdIdioma
}