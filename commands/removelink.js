const Discord = require("discord.js");
const data = require("../models/Database/main.js")
exports.run = async (client, message, args) => {
  if(message.guild != null) {
   message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription("Please use this command from **private messages** for __privacy terms__.")
    );
  } else {
  let weburl = args[0];
  if(!weburl) return message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription(`Invalid command usage, try using it like:
\`!removelink [adress]\`

Arguments:
\`adress\`: Side adres url.
\`(example: https://youtube.com/linlords\``)
    );
data.findOne({ 'userID': message.author.id }, function (err, userID) { 
data.findOne({ 'adress': args[0] }, function (err, docs) { 
if(err) console.log(err)
if(!docs) {
   message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription(`This link not added the uptime system.`)
    );
} else {
if(!userID) {
     message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription(`Bu bağlantı sizin değil, bu yüzden silemezsiniz.`)
    );
} else {
data.find({userID: message.author.id}, function (err, docs) {
  data.deleteOne({userID: message.author.id, adress: weburl}, function (error, botID) { 
if(error) console.log(error)
})
      message.channel.send(new Discord.MessageEmbed()
    .setTitle("BAŞARILI").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("GREEN")
    .setDescription(`Web siteniz, uptime sisteminden başarıyla kaldırdı.
    
    Bilgilendirme:
    \`Website URL\`: ${weburl}
    \`Kullanıcı\`: ${message.author.tag}
    \`Uptime Limit\`: ${docs.length - 1}/10`)
    );
  })
  }
  }
  })
  }
  )
  }
}
module.exports.conf = {
  aliases: ["link-sil", "sil"],
  enabled: true,
  guildOnly: false,
};

module.exports.help = {
  name: "removelink",
  description: "",
  usage: ""
};

