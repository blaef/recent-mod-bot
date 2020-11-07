const Discord = require('discord.js');
const db = require("quick.db")
const moment = require("moment")
const ayarlar = require('../ayarlar.json')
exports.run = async function (client, message, args) {

    if (!message.member.roles.has(ayarlar.jailci) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.tag ,message.author.avatarURL).setDescription('Kullanıcıyı Etiketle Veya id İle İşlem Yap.').setColor("RANDOM"));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  let süre = args[1]
let jailid = await db.fetch('id')
 let reason = args.slice(1).join(" ")
      if(!reason) return message.channel.send("Lütfen Bir Sebep Yazınız.").then(m => m.delete(5000));
         // message.react("EMOJİ ID");
  message.guild.members.get(member.id).roles.forEach(r => {
message.guild.members.get(member.id).removeRole(r) 

member.addRole(ayarlar.ceza)
})

db.set(`jail_${message.guild.id}_${kullanıcı.id}` , 'var')     
db.add('id',1)
const kanal = message.guild.channels.find(c => c.id == ayarlar.jlog) 
    const embed1 = new Discord.RichEmbed() 
    .setAuthor(message.author.tag , message.author.avatarURL)
    .setDescription(`${kullanıcı} üyesine <@&${ayarlar.ceza}> rolü ${message.author} tarafından Verildi. Sebep: ${reason}`)
    .setFooter(`${moment(message.createdAt).format('Do MMMM YYYY HH:mm')}`)
    .setColor("RANDOM")
    require('quick.db').push(`${message.guild.id}.${message.mentions.users.first().id}.sicil`, { tip: "Jail", sebep: args.slice(1).join(' '), yetkili: message.author.id, tarih: require('moment')().format()})




    //#${jailid-(-1)}
  let embed = new Discord.RichEmbed() 
  .setColor("RANDOM")
  .setAuthor(message.author.tag , message.author.avatarURL)
 .setDescription(`${kullanıcı} üyesine ${message.author} Tarafından <@&${ayarlar.ceza}> rolü Verildi.`)
 .setImage('https://cdn.glitch.com/6f5bb25b-c11b-4003-8a39-69490341df18%2FPtema3.gif')
 return message.channel.send(embed).then(kanal.send(embed1)).then(m => m.delete(5000000));


}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cezalı","cezalandır"],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebe'
}