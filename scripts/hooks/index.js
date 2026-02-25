
//this folder is separated by each different hook, and then this file imports the hook handlers and has them all start listening
import { Init } from "./init.js";
import { Setup } from "./setup.js";
import { GetActorSheetPF2eHeaderButtons } from "./getActorSheetPF2eHeaderButtons.js";
import { PreCreateChatMessage } from "./preCreateChatMessage.js";

export const ModuleHooks = {
    listenAll() {
        [
            Init,
            Setup,
            GetActorSheetPF2eHeaderButtons,
            PreCreateChatMessage
            
        ].forEach(listener => listener.listen());
    }
}


