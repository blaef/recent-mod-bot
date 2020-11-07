const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  let rol = message.guild.roles.get('763439451186659369');
  if (!message.member.roles.has("763439451186659369")) return message.channel.send()
  if (message.member.voiceChannel) rol.members.filter(uye => uye.voiceChannel).forEach(uye => uye.setVoiceChannel(message.member.voiceChannel.id))
  let embed = new Discord.RichEmbed()
  .setColor(client.randomrenk())
  .setAuthor(message.author.tag , message.author.avatarURL)
  .setDescription(`\`•\` Yetkili Sesteki Sayısı: ${rol.members.filter(b => b.voiceChannel).size} \n\`•\` Yetkili Sayısı: ${rol.members.filter(d => !d.bot).size} \n \`•\` Çekilen Yetkili Sayısı: **${rol.members.filter(c => !c.voiceChannel).map(x => x.user.tag).join('')}**`)
  message.channel.send(embed)
  
};
//\`•\` Çekilen Yetkili Sayısı: ${rol.members.filter(c => !c.voiceChannel).map(x => x.user.tag).join('\n')}
  //${rol.members.filter(c => !c.voiceChannel).map(x => x.user.tag).join('\n')}
  //${rol.members.filter(b => b.voiceChannel).size}
  //${rol.members.filter(d => !d.bot).size}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'yetkilicek', 
  description: 'Yetkilileri Çeker',
  usage: 'yetkilicek',
  kategori: 'yetkili'
};
