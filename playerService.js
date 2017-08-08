var PlayerService = function (endpointUri, callback) {

    //stores everything Here I'm grabbing it
    var playersData = JSON.parse(localStorage.getItem('playersData')) || [];

    //stores my team. Here I'm grabbing it
    var myTeam = [];

    //searches get stored here
    var tempSearch = [];

    //allowed positions and number of players each ?????
    var roster = {
        'TE': 1,
        'WR': 2,
        'RB': 2,
        'center': 1,
        'G': 2,
        'T': 2,
        'QB': 1
    };

    

    function saveTeam() {
        localStorage.setItem('myteam', JSON.stringify(myTeam));
    }

    function addPlayer(player) {
        myTeam.push(player);
        console.log(player);
        //TODO: add to roster
        saveTeam();
    }

    function removePlayer(player) {
        myTeam.pop(player);
        //TODO: remove from roster
        saveTeam();
    }

    function loadTeamData(){
        var localData = JSON.parse(localStorage.getItem('myteam')) || [];

        if (localData.length > 0) {
            myTeam = localData;
            // return callback(); //stops here if found.
            return callback(myTeam);
        }
        // }else{
        //     localStorage.setItem('myteam', JSON.stringify(myTeam));
        //     callback();
        // }       
    }



    function getTeam() {
        //return JSON.stringify(this.myTeam);
        return [];
    }

    this.getMyTeam = function () {
        //return getTeam();
        //return [];
        return true;
    }

    this.saveTeam = function () {
        saveTeam();
    }

    this.addPlayer = function (player) {
        addPlayer(player);
    }

    this.removePlayer = function (player) {
        removePlayer(player);
    }

    this.getPlayersByTeam = function (teamName) {
        tempSearch = [];
        tempSearch = playersData.filter(function (player) {
            if (player.pro_team == teamName) {
                return player;
            }
        })

        return tempSearch;
    }

    this.getPlayersByPosition = function (position) {
        tempSearch = [];
        tempSearch = playersData.filter(function (player) {
            if (player.position == position) {
                return player;
            }
        })
        return tempSearch;
    }

    this.getPlayersByName = function (name) {
        tempSearch = [];
        tempSearch = playersData.filter(function (player) {
            if (player.firstname == name || player.lastname == name) {
                return player;
            }
        })
        return tempSearch;
    }

    function loadPlayersData() {
        var localData = localStorage.getItem('playersData');

        if (localData) {
            playersData = JSON.parse(localData);
            // return callback(); //stops here if found.
            return callback(playersData);
        }

        var url = 'http://bcw-getter.herokuapp.com/?url=';
        var endpointUri = 'http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) { //does this combine  'get & then?'
            playersData = data.body.players;

            console.log('Player Data Ready');
            console.log('Writing Player Data to localStorge');

            localStorage.setItem('playersData', JSON.stringify(playersData));

            console.log('Finished Writing Player Data to localStorage');

            callback();  //the return to Controller call? Should it return playersData??
        })
    }

    loadPlayersData();
    loadTeamData();


    //this works
    // var tempp = this.getPlayersByName('Eric');
    // console.log(tempp);

    //this works
    // var tempp = this.getPlayersByPosition('WR');
    // console.log(tempp);

    //this works
    //var tempp = this.getPlayersByTeam('MIA');
    //console.log(tempp);
}


