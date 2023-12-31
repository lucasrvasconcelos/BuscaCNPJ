
const consultar = document.querySelector("button")
const input = document.querySelector("input[type='text']")
const result = document.querySelector("#result")
const buscador = document.querySelector(".buscador")
const error_element = document.querySelector("span.error")
let cnpj_anterior = ''
let data = []

let length_anterior = 0
let valor_anterior = ""

input.addEventListener("input",  () => format_cnpj(input))

consultar.addEventListener("click", () => {
    fetch_dados()
})

document.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        fetch_dados()
    }
})


function format_cnpj(input){

    let x = input.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    input.value = !x[2] ? x[1] : x[1] + '.' + x[2] + (x[3] ? '.' : '') + x[3] + (x[4] ? '/' : x[4]) + x[4] + (x[5] ? '-' + x[5] : '');

    let legth_cnpj = input.value.replace(/[^0-9]/g, '').length;

    legth_cnpj == 14 ? consultar.disabled = false : consultar.disabled = true

}

function fetch_dados(){

    consultar.disabled = true
    consultar.classList.add("load")
    result.textContent = ""
    error_element.textContent = ""

    const cnpj = input.value.replace(/[^0-9]/g, '');

    if(!cnpj.length == 14){
        return
    } 
    
    if(cnpj == cnpj_anterior){
        error_element.textContent = ""
        buscador.classList.add("open")
        create_elements(data)

        setTimeout(() => {
            consultar.disabled = false
            consultar.classList.remove("load")
        }, 1000)

        return
    }

    const url = `https://publica.cnpj.ws/cnpj/${cnpj}`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default' }
    
    
    fetch(url, options)
    .then((res)=> {
        if(res.ok){
            res.json()
            .then((data_fetch) => {
                data = [ data_fetch ]
                error_element.textContent = ""
                buscador.classList.add("open")
                cnpj_anterior = cnpj
                create_elements(data)
            })
            .catch((error) => {
                console.log("erro: " + error)
            })
        } else {
            if(res.status == 404){
                error_element.textContent = `CNPJ inválido. error:${res.status}`
            }else if(res.status == 429){
                error_element.textContent = `Aguarde para novas requisições. error:${res.status}`
            }else if(res.status == 400){
                error_element.textContent = `Cnpj não encontrado. error:${res.status}`
            }else{
                error_element.textContent = "Error: code " + res.status
            } 
        }
    })
    .catch((error)=>{
        console.log("Erro: " + error)
    })
    .finally(()=> {

        setTimeout(() => {
            consultar.disabled = false
            consultar.classList.remove("load")
        }, 1000)
    })

    
    
} 

let dados_array = []


function create_elements(data){

    let dados_array = []

    data.forEach(empresas => {

        const { estabelecimento, atualizado_em } = empresas

        const { razao_social } = empresas

        const { nome_fantasia,
                estado,
                cnpj,
                inscricoes_estaduais,
                ddd1,
                telefone1,
                telefone2,
                cep,
                bairro,
                tipo_logradouro,
                logradouro,
                numero,
                complemento,
                cidade } = estabelecimento


        dados_array.push([
                         ["Razão social", razao_social || "Não informado"],
                         ["Atualizado em:", atualizado_em || "Não informado"],
                         
                         ["Nome fantasia", nome_fantasia || "Não informado"], 
                         ["UF", `${estado.sigla} ${estado.ibge_id}` || "Não informado"],
                         ["CNPJ", cnpj || "Não informado" ],
                         ["Inscrição Estadual ", inscricoes_estaduais ],
                         ["Telefone principal", telefone1 ? ddd1 + telefone1 : false || "Não informado" ],
                         ["Telefone secundário", telefone2 ? ddd1 + telefone2 : false || "Não informado"],
                         ["Cep", cep || "Não informado"],
                         ["Bairro", bairro || "Não informado"],
                         ["Logradouro", `${tipo_logradouro} ${logradouro}` || "Não informado"],
                         ["Número", numero || "Não informado"],
                         ["Complemento", complemento || "Não informado"],
                         ["Cidade", cidade.nome || "Não informado"],
                         ["Ibge", cidade.ibge_id || "Não informado"],
                        ])

    });

    dados_array.forEach((elements) =>{

        let empresa = document.createElement('div')
        empresa.classList.add("empresa")

        elements.forEach((element, index) => {
            
            let dados = document.createElement('div')
            dados.classList.add("dados-item")

            let titulo = document.createElement('span')
            titulo.textContent = element[0]

            dados.appendChild(titulo)

            if(typeof element[1] == "object"){
                element[1].forEach((element) => {
                    let descricao = document.createElement('p')
                    descricao.textContent = element.inscricao_estadual
                    dados.appendChild(descricao)
                })

            } else {
                let descricao = document.createElement('p')
                descricao.textContent = element[1]
                dados.appendChild(descricao)
            }

            empresa.appendChild(dados)
            
        })

        result.appendChild(empresa)
    })

}

const close_menu = document.querySelector("#closemenu").addEventListener("click", closemenu)

document.addEventListener("keyup", (event) => {
    closemenu()
})

function closemenu(){

    if(buscador.classList.contains("open")){
        buscador.classList.remove("open")
    }
    
}



    
    
    
    
      

