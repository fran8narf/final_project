// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


/*var topChamps = ["Aatrox","Akali","Cassiopeia","Cho'Gath","Darius","Dr Mundo", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", " Gnar", "Hecarim", 
"Heimerdinger", "Irelia", "Jarvan IV", "Jax", "Jayce", "Jayce", "Kayle", "Kennen", "Lissandra", "Malphite", "Maokai", "Mordekaiser", "Nasus", "Olaf", 
"Pantheon", "Poppy", "Quinn", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Ryze", "Shen", "Shyvana", "Singed", "Sion", "Swain", "Teemo", "Trundle",
"Tryndamere", "Vladimir", "Yorick", "Yasuo", "Wu-kong", "Volibear"];
var junglerChamps = ["Aatrox", "Amumu", "Diana", "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Hecarim", "Jarvan IV", "Jax", "Kha'zix", "Lee Sin", 
"Malphite", "Maokai", "Master Yi", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Pantheon", "Poppy", "Rammus", "Rek'sai", "Sejuani", "Shaco", 
"Shyvana", "Sion", "Skarner", "Trundle", "Tryndamere", "Udyr", "Vi", "Zac", "Xin-zhao", "Wu-kong", "Warwick", "Volibear"];
var midChamps = ["Ahri", "Akali", "Anivia", "Annie", "Azir", "Brand", "Cassiopeia", "Cho'Gath", "Diana", "Ekko", "Fizz", "Galio", "Heimerdinger", "Jayce", 
"Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kog'Maw", "Le Blanc", "Lissandra", "Lux", "Malzahar", "Mordekaiser", "Nidalee", "Orianna", 
"Ryze", "Swain", "Syndra", "Talon", "Teemo", "Twisted Fate", "Veigar", "Vel'Koz", "Viktor", "Vladimir", "Xerath", "Yasuo", "Zac", "Ziggs", "Zyra"];
var adcChamps = ["Ashe", "Caitlyn", "Corki", "Draven", "Ezreal", "Graves", "Jinx", "Kalista", "Kog'Maw", "Lucian", "Miss Fortune", "Quinn", "Sivir", 
"Tristana", "Twitch", "Urgot", "Varus", "Vayne"];
var suppChamps = ["Alistar", "Annie", "Bard", "Blitzcrank", "Braum", "Galio", "Janna", "Karma", "Kayle", "Leona", "Lulu", "Lux", "Malphite", 
"Morgana", "Nami", "Nautilus", "Sona", "Soraka", "Taric", "Thresh", "Zilean", "Zyra"];
*/
	var topChamps = [];
	var junglerChamps = [];
	var midChamps = [];
	var adcChamps = [];
	var suppChamps = [];

	var championsKeys = [];
	var championsIDS = [];

function searchSummonerBar() {
	$(".img-selectBar").hide();
	$(".searchBar").show();
	$(".back-button").show();
}

function buttonBack() {
	$(".img-selectBar").show();
	$(".searchBar").hide();
	$(".currentData").hide();
	$(".seasonData").hide();
	$(".searchPlayersForm").hide();
	$(".back-button").hide();
}

function showRecruitSummonersForm() {
	$(".searchPlayersForm").show();
	$(".img-selectBar").hide();
	$(".back-button").show();
}




function lookForSummoner() {
	var selectedServer = $("#selectServer").val();	
	var summonerName = $("#sumName").val().toLowerCase().replace(" ", "");

	$.ajax({
		url:"https://"+selectedServer+".api.pvp.net/api/lol/"+selectedServer+"/v1.4/summoner/by-name/"+summonerName+"?api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(summoner) {
			
			summonerLevel = summoner[summonerName].summonerLevel;
			sumName = summoner[summonerName].name;
			summonerID = summoner[summonerName].id;
			
			$("#sName").text(sumName);
			//$("#sID").text(summonerID);
			$("#sLevel").text(summonerLevel);
			console.log(summonerID);

			getSummonerData(summonerID);
			getActualDTStats(summonerID);
		},
		error: function(){alert("Error taking information from server.")},
		dataType: "json"
	});
	$(".currentData").show();
	$(".seasonData").show().height(357);
}


