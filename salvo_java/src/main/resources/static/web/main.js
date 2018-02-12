
$(() => {
  $.getJSON("../api/games", (data) => {
    list = data.sort((g1, g2) => g1.creationDate-g2.creationDate)
      .map(function (game, i) {
        html = `${i+1}. <em> ${new Date(game.creationDate).toLocaleString()}:</em> `
        html += game.gamePlayers.map(x => x.player.email).join(' <strong>vs</strong> ')
        return $('<li>').html(html)
      })
    $('ul').append(list)
  });
});
