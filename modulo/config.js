/*******************************************************************************
 * Objetivo: Arquivo de configuração para padronizar mensagens e status code da API
 * Data: 18/02/2025
 * Autor: Felipe Vieira
 * Versão: 1.0
********************************************************************************/


/*************************** STATUS CODE MENSAGENS DE ERRO **********************/

const ERROR_REQUIRED_FIELDS = {status:false, status_code: 400, message:"Não foi possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem "}
const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message:"Devido a erros internos no servidor da model, não foi possível processar a requisição"}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message:"Devido a erros internos no servidor da model, não foi possível processar a requisição"}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message:"Devido a erros internos no servidor da controller, não foi possível processar a requisição"}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message:"Não foi possivel processa a requisição, pois, o tipo de dado encaminhado não é processado pelo servidor. Favor encaminhar dados apenas no formato JSON"}
const ERROR_NO_FOUND = {status: false, status_code: 404, message:"Não fora encontrados itens de retorno"}
/************************** STATUS CODE DE MENSAGENS DE SUCESSO *****************/
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso!!!"}
const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: 'Item excluido com sucesso!!'}
const SUCCESS_UPDATE_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso!!'}



module.exports = {
    ERROR_INTERNAL_SERVER,
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_NO_FOUND,
    SUCCESS_DELETED_ITEM,
    SUCCESS_UPDATE_ITEM
}
