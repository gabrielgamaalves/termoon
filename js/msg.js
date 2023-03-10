function initText(){
    let Token = sessionStorage.getItem('token')
    const sistem = new Sistem(Token)

    Token = sistem.sec_add()
    Token = sistem.token_verify(Token)

    const DescWrite = descWrite(Token.menssage)

    document.getElementById("theme").href = `theme/${DescWrite.theme}/style.css`
    document.getElementById("script").src = `theme/${DescWrite.theme}/script.js`

    document.getElementById("msg").innerHTML = DescWrite.text
}

// ===========================================================

/* 

Type:
1 - carta
2 - direct msg

*/

function complWrite(theme, text){
    let m = text.msg.replace(/\n/g, '{;}')
    m = m.split("{;}")
    for(i=0; i < m.length; i++){
        m[i] = '{l}' + m[i] + '{/l}'
    }
    m = m.join('')
    m = m.replace(/{l}{\/l}/g, '{p}').split("{p}")

    if(m.length > 0){
        for(i=0; i < m.length; i++){
            m[i] = '{p}' + m[i] + '{/p}'
        }
    }

    m = m.join('')

    m = '{h}'+text.titulo+'{/h}' + m 
    m = `${theme}:&t` + m
    return m
}

function descWrite(text){
    const theme = text.substring(text.indexOf(':&t'), 0)
    text = text.replace(theme+':&t', '')

    let m = text.replace(/{l}/g, '<p>')
        .replace(/{\/l}/g, '</p>')
        .replace(/{p}/g, '<div>')
        .replace(/{\/p}/g, '</div>')
        .replace(/{h}/g, '<heard-text id="htxt">')
        .replace(/{\/h}/g, '</heard-text>')

    const l = {
        text: m,
        theme: theme
    }

    return l
}