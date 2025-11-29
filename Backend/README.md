# Backend — API em Django

Este diretório contém a API utilizada pelo site institucional.  
Ela fornece endpoints para dados dinâmicos que serão consumidos pelo site e também será alimentada por um dashboard administrativo.

---

# 🚀 Como rodar o projeto Backend

Siga os passos abaixo para configurar seu ambiente local.

_Obs.: Python e MySQL devem estar instalados na máquina._

---

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/eduucavalcante/desafio-include.git
cd desafio-include/Backend
```

---

## 2️⃣ Criar e ativar o ambiente virtual

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3️⃣ Instalar dependências

```bash
pip install -r requirements.txt
```

> Se o arquivo ainda não existir, gere manualmente após instalar os pacotes:
>
> ```bash
> pip freeze > requirements.txt
> ```

---

## 4️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta **Backend/**:

```dotenv
# Configurações para MySQL (atualizar quando migrar)
MYSQL_DATABASE=nome_do_banco
MYSQL_USER=root
MYSQL_PASSWORD=senha
MYSQL_HOST=localhost
MYSQL_PORT=3306

# Seeding admin
ADMIN_NAME=Administrador
ADMIN_EMAIL=email@exemplo.com
ADMIN_PASSWORD=senha
ADMIN_ROLE=DIRETORIA
ADMIN_PERMISSION=ADMIN

# Setup para armazenamento de imagens
CLOUDINARY_CLOUD_NAME=nome_da_cloud
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
```

> As credenciais **nunca** devem ser commitadas — por isso o arquivo `.env` está no `.gitignore`.

---

## 5️⃣ Rodar migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 6️⃣ Iniciar o servidor de desenvolvimento

```bash
python manage.py runserver
```

A API estará disponível em:

👉 [http://localhost:8000/](http://localhost:8000/)

---

# 📦 Estrutura do Backend

```txt
Backend/
├── core/              # Projeto Django (settings, urls, wsgi)
├── accounts/          # App com models e views de usuários
├── services/          # App com models e views de serviços
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md
```

---

# 🤝 Contribuindo

* Use **commits semânticos** (`feat:`, `fix:`, `chore:`, `refactor:`, etc.)
* Crie branches por feature:

  * `feature/nome-da-feature`
* Abra PRs pequenos e bem descritos
* Siga o padrão definido em `CONTRIBUTING.md` na raiz do repositório
