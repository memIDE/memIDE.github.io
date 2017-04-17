"use strict";



function submitForm(oFormElement)
{
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){ alert (xhr.responseText); }
  xhr.open (oFormElement.method, oFormElement.action, true);
  var data = new FormData (oFormElement);
  console.log(data);
  xhr.send (data);
  return false;
}

// function post(path, params, method) {
//     method = method || "post"; // Set method to post by default if not specified.

//     // The rest of this code assumes you are not using a library.
//     // It can be made less wordy if you use one.
//     var form = document.createElement("form");
//     form.setAttribute("method", method);
//     form.setAttribute("action", path);

//     for(var key in params) {
//         if(params.hasOwnProperty(key)) {
//             var hiddenField = document.createElement("input");
//             hiddenField.setAttribute("type", "hidden");
//             hiddenField.setAttribute("name", key);
//             hiddenField.setAttribute("value", params[key]);

//             form.appendChild(hiddenField);
//          }
//     }

//     document.body.appendChild(form);
//     form.submit();
// }

function onGeneratedRow(columnsResult)
{
    var jsonData = {};
    columnsResult.forEach(function(column) 
    {
        var columnName = column.metadata.colName;
        jsonData[columnName] = column.value;
    });
    viewData.employees.push(jsonData);
 }

function addAttribute(key, value){
	var data = ""
	data += key;
	data += "=";
	data += value;
	data += "&";
	return data;
}

function compile() {
	var source = document.getElementById("source").value;
	// var data = {};
	// data["source"] = source;

	// post("/api/compile", data);

	var xhr = new XMLHttpRequest();

	// var params = "source=ipsum";

	// var data = new FormData();

	// data.append('source', 'person');

	

	xhr.open('POST', "https://memide.herokuapp.com/api/compile", true);

	var params = "";
	params += addAttribute("source", source);


	xhr.addEventListener("readystatechange", processRequest, false);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xhr.setRequestHeader("Content-length", params.length);
	// xhr.setRequestHeader("Connection", "close");

	// xhr.onreadystatechange = processRequest;

	firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
				  
				  params += addAttribute("token", idToken);
				  xhr.send(params);
			}).catch(function(error) {
  					console.log(error);
			});

// 
	function processRequest(e) {	
		// console.log(xhr.readyState);
		// console.log(xhr.status);
  //   	console.log("inside processRequest");
 		if (xhr.readyState == 4 && xhr.status == 200) {

        	var response = JSON.parse(xhr.responseText);
        	afterCompile(response, source);
        	// alert(response);
    	}
	}
    return source;              // The function returns the product of p1 and p2
}

function afterCompile(response, source){
	console.log(response.message);
	if(response.message == "OK"){
		if(response.compile_status == "OK"){
			runCode(source);
			var output = document.getElementById("view_edit_output");
			output.value = output.value + "\nCompilation Successufull";
			//console.log("Compile successeful");
		}
		else{
			var output = document.getElementById("view_edit_output");
			output.value = output.value + "\n" + "Compilation Error::";
			output.value = output.value + "\n" + response.compile_status;
		}
	}
}

function runCode(source){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', "https://memide.herokuapp.com/api/run", true);

	var params = "";
	params += addAttribute("source", source);

	xhr.addEventListener("readystatechange", processRunRequest, false);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	firebase.auth().currentUser.getToken(true).then(function(idToken) {
		  params += addAttribute("token", idToken);
		  xhr.send(params);
		}).catch(function(error) {
  				
		});

	function processRunRequest(e) {	
 		if (xhr.readyState == 4 && xhr.status == 200) {
        	var response = JSON.parse(xhr.responseText);
        	afterRun(response);
    	}
	}
    return source;  
}

function afterRun(response, source){
	if(response.message == "OK"){
		if(response.compile_status == "OK"){
			var output = document.getElementById("view_edit_output");
			output.value = output.value + "\n" + response.run_status.output;
			//console.log(response.run_status.output);
		}
		else{
			var output = document.getElementById("view_edit_output");
			output.value = output.value + "\n" + "Runtime Error::";
			output.value = output.value + "\n" + response.compile_status;
			//console.log(response.compile_status);
		}
	}
}
