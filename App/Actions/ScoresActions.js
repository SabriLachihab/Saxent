import Types from './Types'

export function addNewPlayer(infoPlayer){
    return {
      type: Types.ADD_NEW_PLAYER,
      infoPlayer: infoPlayer
    }
  }

  export function playAgain(infoplayer) {
    return {
      type: Types.PLAY_AGAIN,
      infoplayer: infoplayer,
    }
  }