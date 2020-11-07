const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
exports.run = async(client, message, args) => {

    let uye = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!uye) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.tag , message.author.avatarURL).setDescription(`Geçerli Bir Üye Bulmalısın!`))
let isim = args.slice(1).join(" | ")
if(!isim) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.tag , message.author.avatarURL).setDescription(`Geçerli Bir isim girmelisin!`))
let embed = new Discord.RichEmbed()
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`${uye} Kullanıcı adı başarı ile değiştirildi.`)
  message.channel.send(embed)
  uye.setNickname(`${ayarlar.tag} ${isim}`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nick"],
  permLevel: 0
};

exports.help = { 
  name: 'isim', 
  description: 'Yetkilileri Çeker',
  usage: 'yetkilicek',
  kategori: 'yetkili'
};
