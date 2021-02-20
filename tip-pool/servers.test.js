describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update the serverTable to contain John-Boy', function () {
    allServers.server1 = {serverName: "John-Boy"};
    serverId++;
    updateServerTable();
    
    expect(document.getElementById("server1").innerHTML).toContain("John-Boy");
  })

  it('should have 2 servers after adding and deleting', function (){
    submitServerInfo();
    serverNameInput.value = "Johhny";
    submitServerInfo();
    serverNameInput.value = "Truman";
    submitServerInfo();

    removeServer('Johhny');
    updateServerTable();

    expect(Object.keys(allServers).length).toEqual(2);
    expect(document.getElementById("server2").innerHTML).toContain("Truman")


  });

  afterEach(function() {
    // tear-down and clean-up logic
    serverId--;
    delete allServers["server" + serverId];
    document.querySelector("#serverTable tbody").innerHTML = '';
    serverNameInput.value = '';
  });
});
