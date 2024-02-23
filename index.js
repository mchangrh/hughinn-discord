// dotenv
require('dotenv').config()
const { getVhStats } = require('./datasource/hughinn')

// discord.js
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

// cron
const cron = require('node-cron');

function renameHughinn(client, channel, data) {
  client.channels.cache.get(channel).setName()
    .then(channel => channel.setName(data))
}

cron.schedule('*/10 * * * *', () => {
  client.emit('customUpdateTrigger')
}).start()

client.on('ready', () => {
  console.log("Ready")
  client.emit('customUpdateTrigger')
});
client.on('customUpdateTrigger', () => {
  getVhStats().then(data => renameHughinn(client, process.env.HUGHINN_CHANNELID, data))
  lastUpdate = new Date().toISOString();
  console.log(`Update at ${lastUpdate}`)
})