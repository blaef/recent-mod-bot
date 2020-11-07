const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");

  exports.run = async(client, message, args) => {
      if (!message.member.roles.has(ayarlar.kytsorumlu) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
      let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
if(!member) return message.channel.send("Sesten kimi atmak istersiniz veya id girerek işlem yapabilirsiniz.")
      message.mentions.members.forEach(async uye => {
      if (uye.voiceChannel && uye.voiceChannel.permissionsFor(message.author).has("MOVE_MEMBERS")) await uye.setVoiceChannel(null);
    });

let embed = new Discord.RichEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`${member} Başarı İle Ses Kanalından Çıkartıldı.`)
message.channel.send(embed)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kes'],
    permLevel: 0
  };
  
  exports.help = { 
    name: 'ses-at', 
    description: 'Sesten at.',
    usage: 'sesten-at',
    kategori: 'yetkili'
  };
  