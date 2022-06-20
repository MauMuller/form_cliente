{
    "use strict";

    const chars = ["!","@","#","$","%","¨","&","*","(",")","+"];
    let lastLetter;
    
    function noSpecialChars(value){
        lastLetter = value.substr(value.length-1, value.length);
        let result;
    
        for(let i=0; i<chars.length; i++){
            if(chars[i] === lastLetter){
                result = value.substr(0,value.length-1);
                break;
            } else {
                result = value;
            }
        }
        return result;
    }
    
    function noNumbersChars(value){
        lastLetter = value.substr(value.length-1, value.length);
        let result;

        if(!isNaN(parseInt(lastLetter))){
            result = value.substr(0,value.length-1);
        } else {
            result = value;
        }
        
        return result;
    }
    
    function onlyNumbers(value){
        lastLetter = value.substr(value.length-1, value.length);
        let result;

        if(isNaN(lastLetter)){
            result = value.substr(0,value.length-1);
        } else {
            result = value;
        }
        
        return result;
    }

    function isPhone(phone){
        let ddd = phone.substr(phone.indexOf("(")+1,phone.indexOf(")")-1);
        let prefixo = phone.substr(phone.indexOf(")")+1,phone.indexOf("-"));
        let sufixo = phone.substr(phone.indexOf("-")+1,phone.length);

        if(prefixo.length > 5){
            prefixo = prefixo.slice(0,prefixo.indexOf("-"));
        }

        if(ddd.length === 2 && prefixo.length === 5 && (sufixo.length > 2 && sufixo.length < 5)){
            return true;
        }else{
            return false;
        }
    }

    function maskPhone(phone){
        switch(phone.length){
            case 1:
                phone = `(${phone}`;
                break;
            case 3:
                phone = `${phone})`;
                break;
            case 9:
                phone = `${phone}-`;
        }
        return phone;
    }

    function maskCPF(event_cpf){
        switch(event_cpf.length){
            case 3:
                event_cpf = `${event_cpf}.`;
                break;
            case 7:
                event_cpf = `${event_cpf}.`;
                break;
            case 11:
                event_cpf = `${event_cpf}-`;
                break;
            default:
                event_cpf = event_cpf;
                break;
        }
        return event_cpf;
    }

    function maskRG(event_rg){
        switch(event_rg.length){
            case 2:
                event_rg = `${event_rg}.`;
                break;
            case 6:
                event_rg = `${event_rg}.`;
                break;
            case 10:
                event_rg = `${event_rg}-`;
                break;
            default:
                event_rg = event_rg;
                break;
        }
        return event_rg;
    }

    function maskCNPJ(event_cnpj){
        switch(event_cnpj.length){
            case 2:
                event_cnpj = `${event_cnpj}.`;
                break;
            case 6:
                event_cnpj = `${event_cnpj}.`;
                break;
            case 10:
                event_cnpj = `${event_cnpj}/`;
                break;
            case 15:
                event_cnpj = `${event_cnpj}-`;
                break;
            default:
                event_cnpj = event_cnpj;
                break;
        }
        return event_cnpj;
    }

    function maskCEP(event_cep){
        switch(event_cep.length){
            case 5:
                event_cep = `${event_cep}-`;
                break;
            default:
                event_cep = event_cep;
                break;
        }
        return event_cep;
    }

    function maskMoney(value){
        let money = 'R$';

        if(value.length === 1){
            value = `${money} ${value}`;
        }

        return value;
    }

    function dataFormatada(data){
        let dia = data.substr(data.length-2,data.length);
        let ano = data.substr(0,data.indexOf('-'));
        let mes = data.substr(ano.length+1,dia.length);
        
        // console.log(dia+'/'+mes+'/'+ano);
        return `${dia}/${mes}/${ano}`;
    }

    function isCEP(value){  
        let line = value.substr(0, value.indexOf('-'));
        let afterLine = value.substr(value.indexOf('-')+1,value.length);
        // console.log(line.length);
        // console.log(afterLine.length);


        if(line.length===5 && afterLine.length >= 3){
            return true;
        } else {
            return false;
        }
    }

    function isRG(value){  
        let dot = value.substr(0, value.indexOf('.'));
        let dot2 = value.substr(value.indexOf('.'), value.indexOf('.')+1);
        let final = value.substr(11,value.length);

        // console.log(dot.length+' '+dot2.length+' '+final.length);

        if(dot.length === 2 && dot2.length === 3 && final.length >= 1){
            return true;
        } else {
            return false;
        }
    }

    function isCPF(value){  
        let dot = value.substr(0, value.indexOf('.'));
        let dot2 = value.substr(value.indexOf('.')+1, value.indexOf('.'));
        let final = value.substr(12,value.length);

        // console.log(dot.length+' '+dot2.length+' '+final.length);

        if(dot.length === 3 && dot2.length === 3 && final.length >= 2){
            return true;
        } else {
            return false;
        }
    }

    function maxLength(value, ind_value){
        let result;
        switch(ind_value){
            case 0: case 4: case 5: case 7: case 8: case 13:
                result = value.length === "" || value.length < 1 ? false : true;
                break;
            case 1:
                result = value.length > 12 ? value.substr(0,value.length-1) : value;
                break;
            case 2:
                result = value.length > 14 ? value.substr(0,value.length-1) : value;
                break;
            case 6:
                result = value.length > 9 ? value.substr(0,value.length-1) : value;
                break;
        }
        return result;
    }

    function isEmail(email){
        let user = email.substr(0,email.indexOf("@"));
        let domain = email.substr(email.indexOf("@")+1,email.length);

        if(user.length >= 1 && 
            domain.length >= 3 && 
            user.search("@")==-1 && 
            domain.search("@")==-1 &&
            domain.search(".")!= -1 &&
            domain.indexOf("." >= 1) &&
            domain.lastIndexOf(".") < domain.length - 1){
            return true;
        } else {
            return false;
        }
    }

    function isCNPJ(value) {
        if (!value) return false
    
        // Aceita receber o valor como string, número ou array com todos os dígitos
        const isString = typeof value === 'string'
        const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
    
        // Elimina valor em formato inválido
        if (!validTypes) return false
    
        // Filtro inicial para entradas do tipo string
        if (isString) {
        // Limita ao máximo de 18 caracteres, para CNPJ formatado
        if (value.length > 18) return false
    
        // Teste Regex para veificar se é uma string apenas dígitos válida
        const digitsOnly = /^\d{14}$/.test(value)
        // Teste Regex para verificar se é uma string formatada válida
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
    
        // Se o formato é válido, usa um truque para seguir o fluxo da validação
        if (digitsOnly || validFormat) true
        // Se não, retorna inválido
        else return false
        }
    
        // Guarda um array com todos os dígitos do valor
        const match = value.toString().match(/\d/g)
        const numbers = Array.isArray(match) ? match.map(Number) : []
    
        // Valida a quantidade de dígitos
        if (numbers.length !== 14) return false
        
        // Elimina inválidos com todos os dígitos iguais
        const items = [...new Set(numbers)]
        if (items.length === 1) return false
    
        // Cálculo validador
        const calc = (x) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0
    
        for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
        }
    
        const result = 11 - (sum % 11)
    
        return result > 9 ? 0 : result
        }
    
        // Separa os 2 últimos dígitos de verificadores
        const digits = numbers.slice(12)
        
        // Valida 1o. dígito verificador
        const digit0 = calc(12)
        if (digit0 !== digits[0]) return false
    
        // Valida 2o. dígito verificador
        const digit1 = calc(13)
        return digit1 === digits[1]
    }
}