const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format');

exports.run = async(client, message, args) => {
  let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
  if (!mesaj) return message.reply('Kanalda silinmiş bir mesaj yok!').then(x => x.delete(5000));
  let mesajYazari = await client.fetchUser(mesaj.yazar);
  let embed = new Discord.RichEmbed().setColor(client.randomrenk()).setDescription(`\`Mesajın Yazılma Tarihi:\` ${moment.duration(Date.now() - mesaj.yazilmaTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce\n\`Mesajın Silinme Tarihi:\` ${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce ${mesaj.dosya ? "\n**Atılan mesaj dosya içeriyor**" : ""}`).setAuthor(mesajYazari.tag, mesajYazari.avatarURL).setFooter(message.author.tag + " tarafından istendi!", message.author.avatarURL);
  if (mesaj.icerik) embed.addField('Mesajın İçeriği:', mesaj.icerik);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'snipe', 
  description: 'Kanalda silinmiş son mesajı gösterir.',
  usage: 'snipe',
  kategori: 'kullanıcı'
};

