function reqListener() {  
    var data = JSON.parse(this.responseText);  
    console.log(data);  
  }
  
  function reqError(err) {  
    console.log('Fetch Error :-S', err);  
  }
  
  var oReq = new XMLHttpRequest();  
  oReq.onload = reqListener;  
  oReq.onerror = reqError;  
  oReq.open('get', 'http://myvolley.ru/api/tournament?request=teams&id=397', true);  
  oReq.send()