require('dotenv').config(); // .env dosyasını yüklemek için dotenv kullanıyoruz
const { Client, Intents } = require('discord.js-selfbot-v13');
const express = require('express');
const fetch = require('node-fetch'); // fetch kullanıyoruz
const app = express();

// .env dosyasındaki port ve URL bilgisini al
const PORT = process.env.PORT || 3000;  // Eğer PORT belirtilmemişse 3000'e düşer
const URL_TO_CHECK = process.env.UPTIME_URL; // Sürekli istek atılacak URL .env dosyasından alınıyor

const client = new Client({
  intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.MESSAGE_CONTENT]
});

// Mesajı gönderen kullanıcıyı saklamak için bir set kullanacağız
const sentMessages = new Set();

// 'ready' olayını düzgün şekilde dinleme
client.on('ready', () => {
  console.log(`Giriş yapıldı: ${client.user.tag}`);
});

// Mesajları kontrol et
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Bot mesajlarını yok say

  // Eğer mesaj bir DM'den geldiyse
  if (message.channel.type === 'DM') {
    // Kendi mesajını algılamamak için kontrol
    if (message.author.id === '506038564866228243') {
      return; // Eğer bu mesaj daha önce gönderildiyse, bir şey yapma
    }

    await message.reply("Çok Çok uzun bir süre afkyım.\n\ndiscord.gg/tokumei geri gelecek elbet...");
    sentMessages.add(message.content); // Mesaj içeriğini kaydet

  } else {
    // Eğer mesaj bir sunucudan geldiyse ve belirtilen kullanıcı etiketlendiyse
    if (message.mentions.users.has('506038564866228243')) {
      await message.reply("Çok Çok uzun bir süre afkyım.\nTokumei geri gelecek elbet...");
    }
  }
});

// URL'ye sürekli istek atmak için fonksiyon
const sendUptimeRequest = async () => {
  try {
    const response = await fetch(URL_TO_CHECK);
    if (response.ok) {
      console.log(`Başarılı istek: ${URL_TO_CHECK} - ${new Date()}`);
    } else {
      console.log(`Hata: ${response.status} - ${URL_TO_CHECK}`);
    }
  } catch (error) {
    console.log(`İstek hatası: ${error.message}`);
  }
};

// URL'ye istek atmayı başlat
setInterval(sendUptimeRequest, 300000); // Her 5 dakikada bir istek at

// Express sunucusunu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

// Botu giriş yapmaya başlat
client.login(process.env.TOKEN); // Bot token'ınızı .env dosyasından alır
