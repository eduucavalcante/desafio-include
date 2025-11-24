# CONTRIBUTING

Para manter o fluxo organizado durante o desenvolvimento, siga estas orientações simples:

## 📌 Branches
- A única branch protegida é a **main**.
- Para cada funcionalidade, correção ou melhoria, **crie uma branch própria**.
  - Use nomes descritivos para as branches, como:  
    - `feature/nova-funcionalidade`
    - `fix/ajuste-api`
    - `refactor/reorganizar-codigo`

## 🛠️ Como contribuir
1. **Clone** o repositório.
```bash
git clone https://github.com/eduucavalcante/desafio-include.git
```

2. **Crie uma nova branch** para a sua tarefa:  
   ```bash
   git checkout -b feat/sua-feature
   ```

3. Faça commits semânticos, claros e objetivos.
    **Exemplos:**
    - Adicionar novas funcionalidades:
    `feat: adicionar form de contato`
    - Correção erros:
    `fix: corrigir bug na conexão com banco de dados`
    - Documentação:
    `docs: editar README`

4. **Envie sua branch** para o GitHub:  
   `git push origin feat/sua-feature`

5. Abra um **Pull Request (PR)** para a branch **main** pelo GitHub.

## 🔍 Revisão de código
- Antes do merge, todos os PRs devem passar por revisão.
- O revisor principal validará:
  - Funcionamento da feature
  - Clareza do código
  - Organização dos arquivos (principalmente separação entre back e front)
  - Possíveis conflitos com outras branches

## ⚠️ Sobre conflitos
- Evite editar arquivos que não fazem parte da sua área (ex.: devs do front não mexem no back e vice-versa), exceto quando combinado.
- Se aparecer conflito no PR, aguarde orientação ou converse com o responsável antes de tentar resolver.

## ✔️ Merge
- O merge na **main** será feito somente após revisão e aprovação.
- Não faça merge local — tudo será feito via Pull Request no GitHub.

---

Qualquer dúvida, só chamar no grupo do time!
