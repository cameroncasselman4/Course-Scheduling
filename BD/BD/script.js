/* Script for handling Class Selection and other Functionality
Created By: Cory Dill
Adapted By: Jacob Joiner
3/29/17*/
var abClassName = [];
var capacity = [];
//var catalog = [];
var className = [];
var credits = [];
var crn = [];
var dateStart =[];
var daysWithTime = [];
var profName = [];
var restrictions = [];
var room = [];
var seatsAvail = [];
var term = [];
var type = [];
var classPrefix = [];
var uniClassPrefix = [];
var uniqueClasses = [];
var prefixSelected, coreSelected;
var start = new Array();
var end = new Array();


//These functions will be called to load in the text files before anything else can be done on the site
//Using $document(ready)


function getabClassName(){
		return $.get('./abClassName.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				abClassName.push(lines[i].toString());
			}
		
		});
	};
	
function getCapacity(){
		return $.get('./capacity.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				capacity.push(lines[i].toString());
			}
		
		});
	};

/*function getCatalog(){
		return $.get('./catalog.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				catalog.push(lines[i].toString());
			}
		
		});
	};*/

function getClassName(){
		return $.get('./className.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				className.push(lines[i].toString());
			}
		
		});
	};
	
function getCredits(){
		return $.get('./credits.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				credits.push(lines[i].toString());
			}
		
		});
	};
	
function getCRN(){
		return $.get('./crn.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				crn.push(lines[i].toString());
			}
		
		});
	};
	
function getDateStart(){
		return $.get('./dateStart.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				dateStart.push(lines[i].toString());
			}
		
		});
	};
	
function getDaysWithTime(){
		return $.get('./daysWithTime.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				daysWithTime.push(lines[i].toString());
			}
		
		});
	};
	
function getProfName(){
		return $.get('./profName.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				profName.push(lines[i].toString());
			}
		
		});
	};

function getRestrictions(){
		return $.get('./restrictions.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				restrictions.push(lines[i].toString());
			}
		
		});
	};

function getRoom(){
		return $.get('./room.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				room.push(lines[i].toString());
			}
		
		});
	};

function getSeatsAvail(){
		return $.get('./seatsAvail.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				seatsAvail.push(lines[i].toString());
			}
		
		});
	};

function getTerm(){
		return $.get('./term.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				term.push(lines[i].toString());
			}
		
		});
	};

function getType(){
		return $.get('./type.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				type.push(lines[i].toString());
			}
		
		});
	};	

function getUniClassPrefix(){
		return $.get('./uniClassPrefix.txt', function(data){
			var lines = data.split('\n');
		

			for(var i = 0; i < lines.length; i++)
			{
				uniClassPrefix.push(lines[i].toString());
			}
		
		});
	};

//This function takes in the prefix from the drop down selection and searches for any matching prefixs then
//generates a table with all the classes from that prefix

