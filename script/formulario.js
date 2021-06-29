
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const enviar = document.querySelector("#enviar");
const cartel = document.querySelector("#cartel");

const checkInput = () => {
    if (email.value !== "" && message.value !== "") {
        enviar.disabled = "";
        
        enviar.addEventListener("click", function(event){
            event.preventDefault();
            
            emailjs.send('service_fuu3gf5', 'template_0pp4afc')
            .then(function(response) {
                cartel.append(`Se ha enviado correctamente!`); 
                cartel.style.border = "1px solid lightgrey";
                cartel.style.padding = "10px";
                console.log('SUCCESS...', response.status, response.text);
                setTimeout(() => {
                    cartel.style.display = "none";
                }, 2000);
            }, function(error) {
                cartel.append(`No se pudo enviar correctamente`);
                console.log('FAIL...', error);
                setTimeout(() => {
                    cartel.style.display = "none";
                }, 2000);
            });
            message.value = "";
            email.value = "";
            enviar.disabled = "disabled";
        });
    } else {
        enviar.disabled = "disabled";
    }
}

email.addEventListener("change", checkInput );
message.addEventListener("change", checkInput);