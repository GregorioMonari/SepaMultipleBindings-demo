var PacFactory=require('../gregnet_modules/PacFactory/PacFactory.js');
require("./test-jsap.js")

class testClient extends PacFactory{

    constructor(){
      //TITLE
      console.log("║║ ###########################");
      console.log("║║ # App: testClient v0.1");
      console.log("║║ ###########################");
      super(jsappe);
      this.testGraph="";
    }

    //============= START METHOD, CALL TO START THE APP ==========
    async start(){
        this.setTestGraph("multiple_bindings");
        await this.clearTestGraph();
        await this.logTestGraph();
        console.log("--------START TEST-------")

        //-----------------SINGLE BINDINGS--------------------
        const singleBindings={
            o:"example"
        }
        var results = await this.BINDINGS_TEST(singleBindings);
        console.log("SEPA UPDATED, RES: "+JSON.stringify(results));
        await this.logTestGraph()
        await this.clearTestGraph()

        //-----------------MULTIPLE BINDINGS------------------
        const multipleBindings={
            o: ["example_1","example_2","example_3"]
        }
        var results = await this.BINDINGS_TEST(multipleBindings);
        console.log("SEPA UPDATED, RES: "+JSON.stringify(results));
        await this.logTestGraph()
        await this.clearTestGraph()

        //-----------------MIXED BINDINGS (SINGLE AND MULTIPLE)------------------
        const mixedBindings={
            graph: "http://www.vaimee.it/testing/multiple_bindings",
            value: ["example_1","example_2","example_3"],
            color: ["red","green","blue"]
        }
        var results = await this.MIXED_BINDINGS(mixedBindings);
        console.log("SEPA UPDATED, RES: "+JSON.stringify(results));
        await this.logTestGraph()
        await this.clearTestGraph()


        //----------------MY2SEC ADD ACTIVITY WATCH EVENTS TEST--------------------
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
    }




    //============================================== UTILITY FUNCTIONS ======================================================
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