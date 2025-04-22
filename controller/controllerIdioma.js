const message = require('../modulo/config.js')
const idiomaDAO = require('../model/DAO/idioma.js')

//Funcão para tratar a inserção de um novo genero no DAO
const inserirIdioma = async function (idioma, contentType) {

    try {

        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (idioma.idioma == '' || idioma.idioma == undefined || idioma.idioma == null || idioma.idioma.length > 45 ||
                idioma.codigo_iso                     == ''   ||  idioma.codigo_iso              == undefined    || idioma.codigo_iso                == null     ||      idioma.codigo_iso .length > 10
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Chama a função para inserir no BD e aguarda o retorno da função 
                let resultIdioma = await idiomaDAO.inserirIdioma(idioma)

                if (resultIdioma) {
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
const atualizarIdioma = async function (id, idioma, contentType) {
    try {
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
            idioma.idioma == '' || idioma.idioma == undefined || idioma.idioma == null || idioma.idioma.length > 45 ||
            idioma.codigo_iso == '' || idioma.codigo_iso == undefined || idioma.codigo_iso == null || idioma.codigo_iso.length > 10

            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validação para verificar se o ID existe no BD
                let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))

                if (resultIdioma != false || typeof (resultIdioma) == 'object') {
                    if (resultIdioma.length > 0) {
                        //Update

                        //adiciona o ID do filme no JSON com os dados
                        idioma.id = parseInt(id)

                        let result = await idiomaDAO.atualizarIdioma(idioma)
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
const excluirIdioma = async function (id) {
    try {

        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if (id) {
            let verificar = await idiomaDAO.selectByIdIdioma(parseInt(id))
            console.log(verificar)

            if (verificar != false || typeof (verificar) == 'object') {
                //Se existir, faremos o delete
                if (verificar.length > 0) {
                    //delete
                    let resultIdioma = await idiomaDAO.deleteIdioma(parseInt(id))
                    console.log(resultIdioma)
                    if (resultIdioma) {
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
const listarIdioma = async function () {
    try {

        //Objeto do tipo JSON
        let dadosIdioma = {}

        //Chama a função para retornar os filmes cadastrados 
        let resultIdioma = await idiomaDAO.selectAllIdioma()

        if (resultIdioma != false) {
            //Criando um JSON de retorno de dados para a API
            if (resultIdioma.length > 0) {
                dadosIdioma.status = true
                dadosIdioma.status_code = 200
                dadosIdioma.items = resultIdioma.length
                dadosIdioma.idioms = resultIdioma

                return dadosIdioma
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
const buscarIdioma = async function (id) {

    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELDS
        } else {
            dadosIdioma = {}

            let resultIdioma = await idiomaDAO.selectByIdIdioma(parseInt(id))
            if (resultIdioma != false || typeof (resultIdioma) == 'object') {
                if (resultIdioma.length > 0) {

                    dadosIdioma.status = true
                    dadosIdioma.status_code = 200
                    dadosIdioma.idioma = resultIdioma

                    return dadosIdioma
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
    atualizarIdioma,
    excluirIdioma,
    listarIdioma,
    buscarIdioma,
    inserirIdioma 
}