function getClassesByPrefix(prefix)
{
	var elements = [];
	var pref = prefix.substring(0, prefix.length - 1);
	
    
    //Searches for any matching prefixs
    
	for(i=0;i<abClassName.length;i++)
	{
		if(abClassName[i].includes(pref) == true)
		{
			elements.push(i);
		}
	}
	console.log(elements);
	
    //Clear existing table before generating a new one
	document.getElementById("classTable").innerHTML = "";
	document.getElementById("classCoreTable").innerHTML = "";
	
	//Generate tables
	var $table = $( "<table></table>" );
	var $header = $("<tr></tr>");
	$header.append($("<td></td>").html("<b>CRN</b>"));
	$header.append($("<td></td>").html("<b>Class Prefix</b>"));
	$header.append($("<td></td>").html("<b>Class Name</b>"));
	//$header.append($("<td></td>").html("<b>Restrictions</b>"));
	$header.append($("<td></td>").html("<b>Type</b>"));
	$header.append($("<td></td>").html("<b>Credits</b>"));
	$header.append($("<td></td>").html("<b>Days & Times</b>"));
	//$header.append($("<td></td>").html("<b>Dates Offered</b>"));
	$header.append($("<td></td>").html("<b>Room</b>"));
	$header.append($("<td></td>").html("<b>Professor(s)</b>"));
	$header.append($("<td></td>").html("<b>Seats Available</b>"));
	$header.append($("<td></td>").html("<b>Capacity</b>"));
	$header.append($("<td></td>").html("<b>Add Class</b>"));
	//$header.append($("<td></td>").html("<button type = 'button' onlick = ''> Add Class </button>"));
	
	
	$table.append($header);
	
	for (var i = 0; i < elements.length; i++)
	{
		var tabCRN = crn[elements[i]];
		var tabPrefix =abClassName[elements[i]];
		var tabName = className[elements[i]];
		//var tabRestriction = restrictions[elements[i]];
		var tabType = type[elements[i]];
		var tabCredits = credits[elements[i]];
		var tabDay = daysWithTime[elements[i]];
		var tabDate = dateStart[elements[i]];
		var tabRoom = room[elements[i]];
		var tabProfessor = profName[elements[i]];
		var tabSeatsAvail = seatsAvail[elements[i]];
		var tabCapacity = capacity[elements[i]];
		var $line = $(  "<tr></tr>"  );
		$line.append( $( "<td></td>" ).html(tabCRN));
		$line.append( $( "<td></td>" ).html(tabPrefix));
		$line.append( $( "<td></td>" ).html(tabName));
		//$line.append( $( "<td></td>" ).html(tabRestriction));
		$line.append( $( "<td></td>" ).html(tabType));
		$line.append( $( "<td></td>" ).html(tabCredits));
		$line.append( $( "<td></td>" ).html(tabDay));
		//$line.append( $( "<td></td>" ).html(tabDate));
		$line.append( $( "<td></td>" ).html(tabRoom));
		$line.append( $( "<td></td>" ).html(tabProfessor));
		$line.append( $( "<td></td>" ).html(tabSeatsAvail));
		$line.append( $( "<td></td>" ).html(tabCapacity));
		//$line.append( $( "<td></td>" ).html("<button type = 'button' id = 'mainAdd' onlick = 'addToMain'> Add Main Class </button> <br> <button type = 'button' id = 'addAlt' onlick = 'addToAlt'> Add Alt Class </button>"));
		$line.append( $( "<td></td>" ).html("<button id = " + elements[i] + " onClick = 'addToMain(this.id)'> Add Main Class </button> <br> <button type = 'button' id = "+ elements[i] + " onClick = 'addToAlt(this.id)'> Add Alt Class </button>"));
		$table.append( $line );
	}
		
		$table.appendTo($("#classTable"));
}

//Similar to the above function, except searches based on Core Attribute
function getClassesByCore(core)
{
	var coreElements = [];
	
    //Searches for any matching Core Attribute to the one selected in drop down
	for(i=0; i < className.length;i++)
	{
		if(className[i].substring(0,2).includes(core) == true)
		{
			coreElements.push(i);
		}
	}
	
    //Clear existing tables
	document.getElementById("classCoreTable").innerHTML = "";
	document.getElementById("classTable").innerHTML = "";
	
    //Generate New Tables
	var $table = $( "<table></table>" );
	var $header = $("<tr></tr>");
	$header.append($("<td></td>").html("<b>CRN</b>"));
	$header.append($("<td></td>").html("<b>Class Prefix</b>"));
	$header.append($("<td></td>").html("<b>Class Name</b>"));
	//$header.append($("<td></td>").html("<b>Restrictions</b>"));
	$header.append($("<td></td>").html("<b>Type</b>"));
	$header.append($("<td></td>").html("<b>Credits</b>"));
	$header.append($("<td></td>").html("<b>Day & Time</b>"));
	//$header.append($("<td></td>").html("<b>Dates Offered</b>"));
	$header.append($("<td></td>").html("<b>Room</b>"));
	$header.append($("<td></td>").html("<b>Professor(s)</b>"));
	$header.append($("<td></td>").html("<b>Seats Available</b>"));
	$header.append($("<td></td>").html("<b>Capacity</b>"));
	$header.append($("<td></td>").html("<b>Add Class</b>"));
	//$header.append($("<td></td>").html("<button type = 'button' onlick = ''> Add Class </button>"));
	
	
	$table.append($header);
	
    
	for (var i = 0; i < coreElements.length; i++)
	{
		var tabCRN = crn[coreElements[i]];
		var tabPrefix = abClassName[coreElements[i]];
		var tabName = className[coreElements[i]];
		//var tabRestriction = restrictions[coreElements[i]];
		var tabType = type[coreElements[i]];
		var tabCredits = credits[coreElements[i]];
		var tabDay = daysWithTime[coreElements[i]];
		var tabDate = dateStart[coreElements[i]];
		//var tabRoom = room[coreElements[i]];
		var tabProfessor = profName[coreElements[i]];
		var tabSeatsAvail = seatsAvail[coreElements[i]];
		var tabCapacity = capacity[coreElements[i]];
		var $line = $(  "<tr></tr>"  );
		$line.append( $( "<td></td>" ).html(tabCRN));
		$line.append( $( "<td></td>" ).html(tabPrefix));
		$line.append( $( "<td></td>" ).html(tabName));
		//$line.append( $( "<td></td>" ).html(tabRestriction));
		$line.append( $( "<td></td>" ).html(tabType));
		$line.append( $( "<td></td>" ).html(tabCredits));
		$line.append( $( "<td></td>" ).html(tabDay));
		//$line.append( $( "<td></td>" ).html(tabDate));
		$line.append( $( "<td></td>" ).html(tabRoom));
		$line.append( $( "<td></td>" ).html(tabProfessor));
		$line.append( $( "<td></td>" ).html(tabSeatsAvail));
		$line.append( $( "<td></td>" ).html(tabCapacity));
		$line.append( $( "<td></td>" ).html("<button id = " + coreElements[i] + " onClick = 'addToMain(this.id)'> Add Main Class </button> <br> <button type = 'button' id = "+ coreElements[i] + " onClick = 'addToAlt(this.id)' + 'addToMain(this.id)'> Add Alt Class </button>"));
		//$line.append( $( "<td></td>" ).html("Main Class: <input type ='checkbox' id = " + crn[coreElements[i]] + " name='checkMain' value='checkMain'><br>Alt Class: <input type ='checkbox' id = " + crn[coreElements[i]] + " name='checkAlt' value = 'checkAlt'>"));
		$table.append( $line );
	}
		
		$table.appendTo($("#classCoreTable"));
	
}


