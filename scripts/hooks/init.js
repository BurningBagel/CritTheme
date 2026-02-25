import * as consts from "../consts.js";

export const Init = {
    listen() {
        Hooks.once("init", () => {
            game.settings.register(consts.MODULE_NAME, 'play-time', {
                name: 'Crit Song duration (seconds)',
                scope: 'world',     // "world" = sync to db, "client" = local storage
                config: true,       // false if you dont want it to show in module config
                type: Number,       // You want the primitive class, e.g. Number, not the name of the class as a string
                default: 5,
                requiresReload: false, // true if you want to prompt the user to reload
                filePicker: "any"
            });

            game.settings.register(consts.MODULE_NAME, 'fade-out', {
                name: 'Fade out',
                scope: 'world',
                config: true,
                type: Boolean,
                requiresReload: false,
            });

            game.settings.register(consts.MODULE_NAME, 'fade-duration', {
                name: 'Fade duration (seconds)',
                scope: 'world',
                config: true,
                type: Number,
                default: 2,
                requiresReload: false
            });

            game.settings.register(consts.MODULE_NAME, 'stop-other-sounds', {
                name: 'Stop other sounds when playing crit theme',
                scope: 'world',
                config: true,
                type: Boolean,
                default: false,
                requiresReload: false
            });

            game.settings.register(consts.MODULE_NAME, 'resume-sounds', {
                name: 'Resume stopped sounds after crit theme is done',
                scope: 'world',
                config: true,
                type: Boolean,
                default: false,
                requiresReload: false
            });


        });
    }
}