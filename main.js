const { Client, Intents } = require('discord.js-selfbot-v13');
const { RichPresence } = require('discord.js-selfbot-v13');
const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');

const client = new Client({
  intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.MESSAGE_CONTENT]
});

const app = express();
const port = process.env.PORT || 3000;

global.startTime = Date.now(); // Başlangıç zamanını global olarak kaydediyoruz

// Presence güncelleme fonksiyonu
function reloadPresence(client) {
  const activity = new RichPresence()
    .setApplicationId("1278452187994914827")
    .setType("PLAYING")
    .setName(".gg/tokumei")
    .setDetails("discord.gg/tokumei 🎣")
    .setState("Bir Süre Yokum")
    .setStartTimestamp(global.startTime)
    .setAssetsLargeImage("https://media.discordapp.net/attachments/1190956309449809940/1324016769433862154/DALLE_2024-12-24_05.07.33_-_A_sleek_and_minimalist_design_for_a_Discord_profile_banner_featuring_the_text_TOKUMEI._The_theme_is_white_and_modern_with_subtle_gradients_of_light.jpg?ex=67769e34&is=67754cb4&hm=a25c51d0364fc73c49682a5171d81f3d95a99bd24879ad55bc62749a525bc3d7&=&width=761&height=761")
    .setAssetsLargeText("Tokumei")
    .addButton('Sunucumuz', "https://www.discord.gg/tokumei");
  client.user.setActivity(activity.toJSON());
  client.user.setStatus("idle");
}

// 'ready' olayını düzgün şekilde dinleme
client.on('ready', () => {
  console.log(`Giriş yapıldı: ${client.user.tag}`);
  reloadPresence(client); // Bot giriş yaptıktan sonra Presence ayarla
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Bot mesajlarını yok say

  // Eğer mesaj bir DM'den geldiyse
  if (message.channel.type === 'DM') {
    if (message.author.id === '506038564866228243') return; // Kendi mesajlarını algılama
    await message.reply("Çok Çok uzun bir süre afkyım.\n\ndiscord.gg/tokumei geri gelecek elbet...");
  } else {
    // Eğer mesaj bir sunucudan geldiyse ve belirtilen kullanıcı etiketlendiyse
    if (message.mentions.users.has('506038564866228243')) {
      await message.reply("Çok Çok uzun bir süre afkyım.\nTokumei geri gelecek elbet...");
    }
  }
});

// Uptime sistemi
app.get('/', (req, res) => {
  res.send("Bot aktif! 🚀");
});

setInterval(async () => {
  try {
    const url = process.env.LNK; // .env dosyasından URL al
    if (!url) {
      console.error("LNK değişkeni bulunamadı. Lütfen .env dosyasını kontrol edin.");
      return;
    }
    await fetch(url);
    console.log("Uptime için istek gönderildi:", url);
  } catch (error) {
    console.error("Uptime isteği gönderilirken bir hata oluştu:", error);
  }
}, 25000); // Her 25 saniyede bir istekte bulunur

app.listen(port, () => {
  console.log(`Web server ${port} portunda çalışıyor.`);
});

client.login(process.env.TOKEN);
