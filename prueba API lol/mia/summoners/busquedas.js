/*CAPITALIZE**/
String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
 }

function lookForSummoner() {
	$("span").empty();
	var summonerName = $("#sumName").val().toLowerCase();

	$.ajax({
		url:"https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/"+summonerName+"?api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(summoner) {
			
			summonerLevel = summoner[summonerName].summonerLevel;
			sumName = summoner[summonerName].name;
			summonerID = summoner[summonerName].id;
			
			$("#sName").text(sumName);
			$("#sID").text(summonerID);
			$("#sLevel").text(summonerLevel);

			getSummonerData(summonerID);
			getActualDTStats(summonerID);
		},
		error: function(){alert("Error taking information from server.")},
		dataType: "json"
	});
	$(".summonerData").show();
}


function getSummonerData(summonerID) {
	var selectedSeason = "";
	if ($("#select").val() === "SEASON3") {
		selectedSeason = "SEASON3";
	}
	else if ($("#select").val() === "SEASON2014") {
		selectedSeason = "SEASON2014";
	}
	else if($("#select").val() === "SEASON2015"){
		selectedSeason = "SEASON2015";
	}

	$.ajax({
		url:"https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/"+summonerID+"/ranked?season="+selectedSeason+"&api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(resp) {

			/***Streaks***/
			totalDouble = 0;
			totalTriple = 0;
			totalQuadra = 0;
			totalPenta = 0;

			/***Match Stats***/
			totalFB = 0;
			totalGoldEarned = 0;
			totalMinionsKilled = 0;
			totalDestroyedTurrets = 0;

			/***Champion Stats***/
			totalDamageDealt = 0;
			totalDamageTaken = 0;
			totalAssists = 0;
			totalChampsKilled = 0;
			totalDeaths = 0;

			for (var i = 0; i < resp.champions.length; i++) {

				totalDouble += resp.champions[i].stats.totalDoubleKills;
				totalTriple += resp.champions[i].stats.totalTripleKills;
				totalQuadra += resp.champions[i].stats.totalQuadraKills;
				totalPenta += resp.champions[i].stats.totalPentaKills;

				totalFB += resp.champions[i].stats.totalFirstBlood;
				totalGoldEarned += resp.champions[i].stats.totalGoldEarned;
				totalMinionsKilled += resp.champions[i].stats.totalMinionKills;
				totalDestroyedTurrets += resp.champions[i].stats.totalTurretsKilled;

				totalDamageDealt += resp.champions[i].stats.totalDamageDealt;
				totalDamageTaken += resp.champions[i].stats.totalDamageTaken;
				totalAssists += resp.champions[i].stats.totalAssists;
				totalChampsKilled += resp.champions[i].stats.totalChampionKills;
				totalDeaths += resp.champions[i].stats.maxNumDeaths;
				
			}

			$("#dKills").text(totalDouble);
			$("#tKills").text(totalTriple);
			$("#qKills").text(totalQuadra);
			$("#pKills").text(totalPenta);

			$("#fBlood").text(totalFB);
			$("#gEarned").text(totalGoldEarned);
			$("#mKilled").text(totalMinionsKilled);
			$("#dTurrets").text(totalDestroyedTurrets);

			$("#dDealt").text(totalDamageDealt);
			$("#dTaken").text(totalDamageTaken);
			$("#assists").text(totalAssists);
			totalChampsKilled
			$("#cKilled").text(totalChampsKilled);
			$("#deaths").text(totalDeaths);
		},
		error: function() {alert("This player has no Ranked data.")},
		dataType: "json"
	});

}

function getActualDTStats(summonerID) {  //DT = Division/Tier stats
	$.ajax({

		url:"https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/"+summonerID+"?api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(resp) {
			summonerName = $("#sumName").val().toLowerCase();
			summonerNameCap = summonerName.replace(" ","");

			actualTier = resp[summonerID][0].tier;
			actualDivisionName = resp[summonerID][0].name;
			queueType = resp[summonerID][0].queue;
			
			actualDivision = "";
			actualLP = "";
			wins = 0;
			losses = 0;
			hotStreak = false;
			veteran = false;
			freshBlood = false;

			//console.log(resp[summonerID][0].entries[2].wins+"-"+resp[summonerID][0].entries[2].losses);
			
			for (var i = 0 ; i < resp[summonerID][0].entries.length; i++) {

				/*console.log(resp[summonerID][0].entries[i].playerOrTeamName.toLowerCase === summonerNameCap);*/

				if (resp[summonerID][0].entries[i].playerOrTeamName.toLowerCase().trim() === summonerNameCap.toLowerCase().trim()	 ) {
					
					actualDivision = resp[summonerID][0].entries[i].division
					
					actualLP = resp[summonerID][0].entries[i].leaguePoints
					wins = resp[summonerID][0].entries[i].wins
					losses = resp[summonerID][0].entries[i].losses
					hotStreak = resp[summonerID][0].entries[i].isHotStreak
					veteran = resp[summonerID][0].entries[i].isVeteran
					freshBlood = resp[summonerID][0].entries[i].isFreshBlood
					
				}
			}
			
			$("#tier").text(actualTier);
			$("#division").text(actualDivision);

			$("#queueType").text(queueType);
			$("#LP").text(actualLP);
			$("#wins").text(wins);
			$("#losses").text(losses);
			
			$("#hotStreak").text(hotStreak);
			$("#veteran").text(veteran);
			$("#freshBlood").text(freshBlood);
			
		},
		error: function() {alert("Error taking Tier/Division Data")},
		dataType: "json" 		

		});
}
