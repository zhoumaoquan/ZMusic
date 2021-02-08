export function formatParams(count) {
    if (count < 0) return;
    if (count < 10000) {
        return count
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万";
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }

}

export function setImageSize(url, size) {
    return `${url}?param=${size}x${size}`
}

export function formatDate(time, fmt) {
    let date = new Date(time);

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

export function formatMonthDay(time) {
    return formatDate(time, "MM月dd日");
}

export function formatMinuteSecond(time) {
    return formatDate(time, "mm:ss");
}

export function getPlaySong(id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}


export function getrandomNumber(num) {
    return Math.floor(Math.random() * num);
}

const matchTimeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export function handleLyric(str) {
    if (str === '') return

    const lineStrings = str.split('\n')

    let lyricList = []

    for (let line of lineStrings) {
        if (line) {
            const result = matchTimeExp.exec(line)
            if (!result) continue

            const time = (result[1] * 60 * 100) + (result[2] * 1000) + (result[3].length === 3 ? result[3] * 1 : result[3] * 10);

            const context = line.replace(matchTimeExp, "").trim()

            lyricList.push({ time, context })
        }
    }
    return lyricList
}