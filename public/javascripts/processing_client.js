const processDiv = document.getElementById("process");
const requestStatusDiv = document.getElementById("request-status");

async function handleSubmit() {
  showProcessing();
  await uploadFile();
}

async function uploadFile() {
  const requestID = document.getElementById("request-id");
  const result = document.getElementById("response-result");
  var formData = new FormData();
  var csvFile = document.getElementById("csv-file").files[0];
  formData.append("file", csvFile);
  // catch error here
  try {
    const resp = await fetch('/api/processing', {
      method: "POST", 
      body: formData
    });
    var body = await resp.json();
    // server side error handling as status 400 (JSON)
    if (resp.ok) {
      requestID.innerHTML = "Web Request ID: " + body.RequestID;
      result.innerHTML = "";
      result.appendChild(formatResultToTable(body.Result));
    } else {
      requestID.innerHTML = JSON.stringify({error: body.message});
      console.log(resp);
    }
    showStatus();
  } catch (e) {
    init();
    console.log(e);
  }
}

function formatResultToTable(result) {
  // EXTRACT VALUE FOR TABLE HEADER
  var col = [];
  for (var i = 0; i < result.length; i++) {
    for (var key in result[i]) {
        if (col.indexOf(key) === -1) {
            col.push(key);
        }
    }
  }
  // CREATE DYNAMIC TABLE
  var table = document.createElement("table");
  table.classList.add("styled-table");

  // TABLE ROW
  var tr = table.insertRow(-1);
  tr.classList.add("active-row");
         
  // TABLE HEADER
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS
  for (var i = 0; i < result.length; i++) {
    tr = table.insertRow(-1);
    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = result[i][col[j]];
    }
  }
  
  return table;
}

function init() {
  processDiv.style.display = "none";
  requestStatusDiv.style.display = "none";
}

function showProcessing() {
  processDiv.style.display = "block";
  requestStatusDiv.style.display = "none";
}

function showStatus() {
  processDiv.style.display = "none";
  requestStatusDiv.style.display = "block";
}