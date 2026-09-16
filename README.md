# Powerred · Automação para Discord

Bot em Node.js e discord.js para encaminhamento de mensagens entre canais autorizados. Projeto desenvolvido com apoio de IA.

## Configuração

Copie `.env.example` para `.env` e preencha apenas localmente:

- `TOKEN`: token novo do bot.
- `SOURCE_CHANNEL_ID`: canal de origem.
- `TARGET_CHANNEL_ID`: canal de destino.
- `NOTIFY_ROLE_ID`: cargo opcional que pode receber menções.

Instale as dependências e execute `node script.js`. Os IDs são validados antes da conexão. Menções vindas do texto encaminhado não notificam usuários ou outros cargos; somente o cargo configurado é permitido.

## Credencial antiga exposta

**Um token foi identificado em um arquivo .env do histórico Git. Redefina o token no Discord Developer Portal antes de usar o bot novamente e atualize os ambientes de execução.** Não basta apagar o arquivo atual ou tornar o repositório privado. Commits antigos e cópias existentes podem continuar contendo a credencial.

A versão atual não contém os IDs originais nem token literal. O histórico não foi reescrito nesta alteração. Use somente com autorização e ciência dos participantes sobre o encaminhamento de mensagens.
