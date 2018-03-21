// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
$(function(){
	const table=$('#pixelCanvas');//to reduce $ usage
	const color=$('#colorPicker');//to reduce $ usage
	function rgbToHex(rgbValue){ //convert rgb to hex
		let stringArray=rgbValue.split('(');
		let arrayStr=stringArray.toString();
		let stringArr=arrayStr.split(')');
		let values=stringArr[0].split(',',4);
		let finalArr=values.splice(1,4);
		let arr=finalArr.toString();
		let oneLast=arr.split(', ');
		let hexString="#";
		for (let i = 0; i < oneLast.length; i++) {
			let h=Number(oneLast[i]).toString(16);
			if(h.length<2){
				h="0"+h;
			}
			hexString=hexString+h;
		}
		return hexString;
	}

	function makeGrid() {
		const gridHeight=$('#inputHeight').val();//takes height value as constant
		const gridWidth=$('#inputWeight').val();//takes width value as constant
		let cellColor=color.val();//takes color value which is mutable
		for(let i=0;i<gridHeight;i++){//loop to add rows
			table.append("<tr></tr>");
		}
		let row=$('tr');//row selector 
		for(let j=0;j<gridWidth;j++){//loop to add cells
			row.append("<td></td>");
		}
		let pixel=$('td');//cell selector
		pixel.click(function(){//addition of selected color to cell
			if($(this).hasClass('colored')){//cell already colored
				let pixelColor=$(this).css('background-color');
				let hexPixelColor=rgbToHex(pixelColor);
				if(hexPixelColor===cellColor){//cell already colored to new color
					$(this).css('background-color','white');	//reset
					$(this).removeClass('colored'); //class removal
				}
				else
				{//cell not colored to new color
					$(this).css('background-color',cellColor);//add new color and preserve class
				}
			}
			else{
				$(this).css('background-color',cellColor);//not colored
				$(this).addClass('colored');//class added
			}

		});
		color.change(function(){//in case color gets changed
			cellColor=color.val();
		});
	}

	$('#sizePicker').submit(function(event){
		table.children().remove();//remove previous grid
		makeGrid();//make new grid
		event.preventDefault();//prevent submit default action
	});

});






