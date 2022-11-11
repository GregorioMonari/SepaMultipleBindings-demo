var PacFactory=require('../gregnet_modules/PacFactory/PacFactory.js'); //producer client
//require("../jsap.js"); //jsap configuration file
var events=require("events")
/*###########################################
|| NAME: KEYCLOAK MAPPER NODE.js APP
|| AUTHOR: Gregorio Monari
|| DATE: 4/11/2022
|| NOTES: Maps Jeycloak messages into users
############################################*/
class AwMapper extends PacFactory{

  //============= CLASS CONSTRUCTOR ==============
  constructor(jsap_file){
    //TITLE
    console.log("║║ ###########################");
    console.log("║║ # App: ActivityWatch mapper v0.1");
    console.log("║║ ###########################");
    super(jsap_file);
  }

  //============ CALL TO START APP ===============
  async start(){
    //Test DataSource
    await this.testSepaSource();
    //Subscribe to Sepa
    this.newSubRouter("ALL_USERS_MESSAGES",{
      source: "http://www.vaimee.it/sources/aw-watcher-working"
    },"onNotification")
    //finish
    this.log.info("##### APP INITIALIZED ######")
  }


  async onNotification(jsonArr){
    this.log.info("-------------------------");
    this.log.info("# NEW NOTIFICATION RECEIVED! #");
    this.log.info("Unpacking "+jsonArr.length+" results");
    //CYCLE EVERY SUBSCRIPTION RESULT, THERE COULD BE MANY MESSAGES
    var usergraph="";
    var jsonMsg={};
    for(var i=0; i<jsonArr.length; i++){
        usergraph=jsonArr[i].user_graph;
        jsonMsg=JSON.parse(jsonArr[i].json_message);
        this.mapAwMessage(usergraph,jsonMsg);
        usergraph="";
        jsonMsg={};
    }
  }

  mapAwMessage(usergraph,jsonMsg){

  }

}//end of class 



module.exports = AwMapper;