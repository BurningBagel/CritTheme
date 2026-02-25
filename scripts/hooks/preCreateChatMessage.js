import * as consts from "../consts.js";
import { playCritTheme } from "../lib.js";
import { socketlibSocket } from "./setup.js";

export const PreCreateChatMessage = {
  listen() {
    Hooks.on("preCreateChatMessage", (chatMessagePF2e, author, action, id) => {
      try {
        const amIGM = game.user.isGM;
        const type = chatMessagePF2e.flags.pf2e.context.type;
        const outcome = chatMessagePF2e.flags.pf2e.context.outcome;
        const actor = author.speaker.actor;

        if (
          (type == consts.TYPE_ATTACK &&
            outcome == consts.OUTCOME_CRITICAL_SUCCESS) ||
          (type == consts.TYPE_SAVE &&
            outcome == consts.OUTCOME_CRITICAL_FAILURE)
        ) {
          if (amIGM) {
            playCritTheme(actor, type, outcome);
          } else {
            socketlibSocket.executeAsGM("playCritTheme", actor, type, outcome);
          }
        }
      } catch (error) {
        return;
      }
    });
  },
};
