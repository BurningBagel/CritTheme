import * as consts from "./consts.js";

async function critThemePlayer(soundToPlay,fadeSetting,fadeDuration,playlist,stopOtherSounds,resumeSounds){
  let werePlaying;
  const PLAY_DURATION = game.settings.get(consts.MODULE_NAME, 'play-time') * 1000;

  await soundToPlay.update({fade: fadeSetting ? fadeDuration : 0});

      if(stopOtherSounds) {
        werePlaying = await game.playlists.contents.filter(playlist=>playlist.playing).flatMap(playlist => playlist.sounds.contents).filter(sound => sound.playing);
        werePlaying.forEach(track => track.sound.pause());
      }
      playlist.playSound(soundToPlay);
      setTimeout(() => {
        playlist.stopSound(soundToPlay);
        if(stopOtherSounds && resumeSounds && werePlaying){
          werePlaying.forEach(track => track.sound.play());
        }
      }, PLAY_DURATION);
}


export async function playCritTheme(actor, type, outcome){
  if(type != consts.TYPE_ATTACK || type != consts.TYPE_SAVE) return;
  const fadeSetting = game.settings.get(consts.MODULE_NAME, 'fade-out');
  const fadeDuration = game.settings.get(consts.MODULE_NAME, 'fade-duration') * 1000; 
  const stopOtherSounds = game.settings.get(consts.MODULE_NAME, 'stop-other-sounds');
  const resumeSounds = game.settings.get(consts.MODULE_NAME, 'resume-sounds');
  const playlist = game.collections.getName("Playlists").getName(consts.PLAYLIST_NAME);

  
  if(!playlist){
    console.error("Playlist not found! Make sure you have a playlist named " + consts.PLAYLIST_NAME);
    return;
  }

  
  
  if(type == consts.TYPE_ATTACK && outcome == consts.OUTCOME_CRITICAL_SUCCESS){
    const critter = game.actors.get(actor);
    const soundToPlay = playlist.sounds.get(critter.getFlag('crit-theme', 'selectedTheme'))

    

    if(soundToPlay){
      critThemePlayer(soundToPlay,fadeSetting,fadeDuration,playlist,stopOtherSounds,resumeSounds)
    } 
  }
  else if(type == consts.TYPE_SAVE && outcome == consts.OUTCOME_CRITICAL_FAILURE){
    // in the case of a saving throw, we check if the origin actor has a theme set. If they don't, they're probably a monster so we skip it
    const critter = game.actors.get(actor.substring(6))
    const soundToPlay = playlist.sounds.get(critter.getFlag('crit-theme', 'selectedTheme'))
    
    if(soundToPlay){
      critThemePlayer(soundToPlay,fadeSetting,fadeDuration,playlist,stopOtherSounds,resumeSounds)
    }

  }
}


export async function createPromptWindow(userId){
  const options = [];
  const fields = foundry.applications.fields;
  const playlist = game.collections.getName("Playlists").getName(consts.PLAYLIST_NAME);
  
  if(!playlist){
    console.error("Playlist not found! Make sure you have a playlist named " + consts.PLAYLIST_NAME);
    return;
  }
    
  playlist.sounds.forEach( sound => {
    options.push({
      value: sound.id,
      label: sound.name
    });
  });
  
  let anchor = {options: options, name:'selectedTheme'};
  let selectInput = fields.createSelectInput(anchor);

  const dialog = await foundry.applications.api.DialogV2.input({
    window: { title: "Select Crit Theme for this character!"},
    content: `${selectInput.outerHTML}`
  })

  if (dialog) await game.actors.get(userId).setFlag('crit-theme', 'selectedTheme', dialog.selectedTheme);
}
  