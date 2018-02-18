
$(() => {
  $.getJSON("../api/games", (data) => {
    console.log(data);
    list = data.sort((g1, g2) => g1.creationDate - g2.creationDate)
      .map(function (game, i) {
        li = $('<li>').append($('<em>').html(new Date(game.creationDate).toLocaleString()))
        game.gamePlayers.map(x =>
          $('<a>', { html: $('<span>', { html: x.player.email }), href: `game_view.html?id=${x.id}`})
        ).forEach((x, i, t) => {
          li.append(x);
          if (i < t.length - 1) {
            li.append($('<strong>', { html: ' vs ' }))
          }
        })
        if (game.gamePlayers.every(gp => gp.hasOwnProperty('score'))) {
          if (game.gamePlayers.reduce((a,gp)=>a+gp.score.score,0)!=1) throw new Error("bad server data")
          let winner;
          switch(+game.gamePlayers[0].score.score) {
            case 0: winner = game.gamePlayers[1].player.email; break;
            case 0.5: winner = null; break;
            case 1: winner = game.gamePlayers[0].player.email; break;
          }
          li.append($('<br>'))
            .append( winner ? `Winner: ${winner}` : `Tie!`)
        }
        return li
      })
    $('ol').append(list)
  });
});
