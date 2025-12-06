interface mainWhatsMenssager{
    numberTelefone: string;
}
function WhatsMenssager({numberTelefone}: mainWhatsMenssager){
    const coderMensager = encodeURI("Ola, Gostaria de um atendimento")
    return `https://api.whatsapp.com/send?phone=${encodeURIComponent(numberTelefone)}&text=${coderMensager}`;  
}

export default WhatsMenssager;