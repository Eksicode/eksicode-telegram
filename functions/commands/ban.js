const axios = require('axios')

async function banCommand (ctx) {
  const request = await axios.get('http://api.eksicode.org/telegrams')
  const groups = request.data

  try {
    const member = await ctx.telegram.getChatMember(
      process.env.ADMIN_CH_ID,
      ctx.from.id
    )

    if (member.status === 'administrator' || member.status === 'creator') {
      groups.map(e => {
        ctx.telegram.kickChatMember(e.channelID, ctx.message.reply_to_message.forward_from.id)
      })
    } else {
      console.log('yetkisiz işlem')
    }
  } catch (err) {
    console.log('yetkisiz işlem')
  }
}

module.exports = banCommand
