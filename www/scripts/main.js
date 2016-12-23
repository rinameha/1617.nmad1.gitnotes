function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    function Wandeling() {

    // URL of the Search API
    this.API_URL = 'https://datatank.stad.gent/4/toerisme/toeristischewandelroutes.geojson?callback=json_callback';
    // The results within the JSON-object
    this._wandelroutes;
    // UI generated
    this._uiGenerated = false;

    // Initialize App
    this.init = function() {
      console.log('1. Initialize the app');

      this.loadData();
    }

    // Load the data from the API
    this.loadData = function() {
      console.log('2. Load the Data');

      // Hack --> Closure
      var that = this;

      var xhr = new XMLHttpRequest();
      xhr.open('get', this.API_URL, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
          if(xhr.status == 200) {
              var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
              /*data = data.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              });*/
              that._wandelroutes = data;
              that.updateUI();
            } else {
              reject(status);
          }
      }
      xhr.onerror = function() {
          console.log(Error('Network Error!'));
      }
      xhr.send();

    };

    // Update the User Interface (UI)
    this.updateUI = function() {
      console.log('3. Update UI');

      if(!this._uiGenerated) {
        this.generateCardsUI(); // Call the function generateCardsUI
        this._uiGenerated = true;
      }
      
    };

}})