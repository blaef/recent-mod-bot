const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  return }
  

if (!message.member.roles.has(ayarlar.cekme) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

  if(!message.member.voiceChannel) return message.channel.send('Bir Ses Kanalına Girip Yapınız.');
  const kanal = message.member.voiceChannel
const kisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kisi) return message.channel.send("Bir Kişiyi Etiketmelesiniz.").then(msg => {

    msg.delete(5000), message.delete(5000)

  });
const filter = (reaction, user) => {
    return ['✔️', '❌'].includes(reaction.emoji.name) && user.id === kisi.id; 
};
message.channel.send(`${kisi}`)
if(!kisi.voiceChannel) return message.channel.send(new Discord.RichEmbed().setDescription('Çekmek istediğiniz üye bir ses kanalında değil.').setColor('RANDOM'))
  message.channel.send(new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
.setDescription(`<@${kisi.id}>, <@${message.author.id}> sizi yanınıza çekme isteği gönderdi.`)
.setColor('RANDOM'))
.then(m=>m.react('✔️').then(a=>m.react('❌')).then(s=>
  m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first()

        if (reaction.emoji.name === '✔️') {
            message.channel.send(new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(`${message.author.tag}`, message.author.avatarURL)
          .setDescription('isteğiniz kabul edildi. '));
kisi.setVoiceChannel(`${kanal.id}`)
        } else {
            message.channel.send(new Discord.RichEmbed()
          .setAuthor(`${message.author.tag}`, message.author.avatarURL)
          .setColor('RANDOM')
          .setDescription('isteğininiz reddedildi. '))
        }
    })
    ))
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['çek'],
  permLevel: 0
}

exports.help = {
  name: 'cek',
}