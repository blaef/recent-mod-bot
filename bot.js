//consts (for glitch)
// GEREKLİ YERLER
const express = require('express');
const app = express();
//const totika = require("./totika.json");
// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const message = require('./events/message');
const db = require('quick.db');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(aliases => {
      client.aliases.set(aliases, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



//////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});








client.login(ayarlar.token);

client.on("messageDelete", async message => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { yazar: message.author.id, yazilmaTarihi: message.createdTimestamp, silinmeTarihi: Date.now(), dosya: message.attachments.first() ? true : false });
  if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
});

  

client.on('ready', () => {
  client.user.setPresence({
      game: {
          name: `${ayarlar.footer}`,
          type: 'PLAYING',
          //url: 'https://www.twitch.tv/gifwork'
          // Değerler:
          // PLAYING: Oynuyor
          // WATCHING: İzliyor
          // LISTENING: Dinliyor
          // STREAMING : Yayında
      },
            status: 'dnd'	
      // Değerler:
      // online: Çevrimiçi
      // dnd: Rahatsız Etmeyin
      // idle: Boşta
  })
})

//RANDOM RENK
client.randomrenk = function () {
  let renkler = ["#040f68","#0aeaff","#8c057e"]
  return renkler[Math.floor(Math.random() * renkler.length)]
 };

// BAN GİFLERİ
 client.bangif = function () {
  let bangifs = ["https://i.pinimg.com/originals/b2/84/33/b28433c392959f923ff0d736cd89dcbd.gif"]
  return bangifs[Math.floor(Math.random() * bangifs.length)]
 };

// HOŞGELDİN MESAJ
 client.on("guildMemberAdd", async member => {
  const modulKaan = require('moment');
modulKaan.locale('tr')

let kurulus = new Date().getTime() - member.user.createdAt.getTime(); 
let beklenen = 604800000
let contentMessage
if(kurulus < beklenen) { 
  contentMessage = `
 ** • ${member} üyesi Sunucu'ya Katıldı Hesabını (\`${moment(member.user.createdAt).fromNow()}\`) Oluşturduğu için Şüpheli Rolü verildi! **
`
member.addRole(ayarlar.tehlikelihesap)
member.removeRole(ayarlar.kayıtsız)
member.setNickname("• Şüpheli Hesap")   
} else {
  contentMessage = `
• Sunucumuza hoş geldin ${member}, seninle Beraber \`${member.guild.memberCount}\` Kişiyiz.
• Ses kanalına girerek kayıt olabilirsin.
• Hesabın Açılış Süresi: \`${moment(member.user.createdAt).fromNow()}\` 
• Hesap: Güvenli
`
}
member.addRole(ayarlar.kayıtsız)
member.setNickname("• İsim | Yaş")   

let logChannel = member.guild.channels.get(ayarlar.hosgeldinkanal)

logChannel.send(contentMessage)
})


client.on("guildMemberAdd", async member => {
	let muteData = db.get(`${member.guild.id}.${member.id}.mute`)
	let log_channel = member.guild.channels.find('name', 'mute-bilgi');

	if(muteData) {
		member.addRole(ayarlar.muterol) //Muted ID
		log_channel.send(new Discord.RichEmbed().setTitle('Susturulma Bildirimi').setDescription(`**${member.user.tag}** isimli kullanıcı, susturma cezasını kaldırmak amaçlı sunucuda çık gir yaptı!\n \n\`\`\`Susturulma Sebebi: ${muteData}\`\`\``).setFooter(member.guild.name, member.guild.iconURL).setTimestamp())
	}
})



// !TAG
client.on('message', async message => {
  if(message.author.bot || message.channel.type === "dm") return;
           if(message.content.includes('!tag')){
             [message.channel.send(ayarlar.tag)] 
      }
})
  // !lİNK
client.on('message', async message => {
  if(message.author.bot || message.channel.type === "dm") return;
           if(message.content.includes('!link')){
             [message.channel.send(ayarlar.link)] 
      }
})
  // OTOTAG
client.on("userUpdate", async(old, nev) => {
  if(old.username !== nev.username) {
  if(!nev.username.includes(ayarlar.tag) && client.guilds.get(ayarlar.sunucu).members.get(nev.id).roles.has(ayarlar.ekiprol)) {
     client.guilds.get(ayarlar.sunucuid).members.get(nev.id).removeRole(ayarlar.ekiprol)



    let embed1 = new Discord.RichEmbed()
            .setColor("RANDOM")
			.setAuthor('• Tag Rolü Alındı!')
            .setDescription(`**${nev}, "${ayarlar.tag}" tagını Çıkartığı için bot Tarafından <@&${ayarlar.ekiprol}> rolü alındı!**`)
                
              
             
        client.channels.get(ayarlar.elog).send(embed1)
    } 

     if(nev.username.includes(ayarlar.tag) && !client.guilds.get(ayarlar.sunucuid).members.get(nev.id).roles.has(ayarlar.ekiprol)) {  


       let embed1 = new Discord.RichEmbed()
            .setColor("RANDOM")
			.setAuthor('• Tag Rolü Verildi!')
            .setDescription(`**${nev}, "${ayarlar.tag}" tagını aldığı için bot Tarafından <@&${ayarlar.ekiprol}> rolü verildi!**`)
                
              
            
        client.channels.get(ayarlar.elog).send(embed1)
      client.guilds.get(ayarlar.sunucuid).members.get(nev.id).addRole(ayarlar.ekiprol)
     }
  }
  })


// CEZALI 
  client.on('guildMemberAdd' , async member => {
    let j = await db.fetch(`jail_${member.guild.id}_${member.id}`)
    if(j === 'var') {
        member.addRole(ayarlar.ceza)
        member.removeRole(ayarlar.kayıtsız)	
        
    let kanal = client.channels.get(ayarlar.jlog) 
	    let emb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('• Cezalı')
    .setDescription(`**${member} Adlı Kullanıcı \`Cezalı\`lıda Kayıtlı Olduğu İçin Sizi Tekrardan Cezalıya Attım! `)
client.channels.get(kanal).send(emb)

member.send(`${member} sunucumuza hoşgeldiniz sen onceden jailde oldugun için seni yeniden jaile atmak zorunda kaldım.`)
}
})


  

