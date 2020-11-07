const Discord = require("discord.js");
const ms = require('ms')
const data = require('quick.db')
const moment = require('moment')
const ayarlar = require('../ayarlar.json')

moment.locale('tr')

exports.run = async (client, message, args) => {
    if (!message.member.roles.has(ayarlar.muteci) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

let user = message.mentions.members.first() || message.guild.members.get(args[0])
if(!user) return message.channel.send(`Lütfen, susturacağım kullanıcıyı belirtin.`)

if(!user.voiceChannel) return message.channel.send(`Kullanıcı ses kanalında bulunmadığı için susturamam.`)

if(user.serverMute === true) return message.channel.send(`Kullanıcı zaten susturulduğu için tekrar susturamam.`)

let time = args[1]
if(!time || !ms(time)) return message.channel.send(`Lütfen, geçerli bir süre belirtin.`)

if(ms(time) > 2592000000) return message.channel.send(`Bir kullanıcıyı en fazla 30 gün susturabilirsiniz.`)

let reason = args.slice(2).join(' ') || "Sebep Belirtilmemiş."

let açılma_zamanı = Date.now() + ms(time)

let muteid = await data.fetch('id')

message.channel.send(`
**${user.user}** Adlı Kullanıcı Ses Kanallarından Uzaklaştırıldı. (\`#${muteid-(-1)}\`)
 `)
 require('quick.db').push(`${message.guild.id}.${message.mentions.users.first().id}.sicil`, { tip: "Voice Mute", sebep: args.slice(2).join(' '), yetkili: message.author.id, tarih: require('moment')().format()})


let log_channel = message.guild.channels.find('name', 'mute-bilgi');
data.add('id',1)

let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`**${user.user}** isimli kullanıcı, ${message.author} tarafından başarıyla **${time}** boyunca ses kanalında susturuldu. (\`#${muteid-(-1)}\`)

\`•\` **Susturulma Zamanı:** ${moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Sebep:** ${reason}

`)
log_channel.send(embed)
console.log(`${log_channel} Kanal'a Mesaj attım`) 

user.setMute(true);

setTimeout(() => {
if(user.serverMute === false) return 

user.setMute(false);

let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`**${user.user}**Adlı Kullanıcı ses kanallarından cezası Kaldırıldı. (\`#${muteid-(-1)}\`)

\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Atılış Sebepi:** ${reason}

`)
log_channel.send(embed)

}, ms(time));

}
exports.conf = {
  enabled: true,
  aliases: ['voicemute', 'sessustur', 'ses-sustur'],
  permLevel: 0
};

exports.help = {
  name: 'voice-mute',
  description: 'Belirlenen kullanıcı, ses kanalında susturulur.',
  usage: `voice-mute <@User> <Time> <Reason>`,
}