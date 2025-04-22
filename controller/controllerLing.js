/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Linguagem
 * Data: 18/02/2025
 * Autor: Felipe Vieira dos Santos
 * Versão: 1.0
************************************************************************************/

const message = require('../modulo/config.js')
const linguagemDAO = require('../model/DAO/linguagem.js')

//Funcão para tratar a inserção de um novo filme no DAO
const inserirLinguagem = async function (linguagem, contentType) {

    try {

        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (linguagem.linguagem == '' || linguagem.linguagem == undefined || linguagem.linguagem == null || linguagem.linguagem.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função 
                let resultLinguagem = await linguagemDAO.inserirLinguagem(linguagem)

                if (resultLinguagem) {
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
const atualizarLinguagem = async function (id, linguagem, contentType) {
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
            linguagem.linguagem == '' || linguagem.linguagem == undefined || linguagem.linguagem == null || linguagem.linguagem.length > 45

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultLinguagem = await linguagemDAO.selectByIdLinguagem(parseInt(id))

                if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                    if (resultLinguagem.length > 0) {
                        //Update

                        //adiciona o ID do filme no JSON com os dados
                        linguagem.id = parseInt(id)

                        let result = await linguagemDAO.atualizarLinguagem(linguagem)
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
const excluirLinguagem = async function (id) {
    try {

        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if (id) {
            let verificar = await linguagemDAO.selectByIdLinguagem(parseInt(id))
            console.log(verificar)

            if (verificar != false || typeof (verificar) == 'object') {
                //Se existir, faremos o delete
                if (verificar.length > 0) {
                    //delete
                    let resultLinguagem = await linguagemDAO.deleteLinguagem(parseInt(id))
                    console.log(resultLinguagem)
                    if (resultLinguagem) {
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
const listarLinguagem = async function () {
    try {

        //Objeto do tipo JSON
        let dadosLinguagem = {}

        //Chama a função para retornar os filmes cadastrados 
        let resultLinguagem = await linguagemDAO.selectAllLinguagem()

        if (resultLinguagem != false) {
            //Criando um JSON de retorno de dados para a API 
            if (resultLinguagem.length > 0) {
                dadosLinguagem.status = true
                dadosLinguagem.status_code = 200
                dadosLinguagem.items = resultLinguagem.length
                dadosLinguagem.linguages = resultLinguagem

                return dadosLinguagem
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

console.log(listarLinguagem())

//Funcão para tratar o retorno de um genero filtrando pelo id do DAO
const buscarLinguagem = async function (id) {

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            dadosLinguagem = {}

            let resultLinguagem = await linguagemDAO.selectByIdLinguagem(parseInt(id))
            if (resultLinguagem != false || typeof (resultLinguagem) == 'object') {
                if (resultLinguagem.length > 0) {

                    dadosLinguagem.status = true
                    dadosLinguagem.status_code = 200
                    dadosLinguagem.linguagem = resultLinguagem

                    return dadosLinguagem
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
    atualizarLinguagem,
    excluirLinguagem,
    listarLinguagem,
    buscarLinguagem,
    inserirLinguagem
}