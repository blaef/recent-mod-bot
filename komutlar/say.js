const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")

let tag = ayarlar.tag


module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;

  
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag , message.author.avatarURL)
    .setColor(client.randomrenk())

 .setDescription(`\`•\` Toplam Sunucuda **${message.guild.memberCount}** Kişi Bulunmaktadır. \n \`•\` Sunucuda Aktif **${message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}** Kişi Bulunmaktadır.  \n \`•\` Ses Kanallarında **${count}** Kişi Bulunmaktadır.\n \`•\` Toplam Tagımızda **${message.guild.members.filter(m => m.user.username.includes(tag)).size}** Kişi Bulunmaktadır.`)

  message.channel.sendEmbed(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "say",
  usage: "say"
};