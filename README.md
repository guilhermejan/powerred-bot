# Powerred Bot

Bot para Discord que encaminha mensagens, anexos e embeds de um canal para outro. Também permite mencionar um cargo específico quando uma nova mensagem é encaminhada.

## Funcionalidades

- Monitoramento de um canal de origem.
- Encaminhamento de texto, anexos e embeds.
- Notificação opcional de um cargo.
- Bloqueio de menções não autorizadas.
- Configuração por variáveis de ambiente.

## Tecnologias

- JavaScript
- Node.js
- discord.js
- dotenv

## Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/guilhermejan/powerred-bot.git
cd powerred-bot
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o bot

Crie um arquivo `.env` com base no `.env.example`:

```env
TOKEN=
SOURCE_CHANNEL_ID=
TARGET_CHANNEL_ID=
NOTIFY_ROLE_ID=
```

- `TOKEN`: token do bot criado no Discord Developer Portal.
- `SOURCE_CHANNEL_ID`: canal que será monitorado.
- `TARGET_CHANNEL_ID`: canal que receberá as mensagens.
- `NOTIFY_ROLE_ID`: cargo que será mencionado, se desejado.

### 4. Execute

```bash
npm start
```

O bot precisa ter acesso aos dois canais e permissão para ler e enviar mensagens.
