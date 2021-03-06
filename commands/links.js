const Discord = require('discord.js')
const db = require('../models/Database/main.js')
module.exports.run = async (client,message,args) => {
if(message.author.id != global.config.owners) return message.channel.send(message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription("Bu botun sahibi olmadığınız için bağlantıları listeleyemezsiniz.")
    ).setFooter(global.config.FOOTER))
db.find({}, function (err, docs) { 
const guilds = docs
const generateEmbed = start => {
  
  const current = guilds.slice(start, start + 10)
  const embed = new Discord.MessageEmbed()
    .setTitle(`LinLord - Uptime Botu`)
  current.forEach(g => 
    embed.addField(`${client.users.cache.get(g.userID).tag}`, `\`${g.adress}\``).setFooter(global.config.FOOTER)
  ) 
  return embed
}

const author = message.author

message.channel.send(generateEmbed(0)).then(message => {
  if (guilds.length <= 10) return
  message.react('➡️')
  const collector = message.createReactionCollector(
    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
    {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
    message.reactions.removeAll().then(async () => {
      reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10
      message.edit(generateEmbed(currentIndex))
      if (currentIndex !== 0) await message.react('⬅️')
      if (currentIndex + 10 < guilds.length) message.react('➡️')
    })
  })
})
})
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['linkler'],
  };
  
  exports.help = {
    name: "links",
    description: "",
    usage: ""
  };
  

