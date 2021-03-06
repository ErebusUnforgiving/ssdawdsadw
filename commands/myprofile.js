const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client,message,args) => {
  if(message.guild != null) {
   message.channel.send(new Discord.MessageEmbed()
    .setTitle("HATA").setThumbnail(message.author.avatarURL({ dynamic: true })).setColor("RED")
    .setDescription("Lütfen __gizlilik koşulları__ için ** özel mesajlarda** bu komutu kullanın.    ")
    );
  } else {
let user = message.author
let database = require('../models/Database/main.js');
database.find({userID: user.id}, function (err, data) {
client.users.fetch(user.id).then(astauser => {
let botswrite;
let av = astauser.avatarURL({dynamic: true})
if(data) botswrite = data.map(r => `${r.adress}`).join('\n') || "Kullanıcı sisteme uptime linki eklememiş.";
return message.channel.send(new Discord.MessageEmbed()
.addField("ID", astauser.id, true)
.addField("Discriminator", astauser.discriminator, true)
.addField("Tag", astauser.tag,true)
.addField("Kullanıcı bot mu?", astauser.bot ? "Evet" : "Hayır", true)
.addField("Hesap oluşturulma tarihi", moment(user.createdAt).format("LLL"), true)
.addField("Rozetler", astauser.flags.toArray().join(" ") ? `${astauser.flags.toArray().join(" ")
.replace("HOUSE_BRAVERY", "<:bravery:807704009338257459>")
.replace("HOUSE_BRILLIANCE", "<:briliance:807704009250045983>")
.replace("HOUSE_BALANCE", "<:balance:807704008948449282>")
.replace("EARLY_VERIFIED_DEVELOPER", "  ")
.replace("EARLY_VERIFIED_DEVELOPER", "<:dev:807704009125003304>")
.replace("VERIFIED_DEVELOPER", "<:dev:807704009125003304>")
.replace("VERIFIED_BOT", "<:verifiedbot:807715774574755891>")
.replace("DISCORD_EMPLOYEE", "<:discordstaff:807704008981741578>")
.replace("DISCORD_PARTNER", "<:partner:807704009058025524>")
.replace("HYPESQUAD_EVENTS", "<:hypesquad_events:807708987641823232>")
.replace("BUGHUNTER_LEVEL_1", "<:bughunter:807704009598435338>")
.replace("EARLY_SUPPORTER", "<:early:807704008725626911>")
.replace("BUGHUNTER_LEVEL_2", "<:bughunterlvl2:807704009149775942>")} ${av.endsWith('.gif') ? "<:nitro:807717993152380928>" : ""}` : `Hiçbir Rozeti Yok`, true)
.addField("Links", botswrite, true)
.addField("Link Limit", `${data.length}/10`, true)
.setFooter(global.config.FOOTER)
.setTitle(astauser.tag)
.setAuthor("Kullanıcı Profili")
.setThumbnail(astauser.avatarURL({dynamic: true}))
)
})
})
}
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['profilim'],
  };
  
  exports.help = {
    name: "my-profile",
    description: "",
    usage: ""
  };
