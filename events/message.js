
const ayarlar = require('../ayarlar.json');
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (message.content.indexOf(ayarlar.prefix) !== 0) return;

    const args = message.content.split(/ +/g)
  const command = args.shift().slice(ayarlar.prefix.length).toLowerCase();
  
  console.log(args)

  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
      message.flags = [];
        while (args[0] && args[0][0] === "-") {
            message.flags.push(args.shift().slice(1));
        }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, args);
  }

};