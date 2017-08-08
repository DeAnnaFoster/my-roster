function PlayerController() {

    var loading = true;
    var apiUrl = 'http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
    var playerService = new PlayerService(apiUrl, ready);//ready is a callback function I think
    var myType;

    function ready(playersData) {
        loading = false;
        //console.log('nfl length: ' + playersData.length)
        //drawPlayers(playersData);
    }

//#region blarg
    //     function ready(myteam) {
    //         loading = false;

    //         //var temp = [];
    //         //temp = playerService.getMyTeam();
    // console.log('myteam length: ' + myteam.length)

    //         if (myteam.length > 0) {
    //             drawMyPlayers(myteam);
    //         }
    //     //debugger
    //         drawMyPlayers(myteam);

    //     }
//#endregion

    //this is to draw searched for players
    function drawPlayers(searchedPlayers) {
        //debugger
        //console.log(searchedPlayers);
        if(searchedPlayers!=null){
            
        

        var template = ''

        for (let i = 0; i < searchedPlayers.length; i++) {
            let player = searchedPlayers[i];

            template += `
            <div class="player-card" id="${i}">
                <img src="${player.photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                <div>Name: ${player.fullname}</div>
                <div>Position: ${player.position}</div>
                <div>Team: ${player.pro_team}</div>
                <div class="add"><button onclick="app.controllers.playerController.addToMyTeam(${player})">Add</button></div>
            </div>
            `
        }

        document.getElementById('search-results').innerHTML = template;
        }
    }

    function drawMyPlayers() {
        var mine = playerService.getMyTeam();

        var template = ''

        for (let i = 0; i < mine.length; i++) {
            member = mine[i];

            template += `
            <div class="player-card" id="${i}">
                <div class="remove"><button onclick="app.controllers.playerController.removePlayer(${i})">Remove</button></div>
                <img src="${member.photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                <div>Name: ${member.fullname}</div>
                <div>Position: ${member.position}</div>
                <div>Team: ${member.pro_team}</div>
            </div>
            `
            document.getElementsByClassName('my-team').innerHTML = template;

        }
    }

    this.findByTeam = function (e) {
        event.preventDefault;
        var form = event.target;
        var find = form[0].value;

        var temp = playerService.getPlayersByTeam(find);
        drawPlayers(temp);
    }

    this.findByName = function (e) {
        event.preventDefault;
        var form = event.target;
        var find = form[0].value;

        var temp = playerService.getPlayersByName(find);
        drawPlayers(temp);
    }

    this.findByPosition = function (e) {
        event.preventDefault;
        var form = event.target;
        var find = form[0].value;

        var temp = playerService.getPlayersByPosition(find);
        drawPlayers(temp);
    }


    this.addToMyTeam = function (player) {
        var tmp = [{

            'firstname':"Bradley",
            'fullname':"Bradley Roby",
            'lastname':"Roby",
            'photo':"http://sports.cbsimg.net/images/football/nfl/players/170x170/1759561.png",
            'position':"DB",
            'pro_team':"DEN"
        }];




        var temp = playerService.addPlayer(tmp);
        drawMyPlayers();
    }

    this.loadMyTeam = function () {
        var temp = JSON.parse(playerService.getMyTeam());

        if (temp.length > 0) {
            drawMyPlayers();
        }
    }

    // var teamSF = playerService.getPlayersByTeam('SF');
    // drawPlayers(teamSF);
    //this.loadMyTeam();
    this.addToMyTeam();

}