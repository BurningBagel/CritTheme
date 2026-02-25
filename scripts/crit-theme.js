//VERY BASIC FUNCTIONALITY DONE FINALLY
//https://github.com/GamerFlix/foundryvtt-api-guide/blob/main/macro_guide.md


//DID IT HERES HOW
/*
to create an object, first find an existing one to use as a template => .toObject() to see just the fields and no derived methods and such
then instantiate an object with the necessary data and call the create() method in the class of the relevant object type. For example, in making a playlist:
const playlist = { "name": "playlist name"}
Playlist.create(playlist);

*/


import {ModuleHooks} from "./hooks/index.js";

ModuleHooks.listenAll();
