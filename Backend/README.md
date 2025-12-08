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
ENV=prod    # Trocar para dev em caso de rodar o server localmente

# Banco de dados de desenvolvimento (atualizar de acordo com seu banco local)
DB_NAME_DEV=valej
DB_USER_DEV=root
DB_PASSWORD_DEV=
DB_HOST_DEV=localhost
DB_PORT_DEV=3306

# Banco de dados em produção (solicitar o env para a equipe)
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

# Seeding de usuário admin
ADMIN_NAME=Administrador
ADMIN_EMAIL=email
ADMIN_PASSWORD=senha
ADMIN_ROLE=presex
ADMIN_PERMISSION=admin

# Storage de imagens (solicitar o env para a equipe)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Chave secreta do Django (solicitar o env para a equipe)
DJANGO_SECRET_KEY=chave

# Certificado para conexão com o banco em produção (solicitar o env para a equipe)
DB_CA=
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
├── Backend
│   ├── about           # App com models e views de história e sobre EJ
│   ├── accounts        # App com models e views de usuários
│   ├── advantages      # App de diferenciais
│   ├── authentication  # App com lógica de login via JWT
│   ├── contacts        # App de contatos
│   ├── core            # Projeto Django (settings, urls, wsgi)
│   ├── culture         # App de cultura (missão, visão, valores)
│   ├── gallery         # App de galeria de eventos e reconhecimentos
│   ├── projects        # App de projetos e portfólio de imagens
│   ├── services        # App de serviços
│   ├── team            # App de gestão dos membros da equipe
│   ├── .gitignore
│   ├── Procfile
│   ├── README.md
│   ├── build.sh
│   ├── manage.py
│   └── requirements.txt
```

---

# 🤝 Contribuindo

* Use **commits semânticos** (`feat:`, `fix:`, `chore:`, `refactor:`, etc.)
* Crie branches por feature:

  * `feature/nome-da-feature`
* Abra PRs pequenos e bem descritos
* Siga o padrão definido em `CONTRIBUTING.md` na raiz do repositório
