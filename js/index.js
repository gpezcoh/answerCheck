var answerList = [];
var fileInput = $('#files');
var uploadButton = $('#upload');
var submitButton = $('#submit');
var numberSubmitButton = $('#numberSubmit');
var restartButton = $('#restart');
var number = 10;
var focusedBox = 0;
var uploaded = false;
var finalAnswerBox;
var demoBox = document.getElementById("demoBox");

$(document).ready(function(){
});

function createSearchBoxes()
{
	var submitInputs = document.getElementById("submitInputs");
	console.log("hello")
	for(var i = 0; i < number; i++)
	{
		var index = document.createElement('div');
    	index.id = "index-" + (i + 1);
    	index.className = 'index';
    	index.textContent = (i + 1) + ".) ";
    	index.style.top = 100 + 40 * i + "px";
    	submitInputs.appendChild(index);
		var answerBox = document.createElement('input');
    	answerBox.id = "answerBox-" + i;
    	answerBox.className = 'answerBox';
    	answerBox.onkeyup = function(){return switchFocus()};
    	answerBox.style.top = 100 + 40 * i + "px";
    	answerBox.style.left = "40px";
    	submitInputs.appendChild(answerBox);
	}
}

function switchFocus()
{
	if(focusedBox < number)
	{
		++focusedBox;
		$("#answerBox-" + focusedBox).focus();
	}
}

uploadButton.on('click', function() {
    if (!window.FileReader) {
        alert('Your browser is not supported')
    }
    var input = fileInput.get(0);
    
    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        reader.readAsText(textFile);
        $(reader).on('load', processFile);
    } else {
        alert('Please upload a file before continuing')
    } 
});

function processFile(e) {
    var file = e.target.result,
        results;
    if (file && file.length) {
        results = file.split("\n");
        for(var i = 0; i < results.length; i++)
        {
        	answerList.push(results[i]);
        	// $('#answerBox-' + i).val(results[i]);
    	}
    }
    uploaded = true;
	$("#uploadText").show();
	$("#upload").hide();
	$("#submit").show();
    $("#answerBox-" + focusedBox).focus();
    var submit = document.getElementById("submit")
    submit.style.top = 100 + 40 * number + "px";
    var restart = document.getElementById("restart")
    restart.style.top = 100 + 40 * number + "px";
}

submitButton.on('click', function() {
	if (uploaded)
	{
		for(var i = 0; i < number; i++)
		{
			var answer = $('#answerBox-' + i).val();
			if(answer === answerList[i])
			{
				var testAnswer = document.getElementById("answerBox-" + i);
				testAnswer.style.backgroundColor = "green";
			}
			else
			{
				var testAnswer = document.getElementById("answerBox-" + i);
				testAnswer.style.backgroundColor = "red";
			}
		}
	}
	else
	{
		alert('Please upload a file before continuing')
	}
});

restartButton.on('click', function() {
	demoBox.removeChild(document.getElementById("submitInputs"));
	var submitInputs = document.createElement('div');
	submitInputs.id = "submitInputs";
	demoBox.appendChild(submitInputs);
	$("#upload").hide();
	$("#files").hide();
	$("#uploadText").hide();
	$("#submit").hide();
	$("#restart").hide();
	$("#numberSubmit").show();
	});

numberSubmitButton.on('click', function() {
	number = $('#number').val();
	focusedBox = 0;
	createSearchBoxes();
	$(".answerBox").show();
	$(".index").show();
	$("#upload").show();
	$("#files").show();
	$("#numberSubmit").hide();
	$("#restart").show();
});