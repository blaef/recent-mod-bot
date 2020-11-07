const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
    //let channel = message.member.voiceChannel;
    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!member) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.tag , message.author.avatarURL).setDescription("**Bir Kullanıcı Etiketlmelisin veya id girmelisin! **").setColor('RANDOM'))
    if(!member.voiceChannel) return message.reply("bu kullanıcı sesli kanalda değil")

    let kanal = member.voiceChannel.name

    if(message.member.selfDeaf == true){
        let embed2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag , message.author.avatarURL)

        .setDescription(`${member} adlı kullanıcı **${kanal}** Kanalında, Kullaklığı Kapalı`)
    
    message.channel.send(embed2)}
        
        else {

            let embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag , message.author.avatarURL)
            .setDescription(`${member} adlı kullanıcı **${kanal}** Kanalında , Kullaklığı Açık`)
        
        message.channel.send(embed)}

    if(!member.voiceChannel) return message.reply("bu kullanıcı sesli kanalda değil")


}

exports.conf = {
  enabled: true,
  aliases: ['n'],
  permLevel: 0
};

exports.help = {
  name: 'seskontrol',
  usage: `topteyit`
}