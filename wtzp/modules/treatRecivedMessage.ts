import getDayExercise from "../../src/modules/gets/getDayExercise"
import errorMessage from "../messagesManagers/errorMessage"
import { sessionManager } from "../sessionsManagers/sessionManagers"
import formatPhone from "./formatPhone"

const treatRecivedMessage = async (msg: any) => {
    const session = sessionManager.getSession(msg.from)
    if (session.isSession) {
        sessionManager.resetSession(msg.from)
        return 
        if (msg.hasQuotedMsg) {
            if (session.folders === 0) {

            } else if (session.folders === 1) {

            }
        }

    } else {
        const tretedMessage = (msg.body).split(" ")[0].trim()
        //ativacao
        if (tretedMessage === "#treino") {
            const phone = await formatPhone(msg.from);
            const workout = await getDayExercise(undefined, phone?phone:undefined)
            console.log(workout)
            sessionManager.setSession(msg.from, {
                isSession: true,
                step: 0,
                flow: "gym",
                data: { exercises: workout }
            });
            console.log(sessionManager.getSession(msg.from))
        } else {
            errorMessage(msg.from)
        }
        //normal -fora de norma 
    }
}

export default treatRecivedMessage

