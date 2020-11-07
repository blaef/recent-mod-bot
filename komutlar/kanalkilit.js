const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
moment.locale('tr')

exports.run = async (codeAcademy, message, args) => {
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("Bu komutu kullanabilmek için **Kanalları Yönet** iznine sahip olmalısın!");
  let yashinu = message.guild.roles.find(a => a.name === "@everyone");
  if(message.channel.permissionsFor(yashinu).has('SEND_MESSAGES')) {
    message.channel.overwritePermissions(yashinu, {
      SEND_MESSAGES: false,
    });
    let toti = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag , message.author.avatarURL)
    .setDescription(`${message.author} Kanal Başarı İle Kilitlendi! \n\n\`•\`  **Kilitleme Tarihi: **${moment(message.createdAt).format('Do MMMM YYYY HH:mm')}`)
    .setFooter(`${ayarlar.footer}`)

message.channel.send(toti)

  } else {
    message.channel.overwritePermissions(yashinu, {
      SEND_MESSAGES: null,
    });
    let totis = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag , message.author.avatarURL)
    .setDescription(`${message.author} Kanal Başarı İle Açıldı!`)
.setFooter(`${ayarlar.footer}`)

message.channel.send(totis)  

};

};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['lock'],
  permLevel: 0
};

exports.help = {
  name: 'kilit',
  description: 'Kanalı kilitler.',
  usage: 'kilit',
  kategori: 'yetkili'
};

