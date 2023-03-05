function StartGame(token, Keytoken){

function DOMGame(){
    const ctnr = document.getElementById("container");
    ctnr.parentNode.removeChild(ctnr);
    document.getElementById('game').style.display = 'flex'
    document.getElementById("dica").innerHTML = token.dica
    document.getElementById("exitSession").style.display = 'block'
    // document.getElementById("subtitle").style.width = '225px'
}

function correct(){
    token.message
    setTimeout(() => {
        const ctnr = document.getElementById("gaming");
        ctnr.parentNode.removeChild(ctnr);

        const message = document.createElement("iframe")
        message.src = 'msg.html'
        document.body.appendChild(message)

        document.getElementById('stylePag').href = `theme/${1}/style.css`
    }, 1000)
}

function Game(){
    DOMGame()

    // =|Token Game: Verifica e Salva o token no sessionStorage
    if(sessionStorage.getItem('token') === null){
        const sistem = new Sistem(Keytoken)
        sessionStorage.setItem('token', sistem.sec_remove())
    }

    // =|Attemp: Verifica se há no sessionStorage o item "game"
    const attempt = sessionStorage.getItem('game')
    if(attempt === null){
        sessionStorage.setItem('game', '[]')
    }
    
    // =|= PlNext: Vai colocando os dados salvos, nos pl escritos
    function PlNext(attempt){
        const date = JSON.parse(attempt)

        if(date !== null){
            for (i=0; i < date.length; i++){
                const element = document.getElementById(`pl${i}`)

                if(date[i].try === 'correct'){
                    element.classList.add('correct')
                    correct()
                    document.getElementById('btnGame').style.display = 'none'
                }
                else if(date[i].try === 'fail'){
                    element.classList.add('fail')

                    if(i <= 4){
                        const plnext = document.getElementById(`pl${i + 1}`)
                        plnext.disabled = false;
                    }else if(i === 5){
                        document.getElementById('btnGame').style.display = 'none'
                    }
                    
                }

                element.value = date[i].value
                element.disabled = true
            }
        }
    }
    PlNext(attempt)
}
Game()

// =|= Evento de ao clicar no botão "btnGame"
document.getElementById('btnGame').addEventListener("click", () => {
    const attempt = JSON.parse(sessionStorage.getItem('game'))
    let i = attempt.length
    const element = document.getElementById(`pl${i}`)

    if(element.value !== ''){       
        let $_Senha = token.pass
        
        const v_pass = verifypass(element, $_Senha)

        function resultPass(pass){
            if(pass === false){
                return 'fail'
            }else{
                return 'correct'
            }
        }

        const result_pass = resultPass(v_pass)
        const result = {value: element.value.toUpperCase().trim(), try: result_pass}

        attempt.push(result)
        sessionStorage.setItem('game', JSON.stringify(attempt))

        if(i <= 4){
            if(v_pass === false){
                const nextElement = document.getElementById(`pl${i + 1}`)
                nextElement.disabled = false
                nextElement.focus()
            }
        }else if(i === 5){
            if(v_pass === false){
                element.classList.add('fail')
                element.disabled = true
                document.getElementById('btnGame').style.display = 'none'
            }
        }
    }
})

function correctpass(element){
    element.classList.add('correct');
    element.disabled = true;
}

function failpass(element){
    element.classList.add('fail');
    element.disabled = true;
}

function verifypass(element, pass){
    const $SENHA = element.value.toUpperCase().trim()

    if( $SENHA === pass){
        correctpass(element)
        correct()
        document.getElementById('btnGame').style.display = 'none'
        return true
    }else{
        failpass(element)
        return false
    }
}

document.getElementById("exitSession").addEventListener("click", () => {
    sessionStorage.clear()
    window.location.reload(true)
})

}