//This function will be called when you click add to main button and add class details to the schedule
//at the bottom


var ary = new Array();
var start = new Array();
var end = new Array();
var day = new Array();


function addToMain(crnInput){
	var err={};
	var CRN = crn[crnInput];
	var section = abClassName[crnInput];
	var name = className[crnInput];
	var date = daysWithTime[crnInput];
	
	if (date.includes("Jan"))
		date = date.substring(0, date.indexOf("Jan"));
	if (date.includes("Feb"))
		date = date.substring(0, date.indexOf("Feb"));
	if (date.includes("Mar"))
		date = date.substring(0, date.indexOf("Mar"));
	if (date.includes("Apr"))
		date = date.substring(0, date.indexOf("Apr"));
	if (date.includes("May"))
		date = date.substring(0, date.indexOf("May"));
	if (date.includes("Jun"))
		date = date.substring(0, date.indexOf("Jun"));
	if (date.includes("Jul"))
		date = date.substring(0, date.indexOf("Jul"));
	if (date.includes("Aug"))
		date = date.substring(0, date.indexOf("Aug"));
	if (date.includes("Sep"))
		date = date.substring(0, date.indexOf("Sep"));
	if (date.includes("Oct"))
		date = date.substring(0, date.indexOf("Oct"));
	if (date.includes("Nov"))
		date = date.substring(0, date.indexOf("Nov"));
	if (date.includes("Dec"))
		date = date.substring(0, date.indexOf("Dec"));
	
	for(var i = 0; i < ary.length; i++) {
        if(crnInput == ary[i])
		{
			err.message="You've already added this element";
			alert(err.message);
			return 0;
		}
	}
	
	var date2 = date;
	
	
	if (date2.includes("MWF")){
		date2 = date2.substring(date2.indexOf("MWF") + 3);
		var dayTemp = "MWF";
	}else if (date2.includes("MW")){
		date2 = date2.substring(date2.indexOf("MW") + 2);
		var dayTemp = "MW";
	}else if (date2.includes("TR")){
		date2 = date2.substring(date2.indexOf("TR") +  2);
		var dayTemp = "TR";
	}else if (date2.includes("T")){
		date2 = date2.substring(date2.indexOf("T") + 1);
		var dayTemp = "T";
	}else if (date2.includes("R")){
		date2 = date2.substring(date2.indexOf("R") + 1);
		var dayTemp = "R";
	}else if (date2.includes("W")){
		date2 = date2.substring(date2.indexOf("W") + 1);
		var dayTemp = "W";
	}else if (date2.includes("F")){
		date2 = date2.substring(date2.indexOf("F") + 1);
		var dayTemp = "F";
	}else if (date2.includes("S")){
		date2 = date2.substring(date2.indexOf("S") + 1);
		var dayTemp = "S";
	}else if (date2.includes("M")){
		date2 = date2.substring(date2.indexOf("M") + 1);
		var dayTemp = "M";
	}else{
		var dayTemp = "nothing";
	}
	
	date2 = date2.replace(":", "");
	date2 = date2.replace(":", "");
	//remove :'s
	
	var dateTemp = date2;
	date2 = date2.substring(date2.indexOf("-") + 1);
	dateTemp = dateTemp.substring(0, dateTemp.indexOf(" -"));
	//seperates and splits times into just start, and end time
	
	
	if (dateTemp.includes("PM")){
		dateTemp = dateTemp.replace(" PM", "");
		var round = Math.round;
		var dateTemp = round(dateTemp); 
		if(dateTemp < 1200)
			dateTemp = dateTemp + 1200;
	}
	else{
		dateTemp = dateTemp.replace(" AM", "");
		var round = Math.round;
		var dateTemp = round(dateTemp);
	}
	
	if (date2.includes("PM")){
		date2 = date2.replace(" PM", "");
		var round = Math.round;
		var date2 = round(date2); 
		if(date2 < 1200)
			date2 = date2 + 1200;
	}
	else{
		date2 = date2.replace(" AM", "");
		var round = Math.round;
		var date2 = round(date2);
	}
	
	for(var k = 0; k < start.length; k++)
	{
		var dayStr = day[k];
		
		
		if(dayTemp == "nothing"){
			return 0;
		}else if(dayStr.includes('M')&& dayTemp.includes('M')){
			if((dateTemp <= end[k]) && (start[k] <= date2))
			{
				err.message="It seems you may have a time conflict";
				alert(err.message);
				return 0;
			}
		}else if(dayStr.includes("T") && dayTemp.includes("T")){
			if((dateTemp <= end[k]) && (start[k] <= date2))
			{
				err.message="It seems you may have a time conflict";
				alert(err.message);
				return 0;
			}
		}else if(dayStr.includes("W") && dayTemp.includes("W")){
			if((dateTemp <= end[k]) && (start[k] <= date2))
			{
				err.message="It seems you may have a time conflict";
				alert(err.message);
				return 0;
			}
		}else if(dayStr.includes("R") && dayTemp.includes("R")){
			if((dateTemp <= end[k]) && (start[k] <= date2))
			{
				err.message="It seems you may have a time conflict";
				alert(err.message);
				return 0;
			}
		}else if(dayStr.includes("F") && dayTemp.includes("F")){
			if((dateTemp <= end[k]) && (start[k] <= date2))
			{
				err.message="It seems you may have a time conflict";
				alert(err.message);
				return 0;
			}
		}else if(dayStr.includes("S") && dayTemp.includes("S")){
			if((dateTemp <= end[k]) && (start[k] <= date2))
			{
				err.message="It seems you may have a time conflict";
				alert(err.message);
				return 0;
			}
		}else{
		}
	}	
	
	ary.push(crnInput);
	start.push(dateTemp);
	end.push(date2);
	day.push(dayTemp);
	
	
	var $line = $( "<tr> </tr>" );
	$line.append( $( "<td></td>" ).html(CRN));
	$line.append( $( "<td></td>" ).html(section));
	$line.append( $( "<td></td>" ).html(name));
	$line.append( $( "<td></td>" ).html(date));
	$line.append( $( "<td></td>" ).html("<button class='noButtonPrint' id = " + crnInput + " onClick = 'deleteRowMain(this)'> Remove </button>"));
			
	$line.appendTo($("#mainClass"));
	
}



