const { Client, Collection, Intents, MessageActionRow, MessageButton} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const fetch = require("node-fetch");
const Discord = require("discord.js");


client.on("guildCreate", async guild => {

let owner = await guild.fetchOwner().then(owner => owner.user)
await owner.send("Hello **" + owner.username + "**, \n\nYou or someone else just added me to **" + guild.name + "** \n\nto set up logs channel do ``.setup`` in your server!\n\nyou can manually create log channel but please make sure that channel name is ``chat-log``")
const commands = new Discord.MessageEmbed()

.setColor('#0099ff')
.setTitle("Chat-log links")
.addField("Bot invite link", "[Invite](https://discord.com/oauth2/authorize?client_id=879273611603619881&permissions=75792&scope=bot)", true)
.addField("Support server", "[Formova team](https://discord.com/invite/ArfZWMhcqD)", true)
.addField("Vote", "[Vote](https://top.gg/bot/879273611603619881/vote)", true)
.setFooter('chat-log', 'https://i.imgur.com/2GB0fgf.png');




const row = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setLabel('Invite Bot')
        .setURL("https://discord.com/oauth2/authorize?client_id=879273611603619881&permissions=75792&scope=bot")
        .setStyle('LINK'),
)
.addComponents(
    new MessageButton()
        .setLabel('Support server')
        .setURL("https://discord.com/invite/ArfZWMhcqD")
        .setStyle('LINK'),
)
.addComponents(
    new MessageButton()
        .setLabel('Vote')
        .setURL("https://top.gg/bot/879273611603619881/vote")
        .setStyle('LINK'),
)


await owner.send({ content: "Please contact us whenever you find a problem with chat-log\nor whenever you want to make suggestion", embeds: [commands], components: [row] });

fetch("https://top.gg/api/bots/879273611603619881/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json", 
    "Authorization": process.env.topgg_token },
    body: JSON.stringify({ "server_count": client.guilds.cache.size })
  })
 .then(res => res.json()) // expecting a json response
 .then(json => console.log("Server count updated"));


});





client.on("ready", () => {

console.log("done - " + client.user.tag)
client.user.setActivity(".help | Watching your messages");

})


client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

  console.log(file + ": Loaded.")
  client.commands.set(command.help.name, command);

}



var prefix = "."
client.on("messageCreate", async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type == "dm") return;


    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = client.commands.get(command.slice(prefix.length));
    if (cmd) {    
    if(cmd.help.help == "skip") return;
    cmd.run(client, message, args);    
    }

      


})


client.on("messageDelete", async message => {

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = client.commands.get("messageDelete");
    if (cmd) {    
    cmd.run(client, message, args);    
    }

});


client.on("messageUpdate", async (oldMessage, newMessage) => {


    let cmd = client.commands.get("messageUpdate");
    if (cmd) {    
    cmd.run(client, oldMessage, newMessage);    
    }


});

client.login(process.env.BOT_TOKEN);
