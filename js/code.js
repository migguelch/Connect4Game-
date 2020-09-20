
var stat = {
	// Global config
	config : {
		startingPlayer:"black",
		takenMsg: "This position is already taken.",
  		evenMsg: "the game is tied.",
  		winMsg: "The winner is the Player COLOR",
  		target: 4,
  		boardLength: 7,
  		boardHeight: 6,
	},
	turns: 1,
	currentPlayer : "black",
	// Global State
	board : [[0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0],
	         [0,0,0,0,0,0,0]],

	choseGamer: function(){
		return (Math.floor(Math.random()*100)%2) == 0? "black":"red";
	}
};

stat.setCell = function(col,row){

	stat.board[row][col] = stat.currentPlayer;
}

stat.isCellTaken = function(col,row){
	return stat.board[row][col] !== 0;
}

stat.dropDown = function(row, col) {
    for (var y = stat.config.boardHeight - 1; y > row; y--) {
      if (!stat.isCellTaken(col, y)) {
        return y;
      }
    }
    return row;
  }

stat.showStatus = function(){
	console.log(stat.board);
}

stat.countTurns = function(){
	stat.turns ++;
}

stat.changeGamer = function(){
	stat.currentPlayer = (stat.currentPlayer === 'black') ? 'red' : 'black';  
}

stat.resetGame = function(){
	location.reload();
}
//////////////////////////////////////////////////////////////////////////////////////////////
var board = {};

board.printBoard = function(){
	var cell,color;
	
	for (var d_row = 0; d_row < stat.board.length ;d_row++) {
      for (var d_col = 0; d_col < stat.board[0].length; d_col++){      	
      	      	
      	if (stat.board[d_row][d_col] != 0){
      		cell = "cell"+((7*d_row)+d_col)	;
      		color = stat.board[d_row][d_col]
      		document.getElementById(cell).style.backgroundColor = color;
      	}      	
      }
	}
}

board.printCell = function(cel,col,row){
	var cell,color;
	cell  = "cell"+((7*row)+col);
	color = color = stat.board[row][col];
	document.getElementById(cell).style.backgroundColor = color;
}

board.setTurn = function(){
	var notify = "Turn: "+(stat.turns);
	document.getElementById("turn").innerHTML = notify;
}

board.setPlayer = function (){
	var notify = "Player: " + stat.currentPlayer.toUpperCase();
	document.getElementById("player").innerHTML = notify;
}

