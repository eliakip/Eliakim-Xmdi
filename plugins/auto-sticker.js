const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');

cmd({
  on: 'body'
}, async (conn, mek, m, { from, body }) => {
  try {
    const jsonUrl = 'https://raw.githubusercontent.com/XdTechPro/KHAN-DATA/main/autosticker.json';
    const res = await axios.get(jsonUrl);
    const data = res.data;

    for (const keyword in data) {
      if (body.toLowerCase() === keyword.toLowerCase()) {
        if (config.AUTO_STICKER === 'true') {
          await conn.sendMessage(
            from,
            {
              sticker: { url: data[keyword] },
              package: '𝔢𝔩𝔦𝔞𝔨𝔦𝔪 𝔵𝔪𝔡'
            },
            { quoted: mek }
          );
        }
      }
    }
  } catch (e) {
    console.error('AutoSticker error:', e);
  }
});
