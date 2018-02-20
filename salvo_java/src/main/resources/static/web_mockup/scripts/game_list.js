
function drawList(gameList, playerId, htmlId) {
  const list = gameList.sort((g1, g2) => g1.creationDate - g2.creationDate)
    .map(function (game, i) {
      li = $('<li>').append($('<em>').html(new Date(game.creationDate).toLocaleString()))
      game.gamePlayers.map(x =>
        x.player.id == playerId ?
          $('<a>', { html: $('<span>', { html: x.player.email }), href: `game_view.html?id=${x.id}` })
          :
          $('<span>', { html: x.player.email })
      ).forEach((x, i, t) => {
        li.append(x);
        if (i < t.length - 1) {
          li.append($('<strong>', { html: ' vs ' }))
        }
      })
      if (playerId && game.gamePlayers.length == 1 && !game.gamePlayers.some(x => x.player.id == playerId)) {
        li.append(
          $('<button>', { html: 'Join'})
            .data({ game_id: game.id })
            .on('click', function () {
              joinGame($(this).data().game_id)
            })
        )
      } else if (game.gamePlayers.every(gp => gp.hasOwnProperty('score'))) {
        if (game.gamePlayers.reduce((a, gp) => a + gp.score.score, 0) != 1) throw new Error("bad server data")
        let winner;
        switch (+game.gamePlayers[0].score.score) {
          case 0: winner = game.gamePlayers[1].player.email; break;
          case 0.5: winner = null; break;
          case 1: winner = game.gamePlayers[0].player.email; break;
        }
        li.append($('<br>'))
          .append(winner ? `Winner: ${winner}` : `Tie!`)
      }
      return li
    })
  $(`ol#${htmlId}`).html('')
    .append(list)
}


function drawGameList(rsp) {
  if (rsp.player) {
    // change navbar - bad structure TODO fix
    showLoginLogout(rsp.player.email)
    $('#game-list #button-create-game').addClass('active')
    $('#game-list #player-games-title').html(`<em>${rsp.player.email}</em>'s previous games`)
  } else {
    $('#game-list #button-create-game.active').removeClass('active');
    showLoginLogout(null)
    $('#game-list #player-games-title').html(`Log in to see your previous games`)
  }
  let playerId = rsp.player ? rsp.player.id : null
  drawList(rsp.active_games, playerId, 'active-games')
  drawList(rsp.past_games, playerId, 'past-games')

}


function getGameList() {

  $.getJSON("../api/games", response => {
    console.log(response)
    drawGameList(response)
  })
}

function createGame() {
  $.post('../api/games', response => {
    console.log(response);
    window.location.href = `./game_view.html?id=${response.id}`
  })

}

function joinGame(id) {
  console.log(id)
  $.post(`../api/game/${id}/players`, response => {
    console.log(response);
    window.location.href = `./game_view.html?id=${response.id}`
  })
}


$(() => {
  getGameList();
  $('#button-create-game').on('click', _ => createGame())

});
