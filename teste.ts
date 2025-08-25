import treatRecivedMessage from "./wtzp/modules/treatRecivedMessage";


// Simulando a mensagem recebida
const mockMessage = {
    from: "5575991012569@c.us",
    body: "#treino iniciar hoje"
};


treatRecivedMessage(mockMessage);
