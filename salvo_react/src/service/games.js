import axios from 'axios';

const apiUrl = "localhost:8080/api"

class GamesService {
  constructor() {
    this.getActiveGamesFromServer = () => {
      const gameData = JSON.parse('{"active_games":[{"id":95,"creationDate":1519136070047,"gamePlayers":[{"id":180,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":181,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}}]},{"id":10,"creationDate":1519137176047,"gamePlayers":[{"id":16,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":17,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":98,"creationDate":1519137765047,"gamePlayers":[{"id":185,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}},{"id":186,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":3,"creationDate":1519139636047,"gamePlayers":[{"id":5,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":6,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":52,"creationDate":1519140321047,"gamePlayers":[{"id":98,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}},{"id":99,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":93,"creationDate":1519141367047,"gamePlayers":[{"id":176,"player":{"id":8,"email":"j.bauer@ctu.gov"}},{"id":177,"player":{"id":12,"email":"leela@planet-express.com"}}]},{"id":35,"creationDate":1519141474047,"gamePlayers":[{"id":65,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":66,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":60,"creationDate":1519141751047,"gamePlayers":[{"id":113,"player":{"id":7,"email":"t.almeida@ctu.gov"}}]},{"id":72,"creationDate":1519142207047,"gamePlayers":[{"id":136,"player":{"id":14,"email":"bender@kissmy-sma.com"}}]},{"id":92,"creationDate":1519142323047,"gamePlayers":[{"id":174,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":175,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":89,"creationDate":1519143656047,"gamePlayers":[{"id":168,"player":{"id":10,"email":"morty_s@gmail.com"}},{"id":169,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":85,"creationDate":1519148567047,"gamePlayers":[{"id":160,"player":{"id":8,"email":"j.bauer@ctu.gov"}},{"id":161,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":28,"creationDate":1519149070047,"gamePlayers":[{"id":51,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}},{"id":52,"player":{"id":14,"email":"bender@kissmy-sma.com"}}]},{"id":76,"creationDate":1519149451047,"gamePlayers":[{"id":143,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":144,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}}]},{"id":50,"creationDate":1519151133047,"gamePlayers":[{"id":94,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":95,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":33,"creationDate":1519152733047,"gamePlayers":[{"id":61,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":62,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":63,"creationDate":1519153264047,"gamePlayers":[{"id":118,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":119,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":44,"creationDate":1519154182047,"gamePlayers":[{"id":82,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":83,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}}]},{"id":73,"creationDate":1519154674047,"gamePlayers":[{"id":137,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":138,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":48,"creationDate":1519155149047,"gamePlayers":[{"id":90,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":91,"player":{"id":14,"email":"bender@kissmy-sma.com"}}]},{"id":79,"creationDate":1519160187047,"gamePlayers":[{"id":149,"player":{"id":1,"email":"c.obrian@ctu.gov"}},{"id":150,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":11,"creationDate":1519160954047,"gamePlayers":[{"id":18,"player":{"id":1,"email":"c.obrian@ctu.gov"}},{"id":19,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":45,"creationDate":1519163027047,"gamePlayers":[{"id":84,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":85,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":67,"creationDate":1519164909047,"gamePlayers":[{"id":126,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}},{"id":127,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}}]},{"id":26,"creationDate":1519170213047,"gamePlayers":[{"id":47,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}},{"id":48,"player":{"id":12,"email":"leela@planet-express.com"}}]},{"id":16,"creationDate":1519171231047,"gamePlayers":[{"id":28,"player":{"id":14,"email":"bender@kissmy-sma.com"}},{"id":29,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":84,"creationDate":1519171280047,"gamePlayers":[{"id":158,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}},{"id":159,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}}]},{"id":27,"creationDate":1519173213047,"gamePlayers":[{"id":49,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":50,"player":{"id":14,"email":"bender@kissmy-sma.com"}}]},{"id":21,"creationDate":1519174495047,"gamePlayers":[{"id":37,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":38,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":70,"creationDate":1519177154047,"gamePlayers":[{"id":132,"player":{"id":8,"email":"j.bauer@ctu.gov"}},{"id":133,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":83,"creationDate":1519179727047,"gamePlayers":[{"id":156,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":157,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":61,"creationDate":1519180346047,"gamePlayers":[{"id":114,"player":{"id":10,"email":"morty_s@gmail.com"}},{"id":115,"player":{"id":8,"email":"j.bauer@ctu.gov"}}]},{"id":1,"creationDate":1519180607047,"gamePlayers":[{"id":1,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":2,"player":{"id":12,"email":"leela@planet-express.com"}}]},{"id":56,"creationDate":1519181739047,"gamePlayers":[{"id":106,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":107,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":71,"creationDate":1519181956047,"gamePlayers":[{"id":134,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":135,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}}]},{"id":77,"creationDate":1519187127047,"gamePlayers":[{"id":145,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":146,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":86,"creationDate":1519187249047,"gamePlayers":[{"id":162,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}},{"id":163,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":80,"creationDate":1519188664047,"gamePlayers":[{"id":151,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":152,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":17,"creationDate":1519192667047,"gamePlayers":[{"id":30,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":31,"player":{"id":7,"email":"t.almeida@ctu.gov"}}]},{"id":5,"creationDate":1519194192047,"gamePlayers":[{"id":8,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}},{"id":9,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":30,"creationDate":1519195633047,"gamePlayers":[{"id":55,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":56,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":90,"creationDate":1519196708047,"gamePlayers":[{"id":170,"player":{"id":14,"email":"bender@kissmy-sma.com"}},{"id":171,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}}]},{"id":7,"creationDate":1519197507047,"gamePlayers":[{"id":11,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":40,"creationDate":1519198213047,"gamePlayers":[{"id":75,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":22,"creationDate":1519201215047,"gamePlayers":[{"id":39,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":40,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":4,"creationDate":1519202522047,"gamePlayers":[{"id":7,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":8,"creationDate":1519203791047,"gamePlayers":[{"id":12,"player":{"id":10,"email":"morty_s@gmail.com"}},{"id":13,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":14,"creationDate":1519208055047,"gamePlayers":[{"id":24,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":25,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":69,"creationDate":1519208990047,"gamePlayers":[{"id":130,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}},{"id":131,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":34,"creationDate":1519210242047,"gamePlayers":[{"id":63,"player":{"id":8,"email":"j.bauer@ctu.gov"}},{"id":64,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":55,"creationDate":1519210473047,"gamePlayers":[{"id":104,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":105,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":43,"creationDate":1519210941047,"gamePlayers":[{"id":80,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}},{"id":81,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}}]},{"id":94,"creationDate":1519212730047,"gamePlayers":[{"id":178,"player":{"id":1,"email":"c.obrian@ctu.gov"}},{"id":179,"player":{"id":12,"email":"leela@planet-express.com"}}]},{"id":88,"creationDate":1519215997047,"gamePlayers":[{"id":166,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":167,"player":{"id":7,"email":"t.almeida@ctu.gov"}}]},{"id":66,"creationDate":1519217148047,"gamePlayers":[{"id":124,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":125,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":51,"creationDate":1519219809047,"gamePlayers":[{"id":96,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":97,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":41,"creationDate":1519222128047,"gamePlayers":[{"id":76,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}},{"id":77,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":87,"creationDate":1519222224047,"gamePlayers":[{"id":164,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":165,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":49,"creationDate":1519222880047,"gamePlayers":[{"id":92,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":93,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}}]},{"id":25,"creationDate":1519223816047,"gamePlayers":[{"id":45,"player":{"id":1,"email":"c.obrian@ctu.gov"}},{"id":46,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":97,"creationDate":1519223978047,"gamePlayers":[{"id":184,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":29,"creationDate":1519224526047,"gamePlayers":[{"id":53,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}},{"id":54,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":19,"creationDate":1519228648047,"gamePlayers":[{"id":33,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}},{"id":34,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":99,"creationDate":1519231171047,"gamePlayers":[{"id":187,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":188,"player":{"id":7,"email":"t.almeida@ctu.gov"}}]},{"id":20,"creationDate":1519232101047,"gamePlayers":[{"id":35,"player":{"id":10,"email":"morty_s@gmail.com"}},{"id":36,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}}]},{"id":68,"creationDate":1519232192047,"gamePlayers":[{"id":128,"player":{"id":8,"email":"j.bauer@ctu.gov"}},{"id":129,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":47,"creationDate":1519235126047,"gamePlayers":[{"id":88,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":89,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":53,"creationDate":1519236013047,"gamePlayers":[{"id":100,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":101,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":15,"creationDate":1519236559047,"gamePlayers":[{"id":26,"player":{"id":14,"email":"bender@kissmy-sma.com"}},{"id":27,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":37,"creationDate":1519239115047,"gamePlayers":[{"id":69,"player":{"id":7,"email":"t.almeida@ctu.gov"}},{"id":70,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}}]},{"id":18,"creationDate":1519239122047,"gamePlayers":[{"id":32,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":65,"creationDate":1519241010047,"gamePlayers":[{"id":122,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":123,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":38,"creationDate":1519247893047,"gamePlayers":[{"id":71,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":72,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":58,"creationDate":1519249144047,"gamePlayers":[{"id":110,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":75,"creationDate":1519250988047,"gamePlayers":[{"id":141,"player":{"id":14,"email":"bender@kissmy-sma.com"}},{"id":142,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":2,"creationDate":1519251966047,"gamePlayers":[{"id":3,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":4,"player":{"id":7,"email":"t.almeida@ctu.gov"}}]},{"id":81,"creationDate":1519254901047,"gamePlayers":[{"id":153,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":23,"creationDate":1519258443047,"gamePlayers":[{"id":41,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":42,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":42,"creationDate":1519263276047,"gamePlayers":[{"id":78,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}},{"id":79,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":82,"creationDate":1519267342047,"gamePlayers":[{"id":154,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":155,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":100,"creationDate":1519269471047,"gamePlayers":[{"id":189,"player":{"id":7,"email":"t.almeida@ctu.gov"}}]},{"id":91,"creationDate":1519270926047,"gamePlayers":[{"id":172,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":173,"player":{"id":14,"email":"bender@kissmy-sma.com"}}]},{"id":74,"creationDate":1519274631047,"gamePlayers":[{"id":139,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}},{"id":140,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}}]},{"id":57,"creationDate":1519275922047,"gamePlayers":[{"id":108,"player":{"id":10,"email":"morty_s@gmail.com"}},{"id":109,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":12,"creationDate":1519279863047,"gamePlayers":[{"id":20,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}},{"id":21,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":62,"creationDate":1519285121047,"gamePlayers":[{"id":116,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}},{"id":117,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":64,"creationDate":1519285895047,"gamePlayers":[{"id":120,"player":{"id":3,"email":"alan.turing@blechtly-park.org.uk"}},{"id":121,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}}]},{"id":24,"creationDate":1519286044047,"gamePlayers":[{"id":43,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}},{"id":44,"player":{"id":11,"email":"p.fry@planet-express.com"}}]},{"id":32,"creationDate":1519286670047,"gamePlayers":[{"id":59,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":60,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":46,"creationDate":1519287552047,"gamePlayers":[{"id":86,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":87,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":31,"creationDate":1519287756047,"gamePlayers":[{"id":57,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}},{"id":58,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}}]},{"id":39,"creationDate":1519289001047,"gamePlayers":[{"id":73,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}},{"id":74,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":78,"creationDate":1519293344047,"gamePlayers":[{"id":147,"player":{"id":12,"email":"leela@planet-express.com"}},{"id":148,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":9,"creationDate":1519293795047,"gamePlayers":[{"id":14,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":15,"player":{"id":10,"email":"morty_s@gmail.com"}}]},{"id":96,"creationDate":1519298159047,"gamePlayers":[{"id":182,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}},{"id":183,"player":{"id":1,"email":"c.obrian@ctu.gov"}}]},{"id":54,"creationDate":1519298339047,"gamePlayers":[{"id":102,"player":{"id":9,"email":"r.sanchez.c288@citadel.or"}},{"id":103,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}}]},{"id":36,"creationDate":1519300384047,"gamePlayers":[{"id":67,"player":{"id":5,"email":"sid.vicious@pistols.co.uk"}},{"id":68,"player":{"id":13,"email":"h.farnsworth@planet-express.com"}}]},{"id":13,"creationDate":1519302815047,"gamePlayers":[{"id":22,"player":{"id":11,"email":"p.fry@planet-express.com"}},{"id":23,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]},{"id":59,"creationDate":1519303332047,"gamePlayers":[{"id":111,"player":{"id":4,"email":"benoit.mandelbrot@fractal.pl"}},{"id":112,"player":{"id":6,"email":"d.palmer@whitehouse.gov"}}]},{"id":6,"creationDate":1519307370047,"gamePlayers":[{"id":10,"player":{"id":2,"email":"vladimir.ilyich.ulyanov@lenin.com"}}]}],"past_games":[],"player":null}')
      return gameData.active_games

  }

    // return null
  }
}

export default GamesService;