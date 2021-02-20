let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');

let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);

// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
}

// removes server from the server list, calls updateServerTable
function removeServer(server) {
  for (let i=0; i<Object.keys(allServers).length; i++){
    if (allServers[`server${i+1}`].serverName == server){
      delete allServers[`server${i+1}`];
      if(i == Object.keys(allServers).length){
        break;
      } else {
        if(Object.keys(allServers).length-i > 0){
        for(let j=i; j<Object.keys(allServers).length; j++){
            allServers[`server${j+1}`] = allServers[`server${j+2}`];
          }
        }
        delete allServers[`server${Object.keys(allServers).length}`]
        break;
      }
    }
  }
  serverId--;
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';

  for (let key in allServers) {
    let curServer = allServers[key];

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));
    appendDeleteBtn(newTr, 'server');

    serverTbody.append(newTr);
  }
}
