REDE DE PROTEÇÃO — MVP

Conteúdo
- index.html: estrutura e conteúdo da interface.
- style.css: layout responsivo e paleta rosa pastel.
- script.js: catálogo local, pesquisa, filtros, menu móvel e saída rápida.

Como executar
1. Extraia os três arquivos para a mesma pasta.
2. Abra index.html em um navegador moderno.
3. Para desenvolvimento, recomenda-se usar a extensão Live Server do Visual Studio Code, embora o MVP funcione sem servidor porque não usa módulos nem chamadas fetch.

O que funciona no MVP
- Links de chamada para 180, 190 e contatos telefônicos locais.
- Atalho para WhatsApp e fontes institucionais.
- Pesquisa por nome, categoria e palavras-chave.
- Filtros por categoria e opção de limpar resultados.
- Menu responsivo, link para pular ao conteúdo e estados acessíveis.
- Avisos sobre privacidade, histórico e limites do protótipo.

Privacidade e segurança
- A aplicação não solicita cadastro nem recebe relatos.
- A pesquisa roda no navegador. O código não usa cookies, analytics, localStorage, sessionStorage ou geolocalização.
- A hospedagem pode manter logs técnicos; o aviso de privacidade definitivo depende da escolha e avaliação do provedor.
- A saída rápida navega para uma página neutra; NÃO apaga o histórico e NÃO garante invisibilidade.
- Links do WhatsApp abrem uma plataforma externa que segue suas próprias regras.

Atenção aos contatos
- As informações dos serviços locais foram encontradas em páginas institucionais públicas, mas não houve confirmação operacional direta.
- O CRAM e a Delegacia da Mulher ficam identificados como pendentes; confirmar telefone, atendimento, horário e procedimento antes de divulgar o site como serviço público.
- Não foi incluído endereço de casa abrigo.
- Em risco imediato, o site destaca o 190. O Ligue 180 é apresentado como canal de orientação, acolhimento e encaminhamento de denúncias.

Fontes institucionais consultadas
- Ministério das Mulheres — Ligue 180: https://www.gov.br/mulheres/pt-br/ligue180
- Prefeitura de Campina Grande — Coordenadoria da Mulher / CRAM: https://campinagrande.pb.gov.br/cartadeservico/coordenadoria-da-mulher/
- Coordenadoria da Mulher de Campina Grande: https://coordenadoriadamulher.campinagrande.pb.gov.br/

Escopo
Este é um MVP acadêmico informativo construído com HTML5, CSS3 e JavaScript puro. Antes de lançamento público, validar os contatos, revisar acessibilidade e testes, definir responsáveis e avaliar formalmente a hospedagem e o tratamento de dados à luz da LGPD.
