var PacFactory=require('../gregnet_modules/PacFactory/PacFactory.js');
require("./test-jsap.js")

class testClient extends PacFactory{

    //============= CLASS CONSTRUCTOR ==============
    constructor(){
      //TITLE
      console.log("║║ ###########################");
      console.log("║║ # App: testClient v0.1");
      console.log("║║ ###########################");
      super(jsappe);
      this.testGraph="";
    }

    async start(){

        this.setTestGraph("multiple_bindings");
        await this.clearTestGraph();
        await this.logTestGraph();
        console.log("--------START TEST-------")

        //TEST QUERY
        const test_data={
            graph: "http://www.vaimee.it/testing/multiple_bindings",
            value:["mao","maus","maoribus"],
            color:["red","green","blue"]
        }
        var results = await this.MULTBIND2(test_data);
        console.log("SEPA UPDATED, RES: "+JSON.stringify(results));
        await this.logTestGraph()
        await this.clearTestGraph()


        //TEST ADD EVENTS
        const data={
            usergraph: "http://www.vaimee.it/testing/multiple_bindings",
            event_type:"sw:windowEvent",
            datetimestamp:["2022-08-10T15:33:42.50","2022-08-10T16:33:42.50"],
            app:["chrome.exe","code.exe"],
            title:["youtube","main.js"],
            activity_type:["sw:researching","sw:development"],
            task:"WP2-IMPLEMENTAZIONE COMPONENTI",
            duration:["16.0","20.0"]
        }
        results= await this.ADD_EVENT(data)
        console.log("SEPA UPDATED, RES: "+JSON.stringify(results));
        await this.logTestGraph()
        await this.clearTestGraph()


        console.log("---------END TEST--------")
        /*
            .then(res=>{
                console.log("SEPA UPDATED, RES: "+JSON.stringify(res));
                this.logTestGraph()
                    .then(()=>{
                        this.clearTestGraph()
                    })
            })
        */

        /*
        var res=await this.rawUpdate(`
            INSERT DATA{
                GRAPH <http://www.vaimee.it/testing/multiple_bindings>{
                    _:nodino <http://sepatest/hasValue> "mao" .
                    _:nodone <http://sepatest/hasNotValue> "maus" .
                }
            }
        `)
        console.log(res)
        await this.logTestGraph();
        */
        
        //await this.clearTestGraph();
        /*
        const forced_bindings={
            p: ["http://sepatest/hasValue","http://sepatest/hasNotValue"],
            o: ["mao","maus"]
        }
        let sub= this.VALUES_TEST(forced_bindings);
        sub.on("notification",not=>{
            console.log("\n\n# QueryResults")
            console.log(not.addedResults.results.bindings)
            console.log("---------END TEST--------")
            this.clearTestGraph();
        })
        */

    }

    setTestGraph(name){
        this.testingGraphName=name;
    }

    async logTestGraph(){
        var queryRes=await this.rawQuery('select * where {graph <http://www.vaimee.it/testing/'+this.testingGraphName+'> {?s ?p ?o} }');
        this.log.info("Queried Graph <http://www.vaimee.it/testing/"+this.testingGraphName+">, showing results: ");
        var bindings=this.extractResultsBindings(queryRes);
        console.table(bindings)
    }
    async dropTestGraph(){
        await this.rawUpdate("CREATE GRAPH <http://www.vaimee.it/testing/"+this.testingGraphName+">");
        this.log.info("Dropped Graph: <http://www.vaimee.it/testing/"+this.testingGraphName+">");
      }
    async clearTestGraph(){
        await this.rawUpdate("DELETE {?s ?p ?o} WHERE {GRAPH <http://www.vaimee.it/testing/"+this.testingGraphName+"> {?s ?p ?o} }");
        this.log.info("Cleared Graph: <http://www.vaimee.it/testing/"+this.testingGraphName+">");
    }
    async logTestGraph(){
        var queryRes=await this.rawQuery('select * where {graph <http://www.vaimee.it/testing/'+this.testingGraphName+'> {?s ?p ?o} }');
        this.log.info("Queried Graph <http://www.vaimee.it/testing/"+this.testingGraphName+">, showing results: ");
        var bindings=this.extractResultsBindings(queryRes);
        //console.log(queryRes.results.bindings)
        console.table(bindings)
    }  

}

module.exports = testClient;

/*
const forced_bindings={
    name: "Greg",
    age: 23
}
*/

/*
  //=========== TESTING API ==============
  setTestGraph(name){
    this.testingGraphName=name;
  }
  async createTestGraph(){
    await this.rawUpdate("CREATE GRAPH <http://www.vaimee.it/testing/"+this.testingGraphName+">");
    this.log.info("Created Graph: <http://www.vaimee.it/testing/"+this.testingGraphName+">");
  }
  async dropTestGraph(){
    await this.rawUpdate("CREATE GRAPH <http://www.vaimee.it/testing/"+this.testingGraphName+">");
    this.log.info("Dropped Graph: <http://www.vaimee.it/testing/"+this.testingGraphName+">");
  }
  async clearTestGraph(){
    await this.rawUpdate("DELETE {?s ?p ?o} WHERE {GRAPH <http://www.vaimee.it/testing/"+this.testingGraphName+"> {?s ?p ?o} }");
    this.log.info("Cleared Graph: <http://www.vaimee.it/testing/"+this.testingGraphName+">");
  }
  async logTestGraph(){
    var queryRes=await this.rawQuery('select * where {graph <http://www.vaimee.it/testing/'+this.testingGraphName+'> {?s ?p ?o} }');
    this.log.info("Queried Graph <http://www.vaimee.it/testing/"+this.testingGraphName+">, showing results: ");
    var bindings=this.extractResultsBindings(queryRes);
    console.table(bindings)
  }
  */


