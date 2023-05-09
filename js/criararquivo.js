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
CNPJ=14377073000101
IE=065832396
RazaoSocial=JOSE CRISTIANO SANTOS DE LIMA
Fantasia=CRT SISTEMAS
Fone=8596955644
CEP=60441685
Logradouro=RUA AMAZONAS
Numero=1567
Complemento=ull
Bairro=BELA VISTA
CodCidade=2304400
Cidade=Fortaleza
UF=CE
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

  const nomeArquivo = 'saida.txt';
  
  salvarArquivoTexto(conteudo, nomeArquivo);
  