//This function will be called when you click add to alt button and add the class details to the schedule
//at the bottom

function addToAlt(crnInput){
	
	var err={};
	var CRN = crn[crnInput];
	var section = abClassName[crnInput];
	var name = className[crnInput];
	var date = daysWithTime[crnInput];
	
	if (date.includes("Jan"))
		date = date.substring(0, date.indexOf("Jan"));
	if (date.includes("Feb"))
		date = date.substring(0, date.indexOf("Feb"));
	if (date.includes("Mar"))
		date = date.substring(0, date.indexOf("Mar"));
	if (date.includes("Apr"))
		date = date.substring(0, date.indexOf("Apr"));
	if (date.includes("May"))
		date = date.substring(0, date.indexOf("May"));
	if (date.includes("Jun"))
		date = date.substring(0, date.indexOf("Jun"));
	if (date.includes("Jul"))
		date = date.substring(0, date.indexOf("Jul"));
	if (date.includes("Aug"))
		date = date.substring(0, date.indexOf("Aug"));
	if (date.includes("Sep"))
		date = date.substring(0, date.indexOf("Sep"));
	if (date.includes("Oct"))
		date = date.substring(0, date.indexOf("Oct"));
	if (date.includes("Nov"))
		date = date.substring(0, date.indexOf("Nov"));
	if (date.includes("Dec"))
		date = date.substring(0, date.indexOf("Dec"));
	
	
	for(var j = 0; j < ary.length; j++) {
		if(crnInput == ary[j])
		{
			err.message="You've already added this element";
			alert(err.message);
			return 0;
		}
	}
		ary.push(crnInput);
		
		var $line = $( "<tr> </tr>" );
		$line.append( $( "<td></td>" ).html(CRN));
		$line.append( $( "<td></td>" ).html(section));
		$line.append( $( "<td></td>" ).html(name));
		$line.append( $( "<td></td>" ).html(date));
		$line.append( $( "<td></td>" ).html("<button class = 'noButtonPrint' id = " + crnInput + " onClick = 'deleteRowAlt(this)'> Remove </button>"));
	
		$line.appendTo($("#altClass"));
	
	
}


