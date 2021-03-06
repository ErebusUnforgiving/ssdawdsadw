const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client,message,args) => {
message.channel.send(new Discord.MessageEmbed()
.setTitle(client.user.username + " - Yardım Menüsü")
.setThumbnail(message.author.avatarURL({ dynamic: true }))
.setFooter(global.config.FOOTER)
.setColor("BLUE")
.addField("!ekle", `Site linkini uptime sistemine eklersiniz.`)
.addField("!sil", `Sistemde olan uptime linkini silersiniz.`)
.addField("!profilim", `Bağlantılar dahil kendi profilinizi görüntülemenizi sağlar.`)
)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yardım'],
  };
  
  exports.help = {
    name: "help",
    description: "",
    usage: ""
  };
