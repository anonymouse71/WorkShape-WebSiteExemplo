
//-----Google Code

var client_id = '350435369758.apps.googleusercontent.com';
var apiKey = 'AIzaSyAdOriO2BlsjVkQYh-Kxt7bO3EnfL5FRXY';
var scopes = 'https://www.googleapis.com/auth/plus.me';

  function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
      }



 function checkAuth() {
        var config = {
          'client_id': client_id,
          'scope': 'https://www.googleapis.com/auth/plus.me',
          'immediate' : true
        };
        gapi.auth.authorize(config, handleAuthResult);

      }

     function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('googleLogin');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }

      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.load('plus', 'v1', function() {
          var request = gapi.client.plus.people.get({
            'userId': 'me'
          });
          request.execute(function(resp) {
            var heading = document.createElement('h4');
            var image = document.createElement('img');
            image.src = resp.image.url;
            heading.appendChild(image);
            heading.appendChild(document.createTextNode(resp.displayName));

            document.getElementById('content').appendChild(heading);
          });
        });
      }

//End of Google Code



//post request, create user or log in 

function loginWorkshape(googleUID){

        
                         $.ajax({
                                type: "POST",
                                url: "http://192.168.1.147:9000/users",
                                dataType:'json',
                                data:{ googleUID : googleUID},  // falar o que esta enviando
                                success: function(msg) {
                                  $.cookie("sessionID",msg.sessionID)  
                                }
                                });
                         



}