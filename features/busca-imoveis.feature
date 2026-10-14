# language: pt

Funcionalidade: Busca de imóveis
  Para encontrar imóveis no QuintoAndar
  Como uma pessoa que procura um imóvel
  Quero buscar por localização e abrir um imóvel encontrado

  Cenário: Buscar por Rio de Janeiro
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando pesquiso por "Rio de Janeiro"
    Então o campo de localização deve conter "Rio de Janeiro"

  Cenário: Abrir um imóvel na Estrada do Engenho D Água
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando pesquiso por "Estrada do engenho d agua"
    E seleciono a sugestão da Estrada do Engenho D Água no bairro Anil
    Então devo ver os resultados dessa localização
    E posso abrir um imóvel e ver seus detalhes

  Cenário: Buscar imóveis para alugar
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando escolho a opção de alugar
    Então vejo resultados de imóveis para alugar

  Cenário: Filtrar por apartamentos
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando seleciono o tipo de imóvel "Apartamento" e aplico os filtros
    Então o filtro "Apartamento" permanece aplicado aos resultados

  Cenário: Filtrar imóveis com pelo menos dois quartos
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando seleciono o filtro de pelo menos "2" quartos e aplico os filtros
    Então o filtro de pelo menos "2" quartos permanece aplicado aos resultados

  Cenário: Filtrar imóveis com vaga de garagem
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando seleciono o filtro de pelo menos "1" vaga e aplico os filtros
    Então o filtro de pelo menos "1" vaga permanece aplicado aos resultados

  Cenário: Filtrar imóveis com banheiro
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando seleciono o filtro de pelo menos "1" banheiro e aplico os filtros
    Então o filtro de pelo menos "1" banheiro permanece aplicado aos resultados

  Cenário: Limitar o valor máximo do imóvel
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando defino o valor máximo do imóvel como "500000" reais e aplico os filtros
    Então o valor máximo do imóvel de "500000" reais permanece aplicado aos resultados

  Cenário: Limitar condomínio e IPTU
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando defino o valor máximo de condomínio e IPTU como "1000" reais e aplico os filtros
    Então o valor máximo de condomínio e IPTU de "1000" reais permanece aplicado aos resultados

  Cenário: Filtrar pela área mínima
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando defino a área mínima como "60" metros quadrados e aplico os filtros
    Então a área mínima de "60" metros quadrados permanece aplicada aos resultados

  Cenário: Filtrar imóveis com piscina no condomínio
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando seleciono a comodidade "Piscina" no condomínio e aplico os filtros
    Então o filtro "Piscina" permanece aplicado aos resultados

  Cenário: Limpar os filtros selecionados
    Dado que estou na página de busca de imóveis do Rio de Janeiro
    Quando aplico o filtro de apartamentos
    E limpo os filtros selecionados
    Então o filtro de apartamentos deixa de estar aplicado aos resultados
