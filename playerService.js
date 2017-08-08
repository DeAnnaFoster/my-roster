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


    loadTeamData();


    function saveTeam() {
        localStorage.setItem('myteam', JSON.stringify(myTeam));
    }

    function addPlayer(player) {
        myTeam.push(player);
        //TODO: add to roster
        saveTeam();
    }

    function removePlayer(id) {
        //myFish.splice(2, 1); // remove 1 item at 2-index position (that is, "drum")
       //debugger
        var index = -1;
        

        for(let i = 0; i < myTeam.length; i++){
            var playerId = myTeam[i].id;

            if(playerId == id){
                index = i;
                break;
            }
        }

        if(index != -1){
            myTeam.splice(index,1);
        }

        //TODO: remove from roster
        saveTeam();
    }

    function loadTeamData() {
        var localData = JSON.parse(localStorage.getItem('myteam')) || [];

        if (localData.length > 0) {
            myTeam = localData;
            // return callback(); //stops here if found.
            //callback(myTeam);
        }
        // }else{
        //     localStorage.setItem('myteam', JSON.stringify(myTeam));
        //     callback();
        // }       
    }

    this.getPlayerById = function (num) {
        for (let i = 0; i < playersData.length; i++) {
            if (playersData[i].id == num) {
                return playersData[i];
            }
        }
    }

    this.getMyTeam = function () {
        //return getTeam();
        //return [];
        //return true;
        //return getTeam(); 
        console.log(myTeam);
        return myTeam;
    }

    this.saveTeam = function () {
        saveTeam();
    }

    this.addPlayer = function (id) {
        addPlayer(id);
    }

    this.removePlayer = function (id) {
        removePlayer(id);
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
    // loadTeamData();


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


