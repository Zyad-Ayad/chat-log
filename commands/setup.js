const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports.run = async (client, message, args) => {


if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_CHANNELS")) {

    const delEmbed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle(":x: ERROR - No permissions")
    .addField("ERROR TYPE:", `you don't have any of next permissions[\`ADMINISTRATOR\`, \`MANAGE_CHANNELS\`]\n\nyou can create \`chat-log\` channel manually. but please make sure that the name is correct`)
    .addField("\u200B", "\u200B")
    .addField("Note : ", "if bot is not working/logging chat data.. please contact us [Formova support server](https://discord.gg/ArfZWMhcqD)")
	.setFooter('chat-log', client.user.avatarURL());



    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
        message.author.send({embeds: [delEmbed]})
        message.author.send("this message is sent here because i don't have `SEND_MESSAGES` permission in " + message.channel.name)
    }else {

    message.channel.send({embeds: [delEmbed]})
    
    }        
    return;

}

let channel = await message.guild.channels.cache.find(channel => channel.name === "chat-log");

if (channel) {
    
    const delEmbed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle(":x: ERROR")
    .addField("ERROR TYPE:", `**chat-log** is already exist ==> ${channel}`)
    .addField("\u200B", "\u200B")
    .addField("Note : ", "if bot is not working/logging chat data.. please contact us [Formova support server](https://discord.gg/ArfZWMhcqD)")
	.setFooter('chat-log', client.user.avatarURL());



    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
        message.author.send({embeds: [delEmbed]})
        message.author.send("this message is sent here because i don't have `SEND_MESSAGES` permission in " + message.channel.name)
    }else {

    message.channel.send({embeds: [delEmbed]})
    
    }
    return;
    
}




if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) {


const delEmbed = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor(message.author.username, message.author.avatarURL())
.setTitle(":x: ERROR")
.addField("ERROR TYPE:", `**chat-log** do not have \`MANAGE_CHANNELS\` permission!\nyou can make \`chat-log\` channel manually`)
.addField("\u200B", "\u200B")
.addField("Note : ", "if bot is not working/logging chat data.. please contact us [Formova support server](https://discord.gg/ArfZWMhcqD)")
	.setFooter('chat-log', client.user.avatarURL());



if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
    message.author.send({embeds: [delEmbed]})
    message.author.send("this message is sent here because i don't have `SEND_MESSAGES` permission in " + message.channel.name)
    return;
}else {

message.channel.send({embeds: [delEmbed]})
return;

}



}





message.guild.channels.create("chat-log", {
    type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
    permissionOverwrites: [
       {
         id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
         deny: ['SEND_MESSAGES'] //Deny permissions
       },
       {
           id: "879273611603619881",
           allow: ["SEND_MESSAGES"]
       }
    ],
  }).then(channell => {

   const delEmbed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setAuthor(message.author.username, message.author.avatarURL())
  .setTitle(":white_check_mark: Done")
  .addField("channel info", `bot will start logging deleted messages, edited message in **chat-log** ==>  ${channell}`)
  .addField("\u200B", "\u200B")
  .addField("Note : ", "if bot is not working/logging chat data.. please contact us [Formova support server](https://discord.gg/ArfZWMhcqD)")
	.setFooter('chat-log', client.user.avatarURL());



  if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
      message.author.send({embeds: [delEmbed]})
      message.author.send("this message is sent here because i don't have `SEND_MESSAGES` permission in " + message.channel.name)
  }else {

  message.channel.send({embeds: [delEmbed]})

  }
  })

}
module.exports.help = {
    name: "setup",
    help: "set chat-log channel | you need manage channels permisson to use this!",
    usage: ".setup"
}
