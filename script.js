require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.error("❌ TOKEN não definido");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const SOURCE_CHANNEL_ID = process.env.SOURCE_CHANNEL_ID;
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;
const NOTIFY_ROLE_ID = process.env.NOTIFY_ROLE_ID;

for (const [name, value] of Object.entries({ SOURCE_CHANNEL_ID, TARGET_CHANNEL_ID })) {
  if (!/^\d{17,20}$/.test(value || "")) {
    console.error(`Configure ${name} com um ID válido no ambiente privado.`);
    process.exit(1);
  }
}
if (NOTIFY_ROLE_ID && !/^\d{17,20}$/.test(NOTIFY_ROLE_ID)) {
  console.error("NOTIFY_ROLE_ID inválido.");
  process.exit(1);
}
const roleMention = NOTIFY_ROLE_ID ? `<@&${NOTIFY_ROLE_ID}> ` : "";

client.once('ready', () => {
  console.log("Bot conectado.");

  client.user.setPresence({
    status: "invisible"
  });
});

client.on('messageCreate', async (message) => {
  if (message.channel.id !== SOURCE_CHANNEL_ID) return;
  if (message.author.bot) return;

  try {
    const targetChannel = await client.channels.fetch(TARGET_CHANNEL_ID);
    if (!targetChannel) return;

    await targetChannel.send({
      content: `${roleMention}📩 **Nova mensagem**
Autor: ${message.author.tag}
Conteúdo: ${message.content || "sem texto"}`,
      embeds: message.embeds,
      files: message.attachments.map(att => att.url),
      allowedMentions: { parse: [], roles: NOTIFY_ROLE_ID ? [NOTIFY_ROLE_ID] : [] }
    });

  } catch (err) {
    console.error("Erro ao encaminhar mensagem. Verifique as permissões e a configuração do bot.");
  }
});

client.login(TOKEN).catch(() => {
  console.error("Falha de autenticação. Verifique o token no ambiente privado.");
  process.exitCode = 1;
});