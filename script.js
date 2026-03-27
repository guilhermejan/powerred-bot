require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

const SOURCE_CHANNEL_ID = '1354297191094554776';
const TARGET_CHANNEL_ID = '1483822397374206155';

client.on('clientReady', () => {
  console.log(`✅ Bot online como ${client.user.tag}`);

  // 👇 Agora sim funciona
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
      content: `@everyone\n📩 ${message.content || `Mensagem de ${message.author.tag}`}`,
      embeds: message.embeds,
      files: message.attachments.map(att => att.url),
      allowedMentions: { parse: ['everyone'] } // 🔥 importante
    });

  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
  }
});

client.login(TOKEN);