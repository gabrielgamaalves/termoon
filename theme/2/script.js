const left = document.createElement("div")
    left.id = 'left'
document.body.insertBefore(left, document.querySelector("section"))

const boxlogo = document.createElement("div")
    boxlogo.id = 'boxlogo'
    document.getElementById("left").appendChild(boxlogo)

    const imglogo = document.createElement("img")
    imglogo.src = 'theme/2/lua.png'
    document.getElementById('boxlogo').appendChild(imglogo)


const barleft = document.createElement("div")
    barleft.id = 'barleft'
    document.getElementById("left").appendChild(barleft)

const boxElement = document.createElement("div")
    boxElement.id = 'boxuser'
    document.getElementById('barleft').appendChild(boxElement)

const userElement = document.createElement("div")
    userElement.id = "user"
    document.getElementById('boxuser').appendChild(userElement)

const user = document.getElementById("user")

const htxt = document.querySelector('#htxt')
    user.appendChild(htxt)

    const stg_name = htxt.innerText

    let stg_htxt = htxt.innerText
    stg_htxt = stg_htxt.replace(/\s/g, '');
    document.getElementById("htxt").innerHTML = '<p>' + htxt.innerText + `<span>@${stg_htxt}</span> </p>` 

const desc_string = document.querySelector('#msg').lastChild.firstChild.innerText

function desc_fx(desc){
    if(desc.length > 20){
        desc = desc.substring(0, 17).trim() + '...'
        return desc
    }else{
        return desc.trim()
    }
}

const desc_box = document.createElement("p")
    desc_box.innerHTML = desc_fx(desc_string)
    document.getElementById('user').appendChild(desc_box)

const heard_bar = document.createElement("div")
    heard_bar.id = "heardBar"
    heard_bar.innerHTML = stg_name
    document.querySelector("section").insertBefore(heard_bar, document.getElementById("msg"));