board.resetGame = function (){
	if(confirm("Reset the Game")){
		stat.resetGame();}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctrl = {};

ctrl.isHortWin = function() {
	var l_return = false;

	for (var r = stat.board.length - 1; r >= 0; r--){
		for (var c = 0; c <= stat.board[0].length - 4; c++){

			if( (stat.board[r][c]   !== 0 &&
			     stat.board[r][c+1] !== 0 &&
			     stat.board[r][c+2] !== 0 &&
			     stat.board[r][c+3] !== 0 ) 
				&&
			    (stat.board[r][c]   === stat.board[r][c+1] &&
			   	 stat.board[r][c+1] === stat.board[r][c+2] &&
			   	 stat.board[r][c+2] === stat.board[r][c+3])
			    ){ 	/*	
			    	console.log("["+r+"]["+c+"]=>",stat.board[r][c],"["+r+"]["+(c+1)+"]=>",stat.board[r][c+1],
					            "["+r+"]["+(c+2)+"]=>",stat.board[r][c+2],"["+r+"]["+(c+3)+"]=>",stat.board[r][c+3]);*/
			    	l_return = true;
					break;
			}		
		}
	}

	return l_return;
}

ctrl.isVertWin = function () {
	var l_return = false;
	
	for (var c = 0; c < stat.board[0].length; c++){
		for (var r = 0; r < stat.board.length - 3; r++){
			
			if((stat.board[r][c]   !== 0 &&
				stat.board[r+1][c] !== 0 &&
				stat.board[r+2][c] !== 0 &&
				stat.board[r+3][c] !== 0 )
				&&
			   (stat.board[r][c]   === stat.board[r+1][c] &&
			   	stat.board[r+1][c] === stat.board[r+2][c] &&
			   	stat.board[r+2][c] === stat.board[r+3][c])
			   ){	/*
					console.log("["+r+"]["+c+"]:"+stat.board[r][c],"<=>","["+(r+1)+"]["+c+"]:"+stat.board[r+1][c],"<=>",
                    "["+(r+2)+"]["+c+"]:"+stat.board[r+2][c],"<=>","["+(r+3)+"]["+c+"]:"+stat.board[r+3][c]);*/ 
					l_return = true; break;
				}			
		}
	}

	return l_return;
}

ctrl.isDiagWin = function () {
	var l_return = false;
	
	for (var r = stat.board.length - 1; r>= stat.board.length - 1 - 2; r--){
		for (var c = stat.board[0].length - 1; c >= stat.board[0].length - 1 - 3; c--){
			if((stat.board[r][c] !== 0 &&
				stat.board[r-1][c-1] !== 0 &&
				stat.board[r-2][c-2] !== 0 &&
				stat.board[r-2][c-3] !== 0 )
				&&
			   (stat.board[r][c] === stat.board[r-1][c-1]     &&
			   	stat.board[r-1][c-1] === stat.board[r-2][c-2] &&
			   	stat.board[r-2][c-2] === stat.board[r-3][c-3] )){
					/*
					console.log(
						"["+r+"]["+(c)+"]:"+stat.board[r][c],"<=>","["+(r-1)+"]["+(c-1)+"]:"+stat.board[r-1][c-1],"<=>",
            			"["+(r-2)+"]["+(c-2)+"]:"+stat.board[r-2][c-2],"<=>","["+(r-3)+"]["+(c-3)+"]:"+stat.board[r-3][c-3]);*/
					l_return = true;
					break;}

			if((stat.board[r-3][c] !== 0   &&
				stat.board[r-2][c-1] !== 0 &&
				stat.board[r-1][c-2] !== 0 &&
				stat.board[r-0][c-3] !== 0 )
				&&
			   (stat.board[r-3][c] === stat.board[r-2][c-1]   &&
			   	stat.board[r-2][c-1] === stat.board[r-1][c-2] &&
			   	stat.board[r-1][c-2] === stat.board[r][c-3] )){
					/*
					console.log("["+(r-3)+"]["+(c)+"]:"+stat.board[r-3][c],"<=>","["+(r-2)+"]["+(c-1)+"]:"+stat.board[r-2][c-1],"<=>",
            					"["+(r-1)+"]["+(c-2)+"]:"+stat.board[r-1][c-2],"<=>","["+(r)+"]["+(c-3)+"]:"+stat.board[r][c-3]);*/
					l_return = true;
					break;}
		}
	}

	return l_return;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var mang  = {};

mang.selectedCell = function (cel){

	var player = stat.currentPlayer;
	var row = Math.floor(cel/7);
	var col = cel%7;

	if (stat.isCellTaken(col, row)) {
      alert(stat.config.takenMsg);
      return;
    }
	//dropPieceDown
	var dropRow = stat.dropDown(row,col);
	//save data
	stat.setCell(col,dropRow);
	//stat.showStatus();
	//print cell
	board.printCell(cel,col,dropRow);
	//chageGamer


	if (ctrl.isHortWin()){
		if(confirm(stat.config.winMsg.replace('COLOR',stat.currentPlayer.toUpperCase()))){
			stat.resetGame();
		}
	}
	else if (ctrl.isVertWin()){
		if(confirm(stat.config.winMsg.replace('COLOR',stat.currentPlayer.toUpperCase()))){
			stat.resetGame();
		}	
	}
	else if (ctrl.isDiagWin()){
		if(confirm(stat.config.winMsg.replace('COLOR',stat.currentPlayer.toUpperCase()))){
			stat.resetGame();
		}
	}
	else if (stat.turns === 42){
		if(confirm(stat.config.evenMsg)){
			stat.resetGame();
		}

	}
	stat.changeGamer();
	stat.countTurns();

	board.setPlayer();
	board.setTurn();


}

