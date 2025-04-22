/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de genero
 * Data: 18/02/2025
 * Autor: Felipe Vieira dos Santos
 * Versão: 1.0
************************************************************************************/

const message = require('../modulo/config.js')
const generoDAO = require('../model/DAO/genero.js')

//Funcão para tratar a inserção de um novo genero no DAO
const inserirGenero = async function (genero, contentType) {

    try {

        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (genero.genero == '' || genero.genero == undefined || genero.genero == null || genero.genero.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função 
                let resultGenero = await generoDAO.inserirGenero(genero)

                if (resultGenero) {
                    return message.SUCCESS_CREATED_ITEM //201
                } else
                    return message.ERROR_INTERNAL_SERVER //500
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500

    }
}

//Funcão para tratar a atualização de um novo genero no DAO
const atualizarGenero = async function (id, genero, contentType) {
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                genero.genero == '' || genero.genero == undefined || genero.genero == null || genero.genero.length > 45

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

                if (resultGenero != false || typeof (resultGenero) == 'object') {
                    if (resultGenero.length > 0) {
                        //Update

                        //adiciona o ID do filme no JSON com os dados
                        genero.id = parseInt(id)

                        let result = await generoDAO.atualizarGenero(genero)
                        if (result) {
                            return message.SUCCESS_UPDATE_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else {
                        return message.ERROR_NO_FOUND //404
                    }
                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funcão para tratar a excluir um genero no DAO
const excluirGenero = async function (id) {
    try {

        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if (id) {
            let verificar = await generoDAO.selectByIdGenero(parseInt(id))
            console.log(verificar)

            if (verificar != false || typeof (verificar) == 'object') {
                //Se existir, faremos o delete
                if (verificar.length > 0) {
                    //delete
                    let resultGenero = await generoDAO.deleteGenero(parseInt(id))
                    console.log(resultGenero)
                    if (resultGenero) {
                        return message.SUCCESS_DELETED_ITEM
                    } else {
                        return message.ERROR_NOT_DELETE
                    }
                } else {
                    return message.ERROR_NOT_DELETE
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return message.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funcão para tratar o retorno de generos do DAO
const listarGeneros = async function () {
    try {

        //Objeto do tipo JSON
        let dadosGenero = {}

        //Chama a função para retornar os filmes cadastrados 
        let resultGenero = await generoDAO.selectAllGenero()

        if (resultGenero != false) {
            //Criando um JSON de retorno de dados para a API 
            if (resultGenero.length > 0) {
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.items = resultGenero.length
                dadosGenero.genres = resultGenero

                return dadosGenero
            } else {
                return message.ERROR_NO_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funcão para tratar o retorno de um genero filtrando pelo id do DAO
const buscarGenero = async function (id) {

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            dadosGenero = {}

            let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))
            if (resultGenero != false || typeof (resultGenero) == 'object') {
                if (resultGenero.length > 0) {

                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.genero = resultGenero

                    return dadosGenero
                } else {
                    return message.ERROR_NO_FOUND
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    atualizarGenero,
    excluirGenero,
    listarGeneros,
    buscarGenero,
    inserirGenero
}