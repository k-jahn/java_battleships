

function drawBoard(id) {
  $('#board-' + id).html('');
  rows = []
  for (let j = 0; j < 11; j++) {
    row = $('<div>', { class: 'board-row' })
    for (let c of ' ABCDEFGHIJ'.split('')) {
      cell = $('<div>', { class: 'board-cell' })
        .append(
          $('<div>', { class: 'overlay overlay-hit' }),
          // $('<div>', { class: 'overlay overlay-water' })
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
      $(`#board-player-${loc}`).addClass('ship')
    }
    // $(board).append($('<div>',{class:'ship',}))
  }
}


function drawSalvos(salvos,role) {
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
    $('h1').html(`View of game ${id}`)
    $('.info').append([
      $('<p>', { html: `created: <em>${new Date(d.created).toLocaleString()}</em>` }),
    ])
    
    // draw
    
    for (let role of d.hasOwnProperty('opponent') ? ['player', 'opponent']:['player']) {
      $(`#title-${role}`).html(`${role} - ${d[role].player.email}`)
       drawBoard(role)
       drawSalvos(d.salvoes[d[role].id], (role.localeCompare('player') ? 'opponent' : 'player'))
      }
    
    // draw ships
    drawShips(d.ships)
    
    
    // draw salvoes

  }).fail(() => $('h1').html(`gamePlayer ${id} not found`))
}

$(() => {
  id = window.location.search.match(/id=([0-9]+)/) || null
  if (id) getGamePlayer(id[1])

})