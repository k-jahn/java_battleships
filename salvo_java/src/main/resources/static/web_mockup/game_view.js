function drawGame(ships) {
  // draw board
  $('.game').html('');
  rows = []
  for (let j = 0; j < 11; j++) {
    row = $('<div>',{class: 'board_row'})
    for (let c of ' ABCDEFGHIJ'.split('')) {
      cell = $('<div>',{class: 'board_cell'})
      if(j && c!=' ' ) cell.attr('id', 'board_'+c+j)
      else if (j == 0) cell.html(c)
      else if (j > 0 && c==' ') cell.html(j)
      row.append(cell)
    }
    rows.push(row)
  }
  $('.game').append(rows)

  // draw ships
  for (let ship of ships) {
    for (let loc of ship.locations) {
      $(`#board_${loc}`).addClass('ship')
    }
  $('.game').append($('<div>',{class:'ship',}))
  }
}

function getGamePlayer(id) {
  $.getJSON(`../api/game_view/${id}`, (d) => {
    console.log(d)
    $('h1').html(`View of game ${id}`)
    $('.info').append([
      $('<p>', { html: `game created: <em>${new Date(d.created).toLocaleString()}</em>` }),
      $('<p>', { html: `active player: <em>${d.activePlayer}</em>` })
    ])
    drawGame(d.ships)
  }).fail(() => $('h1').html(`gamePlayer ${id} not found`))
}

$(() => {
  id = window.location.search.match(/id=([0-9]+)/) || null
  if (id) getGamePlayer(id[1])

})