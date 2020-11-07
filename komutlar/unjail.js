const Discord = require('discord.js');
const db = require("quick.db")
const moment = require("moment")
const ayarlar = require('../ayarlar.json')
exports.run = async function (client, message, args) {

    if (!message.member.roles.has(ayarlar.jailci) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor(message.author.tag ,message.author.avatarURL).setDescription('Kullanıcıyı Etiketle Veya id İle İşlem Yap.').setColor("RANDOM"));

  let member = message.guild.member(kullanıcı)
let jailid = await db.fetch('id')
 let reason = args.slice(1).join(" ")
      if(!reason) return message.channel.send("Lütfen Bir Sebep Yazınız.").then(m => m.delete(5000));

      const kanal = message.guild.channels.find(c => c.id == ayarlar.jlog) 
    
let embed = new Discord.RichEmbed()
.setColor("WHİTE")
.setAuthor(message.author.tag, message.author.avatarURL)
.setDescription(`**${kullanıcı} adlı üyenin jaili Açıldı Sebep: ${reason} (#${jailid-(-1)})**`)
.setFooter(`${moment(message.createdAt).format('Do MMMM YYYY HH:mm')}`)
message.channel.send(embed)


let log = new Discord.RichEmbed()
.setAuthor(message.author.tag , message.author.avatarURL)
.setDescription(`**${kullanıcı} adlı üyesi <@&${ayarlar.ceza}> Rolünü Başarı İle Alındı \n Alan Yetkili: ${message.author}\n Sebep: ${reason}**`)
kanal.send(log)
console.log(`${kullanıcı} üyesinin Tarafından ${message.author.tag} jaili açıldı!`)




kullanıcı.removeRole(ayarlar.ceza)
kullanıcı.addRole(ayarlar.kayıtsız)
kullanıcı.removeRole(ayarlar.tehlikelihesap)

console.log(`${kullanıcı} Rolleri Alındı ${kayıtsız.id} Rolü verildi`)
db.set(`jail_${message.guild.id}_${kullanıcı.id}` , 'var')     
db.add('id',1)
//const kanal = message.guild.channels.find(c => c.id == ayarlar.jlog) 


    //#${jailid-(-1)}



}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "Yetkili Komutları",
  permLevel: 0
}
exports.help = {
  name: 'unjail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '!jail @etiket Sebebe'
}