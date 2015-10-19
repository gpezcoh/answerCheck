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
var correctAnswers = [];
var incorrectAnswers = [];
var subjectList = [];
var subjectListNames = [];
var textFile = null;
var resultText = [];
var resultString = "";
var wrongSubjectList = [];
var wrongSubjectListNames = [];
var numberSubmit = false;

function Question(array)
{
	this.answer = array[0];
	this.subject = array[1];
}

function Subject(name,number)
{
	this.name = name;
	this.number = number;
}

$(document).ready(function(){
	document.addEventListener('keydown', keyPresses);
	$("#number").focus();
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

function keyPresses(event)
{
	if(event.keyCode === 13 && numberSubmit === false) 
  	{
  		submitNumber();
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
        results,
        subjects;
    if (file && file.length) {
        results = file.split("\n");
        for(var i = 0; i < results.length; i++)
        {
        	answerList.push(new Question(results[i].split("-")));
        	if (subjectListNames.indexOf(answerList[i].subject) === -1)
        	{
        		subjectList.push(new Subject(answerList[i].subject,1))
        		subjectListNames.push(answerList[i].subject);
        	}
        	else
        	{
        		subjectList[subjectListNames.indexOf(answerList[i].subject)].number++;
        	}
    	}
    }
    uploaded = true;
	$("#uploadText").show();
    $("#answerBox-" + focusedBox).focus();
    createSearchBoxes();
	$(".answerBox").show();
	$(".index").show();
}

submitButton.on('click', function() {
	if (uploaded)
	{
		for(var i = 0; i < number; i++)
		{
			var answer = $('#answerBox-' + i).val();
			if(answer === answerList[i].answer)
			{
				var testAnswer = document.getElementById("answerBox-" + i);
				testAnswer.style.backgroundColor = "green";
				correctAnswers.push(answerList[i]);
			}
			else
			{
				var testAnswer = document.getElementById("answerBox-" + i);
				testAnswer.style.backgroundColor = "red";
				incorrectAnswers.push(answerList[i]);
				if (wrongSubjectListNames.indexOf(answerList[i].subject) === -1)
        		{
        			wrongSubjectList.push(new Subject(answerList[i].subject,1))
        			wrongSubjectListNames.push(answerList[i].subject);
        		}
        		else
        		{
        			wrongSubjectList[wrongSubjectListNames.indexOf(answerList[i].subject)].number++;
        		}
			}
		}
		var link = document.getElementById("createFile");
		link.href = makeTextFile(createText());
		// $("#createFile").css({ backgroundColor: "#F7FE2E", fontColor: "black"});
		$('#createFile').animate({
          'opacity' : "0.2",
        },700, function() {
          $('#createFile').animate({
          'opacity' : "1",
        },700);
      });
	}
	else
	{
		alert('Please upload a file before continuing')
	}
});

function createText()
{
	resultText.push("Total Score");
	resultText.push("\n\n");
	resultText.push("" + ((correctAnswers.length/number) * 100) + "%");
	resultText.push("\n\n");
	for(var i = 0; i < subjectList.length; ++i)
	{
		if(wrongSubjectListNames.indexOf(subjectListNames[i]) === -1)
		{
			console.log(subjectListNames[i]);
			resultText.push("" + subjectList[i].number + " out of " + subjectList[i].number + "    ");
			resultText.push("" + subjectListNames[i] + ": 100%");
			resultText.push("\n\n");
		}
		else
		{
			var wrongNumber = wrongSubjectList[wrongSubjectListNames.indexOf(subjectListNames[i])].number;
			resultText.push("" + (subjectList[i].number - wrongNumber) + " out of " + subjectList[i].number + "    ");
			resultText.push("" + subjectListNames[i] + ": " + 
				(Math.round((subjectList[i].number - wrongNumber)/subjectList[i].number) * 100) + "%");
			resultText.push("\n\n");
		}
	}
	for (var i = 0; i < resultText.length; ++i)
	{
		resultString = resultString + resultText[i];
	}
	return resultString;
}

restartButton.on('click', function() {
	demoBox.removeChild(document.getElementById("submitInputs"));
	var submitInputs = document.createElement('div');
	submitInputs.id = "submitInputs";
	demoBox.appendChild(submitInputs);
	$("#files").hide();
	$("#uploadText").hide();
	$("#number").show();
	numberSubmit = false;
	$("#number").focus();
	 correctAnswers = [];
	 incorrectAnswers = [];
	 subjectList = [];
	 subjectListNames = [];
	 textFile = null;
	 resultText = [];
	 resultString = "";
	 wrongSubjectList = [];
	 wrongSubjectListNames = [];
	 numberSubmit = false;
	});

function submitNumber() 
{
	numberSubmit = true;
	number = $('#number').val();
	focusedBox = 0;
	$("#files").show();
	$("#number").hide();
}

  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };