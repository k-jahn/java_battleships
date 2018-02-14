
function drawStandingsTable(players) {
  let tableRows = []
  players.sort((a, b) => b.score-a.score).forEach((player,i,arr) => {
    tableRows.push(
      $('<tr>').append(
        $('<td>',{html:arr.map(x=>x.score).indexOf(player.score)+1}),
        $('<td>',{html:player.email}),
        $('<td>',{html:player.score}),
        $('<td>',{html:player.wins}),
        $('<td>',{html:player.losses}),
        $('<td>',{html:player.ties}),
      )
  )

  });
  $('tbody').append(tableRows)
}

$(_ => {


  $.getJSON('../api/standings', (response) => {
    console.log(response)
    drawStandingsTable(response)
  })


});