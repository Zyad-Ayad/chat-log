const { Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const fetch = require("node-fetch");
const Discord = require("discord.js");


client.on("guildCreate", async guild => {

let owner = await guild.fetchOwner().then(owner => owner.user)
owner.send("Hello **" + owner.username + "**, \n\nYou or someone else just added me to **" + guild.name + "** \n\nto set up logs channel do ``.setup`` in your server!\n\nyou can manually create log channel but please make sure that channel name is ``chat-log``")


});





client.on("ready", () => {

console.log("done - " + client.user.tag)

})



client.on("messageCreate", async message => {

    if (!message.content.startsWith(".setup")) return;

    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_CHANNELS")) {

        const delEmbed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle(":x: ERROR - No permissions")
        .addField("ERROR TYPE:", `you don't have any of next permissions[\`ADMINISTRATOR\`, \`MANAGE_CHANNELS\`]\n\nyou can create \`chat-log\` channel manually. but please make sure that the name is correct`)
        .addField("\u200B", "\u200B")
        .addField("Note : ", "if bot is not working/logging chat data.. please contact us [Formova support server](https://discord.gg/ArfZWMhcqD)")
        .setFooter('chat-log', 'https://i.imgur.com/2GB0fgf.png')
    
    
    
        message.channel.send({embeds: [delEmbed]})
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
        .setFooter('chat-log', 'https://i.imgur.com/2GB0fgf.png')
    
    
    
        message.channel.send({embeds: [delEmbed]})
        return;
        
    }

message.guild.channels.create("chat-log", {
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        permissionOverwrites: [
           {
             id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
             deny: ['SEND_MESSAGES'] //Deny permissions
		   }
        ],
      })


})


client.on("messageDelete", async message => {

    let channel = await message.guild.channels.cache.find(channel => channel.name === "chat-log");
    if (!channel) return;


    const now = new Date();
    let date = now.toUTCString();


    const delEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle(":x: Message deleted")
    .addField("Message content", `-\n***${message.content}***`)
    .addField("Date :", date)
    .setFooter('chat-log', 'https://i.imgur.com/2GB0fgf.png');



    channel.send({embeds: [delEmbed]})

});


client.on("messageUpdate", async message => {

    let channel = await message.guild.channels.cache.find(channel => channel.name === "chat-log");
    if (!channel) return;


    const now = new Date();
    let date = now.toUTCString();



    const delEmbed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setTitle(":writing_hand: Message edited")
    .addField("Old message content", `\`${message.content}\``)
    .addField("New message content", `\`${message.reactions.message.content}\``)
    .addField("Date :", date)
    .setFooter('chat-log', 'https://i.imgur.com/2GB0fgf.png');



    channel.send({embeds: [delEmbed]})

});




client.login(process.env.BOT_TOKEN);