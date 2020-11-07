const Discord = require('discord.js');
const moment = require("moment")
const ayarlar = require("../ayarlar.json")
exports.run = async(client, message, args) => {


    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(!user) return message.reply("kayıtsıza atmak istediğini kişi etiketle veya idsini gir")

let embed = new Discord.RichEmbed()
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`${user} adlı kullanıcı başarı ile kayıtsıza atıldı!`)

.setFooter(`${moment(message.createdAt).format('Do MMMM YYYY HH:mm')}`)
message.channel.send(embed)
console.log(`${moment(message.createdAt).format('Do MMMM YYYY HH:mm')} Tarih: ${user} adlı kişi kayıtsıza atıldı!`)

user.addRole(ayarlar.kayıtsız)
user.removeRole(ayarlar.erkekrol1)
user.removeRole(ayarlar.erkekrol2)
user.removeRole(ayarlar.kadın1)
user.removeRole(ayarlar.kadın2)
user.removeRole(ayarlar.tehlikelihesap)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["at"],
  permLevel: 0,
};

exports.help = {
  name: 'kayıtsızat',
  description: 'Sunucudan ban kaldırmanızı sağlar.',
  usage: 'unban id/toplu',
};
