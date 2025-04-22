/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Linguagem
 * Data: 18/02/2025
 * Autor: Felipe Vieira dos Santos
 * Versão: 1.0
************************************************************************************/

const message = require('../modulo/config.js')
const sexoDAO = require('../model/DAO/sexo.js')

//Funcão para tratar a inserção de um novo filme no DAO
const inserirSexo = async function (sexo, contentType) {

    try {

        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (sexo.sexo == '' || sexo.sexo == undefined || sexo.sexo == null || sexo.sexo.length > 45
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função 
                let resultsexo = await sexoDAO.inserirSexo(sexo)

                if (resultsexo) {
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
const atualizarSexo = async function (id, sexo, contentType) {
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
            sexo.sexo == '' || sexo.sexo == undefined || sexo.sexo == null || sexo.sexo.length > 45

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultSexo = await sexoDAO.selectByIdSexo(parseInt(id))

                if (resultSexo != false || typeof (resultSexo) == 'object') {
                    if (resultSexo.length > 0) {
                        //Update

                        //adiciona o ID do filme no JSON com os dados
                        sexo.id = parseInt(id)

                        let result = await sexoDAO.atualizarSexo(sexo)
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
const excluirSexo = async function (id) {
    try {

        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if (id) {
            let verificar = await sexoDAO.selectByIdSexo(parseInt(id))
            console.log(verificar)

            if (verificar != false || typeof (verificar) == 'object') {
                //Se existir, faremos o delete
                if (verificar.length > 0) {
                    //delete
                    let resultSexo = await sexoDAO.deleteSexo(parseInt(id))
                    console.log(resultSexo)
                    if (resultSexo) {
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
const listarSexo = async function () {
    try {

        //Objeto do tipo JSON
        let dadosSexo = {}

        //Chama a função para retornar os filmes cadastrados 
        let resultSexo = await sexoDAO.selectAllSexo()

        if (resultSexo != false) {
            //Criando um JSON de retorno de dados para a API 
            if (resultSexo.length > 0) {
                dadosSexo.status = true
                dadosSexo.status_code = 200
                dadosSexo.items = resultSexo.length
                dadosSexo.sexos = resultSexo

                return dadosSexo
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
const buscarSexo = async function (id) {

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            dadosSexo = {}

            let resultSexo = await sexoDAO.selectByIdSexo(parseInt(id))
            if (resultSexo != false || typeof (resultSexo) == 'object') {
                if (resultSexo.length > 0) {

                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.sexo = resultSexo

                    return dadosSexo
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
    atualizarSexo,
    excluirSexo,
    listarSexo,
    buscarSexo,
    inserirSexo
}