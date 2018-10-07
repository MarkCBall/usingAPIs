        const API_ethprice = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=";
        //instead of setting API_KEY as a constant, my previous approach was:
        //had another file falled APIkey.js which is included in .gitignore with following function
            //function APIkey(){
            //return "SS6K7PG8J46S6I5X4UQ6ZWZN6MPGITM7G6";}
        //const API_KEY = APIkey();//the API key is not pushed to github this way has one function that returns SS6K7PG8J46S6I5X4UQ6ZWZN6MPGITM7G6
        //I am using the constant approach now for instructor ease
        const API_KEY = "SS6K7PG8J46S6I5X4UQ6ZWZN6MPGITM7G6";
  
        var updateinterval;//global variable to track if the system is currently updating and how often
        
        
        //gets the current ethereum price from etherscan and calls a function to update the screen
        function upethprice(){
          fetch(API_ethprice+API_KEY)
          .then( result => result.json() )
          .then(res => {
              document.getElementById("ethprice").innerHTML = res.result.ethusd;
              updateClock("timeupdated",res.result.ethusd_timestamp*1000 );
              if (res.status != "1")
              console.log("error loading ethereum price from etherscan.io");  
          })          
          .catch(err => console.log("Etherscan.io failed because of error: "+ err));
        }//endupethprice



        //gets block height from another source to play with retreiving info from elsewhere
        function uplastblock(){
            fetch("https://api.blockcypher.com/v1/eth/main")
            .then (result => result.json())
            .then (res => document.getElementById("block_height").innerHTML = res.height)
            .catch (err => console.log(err));
        }//end uplastblock

        //More updates to other ethereum features could go here with logic similar to upethprice
        
        //Takes in a date onject and returns a string representing the date and time
        function datetostring(dateobj){
            //local function to cut ensure number is two digits long
            const twodigits = (num) => { return ("0" + num).slice(-2) }; //function twodigits(num){ return ("0" + num).slice(-2);}
            
            //initialize an array to get string for month from a number
            months = ['Jan','Feb','Mar','Apr',"May","Jun","Jul","Aug",'Sep',"Oct","Nov","Dec"];
            //get time as a string from dateobj argument
            let time = twodigits(dateobj.getHours()) + ':' + twodigits(dateobj.getMinutes()) +':'+ twodigits(dateobj.getSeconds()) ;
            //get date as a string from dateobj argument
            let date = [dateobj.getDate(), months[dateobj.getMonth()], dateobj.getFullYear()].join(' ');
            return [date, time].join(' / ');
        }//end datetostring

        //updates the html file in the specified spot. Uses current system time if no timestamp is given
        function updateClock(clockloc, timestamp ) {
            //sets dateobj to timestamp if a timestamp is given, otherwise uses current time
            if (timestamp >0)
                var dateobj = new Date(timestamp);
            else
                var dateobj = new Date();
            //argument clockloc used to determine which HTML element is updated
            document.getElementById(clockloc).innerHTML = datetostring(dateobj);
        }//end updateclock
         
        //cancels or starts auto updating ethereum price and checks if the window is already updating
        function autoupdate(){
            if (updateinterval==null){
                let delay = Math.max(1000,document.getElementById("interval").value*1000);
                updateinterval = setInterval(function(){upethprice();updateClock("timecalled");},delay);
                //disallow changes to interval length checkbox
                document.getElementById("interval").disabled=true;
            }
            else{
                clearInterval(updateinterval);
                updateinterval = null;
                //allow changes to interval length checkbox
                document.getElementById("interval").disabled=false;
                }
        }//end updateinterval

          //initialize
          upethprice();
          updateClock("timecalled" );
          uplastblock();
  