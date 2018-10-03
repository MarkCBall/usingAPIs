        const API_ethprice = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=";
        const API_uplastblock ="";
        //const API_KEY = APIkey();//the API key is not pushed to github this way has one function that returns SS6K7PG8J46S6I5X4UQ6ZWZN6MPGITM7G6
        const API_KEY = "SS6K7PG8J46S6I5X4UQ6ZWZN6MPGITM7G6";
  
        //gets the current ethereum price from etherscan and calls a function to update the screen
        function upethprice(){
          fetch(API_ethprice+API_KEY)
          .then( result => result.json() )
          .then(res => {
              document.getElementById("ethprice").innerHTML = res.result.ethusd;
              updateClock("timeupdated",res.result.ethusd_timestamp*1000 );
              if (res.status != "1")
              console.log("error loading ethereum price from etherscan.io");  
          //ADD MORE ERROR CATCHING STUFF HERE
          //ADD MORE ERROR CATCHING STUFF HERE
          //ADD MORE ERROR CATCHING STUFF HERE
          //ADD MORE ERROR CATCHING STUFF HERE
          //ADD MORE ERROR CATCHING STUFF HERE
          //ADD MORE ERROR CATCHING STUFF HERE
          //ADD MORE ERROR CATCHING STUFF HERE
          //.catch ect
          })
        }

        //gets block height from another source
        function uplastblock(){
            fetch("https://api.blockcypher.com/v1/eth/main")
            .then (result => result.json())
            .then (res => document.getElementById("block_height").innerHTML = res.height)
            .catch (err => console.log(err));
        }

        
        //Takes in a date onject and returns a string representing the date and time
        function datetostring(dateobj){
            const twodigits = (num) => { return ("0" + num).slice(-2) }; //function twodigits(num){ return ("0" + num).slice(-2);}
            months = ['Jan','Feb','Mar','Apr',"May","Jun","Jul","Aug",'Sep',"Oct","Nov","Dec"];
            let time = twodigits(dateobj.getHours()) + ':' + twodigits(dateobj.getMinutes()) +':'+ twodigits(dateobj.getSeconds()) ;
            let date = [dateobj.getDate(), months[dateobj.getMonth()], dateobj.getFullYear()].join(' ');
            return [date, time].join(' / ');
        }//end datetostring

        //updates the html file in the specified spot. Uses current system time if no timestamp is given
        function updateClock(clockloc, timestamp ) {
            if (timestamp >0)
                var dateobj = new Date(timestamp);
            else
                var dateobj = new Date();
            document.getElementById(clockloc).innerHTML = datetostring(dateobj);
        }//end updateclock
         
        //cancels or starts auto updating ethereum price and checks if the window is already updating
        var updateinterval;
        function autoupdate(){
            if (updateinterval==null){
                let delay = Math.max(1000,document.getElementById("interval").value*1000);
                updateinterval = setInterval(function(){upethprice();updateClock("timecalled");},delay);
                //disallow changes to interval length
                document.getElementById("interval").disabled=true;
            }
            else{
                clearInterval(updateinterval);
                updateinterval = null;
                //allow changes to interval length
                document.getElementById("interval").disabled=false;
                }
        }//end updateinterval



          //initialize
          upethprice();
          updateClock("timecalled" );
          uplastblock();
  