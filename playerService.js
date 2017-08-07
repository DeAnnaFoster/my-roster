var PlayerService = function (endpointUri, callback) {

    var playersData = [];

    this.getPlayersByTeam = function (teamName) {
        playersData.filter(function (player) {
            if (player.team == teamName) {
                return true;
            }
        })
    }

    this.getPlayersByPosition = function (position) {
        playersData.filter(function (player) {
            if (player.position == position) {
                return true;
            }
        })
    }

    function loadPlayersData() {
        console.log('Trying this again');

        var localData = localStorage.getItem('playersData');

        if (localData) {
            playersData = JSON.parse(localData);
            // return callback(); //stops here if found.
            return playersData;
        }

        var url = 'http://bcw-getter.herokuapp.com/?url=';
        var endpointUri = 'http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
        var apiUrl = url + encodeURIComponent(endpointUri);

        console.log(apiUrl);//apiUrl

        $.getJSON(endpointUri, function (data) { //does this combine  'get & then?'
            playersData = data.body.players;




            console.log('Player Data Ready');
            console.log('Writing Player Data to localStorge');

            localStorage.setItem('playersData', JSON.stringify(playersData));

            console.log('Finished Writing Player Data to localStorage');
            callback(playersData);  //the return to Controller call? Should it return playersData??
        })

        // $.get(baseUrl + query + apiKey).then(function (res) {
        //   marvelResults = res.data.results;
        //   cb(res.data.results);
        // })
    }




    loadPlayersData();
}


