const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
	
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
 
  return message.author.send('Bot Komutlarını Özelden Kullanamazsınız'); }

if(!message.member.roles.get(ayarlar.ekiprol) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  if(!message.member.voiceChannel) return message.channel.send('Sesli Kanalda Değilsin.');
  
const kisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kisi) return message.channel.send(new Discord.RichEmbed().setColor('black').setDescription('**Kullanıcı etiketi veya ID sini girmelisiniz**'))
const filter = (reaction, user) => {
    return ['✔️', '❌'].includes(reaction.emoji.name) && user.id === kisi.id;
};
message.channel.send(`${kisi}`)
if(!kisi.voiceChannel) return message.channel.send(new Discord.RichEmbed().setAuthor(message.author.tag , message.author.avatarURL).setDescription('Yanına gitmek istediğin kişi sesli kanalda değil!').setColor('black'))
  message.channel.send(new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
.setDescription(`<@${kisi.id}>, <@${message.author.id}> Sizin Odanıza Gelme isteği gönderdi.`)
.setColor('RANDOM'))
.then(m=>m.react('✔️').then(a=>m.react('❌')).then(s=>
  m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first()

        if (reaction.emoji.name === '✔️') {
            message.channel.send(new Discord.RichEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('RANDOM').setDescription('<@'+message.author.id+'> isteğin kabul edildi. '));
      message.member.setVoiceChannel(kisi.voiceChannel.id)
        } else {
            message.channel.send(new Discord.RichEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL).setColor('black').setDescription('<@'+message.author.id+'> isteğin reddedildi. '))
        }
    })
    ))
  //✔️ ❌
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'git',
  description: "xD",
  usage: 'git <@kisi>'
}