document.forms[0].addEventListener('submit', function(e){

	var els = document.forms[0].elements

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "/put",
	  "method": "PUT",
	  "headers": {
	    "Content-Type": "application/x-www-form-urlencoded"
	  },
	  "data": {
	    "name": els.name.value,
	    "description": els.description.value,
	    "date": els.time.value,
	    "place": els.audience.value
	  }
	}
	console.log('данные отправлены')

	$.ajax(settings).done(function (response) {
	  console.log(response)
	})
	
	document.location.href = confirm('Данные успешно отправлены! Желаете снова зарегистрировать мероприятие?') ? "registration.html" : "greeting.html"

}, false)