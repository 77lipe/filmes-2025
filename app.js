/*
 * Objetivo: Criar um API para realizar o CRUD do sistema de controle de filmes
 * Autor: Felipe Vieira
 * OBSERVAÇÃO:
 *      Para criar a API precisamos instalar:
 *          * express           npm install express --save
 *          * cors              npm install cors --save
 *          * body-parser       npm install body-parser --save
 *
 *      Para criar a integração com o Banco de Dados precisamos instalar:
 *          * prisme            npm install prisma --save           (para fazer conexão com o BD)
 *          * prisma/client     npm install @prisma/client --save   (para rodar os scripts SQL)
 *        
 * 
 *            Após a instalação do prisma e do prisma client, devemos:
 *              npx prisma init
 *            Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD
 *            Após essa configuração deverá rodar o seguinte comando:
 *              npx prisma migrate dev
*************************************************************************************************/

//Import das bibliotecas para configurar a API 
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Manipular o body da quisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

//Cria o objeto app com referencias do express para criar a API 
const app = express()

app.use((request, response, next)=>{
    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const controllerFilme = require('./controller/controllerFilme')
app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultFilme = await controllerFilme.inserirFilme(dadosBody,contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function(request, response) {
    
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.get('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdFilme = request.params.id

    let resultFilme = await controllerFilme.buscarFilme(IdFilme)
    
    response.status(resultFilme.status_code)
    response.json(resultFilme)
})

app.delete('/v1/controle-filmes/filme/delete/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultFilme = await controllerFilme.excluirFilme(id)
  
    response.status(resultFilme.status_code)
    response.json(resultFilme)
  })

app.put('/v1/controle-filmes/filme/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdFilme = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultFilme = await controllerFilme.atualizarFilme(IdFilme, dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)
}) 
    


//Executa a API e faz com que fique aguardando novas requisições 
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})