const message = require('../modulo/config.js')
const idadeDAO = require('../model/DAO/idadeInd.js')

//Funcão para tratar a inserção de um novo genero no DAO
const inserirIdade = async function (idade, contentType) {

    try {

        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (idade.idadeIndicativa == '' || idade.idadeIndicativa == undefined || idade.idadeIndicativa == null || idade.idadeIndicativa.length > 15 ||
                idade.descricao                   == ''   ||  idade.descricao          == undefined    || idade.descricao            == null     
             ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função 
                let resultIdade = await idadeDAO.inserirIdadeInd(idade)

                if (resultIdade) {
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
const atualizarIdade = async function (id, idade, contentType) {
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
            idade.idadeIndicativa == '' || idade.idadeIndicativa == undefined || idade.idadeIndicativa == null || idade.idadeIndicativa.length > 15 ||
            idade.descricao                   == ''   ||  idade.descricao          == undefined    || idade.descricao            == null     

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultIdade = await idadeDAO.selectByIdIdadeInd(parseInt(id))

                if (resultIdade != false || typeof (resultIdade) == 'object') {
                    if (resultIdade.length > 0) {
                        //Update

                        //adiciona o ID do filme no JSON com os dados
                        idade.id = parseInt(id)

                        let result = await idadeDAO.atualizarIdadeInd(idade)
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
const excluirIdade = async function (id) {
    try {

        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if (id) {
            let verificar = await idadeDAO.selectByIdIdadeInd(parseInt(id))
            console.log(verificar)

            if (verificar != false || typeof (verificar) == 'object') {
                //Se existir, faremos o delete
                if (verificar.length > 0) {
                    //delete
                    let resultIdade = await idadeDAO.deleteIdadeInd(parseInt(id))
                    console.log(resultIdade)
                    if (resultIdade) {
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
const listarIdade = async function () {
    try {

        //Objeto do tipo JSON
        let dadosIdade = {}

        //Chama a função para retornar os filmes cadastrados 
        let resultIdade = await idadeDAO.selectAllIdadeInd()

        if (resultIdade != false) {
            //Criando um JSON de retorno de dados para a API 
            if (resultIdade.length > 0) {
                dadosIdade.status = true
                dadosIdade.status_code = 200
                dadosIdade.items = resultIdade.length
                dadosIdade.ages = resultIdade

                return dadosIdade
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
const buscarIdade = async function (id) {

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            dadosIdade = {}

            let resultIdade = await idadeDAO.selectByIdIdadeInd(parseInt(id))
            if (resultIdade != false || typeof (resultIdade) == 'object') {
                if (resultIdade.length > 0) {

                    dadosIdade.status = true
                    dadosIdade.status_code = 200
                    dadosIdade.idade = resultIdade

                    return dadosIdade
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
    atualizarIdade,
    excluirIdade,
    listarIdade,
    buscarIdade,
    inserirIdade
}