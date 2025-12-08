## Documentação Swagger da API

URL da API hospedada na URL: https://valej-api.onrender.com
(rodar projeto localmente em caso de falha na API)

**Uso da documentação:**

1. Abrir index.html no VSCode.
2. Rodar index.html com a extensão Live Server (essencial).
3. Garantir conexão com internet (uso de CDN).

A documentação:

- mapeia os grupos de rotas (Usuários, Serviços, etc.);
- lista os endpoints de cada grupo (todos no endpoint base /api/v1/);
- fornece exemplo de dados que devem ser passados no body de rotas POST pelo front-end/Postman;
- lista possíveis HTTP status codes.

**Atualizar documentação:**

Se necessário, navegue para /api/schema/ no navegador para atualizar o arquivo "Vale J API.yaml" que contém toda a documentação.

## Resumo geral das respostas da API:

- **200 Ok:** qualquer operação bem-sucedida.
- **201 Created:** sucesso de rotas POST.
- **204 No Content:** sucesso de rotas DELETE.
- **400 Bad Request:** dados inválidos ou campo obrigatório não preenchido (POST/PUT).
- **401 Unauthorized:** usuário não autenticado ou senha incorreta.
- **403 Forbidden:** usuário não possui permissão para acessar o recurso.
- **404 Not Found:** registro não encontrado, nenhum registro cadastrado ou rota inexistente.
- **500 Internal Server Error:** erro interno no servidor.