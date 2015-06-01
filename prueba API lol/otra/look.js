
    

function summonerLookUp() {
    var SUMMONER_NAME = $("#userName").val();
    var API_KEY = "1046826c-4625-44ef-915c-c28c8978f1ae";

    if (SUMMONER_NAME !== "") {

        $.ajax({
            url: 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");

                SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();
                console.log(json)
                summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
                summonerID = json[SUMMONER_NAME_NOSPACES].id;
                summonerName = json[SUMMONER_NAME_NOSPACES].name;
                iconId = json[SUMMONER_NAME_NOSPACES].profileIconId;
                revDate = json[SUMMONER_NAME_NOSPACES].revisionDate;

                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;
                document.getElementById("sName").innerHTML = summonerName;
                document.getElementById("iconID").innerHTML = iconId;
                document.getElementById("revDate").innerHTML = revDate;

                letsGetMasteries(summonerID);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }



        });
    }
}

   function letsGetMasteries(summonerID) {
        var API_KEY = "1046826c-4625-44ef-915c-c28c8978f1ae";
        
        $.ajax({
            url: "https://euw.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + "/masteries?api_key=" + API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
                success: function (resp) {
                numberOfPages = resp[summonerID].pages.length;
                numberOfPage1 = resp[summonerID].pages[0].name;
                
                document.getElementById("masteries").innerHTML = numberOfPages;
                document.getElementById("first_name").innerHTML = numberOfPage1;
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data 2!");
            }
        });
    }

//http://jsfiddle.net/Zt3u9/1388/    http://aawebapps.com/tutorials/tutorial1.html  https://developer.riotgames.com/