//Deletes the selected row in Main classes

function deleteRowMain(r){
	var i = r.parentNode.parentNode.rowIndex;
	start.splice((i-1), 1);
	end.splice((i-1), 1);
	day.splice((i-1), 1);
	var table = document.getElementById("mainClass");
	var x = (table.rows[i-1].cells[0].innerHTML);
	ary.splice(ary.indexOf(x), 1);
	document.getElementById("mainClass").deleteRow(i);
}

//Deletes the selected row in Alt Classes

function deleteRowAlt(r){
	var i = r.parentNode.parentNode.rowIndex;
	var table = document.getElementById("altClass");
	var x = (table.rows[i-1].cells[0].innerHTML);
	ary.splice(ary.indexOf(x), 1);
	document.getElementById("altClass").deleteRow(i);
}

//Clears the table of whatever is selected on the drop down to make it easier to view the bottom schedules

function clearTable(){
	
	document.getElementById("classTable").innerHTML = "";
	document.getElementById("classCoreTable").innerHTML = "";
	
}

//Prints the screen based on the custom @media print css

function printStuff()
{
	addToTable();
	window.print();
}

function printTable()
{
	
}

function addToTable(){
	
	for(var i = 0; i < ary.length; i++) 
	{
			var section = abClassName[ary[i]];
			var name = className[ary[i]];
			var date = daysWithTime[ary[i]];
			var str = date.substring(0,3);
		
		
			if (date.includes("Jan"))
				date = date.substring(0, date.indexOf("Jan"));
			if (date.includes("Feb"))
				date = date.substring(0, date.indexOf("Feb"));
			if (date.includes("Mar"))
				date = date.substring(0, date.indexOf("Mar"));
			if (date.includes("May"))
				date = date.substring(0, date.indexOf("May"));
			if (date.includes("Jun"))
				date = date.substring(0, date.indexOf("Jun"));
			if (date.includes("Jul"))
				date = date.substring(0, date.indexOf("Jul"));
			if (date.includes("Aug"))
				date = date.substring(0, date.indexOf("Aug"));
			if (date.includes("Sep"))
				date = date.substring(0, date.indexOf("Sep"));
			if (date.includes("Oct"))
				date = date.substring(0, date.indexOf("Oct"));
			if (date.includes("Nov"))
				date = date.substring(0, date.indexOf("Nov"));
			if (date.includes("Jul"))
				date = date.substring(0, date.indexOf("Dec"));
			
			
			if (str.includes("MWF")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3)
				var cell4 = row.insertCell(4);
				var cell5 = row.insertCell(5)
				cell0.innerHTML = section + "<br>" + date;
				cell2.innerHTML = section + "<br>" + date;
				cell4.innerHTML = section + "<br>" + date;
			} else if (str.includes("MW")){
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				var cell2 = row.insertCell(2);
				cell0.innerHTML = section + "<br>" + date;
				cell2.innerHTML = section + "<br>" + date;
				
			} else if (str.includes("M")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				cell0.innerHTML = section + "<br>" + date;
				
			} else if (str.includes("TR")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3)
				cell1.innerHTML = section + "<br>" + date;
				cell3.innerHTML = section + "<br>" + date;
				
			} else if (str.includes("T")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				cell1.innerHTML = section + "<br>" + date;
			} else if (str.includes("R")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3)
				cell3.innerHTML = section + "<br>" + date;
			} else if (str.includes("W")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				var cell2 = row.insertCell(2);
				cell2.innerHTML = section + "<br>" + date;
			} else if (str.includes("F")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3)
				var cell4 = row.insertCell(4);
				cell4.innerHTML = section + "<br>" + date;
			} else if (str.includes("S")) {
				var table = document.getElementById('addTable');
				var row = table.insertRow(1);
				var cell0 = row.insertCell(0);
				var cell1 = row.insertCell(1)
				var cell2 = row.insertCell(2);
				var cell3 = row.insertCell(3)
				var cell4 = row.insertCell(4);
				var cell5 = row.insertCell(5)
				cell5.innerHTML = section + "<br>" + date;
			} else {
					
			}
	}

}



