const name = document.getElementById("nombre");
const topic = document.getElementById("tema");
const query = document.getElementById("consulta");
const tyc = document.getElementById("tyc");
const attachment = document.getElementById("adjunto")


const validateName = function () {    
    const iderr = "error-nombre"
    if (name.value.trim() === ""){
        showInvalid(name,iderr)
        return false
    }
    showValid(name,iderr)
    return true
}
const validateTopic = function () {
    const iderr = "error-tema"
    if (topic.value.trim() === "") {        
        showInvalid(topic,iderr)
        return false
    }
    showValid(topic,iderr)
    return true
}
const validateQuery = function () {
    const iderr = "error-consulta"
    if (query.value.trim() === "") {        
        showInvalid(query,iderr)
        return false
    }
    showValid(query,iderr)
    return true
}

const validateTyc = function () {
    const iderr = "error-tyc"
    if (!tyc.checked) {        
        showInvalid(tyc,iderr)
        return false
    }
    showValid(tyc,iderr)
    return true
}
const validateFormat = function(fileName){
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i
    return allowedExtensions.test(fileName)
}
const validateFile = function () {     
    const iderr = "error-adjunto"
    if (!(attachment && validateFormat(attachment.value))) {        
        showInvalid(tyc,iderr)
        return false
    }
    showValid(tyc,iderr)
    return true
}

const showValid = function(imput,errorId) {
    imput.classList.remove("invalid");
    imput.classList.add("valid");
    document.getElementById(errorId).style.display = "none";
}

const showInvalid = function (imput,errorId) {
    imput.classList.remove("valid");
    imput.classList.add("invalid");
    document.getElementById(errorId).style.display = "block";
}


const validateForm = function () {
    let isValid = true
    if (!validateName()) {
        isValid = false
    }

    if (!validateTopic()) {        
        isValid = false
    }

    if (!validateQuery()) {
        isValid = false
    }

    if (!validateTyc()) {
        isValid = false
    }

    if (!validateFile()) {
        isValid = false
    }
    return isValid
}

export const loadEventContactSubmit = function () {
    var formulario = document.getElementById("contact-form");
    formulario.addEventListener("submit", function (event) {
        if (!validateForm()) {
            event.preventDefault()
        }else{
            event.preventDefault()
            alert("Su mensaje fue enviado!")
        }
    })
    name.addEventListener("input", function() {
        validateName()
    })
    topic.addEventListener("input", function() {
        validateTopic()
    })
    query.addEventListener("input", function() {
        validateQuery()
    })
    tyc.addEventListener("change", function() {
        validateTyc()
    })
}