const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
exports.run = async(client, message, args, ops, member) => {
    const emoji = (client.emojis.find("name", "tiks"))
if(!message.member.roles.get(ayarlar.yetenekverici) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

   let vUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!vUser) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.tag, message.author.avatarURL).setDescription(`Kullanıcı Etiketlmelisin veya id`).setColor(client.randomrenk())).then(msg => {

    msg.delete(5000), message.delete(5000)

  });
  
   if(!vUser.roles.has(ayarlar.alone)){
    vUser.addRole(ayarlar.alone)
  let embed = new Discord.RichEmbed() 
  .setColor(client.randomrenk())
  .setAuthor(message.author.tag , message.author.avatarURL)
  .setDescription( `${vUser} adlı üyesine <@&${ayarlar.alone}> adlı rol verildi.${emoji}`)
  message.channel.send(embed).then(msg => msg.delete(10000));
   }

   if(vUser.roles.has(ayarlar.alone)){
        vUser.removeRole(ayarlar.alone)
        let to = new Discord.RichEmbed()
        .setColor(client.randomrenk())
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`${vUser} adlı üyesinden <@&${ayarlar.alone}> Adlı Rolü Alındı ${emoji}`)
        message.channel.send(to)
        
      
       
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: 'alone',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'erkek'
};