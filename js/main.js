{
    "use strict";
    
    const form = document.querySelector('form#form_principal');
    const text_area = document.querySelector('textarea[name="cText"');
    const inputs_form = document.querySelectorAll('section.container input');
    const selects_form = document.querySelectorAll('section.container select');

    const events = [{focusin: "focusin", input:"input", click:"click", focusout:"focusout", change:"change"}];
    let arrValues = [];
    let boolValues;
    let radioValue;

    events.forEach((evt)=>{
        inputs_form.forEach((input,ind_inp)=>{

            //MOSTRAR O INDICE E NAME DE TODOS OS INPUT'S
            // console.log(ind_inp+" - "+input.name);

            if(ind_inp !== 11 && ind_inp !== 12 && ind_inp !== 17){
                input.addEventListener(evt.input,(event)=>{
                    input.value = noSpecialChars(event.target.value);
                    switch(ind_inp){
                        case 0: case 5: case 7: case 8: case 13: //0-NOME COMPLETO | 5-CIDADE | 7-CARGO | 8-EMPRESA | 13-NEGOCIO PRÓPRIO
                            input.value = noNumbersChars(event.target.value);
                            
                            if(!maxLength(input.value,ind_inp)){
                                input.classList.add("border-wrong");
                                input.classList.remove("border-verify");
                            } else {
                                input.classList.add("border-verify");
                                input.classList.remove("border-wrong");
                            }
                            break;

                        case 1: case 3: case 2: case 6: case 9: case 10: //1-RG | 2-CPF | 6-CEP | 9-TEMPO DE EMPRESA | 10-PREVISÃO DE ENTRADA |
                            input.value = onlyNumbers(event.target.value);

                            if(!maxLength(input.value, 0) && (ind_inp===3 || ind_inp===9 || ind_inp===10)){
                                input.classList.add("border-wrong");
                                input.classList.remove("border-verify");
                            } else {
                                input.classList.add("border-verify");
                                input.classList.remove("border-wrong");
                            }
                            break;
                    }

                    switch(ind_inp){
                        case 1: //RG
                            input.value = maskRG(input.value);

                            if(!isRG(input.value)){
                                input.classList.add("border-wrong");
                                input.classList.remove("border-verify");
                            } else {
                                input.classList.add("border-verify");
                                input.classList.remove("border-wrong");
                            }

                            input.value = maxLength(input.value, ind_inp);
                            break;
                        case 2: //CPF
                            input.value = maskCPF(input.value);

                            if(!isCPF(input.value)){
                                input.classList.add("border-wrong");
                                input.classList.remove("border-verify");
                            } else {
                                input.classList.add("border-verify");
                                input.classList.remove("border-wrong");
                            }

                            input.value = maxLength(input.value, ind_inp);
                            break;

                        case 4:  //DATA
                            if(!maxLength(input.value,ind_inp)){
                                input.classList.add("border-wrong");
                                input.classList.remove("border-verify");
                            } else {
                                input.classList.add("border-verify");
                                input.classList.remove("border-wrong");
                            }
                            break;
                        case 6: //CEP
                            input.value = maskCEP(input.value);

                            if(!isCEP(input.value)){
                                input.classList.add("border-wrong");
                                input.classList.remove("border-verify");
                            } else {
                                input.classList.add("border-verify");
                                input.classList.remove("border-wrong");
                            }

                            input.value = maxLength(input.value, ind_inp);
                            break;
                        case 10:
                            input.value = maskMoney(input.value);
                            break;
                    }
                });
            }

            radioValue = inputs_form[11].checked===true ? inputs_form[11].value : inputs_form[12].value;  

            // BOTÃO!
            input.addEventListener(evt.click,(e)=>{
                switch(ind_inp){
                    case 11: case 12:
                        if(input.checked === true){
                            radioValue = input.value;
                        }
                        break;

                    case 17:
                        e.preventDefault();

                        for(let i=0; i<inputs_form.length; i++){
                            if( ((inputs_form[i].value !== "") || ( i >= 14)) && (isRG(inputs_form[1].value)) && (isCPF(inputs_form[2].value)) && (isCEP(inputs_form[6].value))){

                                if((i !== 17) && (i !== 11) && (i !== 12)){
                                    arrValues.push(inputs_form[i].value);
                                    boolValues=true;
                                }
                            } else {
                                input.classList.add("wrong-button");
                                input.classList.remove("verify-button");

                                arrValues = [];
                                boolValues=false;

                                input.value = "DADOS INCORRETOS, CONFIRA NOVAMENTE, POR FAVOR!";

                                setTimeout(()=>{
                                    input.classList.remove("wrong-button");
                                    input.classList.remove("verify-button");
                                    input.value = "Enviar";
                                    // console.log(`\nARR: ${arrValues} \nBOOLEAN: ${boolValues}`);
                                },1300);
                                break;
                            }
                        }

                        // console.log(arrValues);

                        if(boolValues){
                            arrValues.push(radioValue);
                            arrValues.push(text_area.value);
                            selects_form.forEach((select)=>{
                                arrValues.push(select.value);
                            });

                            fetch('./envia_email/envia_email.php', {
                                //METODO DE ENVIO
                                method: 'POST',
                                //CONTEÚDO A SER ENVIDO
                                body: JSON.stringify({ 
                                    nome: arrValues[0],
                                    rg: arrValues[1],
                                    cpf: arrValues[2],
                                    mensagem: arrValues[16],
                                    data: dataFormatada(arrValues[3]),
                                    estado_civil: arrValues[17],
                                    rua: arrValues[4],
                                    estado: arrValues[18],
                                    cidade: arrValues[5],
                                    cep: arrValues[6],
                                    cargo: arrValues[7],
                                    empresa: arrValues[8],
                                    tempo_vinculo: arrValues[9],
                                    previsao_entrada: arrValues[10],
                                    fonte_renda: arrValues[15],
                                    proprio_negocio: arrValues[11],
                                    opcao_1: arrValues[12],
                                    opcao_2: arrValues[13],
                                    opcao_3: arrValues[14]
                                }),
                                //REQUISIÇÃO JSON
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8"
                                }
                            })
                            .then(res => res.json())
                            .then(data => {
                                if(data[1]){
                                    input.classList.add("verify-button");
                                    input.classList.remove("wrong-button");
                                    input.value = "Dados Enviados com sucesso!";
                                }

                                setTimeout(()=>{
                                    input.classList.remove("wrong-button");
                                    input.classList.remove("verify-button");
                                    input.value = "Enviar";
                                    // console.log(`\nARR: ${arrValues} \nBOOLEAN: ${boolValues}`);
                                },2000);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        }

                        input.value = "Enviando...";
                        break;                }
            });

            input.addEventListener(evt.change,()=>{
                input.value = input.value.trim();
            });

            input.addEventListener(evt.focusout, (evt)=>{
                input.classList.remove("border-focus");
            });

            input.addEventListener(evt.focusin, (evt)=>{
                input.classList.add("border-focus");
            });
        });

        text_area.addEventListener(evt.change,()=>{
            text_area.value = text_area.value.trim();
        });
    
        text_area.addEventListener(evt.focusin, (evt)=>{
            text_area.classList.add("border-focus");
        });
    
        text_area.addEventListener(evt.focusout, (evt)=>{
            text_area.classList.remove("border-focus");
        });
    });
}