/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Premiacao
 * Data: 18/02/2025
 * Autor: Felipe Vieira dos Santos
 * Versão: 1.0
************************************************************************************/

const message = require('../modulo/config.js')
const premiacaoDAO = require('../model/DAO/premiacao.js')

//Funcão para tratar a inserção de um novo filme no DAO
const inserirPremiacao = async function (premiacao, contentType) {

    try {

        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (premiacao.nome == '' || premiacao.nome == undefined || premiacao.nome == null || premiacao.nome.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função 
                let resultpremiacao = await premiacaoDAO.inserirPremiacao(premiacao)

                if (resultpremiacao) {
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
const atualizarPremiacao = async function (id, premiacao, contentType) {
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
            premiacao.nome == '' || premiacao.nome == undefined || premiacao.nome == null || premiacao.nome.length > 45

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultpremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

                if (resultpremiacao != false || typeof (resultpremiacao) == 'object') {
                    if (resultpremiacao.length > 0) {
                        //Update

                        //adiciona o ID do filme no JSON com os dados
                        premiacao.id = parseInt(id)

                        let result = await premiacaoDAO.atualizarPremiacao(premiacao)
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
const excluirPremiacao = async function (id) {
    try {

        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if (id) {
            let verificar = await premiacaoDAO.selectByIdPremiacao(parseInt(id))
            console.log(verificar)

            if (verificar != false || typeof (verificar) == 'object') {
                //Se existir, faremos o delete
                if (verificar.length > 0) {
                    //delete
                    let resultpremiacao = await premiacaoDAO.deletePremiacao(parseInt(id))
                    console.log(resultpremiacao)
                    if (resultpremiacao) {
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
const listarPremiacao = async function () {
    try {

        //Objeto do tipo JSON
        let dadosPremiacao = {}

        //Chama a função para retornar os filmes cadastrados 
        let resultpremiacao = await sexoDAO.selectAllSexo()

        if (resultpremiacao != false) {
            //Criando um JSON de retorno de dados para a API 
            if (resultpremiacao.length > 0) {
                dadosPremiacao.status = true
                dadosPremiacao.status_code = 200
                dadosPremiacao.items = resultpremiacao.length
                dadosPremiacao.premiacoes = resultpremiacao

                return dadosPremiacao
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
const buscarPremiacao = async function (id) {

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            dadosPremiacao = {}

            let resultpremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))
            if (resultpremiacao != false || typeof (resultpremiacao) == 'object') {
                if (resultpremiacao.length > 0) {

                    dadosPremiacao.status = true
                    dadosPremiacao.status_code = 200
                    dadosPremiacao.sexo = resultpremiacao

                    return dadosPremiacao
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
    atualizarPremiacao,
    excluirPremiacao,
    listarPremiacao,
    buscarPremiacao,
    inserirPremiacao
}