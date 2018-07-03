App = {
  web3Provider: null,
  contracts: {},

  init: function() {

    console.log("inside init");
    

    return App.initWeb3();
  },

  initWeb3: function() {

    console.log("inside initWeb3");
    
    // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
} else {
  // If no injected web3 instance is detected, fall back to Ganache
  App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
}
web3 = new Web3(App.web3Provider);  

    return App.initContract();
  },

  initContract: function() {

    console.log("inside initContract");
    
    $.getJSON('voting.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var votingArtifact = data;
      App.contracts.voting = TruffleContract(votingArtifact);
    
      // Set the provider for our contract
      App.contracts.voting.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
     // return App.markAdopted();
    });
    App.GetVote();
    return App.bindEvents();
    
  },

bindEvents: function() {

  $(document).on('click', '.btn-res', App.GetVote);
  //$(document).on('click', '.btn-vote', App.SetVote);

  $(".dropdown-menu a").click(function(){
    var selText = $(this).text();
   console.log("entered test:",selText);
   App.SetVote(selText);
  });

},

data:function(data){
  console.log("entered data",data);
},

SetVote: function(data) {

  
  console.log("entered setVote:",data);
  var votingInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
  
    var account = accounts[0];

    App.contracts.voting.deployed().then(function(instance) {
      votingInstance = instance;

      return votingInstance.setVote(data, {from: account});
    }).then(function(result) {
      console.log("successfully executed");
    }).catch(function(err) {
      console.log("error executed");
    });
  });
},

GetVote: function(adopters, account) {
  console.log("inside getVote");

  var votingInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
    
    var account = accounts[0];

    App.contracts.voting.deployed().then(function(instance) {
      votingInstance = instance;
      console.log("1");
      return votingInstance.getVote();
    }).then(function(result) {
      document.getElementById("data").innerHTML = result;
      console.log("successfully executed",result);
    }).catch(function(err) {
      console.log("error executed");
    });
  });




}


};
$(function() {
  $(window).load(function() {
    App.init();
  });
});
