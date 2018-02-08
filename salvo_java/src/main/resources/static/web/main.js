
$(() => {
  $.getJSON("../api/games", (data) => {
    list = data.map(function(game) {
      html = `<em>Game ${game.id} ${Date(game.creationDate)}:</em> `
      html += game.gamePlayers.map(x=>x.player.email).join(' <strong>vs</strong> ')
      return $('<li>').html(html)
    })
    console.log()
    $('ul').append(list)
  });
});
