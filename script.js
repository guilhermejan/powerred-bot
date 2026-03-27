require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

if (!TOKEN) {
  console.error("❌ TOKEN não definido");
  process.exit(1);
}

const SOURCE_CHANNEL_ID = '1354297191094554776';
const TARGET_CHANNEL_ID = '1483822397374206155';

client.on('clientReady', () => {
  console.log(`✅ Bot online como ${client.user.tag}`);

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
      content: `<@&1487142860317786112> 📩 **Nova mensagem**
Autor: ${message.author.tag}
Conteúdo: ${message.content || "sem texto"}`,
      embeds: message.embeds,
      files: message.attachments.map(att => att.url),
      allowedMentions: { parse: ['roles'] }
    });

  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
  }
});

client.login(TOKEN);