function contains(list,x,y){
	for(var i=0;i<list.length;i++)
		if(list[i].x==x&&list[i].y==y)
			return true;
	return false;
}

function insertFlag(x, y){
	var tmp = document.getElementById(x+","+y);
	if(tmp.innerHTML == "F"){
		tmp.innerHTML = "&nbsp;&nbsp;";
	} else if(tmp.innerHTML == "&nbsp;&nbsp;"){
		tmp.innerHTML = "F";
		tmp.style.color= "blue"; 
	}
}

function clickOnButton(x, y, clicked,nonclick){
	nonclick.push({"x":x,"y":y});
	var nm = 0;
	var tmp = document.getElementById(x+","+y);
		if(contains(mines,x,y)){
			if(clicked==true){
				alert("you lose!"+x+","+y);
				tmp.style.color= "red";
				tmp.style.textDecoration = "bold";
				tmp.innerHTML = "X";
			}
		}else{
			for(let j = 0; j < 3; j++){
				if(contains(mines,x-1+j,y-1))
					nm++;
			}
			for(let j = 0; j < 3; j++){
				if(contains(mines,x-1+j,y))
					nm++;
			}
			for(let j = 0; j < 3; j++){
				if(contains(mines,x-1+j,y+1))
					nm++;
			}
			tmp.innerHTML = nm;
			if(nm == 0){
				if((x+1)< 20 && (x-1) >= 0 && (y+1) < 20 && (y-1) >= 0){
					if(!contains(mines,x,y-1)&&!contains(nonclick,x,y-1))
						clickOnButton(x,y-1,false,nonclick);
					if(!contains(mines,x,y+1)&&!contains(nonclick,x,y+1))
						clickOnButton(x,y+1,false,nonclick);
					if(!contains(mines,x-1,y)&&!contains(nonclick,x-1,y))
						clickOnButton(x-1,y,false,nonclick);
					if(!contains(mines,x+1,y)&&!contains(nonclick,x+1,y))
						clickOnButton(x+1,y,false,nonclick);
				}
			}
	}
}
var mines = [];
function main(){
	var text = document.getElementById("field");
	for(let j = 0; j < 20; j++){
		for(let k = 0; k < 20; k++){
			if(Math.random()<0.1){
				mines.push({"x":j,"y":k});
			}
			text.innerHTML += "<button id=\""+j+","+k+"\" onclick=\"clickOnButton("+j+","+k+",true,[])\" oncontextmenu='insertFlag("+j+","+k+"); return false;'>&nbsp&nbsp</button>"
		}
		text.innerHTML += "<br>";
	}
	
}
window.onload = main;