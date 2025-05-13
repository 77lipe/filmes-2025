/************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 18/02/2025
 * Autor: Felipe Vieira dos Santos
 * Versão: 1.0
************************************************************************************/

const message = require('../modulo/config.js')
const filmeDAO = require('../model/DAO/filme.js')

//Import das controller necessárias para fazer os relacionamentos
const controllerIdade   = require('./controllerIdade.js')
const controllerIdioma = require('./controllerIdioma.js')
// const controllerFilmeGenero     = require('./controllerFilmeGenero.js')

//Funcão para tratar a inserção de um novo filme no DAO
const inserirFilme = async function (filme, contentType){
    
    try {

    if(String(contentType).toLocaleLowerCase() == 'application/json')
    {
    
        if(filme.nome                       == ''   ||  filme.nome             == undefined    || filme.nome               == null     ||      filme.nome.length > 80 || 
            filme.nome                      == ''   ||  filme.nome             == undefined    || filme.nome               == null     ||      filme.duracao.length > 5 || 
            filme.sinopse                   == ''   ||  filme.sinopse          == undefined    || filme.sinopse            == null     ||
            filme.data_lancamento           == ''   ||  filme.data_lancamento  == undefined    || filme.data_lancamento    == null     ||      filme.data_lancamento.length > 10 ||
            filme.foto_capa.length          > 200   ||  filme.foto_capa        == undefined    ||
            filme.link_trailer.length       > 200   ||  filme.link_trailer     == undefined    ||
            filme.id_idade  == ''                   ||  filme.id_idade         == undefined    || 
            filme.id_idioma  == ''                  ||  filme.id_idioma        == undefined
        )
        {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            //Chama a função para inserir no BD e aguarda o retorno da função 
            let resultFilme = await filmeDAO.insertFilme(filme)

            if(resultFilme){
                return message.SUCCESS_CREATED_ITEM //201
            }else
            return message.ERROR_INTERNAL_SERVER //500
        }
    }else{
        return message.ERROR_CONTENT_TYPE //415
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
        
}
} 

//Funcão para tratar a atualização de um novo filme no DAO
const atualizarFilme = async function (id, filme, contentType){
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json')
            {
            
                if(id                               == ''   ||  id                     == undefined    || id                       == null     ||   isNaN(id)                           || id <= 0      ||             
                    filme.nome                      == ''   ||  filme.nome             == undefined    || filme.nome               == null     ||      filme.nome.length > 80           || 
                    filme.nome                      == ''   ||  filme.nome             == undefined    || filme.nome               == null     ||      filme.duracao.length > 5         || 
                    filme.sinopse                   == ''   ||  filme.sinopse          == undefined    || filme.sinopse            == null     ||
                    filme.data_lancamento           == ''   ||  filme.data_lancamento  == undefined    || filme.data_lancamento    == null     ||      filme.data_lancamento.length > 10 ||
                    filme.foto_capa.length          > 200   ||  filme.foto_capa        == undefined    ||
                    filme.link_trailer.length       > 200   ||  filme.link_trailer     == undefined    ||
                    filme.id_idade  == ''                   ||  filme.id_idade         == undefined    || 
                    filme.id_idioma  == ''                  ||  filme.id_idioma        == undefined
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

                    if(resultFilme != false || typeof(resultFilme) == 'object'){
                        if(resultFilme.length > 0){
                            //Update

                            //adiciona o ID do filme no JSON com os dados
                            filme.id = parseInt(id)

                            let result = await filmeDAO.updateFilme(filme)
                            if(result){
                                return message.SUCCESS_UPDATE_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NO_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funcão para tratar a excluir de um novo filme no DAO
const excluirFilme = async function (id){
    try {
  
        // Verifica se o ID foi passado corretamente
        if (id == undefined || id == '' || isNaN(id) || id == null || id <= 0) {
          return message.ERROR_REQUIRED_FIELDS // 400 
        }
        if(id){
          let verificar = await filmeDAO.selectByIdFilme(parseInt(id))
          console.log(verificar)
  
          if(verificar != false || typeof(verificar) == 'object'){
            //Se existir, faremos o delete
              if(verificar.length > 0){
                //delete
                let resultFilme = await filmeDAO.deleteFilme(parseInt(id))
                console.log(resultFilme)
                  if(resultFilme){
                      return message.SUCCESS_DELETED_ITEM
                  }else {
                      return message.ERROR_NOT_DELETE
                  }
              }else {
                  return message.ERROR_NOT_DELETE 
              }
            }else {
              return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
          }else{
            return message.ERROR_REQUIRED_FIELDS
          } 
      }catch (error){
          return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
   }
}

//Funcão para tratar o retorno de filmes do DAO
const listarFilme = async function (){
    try {

        let arrayFilmes = []

        //Objeto do tipo JSON
        let dadosFilme = {}

        //Chama a função para retornar os filmes cadastrados 
        let resultFilme = await filmeDAO.selectAllFilme()

        if(resultFilme != false){
            //Criando um JSON de retorno de dados para a API 
            if(resultFilme.length > 0 ){
                dadosFilme.status = true
                dadosFilme.status_code = 200
                dadosFilme.items = resultFilme.length

                for(const itemFilme of resultFilme){
                    
                    let dadosIdade = await controllerIdade.buscarIdade(itemFilme.id_idade)

                    itemFilme.idade = dadosIdade.idade

                    delete itemFilme.id_idade

                    arrayFilmes.push(itemFilme)

                }

                for(const itemFilme of resultFilme){

                    let dadosIdioma = await controllerIdioma.buscarIdioma(itemFilme.id_idioma)

                    itemFilme.idioma = dadosIdioma.idioma

                    delete itemFilme.id_idade

                    arrayFilmes.push(itemFilme)

                }
                

                dadosFilme.films = arrayFilmes
                
                return dadosFilme
            }else{
                return  message.ERROR_NO_FOUND //404
            }
         
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funcão para tratar o retorno de um filme filtrando pelo id do DAO
const buscarFilme = async function (id){

    try {

        let arrayFilmes = []

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ){
            return message.ERROR_REQUIRED_FIELDS
        }else{
            dadosFilme = {}

            let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))
            if(resultFilme != false || typeof(resultFilme) == 'object'){
                if(resultFilme.length > 0){
                   
                        dadosFilme.status = true
                        dadosFilme.status_code = 200

                        
                     //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemFilme of resultFilme){
                    //Busca os dados da classificação na controller de classificacao
                    let dadosClassificacao = await controllerClassificacao.buscarIdade(itemFilme.id_classificacao)
                    
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemFilme.classificacao = dadosClassificacao.classificacao
                    
                    //Remover um atributo do JSON
                    delete itemFilme.id_classificacao
                    
                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayFilmes.push(itemFilme)
 
                }
                
                dadosFilme.films = arrayFilmes


                    return dadosFilme
                }else{
                    return message.ERROR_NO_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme,
    inserirFilme
}