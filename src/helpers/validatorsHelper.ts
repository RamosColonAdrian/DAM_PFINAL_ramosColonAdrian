export function validateVoid (input: any) {
    if(input.length == 0){
      return "Todos los campos son requeridos"
    }else{
      return true
    }
}

export function validateVoidAndisNan (input: any) {
    if (input.length == 0) {
        return "Todos los campos son requeridos"
    } else if (isNaN(+input)) {
        return "Por favor introduzca un numero valido"
    } else {
        return true
    } 
}

export function validateDateAndVoid(input: any){
    if (input.length == 0) {
        return "Todos los campos son requeridos"
    } else if (!input.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/g)) {
        return "Por favor una fecha con formato valido"
    } else {
        return true
    } 
    
}