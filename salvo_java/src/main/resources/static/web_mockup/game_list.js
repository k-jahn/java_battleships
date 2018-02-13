
$(() => {
  $.getJSON("../api/games", (data) => {
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

        return li
      })
    $('ol').append(list)
  });
});
