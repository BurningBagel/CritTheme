import { createPromptWindow} from "../lib.js";

export const GetActorSheetPF2eHeaderButtons = {
    listen() {
        Hooks.on("getActorSheetPF2eHeaderButtons", (sheet, buttons) => {
            if(!game.user.isGM) return;
            buttons.splice(0,0,{
                class: "test",
                icon: "fa-solid fa-music",
                label: "Crit Theme",
                onclick: () => {createPromptWindow(sheet.actor.id)}
            })
        });
    }
}
