const Discord = require('discord.js');
const moment = require("moment")

exports.run = async (client, message, args) => {
  let enAltYetkiliRolü = message.guild.roles.get("735250311958233099"); // en alttaki rol id
  let yetkililer = message.guild.members.filter(uye => uye.highestRole.position >= enAltYetkiliRolü.position);
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag , message.author.avatarURl)
  .setColor(client.randomrenk())
  .setDescription(`
  \`•\` Toplam Yetkili Sayısı: ${yetkililer.size}
  \`•\` Aktif Yetkili Sayısı: ${yetkililer.filter(uye => uye.presence.status !== "offline").size}
  \`•\` Sesli Kanalda Bulunanlar: ${yetkililer.filter(uye => uye.voiceChannel).size}
  \`•\` Sesli Kanalda Olmayan Yetkililer: ${yetkililer.filter(uye => !uye.voiceChannel).size}  
  
  `)

  .setFooter(`${moment(message.createdAt).format('Do MMMM YYYY HH:mm')}`)
  message.channel.send(embed);
};

exports.conf = {
  enabled: true, 
  guildOnly: true,
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'yetkili', 
  description: 'Yetkilileri sayar.', 
  usage: 'yetkilisay',
  kategori: 'yetkili'
};
