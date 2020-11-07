
const Discord = require('discord.js');
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

    if (!message.member.roles.has(ayarlar.muteci) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

let role = message.guild.roles.get(ayarlar.muterol) //Muted ID

let user = message.mentions.members.first() || message.guild.members.get(args[0])
if(!user) return message.channel.send(`Lütfen, susturacağım kullanıcıyı belirtin.`)

if(user.roles.has(role.id)) return message.channel.send(`Kullanıcı zaten susturulduğu için tekrar susturamam.`)

let time = args[1]
if(!time || !ms(time)) return message.channel.send(`Lütfen, geçerli bir süre belirtin.`)

if(ms(time) > 2592000000) return message.channel.send(`Bir kullanıcıyı en fazla 30 gün susturabilirsiniz.`)

let reason = args.slice(2).join(' ') || "Sebep Belirtilmemiş."

let açılma_zamanı = Date.now() + ms(time)

let muteid = await db.fetch('id')
message.channel.send(`
**${user.user}** Adlı Kullanıcı Ses Kanallarından Uzaklaştırıldı. (\`#${muteid-(-1)}\`)
 `)
 require('quick.db').push(`${message.guild.id}.${message.mentions.users.first().id}.sicil`, { tip: "Mute", sebep: args.slice(2).join(' '), yetkili: message.author.id, tarih: require('moment')().format()})
 db.add('id',1)
 let log = message.guild.channels.find(c=> c.id === ayarlar.mutelog)

user.addRole(role.id);
db.set(`${message.guild.id}.${user.id}.mute`, reason)


let embed1 = new Discord.RichEmbed()
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`**${user.user}** isimli kullanıcı, ${message.author} tarafından başarıyla **${time}** boyunca metin kanalında susturuldu. (\`#${muteid-(-1)}\`)

\`•\` **Susturulma Zamanı:** ${moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Sebep:** ${reason}

`)
log.send(embed1)
setTimeout(() => {
if(!user.roles.has(role.id)) return

user.removeRole(role.id);
db.delete(`${message.guild.id}.${user.id}.mute`)

let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`**${user.user}**Adlı Kullanıcı ses kanallarından cezası Kaldırıldı. (\`#${muteid-(-1)}\`)

\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Atılış Sebepi:** ${reason}

`)
log.send(embed)

}, ms(time));


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tempmute','temp-mute']
};

exports.help = {
  name: 'mute'
};


