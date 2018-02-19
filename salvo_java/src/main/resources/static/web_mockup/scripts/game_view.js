const crossSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"/></svg>'
const cellSize = 50;


function drawBoard(id) {
  $('#board-' + id).html('');
  rows = []
  for (let j = 0; j < 11; j++) {
    row = $('<div>', { class: 'board-row' })
    for (let c of ' ABCDEFGHIJ'.split('')) {
      cell = $('<div>', { class: 'board-cell' })
        .append(
          $('<div>', { class: 'overlay overlay-hit', html: crossSVG }),
          $('<div>', { class: 'overlay-mouse' })
        )
      if (j && c != ' ') cell.attr('id', `board-${id}-${c + j}`)
      else if (j == 0) cell.html(c)
      else if (j > 0 && c == ' ') cell.html(j)
      row.append(cell)
    }
    rows.push(row)
  }
  $('#board-' + id).append(rows)

}
function drawShips(ships) {
  for (let ship of ships) {
    for (let loc of ship.locations) {
      $(`#board-player-${loc}`).addClass('board-cell-ship')
    }
    let shipLoc = [ship.locations[0].charCodeAt(0) - 64, +ship.locations[0].match(/\d+/)[0]]
    let shipSize = [1 + ship.locations[ship.locations.length - 1].charCodeAt(0) - 64 - shipLoc[0],
    1 + +ship.locations[ship.locations.length - 1].match(/\d+/)[0] - shipLoc[1]]
    $('#board-player').append(
      $('<div>',
        {
          class: 'overlay-ship',
          style: `transform: translate(${shipLoc[0] * cellSize + 6}px, ${shipLoc[1] * cellSize + 6}px); height: ${shipSize[1] * cellSize - 2 - 12}px; width: ${shipSize[0] * cellSize - 2 - 12}px`
        }).append('<div>')
    )
  }
}


function drawSalvos(salvos, role) {
  for (let turn in salvos) {
    for (let loc of salvos[turn]) {
      $(`#board-${role}-${loc} .overlay`).addClass('hit')
        .append(turn)
    }
  }
}


function getGamePlayer(id) {
  $.getJSON(`../api/game_view/${id}`, (d) => {
    console.log(d)
    $('h1').html(`game_view ${id}`)
    $('.info').append([
      $('<p>', { html: `created: <em>${new Date(d.created).toLocaleString()}</em>` }),
    ])

    // draw

    for (let role of d.hasOwnProperty('opponent') ? ['player', 'opponent'] : ['player']) {
      $(`#title-${role}`).html(`${role} - ${d[role].player.email}`)
      drawBoard(role)
      drawSalvos(d.salvoes[d[role].id], (role.localeCompare('player') ? 'opponent' : 'player'))
    }

    // draw ships
    drawShips(d.ships)


    // draw salvoes

  }).fail(r => {
    switch (r.status) {
      case 404: $('h1').html(`<em>game_view${id}</em> not found`); break;
      case 401: $('h1').html(`User not authorized for <em>game_view?id=${id}</em>`); break;
      case 500: $('h1').html(`Internal error. Please contact server admin`); break;

    }
  })
}

$(() => {
  id = window.location.search.match(/id=([0-9]+)/) || null
  if (id) getGamePlayer(id[1])

})