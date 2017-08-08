function PlayerController() {
    var loading = true;
    var apiUrl = 'http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
    var playerService = new PlayerService(apiUrl, ready);//ready is a callback function I think
    var myType;

    function ready(playersData) {
        loading = false;
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
        if (searchedPlayers != null) {

            var template = '';

            for (let i = 0; i < searchedPlayers.length; i++) {
                let player = searchedPlayers[i];

                template += `
            <div class="player-card" id="${i}">
                <img src="${player.photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                <div>Name: ${player.fullname}</div>
                <div>Position: ${player.position}</div>
                <div>Team: ${player.pro_team}</div>
                <div class="add"><button onclick="app.controllers.playerController.addToMyTeam(${player.id})" id="btn${i}">Add</button></div>
            </div>
            `
            }

            document.getElementById('search-results').innerHTML = template;
        }
    }

    function drawMyPlayers() {
        var mine = playerService.getMyTeam();

        if (mine.length > 0) {
            var template = ''

            for (let i = 0; i < mine.length; i++) {
                member = mine[i];
                template += `
            <div class="player-card" id="${member.id}">
                <div class="remove"><button onclick="app.controllers.playerController.removePlayer(${member.id})">Remove</button></div>
                <img src="${member.photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                <div>Name: ${member.fullname}</div>
                <div>Position: ${member.position}</div>
                <div>Team: ${member.pro_team}</div>
            </div>
            `
            }
        }

        document.getElementsByClassName('my-team')[0].innerHTML = template;
    }

    this.findByTeam = function (e) {
        event.preventDefault();
        var form = event.target;
        var find = form[0].value;

        var temp = playerService.getPlayersByTeam(find);
        drawPlayers(temp);
        form.reset();
    }

    this.findByName = function (e) {
        event.preventDefault();
        var form = event.target;
        var find = form[0].value;

        var temp = playerService.getPlayersByName(find);
        drawPlayers(temp);
        form.reset();
    }

    this.findByPosition = function (e) {
        event.preventDefault();
        var form = event.target;
        var find = form[0].value;

        var temp = playerService.getPlayersByPosition(find);
        drawPlayers(temp);
        form.reset();
    }

    this.removePlayer = function(id){
        playerService.removePlayer(id);
        drawMyPlayers();
    }

    this.addToMyTeam = function (playerId) {
        var player = playerService.getPlayerById(playerId);
        playerService.addPlayer(player);
        drawMyPlayers();
    }

    var teamSF = playerService.getPlayersByTeam('SF');
    drawPlayers(teamSF);
    drawMyPlayers();

}