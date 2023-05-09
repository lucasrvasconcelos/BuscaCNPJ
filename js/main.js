
const cosultar = document.querySelector("#consultar")
let result = document.querySelector("#result")
const link = document.querySelector("a")

cosultar.addEventListener("click", () => {

    const cnpj_value = document.querySelector("#cnpj")
    let cnpj = cnpj_value.value.replace(/[^0-9]/gi, "");

    if(cnpj.length == 14){
        result.style.display = "flex"
        const url = `https://publica.cnpj.ws/cnpj/${cnpj}`
        const options = {
            method: 'GET',
                mode: 'cors',
                cache: 'default' }
        
        fetch(url, options)
    
        .then((res)=> {
            if(res.ok){
                res.json()
                .then((returnCNPJ_JSON) => {
                    const returnCNPJ = returnCNPJ_JSON
                    buscaCNPJ(returnCNPJ)
                })
                .catch((error) => {
                    console.log("erro: " + error)
                })
            } else if(res.status = 429){
                alert("Limite de 3 requisições por minuto!")
            }
        })
    
        .catch((error)=>{
            console.log("Erro: " + error)
        })
    } else {
        alert(`CNPJ: ${cnpj} inválido`)
    }

})
    


function buscaCNPJ(returnCNPJ){
    
    
    result.innerHTML = ""
    
    const dado = {
        cnpj: returnCNPJ["estabelecimento"]["cnpj"],
        ie: returnCNPJ["estabelecimento"]["inscricoes_estaduais"],
        razao: returnCNPJ["razao_social"],
        fantasia: returnCNPJ["estabelecimento"]["nome_fantasia"],
        telefone1: returnCNPJ["estabelecimento"]["ddd1"] + returnCNPJ["estabelecimento"]["telefone1"],
        cep: returnCNPJ["estabelecimento"]["cep"],
        logradouro: returnCNPJ["estabelecimento"]["logradouro"],
        numero: returnCNPJ["estabelecimento"]["numero"],
        complemento: returnCNPJ["estabelecimento"]["complemento"],
        bairro: returnCNPJ["estabelecimento"]["bairro"],
        ibge: returnCNPJ["estabelecimento"]["cidade"]["ibge_id"],
        cidade: returnCNPJ["estabelecimento"]["cidade"]["nome"],
        uf: `${returnCNPJ["estabelecimento"]["estado"]["sigla"]}`
    }

    setDado("CNPJ ", dado.cnpj)
    setDado("Inscrição Estadual ", dado.ie , "inscricao_estadual")
    setDado("Razão Social ", dado.razao)
    setDado("Nome Fantasia ", dado.fantasia)
    setDado("Telefone 01 ", dado.telefone1)
    setDado("CEP ", dado.cep)
    setDado("Logradouro ", dado.logradouro)
    setDado("Número ", dado.numero)
    setDado("Complemento ", dado.complemento)
    setDado("Bairro  ", dado.bairro)
    setDado("IBGE  ", dado.ibge)
    setDado("Cidade  ", dado.cidade)
    setDado("UF  ", dado.uf)

    console.log(dado.cidade)

const conteudo = `[Certificado]
NumSerie=
SSLLib=0
CryptLib=0
HttpLib=0
XmlSignLib=0
[Geral
DANFE=Retrato
FormaEmissao=0
LogoMarca
Salvar=1
SalvarMensal=1
SalvarPorCNPJ=1
PathSalvar
idCSC
CSC
VersaoDF=ve400
[WebService]
UF=CE
Ambiente=Producao
Visualizar=0
SSLType=0
[Emitente]
CNPJ=${dado.cnpj}
IE=${dado.ie[0]["inscricao_estadual"]}
RazaoSocial=${dado.razao}
Fantasia=${dado.fantasia}
Fone=${dado.telefone1}
CEP=${dado.cep}
Logradouro=${dado.logradouro}
Numero=${dado.numero}
Complemento=${dado.complemento}
Bairro=${dado.bairro}
CodCidade=${dado.ibge}
Cidade=${dado.cidade}
UF=${dado.uf}
[CTeGeral]
TipoDACTE=0
LogoMarca=
FormaEmissao=0
Salvar=0
PathSalvar=
ModeloDF=0
VersaoDF=0
[MDFeGeral]
TipoDAMDFe=0
FormaEmissao=0
Salvar=1
LocalArquivo=
`
const nomeArquivo = `NFe${dado.cnpj}.ini`;

    salvarArquivoTexto(conteudo, nomeArquivo);

}

function setDado(nomecampo, valor, nomeObject){

    if(typeof valor == "object" && valor != null){

        valor.forEach(element => {
            let label = document.createElement("label")
            let input = document.createElement("input")
            label.textContent = nomecampo
            input.type = "text"
            input.disabled = true
            input.value = element[nomeObject]

            result.appendChild(label)
            label.appendChild(input)
            
        });

    } else {
        let label = document.createElement("label")
        let input = document.createElement("input")
        label.textContent = nomecampo
        input.type = "text"
        input.disabled = true
        input.value = valor

        result.appendChild(label)
        label.appendChild(input)
    }
    }

    
    function salvarArquivoTexto(conteudo, nomeArquivo) {
        const blob = new Blob([conteudo], { type: 'text/plain' });
      
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = nomeArquivo;
      
        link.style.display = 'none';
        document.body.appendChild(link);
      
        link.click();
      
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }
      
    
    
    
    
    
      