/*
Non-Working print styling
function printStyle()
{
	var container = document.getElementById('container print');
	var WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
	WindowObject.document.writeln('<!DOCTYPE html>');
    WindowObject.document.writeln('<html><head><title></title>');
    WindowObject.document.writeln('<link rel="stylesheet" type="text/css" href="css/custom.min.css">');
    WindowObject.document.writeln('</head><body>')

    WindowObject.document.writeln(container.innerHTML);

    WindowObject.document.writeln('</body></html>');

    WindowObject.document.close();
    WindowObject.focus();
}*/

//Makes sure to load all the text files into arrays before running anything else
$(document).ready(function(){
	$.when(
		getabClassName(),
		getCapacity(),
		//getCatalog(),
		getClassName(),
		getCredits(),
		getCRN(),
		getDateStart(),
		getDaysWithTime(),
		getProfName(),
		getRestrictions(),
		getRoom(),
		getSeatsAvail(),
		getTerm(),
		getType(),
		getUniClassPrefix()
		).then(function(){
            /* Unused array of unique class names
			var uniqueArray = function(){
					
					for(var i = 0; i < className.length; i++){
						if (uniqueClasses.indexOf(className[i]) == -1) uniqueClasses.push(className[i]);
					}
					return uniqueClasses;
				}
			uniqueArray();*/
			
			var prefixSel = document.getElementById('mySelectPrefix');
			var coreSel = document.getElementById('mySelectAttribute');
			
            
            //Populates the Class prefix drop down
            for(i=0;i<uniClassPrefix.length;i++)
			{
				var opt = document.createElement('option');
				opt.innerHTML = uniClassPrefix[i];
				opt.value = uniClassPrefix[i];
				prefixSel.appendChild(opt);
				
			}
			
            //Populates the core attributes dropdown
			var core = [" ", "LC", "CC", "RW", "SQ", "P1", "P2", "P3", "P4", "P5"];
			for(i=0;i<core.length;i++)
			{
				var opt1 = document.createElement('option');
				opt1.innerHTML = core[i];
				opt1.value = core[i];
				coreSel.appendChild(opt1);
				
			}
			
            //Calls the function to populate a table based on class prefix whenever you select from the
            //drop down box
			$('#mySelectPrefix').change(function(){
					
				var selectPref = document.getElementById("mySelectPrefix");
				prefixSelected = selectPref.value;
				getClassesByPrefix(prefixSelected);
				
			})
			
            //Calls the function to populate a table based on class prefix whenever you select from the
            //drop down box
               
			$("#mySelectAttribute").change(function(){
					
				var selectCore = document.getElementById("mySelectAttribute");
				coreSelected = selectCore.value;
				getClassesByCore(coreSelected);
				
			})
		
		
		});
});
