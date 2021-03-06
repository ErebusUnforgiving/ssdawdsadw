const Discord = require("discord.js");
const data = require("../models/Database/main.js")
exports.run = async (client, message, args) => {
  let user = message.author;
  if(message.guild != null) {
   message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription("Lütfen __gizlilik koşulları__ için ** özel mesajlarda** bu komutu kullanın.")
    );
  } else {
  let weburl = args[0];
  if(!weburl) return message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription(`Geçersiz komut kullanımı, şu şekilde kullanmayı deneyin:
\`l!ekle [adress]\`

Argümanlar:
\`adress\`: Site adres url.
\`Örnek: https://youtube.com/linlords)\``)
    );
if(!weburl.match('https')) {
     message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription(`Linklerin şu şekilde başlamalı: "https".`)
    );
} else {
data.findOne({ 'adress': args[0] }, function (err, adress) { 
if(err) console.log(err)
if(adress) {
   message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription(`Bu link zaten sistemde bulunuyor!`)
    );
} else {
data.find({userID: user.id}, function (err, docs) {
if(docs.length > 9) {
   message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription(`Uptime link limitini aşmışsın. Lütfen bir link sil.\nLink Limit: (${docs.length}/10)`)
    );
} else {
    new data({userID: message.author.id, adress: weburl}).save()
      message.channel.send(new Discord.MessageEmbed()
    .setTitle("BAŞARILI").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("GREEN")
    .setDescription(`Siten başarıyla uptime sistemine eklendi!
    
    Bilgilendirme:
    \`Website URL\`: ${weburl}
    \`Kullanıcı\`: ${message.author.tag}
    \`Uptime Limit\`: ${docs.length + 1}/10`)
    )
  }
  })
  }
  })
  }
  }
}
module.exports.conf = {
  aliases: ["link-ekle", "ekle"],
  enabled: true,
  guildOnly: false,
};

module.exports.help = {
  name: "addlink",
  description: "",
  usage: ""
};

