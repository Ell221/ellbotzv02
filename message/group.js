"use strict";
const {
    MessageType,
    Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");

const { getBuffer, sleep } = require("../lib/myfunc");

let setting = JSON.parse(fs.readFileSync('./config.json'));
let { botName } = setting

module.exports = async(xinz, anj, welcome, left) => {
    const isWelcome = welcome.includes(anj.jid)
    const isLeft = left.includes(anj.jid)
    const mdata = await xinz.groupMetadata(anj.jid)
    const groupName = mdata.subject

    if (anj.action === 'add'){
        if (anj.participants[0] === xinz.user.jid){
            await sleep(5000)
            xinz.updatePresence(anj.jid, Presence.composing)
            xinz.sendMessage(anj.jid, `Hai aku ${botName}, silahkan kirim #menu dan #rules untuk mengetahui peraturan bot ^^`, MessageType.text)
        } else if (isWelcome){
            try {
                var pic = await xinz.getProfilePicture(anj.participants[0])
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
            xinz.sendMessage(anj.jid, await getBuffer(pic), MessageType.image, {caption: `Hai @${anj.participants[0].split("@")[0]}, selamat datang di ${groupName}\n*Intro dulu*\n\n├─ ❏ Nama:\n├─ ❏ Umur:\n├─ ❏ Asal kota:\n├─ ❏ Kelas:\n├─ ❏ Jenis kelamin:\n*Jangan lupa baca desc grup yaa* :\n${mdata.desc}\n\nSEMOGA BETAH YAA ><`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
        }
    } else if (anj.action === 'remove' && isLeft){
        try {
            var pic = await xinz.getProfilePicture(anj.participants[0])
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        xinz.sendMessage(anj.jid, await getBuffer(pic), MessageType.image, {caption: `Sayonara @${anj.participants[0].split("@")[0]}\n\nAKHIRNYA BEBAN GRUP BERKURANG, JANGAN BALIK LAGI OM ^^`, contextInfo: {"mentionedJid": [anj.participants[0]]}})
    }
}