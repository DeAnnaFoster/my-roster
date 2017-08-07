function PlayerController(){

    var loading = true;
    var apiUrl = 'http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json';
    var playerService = new PlayerService(apiUrl,ready);//ready is a callback function I think

    function ready(playersData){//????
        loading = false;
    }




    // $('some-button').on('click', function(){
    //     var teamSF = playerService.getPlayersByTeam('SF');
    // })
    
}