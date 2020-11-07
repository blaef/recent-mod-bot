const Discord = require("discord.js");
const db = require('quick.db')
const moment = require('moment')
exports.run = async (client, message, args) => {

    let user;
    
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    let son = user.lastMessage || "Son Mesaj Bulunamadı";
    let sontarih = user.lastMessage ? moment(user.lastMessage.createdTimestamp).add(1, 'hours').format('LLL') : "Son mesajı bulunamadı"

    const member = message.guild.member(user);
    const Durum = message.author.presence.status;
    const Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
 const durm = (Durum == "online" ? (client.emojis.get('750113961478979645') + "Çevrimiçi") : (Durum == "offline" ? (client.emojis.get('750113961478979645') + "Çevrimdışı") : (Durum == "idle" ? (client.emojis.get('750113961478979645') + "Boşta") : (Durum == "dnd" ? (client.emojis.get('750113961478979645') + "Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))


   if(message.member.selfDeaf == true){
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag , message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setColor("RANDOM")
    .setDescription(`
**    ❯ Kullanıcı Bilgileri:

\`•\` Kullanıcı Adı: ${user.tag}
\`•\` İD: ${user.id}
\`•\` Durum: ${durm}
\`•\` Hesap Oluşturma Tarihi: ${moment(member.user.createdAt).format('Do MMMM YYYY HH:mm')}

❯ Sunucudaki Bilgileri:

\`•\` Seste Afkmı: Evet.
\`•\` Takma Ad: ${member.nickname !== null ? `${member.nickname}` : 'Sunucuda kullanıcı adı bulunmuyor.'}        
\`•\` Sunucuya Katılma Tarihi: ${moment(user.joinedAt).format('YYYY/MM/DD')} | ${message.guild.members.size}
\`•\` Son Mesaj: (\`${son}\`) | ${sontarih}
   ** `)
message.channel.send(embed)}
    
    else {

        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag , message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setColor("RANDOM")
        .setDescription(`
    **    ❯ Kullanıcı Bilgileri:
    
    \`•\` Kullanıcı Adı: ${message.author}
    \`•\` İD: ${message.author.id}
    \`•\` Durum: ${durm}
    \`•\` Hesap Oluşturma Tarihi: ${moment(member.user.createdAt).format('Do MMMM YYYY HH:mm')}
    
    ❯ Sunucudaki Bilgileri:
    
    \`•\` Seste Afkmı: Hayır.
    \`•\` Takma Ad: ${member.nickname !== null ? `${member.nickname}` : 'Sunucuda kullanıcı adı bulunmuyor.'}        
    \`•\` Sunucuya Katılma Tarihi: ${moment(user.joinedAt).format('YYYY/MM/DD')} | ${message.guild.members.size}
    \`•\` Son Mesaj: (\`${son}\`) | ${sontarih}
       ** `)
    
    message.channel.send(embed)}


}

exports.conf = {
  enabled: true,
  aliases: ['i'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  usage: `topteyit`
}