function PlayerController() {

    var loading = true;
    var apiUrl = 'http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
    var playerService = new PlayerService(apiUrl, ready);//ready is a callback function I think
    var myType;

    function ready(playersData) {//??
        // var myteam = playerService.getMyTeam();

        // if (myteam != null) {
        //     drawMyPlayers(myteam);
        // }
        drawPlayers(playersData);
        loading = false;
    }

    //this is to draw searched for players
    function drawPlayers(playersData) {
        //console.log(playersData);

        var template = ''

        for (let i = 0; i < playersData.length; i++) {
            template += `
            <div class="player-card" id="${i}">
                <img src="${playersData[i].photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                <div>Name: ${playersData[i].fullname}</div>
                <div>Position: ${playersData[i].position}</div>
                <div>Team: ${playersData[i].pro_team}</div>
                <div class="add"><button onclick="app.controllers.playerController.addToMyTeam(${playersData[i]})">Add</button></div>
            </div>
            `
            document.getElementsByClassName('player-roster').innerHTML = template;

        }
    }

    function drawMyPlayers() {
        var template = ''

        for (let i = 0; i < playersData.length; i++) {
            template += `
            <div class="player-card" id="${i}">
                <div class="remove"><button onclick="app.controllers.playerController.removePlayer(${i})">Remove</button></div>
                <img src="${playersData[i].photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                <div>Name: ${playersData[i].fullname}</div>
                <div>Position: ${playersData[i].position}</div>
                <div>Team: ${playersData[i].pro_team}</div>
            </div>
            `
            document.getElementsByClassName('my-team').innerHTML = template;

        }

    }

    this.find = function (event) {  
        event.preventDefault;
        var form = event.target;
        var find = form[0].value;

        myType = find;
        console.log(find);
    }


    this.findByTeam = function (e) {
        event.preventDefault;
        var form = event.target;
        var find = form[0].value;
debugger
        var temp = playerService.getPlayersByTeam(myType);
        console.log(temp);
        drawPlayers(temp);

    }

    this.findByName = function () {
 

        var temp = playerService.getPlayersByName(myType);
        drawPlayers(temp);
    }

    this.findByPosition = function () {
        // event.preventDefault;
        // var form = event.target;
        // var find = form.target.searchTerm.value;

        var temp = playerService.getPlayersByPosition(myType);
        drawPlayers(temp);
    }


    this.addToMyTeam = function (player) {
        var temp = playerService.addPlayer();
        drawPlayers(temp);
    }

    // $('some-button').on('click', function(){
    //     var teamSF = playerService.getPlayersByTeam('SF');
    // })



}