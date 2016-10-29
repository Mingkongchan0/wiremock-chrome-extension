var buildPayload = function(path, pathType, method, queryStringMatchersPayload, headerMatchersPayload, requestPayload, callback){
  payload = {
    "request": {
        "method": method
    }
  };

  if(queryStringMatchersPayload.length > 0){
    payload.request.queryParameters = {};

    for(var i = 0; i < queryStringMatchersPayload.length; i++){
      var key = queryStringMatchersPayload[i].key;
      var matcher = queryStringMatchersPayload[i].matcher;
      var value = queryStringMatchersPayload[i].value;

      payload.request.queryParameters[key] = {};
      payload.request.queryParameters[key][matcher] = value;
    }
  }

  if(headerMatchersPayload.length > 0){
    payload.request.headers = {};

    for(var i = 0; i < headerMatchersPayload.length; i++){
      var key = headerMatchersPayload[i].key;
      var matcher = headerMatchersPayload[i].matcher;
      var value = headerMatchersPayload[i].value;

      payload.request.headers[key] = {};
      payload.request.headers[key][matcher] = value;
    }
  }

  switch(pathType){
    case 'PATH':
      payload.request.url = path;
      break;
    case 'REGEX':
      payload.request.urlPattern = path;
      break;
    case 'PARTIAL':
      payload.request.urlPath = path;
      break;
  }

  if(requestPayload){
    switch (requestPayload.charAt(0)) {
      case '{':
        payload.request.bodyPatterns = [{
          "equalToJson": requestPayload
        }];
        break;
      case '$':
        payload.request.bodyPatterns = [{
          "matchesJsonPath": requestPayload
        }];
        break;
      case '<':
        payload.request.bodyPatterns = [{
          "equalToXml": requestPayload
        }];
        break;
      case '/':
        payload.request.bodyPatterns = [{
          "matchesXPath": requestPayload
        }];
        break;
    }
  }

  callback(payload);
}
