import * as consts from "../consts.js";
import { playCritTheme } from "../lib.js";

export let socketlibSocket = undefined;

const setupSocket = () => {
    if (globalThis.socketlib){
        socketlibSocket = globalThis.socketlib.registerModule(consts.MODULE_NAME);
        socketlibSocket.register("playCritTheme", playCritTheme);
    }

    return !!globalThis.socketlib;
}

const playlistCheck = () => {
    if (!game.playlists.getName(consts.PLAYLIST_NAME)){
        const playlistToCreate = {
            "name": consts.PLAYLIST_NAME,
            "mode": -1
        }
        Playlist.create(playlistToCreate);
    }

}



export const Setup = {
    listen() {
        //need to wait until after setup to see if socketlib got loaded
        Hooks.once("setup", () => {
            if (!setupSocket()) {
                console.error("Unable to set up socketlib!"); 
                console.log(globalThis.socketlib);
            }
            playlistCheck();
        });
    }
}