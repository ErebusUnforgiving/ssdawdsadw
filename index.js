const Discord = require("discord.js");
const client = global.Client = new Discord.Client({ disableMentions: 'everyone' });
const c = require("./config.json");
const fs = require('fs')
const mongoose = require('mongoose')
const fetch = require("node-fetch");

//-------------Loader---------------\\
require('events').EventEmitter.prototype._maxListeners = 100;
require("./models/dataloader.js").run(client)

client.on("error", console.error);

client.on("warn", console.warn);

client.on('reconnecting', message => {
console.log(`User Reconnecting`)
});

client.on('resume', message => {
console.log(`Connected ${client.user.tag}`)
});

client.on('disconnect', message => {
console.log(`User Disconnected`)
process.exit(1);
});

global.config = require("./config.json")
client.login(c.TOKEN).then(b => console.log(`Logged in as ${client.user.username}`)).catch(a => console.log("Token not correct!"))
  //-------------Loader---------------\\

// COMMAND COLLECT
client.komutlar = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
   if(!f.endsWith('.js')) return 
    let props = require(`./commands/${f}`);
   if(!props.help) return
    console.log(`Yüklenen komut: { ${props.help.name} }`);
    client.komutlar.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
          global.commands = files;
    });
  });
});

// READY.JS
client.on('ready', () => {
  client.user.setActivity("youtube.com/linlords | LinLord'S Community", { type: "STREAMING" })
});


//MESSAGE.JS
client.on('message', async message => {
let p = c.PREFIX
let talkedRecently = new Set();
if (talkedRecently.has(message.author.id)) return
talkedRecently.add(message.author.id);
setTimeout(() => {
talkedRecently.delete(message.author.id);
}, 2500); 
let client = message.client;
if (message.author.bot) return;
if (!message.content.startsWith(p)) return;
let command = message.content.split(" ")[0].slice(p.length);
let params = message.content.split(" ").slice(1);
let cmd
if (client.komutlar.has(command)) {
cmd = client.komutlar.get(command);
} else if (client.aliases.has(command)) {
cmd = client.komutlar.get(client.aliases.get(command));
}
if (cmd) {
}
cmd.run(client, message, params, p);
})



// UPTIME
const claudette = require("./models/Database/main.js")
setInterval(() => {
claudette.find({}, function (err, docs) {
if(err) console.log(err)
if(!docs) return;
docs.forEach(docs => {
fetch(docs.adress)
console.log(`The ping was posted to the ${docs.adress} site.`)
})
})
}, 60000)