function getSummonerData(summonerID) {
	var selectedSeason = $("#selectSeason").val();
	var selectedServer = $("#selectServer").val();
	$.ajax({
		url:"https://"+selectedServer+".api.pvp.net/api/lol/"+selectedServer+"/v1.3/stats/by-summoner/"+summonerID+"/ranked?season="+selectedSeason+"&api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(resp) {

			var championsIDs = []; //array with champion ID's to match with Champions API

			/***Streaks***/
			var totalDouble = 0;
			var totalTriple = 0;
			var totalQuadra = 0;
			var totalPenta = 0;

			/***Match Stats***/
			var totalFB = 0;
			var totalGoldEarned = 0;
			var totalMinionsKilled = 0;
			var totalDestroyedTurrets = 0;

			/***Champion Stats***/
			var totalDamageDealt = 0;
			var totalDamageTaken = 0;
			var totalAssists = 0;
			var totalChampsKilled = 0;
			var totalDeaths = 0;

			for (var i = 0; i < resp.champions.length; i++) {

				championsIDs
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

function getChampionsKeys() {
	$.ajax({

		url: "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(resp) {
			var response = resp.data;
				for (var championsKey in response) {
					championsKeys.push(championsKey);
				}
		},
		error: function() {alert("Error taking champions data!")},
		dataType: "json"

	});
}

function getChampionsIds() {
	$.ajax({

		url: "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(resp) {
			var response = resp.data;
			var i = 0;
			
			//console.log(championsKeys[i]+" "+response[championsKeys[i]]+" "+response[championsKeys[i]].id);
			
			for(var championId in response){
				championsIDS.push(response[championsKeys[i]].id);
				i++
			}
			console.log(championsIDS);
		}
	});
}


function getActualDTStats(summonerID) {  //DT = Division/Tier stats
	var selectedServer = $("#selectServer").val();
	$.ajax({

		url:"https://"+selectedServer+".api.pvp.net/api/lol/"+selectedServer+"/v2.5/league/by-summoner/"+summonerID+"?api_key=1046826c-4625-44ef-915c-c28c8978f1ae",
		data: "",
		success: function(resp) {
			summonerName = $("#sumName").val().toLowerCase().trim();
			summonerNameNoSpaces = summonerName.replace(" ", "");

			var actualTier = resp[summonerID][0].tier;
			var actualDivisionName = resp[summonerID][0].name;
			console.log(actualDivisionName);

			var queueType = resp[summonerID][0].queue;
			
			var actualDivision = "";
			var actualLP = "";
			var wins = 0;
			var losses = 0;
			var hotStreak = false;
			var veteran = false;
			var freshBlood = false;

			var arraySummonersLength = resp[summonerID][0].entries.length;
			
			for (var i = 0 ; i < arraySummonersLength; i++) {

				if (resp[summonerID][0].entries[i].playerOrTeamName.toLowerCase().trim().replace(" ", "") === summonerNameNoSpaces ) {
					
					actualDivision = resp[summonerID][0].entries[i].division
					
					actualLP = resp[summonerID][0].entries[i].leaguePoints
					wins = resp[summonerID][0].entries[i].wins
					losses = resp[summonerID][0].entries[i].losses
					if (resp[summonerID][0].entries[i].isHotStreak === true) {
						hotStreak = "Yes";
					}
					else {
						hotStreak = "No";
					}
					if (resp[summonerID][0].entries[i].isVeteran === true){
						veteran = "Yes";
					}
					else {
						veteran = "No";
					}
					if (resp[summonerID][0].entries[i].isFreshBlood === true) { 
						freshBlood = "Yes";
					}
					else {
						freshBlood = "No";
					}
					
				}
			}
			
			$("#tier").text(actualTier);
			$("#division").text(actualDivision);
			$("#divisionName").text(" - "+actualDivisionName);
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


function logoutAction() {
	console.log("logged out");
}

function loginForm() {
	$(".frameSignUp").hide();
	$(".indexMessage").hide();
	$(".frameLogin").show();
    $('html, body').animate({
        scrollTop: $(".frameLogin").offset().top}, 1000);

}

function signupAction() {
	$(".frameLogin").hide();
	$(".indexMessage").hide();
	$(".frameSignUp").show();
    $('html, body').animate({
        scrollTop: $(".frameSignUp").offset().top}, 1000);
}

function goUp() {

	

	$('body').animate({
		scrollTop: (0)}, 1000);

}
