var PlayerService = function (endpointUri, callback) {

    //stores everything in playersData
    var playersData = JSON.parse(localStorage.getItem('playersData')) || [];

    //stores my team. 
    var myTeam = [];

    //searches get stored here
    var tempSearch = [];

    loadTeamData();

    function saveTeam() {
        localStorage.setItem('myteam', JSON.stringify(myTeam));
    }

    getPlayerIndex = function (player) {
        var index = -1;

        for (let i = 0; i < myTeam.length; i++) {
            if (myTeam[i].id == player.id) {
                index = i;
                break;
            }
        }

        return index;
    }

    //Shoot for one player each position type.
    findPlayerByPosition = function (player) {
        var index = -1;

        for (let i = 0; i < myTeam.length; i++) {
            if (player.position == myTeam[i].position) {
                index = i;
                break;
            }
        }

        return index;
    }

    function addPlayer(player) {
        //get player id to see if already in array - only one instance
        var index = getPlayerIndex(player);

        if (index != -1) {
            console.log('Only one instance of a player allowed.');
            return;
        }

        //check team size
        if (myTeam.length < 11) {

            //Shoot for one player each position type. if no others, push and save
            if (findPlayerByPosition(player) == -1) {
                myTeam.push(player);
                //TODO: add to roster
                saveTeam();
            } else {
                console.log('Only one of each player type allowed.');
            }
        } else {
            console.log('Only team size of 11 allowed.');
        }

    }

    function removePlayer(id) {
        var index = -1;

        for (let i = 0; i < myTeam.length; i++) {
            var playerId = myTeam[i].id;

            if (playerId == id) {
                index = i;
                break;
            }
        }

        if (index != -1) {
            myTeam.splice(index, 1);
        }

        saveTeam();
    }

    function loadTeamData() {
        var localData = JSON.parse(localStorage.getItem('myteam')) || [];

        if (localData.length > 0) {
            myTeam = localData;
        }
    }

    this.getPlayerById = function (num) {
        for (let i = 0; i < playersData.length; i++) {
            if (playersData[i].id == num) {
                return playersData[i];
            }
        }
    }

    this.saveTeam = function () {
        saveTeam();
        //localStorage.setItem('myteam', JSON.stringify(myTeam));
    }

    this.addPlayer = function (player) {
        addPlayer(player);
    }

    this.removePlayer = function (id) {
        removePlayer(id);
    }



    this.getMyTeam = function () {
        return myTeam;
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
            return callback(playersData);//
        }

        //endpointUri & url http: http:
        var url = 'https://bcw-getter.herokuapp.com/?url=';
        var endpointUri = 'https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
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


}


