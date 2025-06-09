# COMENTARIOS

### Comentários sobre o desenvolvimento

- O desafio solicitava a implementação de paginação. No entanto, ao realizar buscas com termos específicos se eu controlar do lado do front o match eu nao teria a paginacao retornada pela API do TMDB que ja faz buscas por termos semelhantes trazendo entao mais conteudo na quantidade de resultados retornados pela API tendo entao múltiplas páginas.

- A API do TMDB (a escolhida para o desafio) já possui uma inteligência interna para realizar o _match_ com os termos buscados. Com base nisso, optei por utilizar os dados retornados diretamente e aplicar a paginação conforme a estrutura já fornecida pela própria API, ao invés de controlar esse comportamento no frontend.

- O desafio sugeria o uso de `sessionStorage` para persistência de dados, mas optei por utilizar `localStorage`, pois ele possui escopo mais amplo e permite manter os dados mesmo após atualizar ou fechar a aba do navegador.

- Poderia ter implementado _Git hooks_ para automatizar etapas do processo de commit e _deploy_, garantindo mais consistência e qualidade no fluxo de desenvolvimento.

- Também considerei que eu poderia utilizar componentes primitivos para melhorar a acessibilidade e produtividade, mas preferi desenvolver algumas funcionalidades do zero para aprofundar meu entendimento técnico e estar preparado para explicar essas escolhas em uma eventual conversa ou entrevista.

- Com mais tempo disponível, acredito que teria conseguido refinar ainda mais o código, aplicando testes unitários e de integração com ferramentas como Vitest ou Jest em conjunto com React Testing Library.
