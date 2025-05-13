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


//FILME
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


//LINGUAGEM
const controllerLinguagem = require('./controller/controllerLing.js')
app.post('/v1/controle-filmes/linguagem', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultLinguagem = await controllerLinguagem.inserirLinguagem(dadosBody,contentType)

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})

app.get('/v1/controle-filmes/linguagens', cors(), bodyParserJSON, async function(request, response) {
    
    let resultLinguagem = await controllerLinguagem.listarLinguagem()

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})

app.get('/v1/controle-filmes/linguagem/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdLinguagem = request.params.id

    let resultLinguagem = await controllerLinguagem.buscarLinguagem(IdLinguagem)
    
    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
})

app.delete('/v1/controle-filmes/linguagem/delete/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultLinguagem = await controllerLinguagem.excluirLinguagem(id)
  
    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
  })

app.put('/v1/controle-filmes/linguagem/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdLinguagem = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultLinguagem = await controllerLinguagem.atualizarLinguagem(IdLinguagem, dadosBody, contentType)

    response.status(resultLinguagem.status_code)
    response.json(resultLinguagem)
}) 


//SEXO
const controllerSexo = require('./controller/controllerSexo')
app.post('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultSexo = await controllerSexo.inserirSexo(dadosBody,contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-filmes/sexo', cors(), bodyParserJSON, async function(request, response) {
    
    let resultSexo = await controllerSexo.listarSexo()

    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.get('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdSexo = request.params.id

    let resultSexo = await controllerSexo.buscarSexo(IdSexo)
    
    response.status(resultSexo.status_code)
    response.json(resultSexo)
})

app.delete('/v1/controle-filmes/sexo/delete/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultSexo = await controllerSexo.excluirSexo(id)
  
    response.status(resultSexo.status_code)
    response.json(resultSexo)
  })

app.put('/v1/controle-filmes/sexo/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdSexo = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultSexo = await controllerSexo.atualizarSexo(IdSexo, dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
}) 


//GENERO
const controllerGen = require('./controller/controllerGenero.js')
app.post('/v1/controle-filmes/genero', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultGenero = await controllerGen.inserirGenero(dadosBody,contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-filmes/genero', cors(), bodyParserJSON, async function(request, response) {
    
    let resultGenero = await controllerGen.listarGeneros()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.get('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let IdGen = request.params.id

    let resultGenero = await controllerGen.buscarGenero(IdGen)
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

app.delete('/v1/controle-filmes/genero/delete/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultGenero = await controllerGen.excluirGenero(id)
  
    response.status(resultGenero.status_code)
    response.json(resultGenero)
  })

app.put('/v1/controle-filmes/genero/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let IdGenero = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultGenero = await controllerGen.atualizarGenero(IdGenero, dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})     


//IDIOMA
const controllerIdioma = require('./controller/controllerIdioma')
app.post('/v1/controle-filmes/idioma', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultIdioma = await controllerIdioma.inserirIdioma(dadosBody,contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-filmes/idioma', cors(), bodyParserJSON, async function(request, response) {
    
    let resultIdioma = await controllerIdioma.listarIdioma()

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.get('/v1/controle-filmes/idioma/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let Id = request.params.id

    let resultIdioma = await controllerIdioma.buscarIdioma(Id)
    
    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})

app.delete('/v1/controle-filmes/idioma/delete/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultIdioma = await controllerIdioma.excluirIdioma(id)
  
    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
  })

app.put('/v1/controle-filmes/idioma/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let Id = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultIdioma = await controllerIdioma.atualizarIdioma(Id, dadosBody, contentType)

    response.status(resultIdioma.status_code)
    response.json(resultIdioma)
})     


//IDADE INDICATIVA
const controllerIdade = require('./controller/controllerIdade')
app.post('/v1/controle-filmes/idade', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultIdade = await controllerIdade.inserirIdade(dadosBody,contentType)

    response.status(resultIdade.status_code)
    response.json(resultIdade)
})

app.get('/v1/controle-filmes/idade', cors(), bodyParserJSON, async function(request, response) {
    
    let resultIdade = await controllerIdade.listarIdade()

    response.status(resultIdade.status_code)
    response.json(resultIdade)
})

app.get('/v1/controle-filmes/idade/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let Id = request.params.id

    let resultIdade = await controllerIdade.buscarIdade(Id)
    
    response.status(resultIdade.status_code)
    response.json(resultIdade)
})

app.delete('/v1/controle-filmes/idade/delete/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultIdade = await controllerIdade.excluirIdade(id)
  
    response.status(resultIdade.status_code)
    response.json(resultIdade)
  })

app.put('/v1/controle-filmes/idade/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let Id = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultIdade = await controllerIdade.atualizarIdade(Id, dadosBody, contentType)

    response.status(resultIdade.status_code)
    response.json(resultIdade)
})  


//PREMIACAO
const controllerPremiacao = require('./controller/controllerPremiacao')
app.post('/v1/controle-filmes/premiacao', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultpremiacao = await controllerPremiacao.inserirPremiacao(dadosBody,contentType)

    response.status(resultpremiacao.status_code)
    response.json(resultpremiacao)
})

app.get('/v1/controle-filmes/premiacao', cors(), bodyParserJSON, async function(request, response) {
    
    let resultpremiacao = await controllerPremiacao.listarPremiacao()

    response.status(resultpremiacao.status_code)
    response.json(resultpremiacao)
})

app.get('/v1/controle-filmes/premiacao/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let Id = request.params.id

    let resultIdade = await controllerIdade.buscarIdade(Id)
    
    response.status(resultIdade.status_code)
    response.json(resultIdade)
})

app.delete('/v1/controle-filmes/premiacao/delete/:id', cors(), async function (request, response) {
    let id = request.params.id 
  
    let resultIdade = await controllerIdade.excluirIdade(id)
  
    response.status(resultIdade.status_code)
    response.json(resultIdade)
  })

app.put('/v1/controle-filmes/premiacao/:id', cors(), bodyParserJSON, async function (request,response){
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID da requisição
    let Id = request.params.id

    //Recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultIdade = await controllerIdade.atualizarIdade(Id, dadosBody, contentType)

    response.status(resultIdade.status_code)
    response.json(resultIdade)
})  

//Executa a API e faz com que fique aguardando novas requisições 
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})