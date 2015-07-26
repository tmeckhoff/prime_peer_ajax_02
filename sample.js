var apiKey = '24cgzuz3q69yre4kymk7zsqz';

$(document).ready(function(){
	$.ajax({
		url: 'https://api.edmunds.com/api/vehicle/v2/makes?fmt=json'+ apiKey,
		data:{
			api_key: apiKey//because this listed theirs as api_key
		},
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			callBack(data.makes);
		}
	});
	
});

function callBack(data){
	$.each(data,function(index,object){
		$('#results').append(object.name + ',')
	});
}