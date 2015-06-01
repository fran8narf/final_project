function lookForSummoner() {
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
		},
		error: function(){alert("Error obteniendo los datos del servidor.")},
		dataType: "json"
	});
	
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
		error: function() {alert("Error taking data")},
		dataType: "json"
	});

}