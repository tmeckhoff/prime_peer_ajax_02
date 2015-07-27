var searchUser;

$(document).ready(function(){

	$("body").on('click', '.submit', function(event){
			event.preventDefault();
			searchUser = $('.searchInput').val();
			search(searchUser);
			searchRepos(searchUser);

	});

	


function callback(data){
		console.log(data);
		$(".searchResults").append("<img class='img-responsive img-rounded' src='"+data.avatar_url+"'><h2 class='userName'>User Name: "+data.login+"</h2>");
		$(".searchResults").append("<p class='userInfo'>Link to This User's Github Page: <a href='"+data.html_url+"'target='blank'>"+data.html_url+"</a></p>");
		if(data.bio != null) {
		$(".searchResults").append("<p class='userInfo'>About This User: "+data.bio+"</p>");
		}
}

function reposCallback(data) {
		console.log(data);
		$(".searchResults").append("<h2>Repositories:</h2>");
		for (var i = 0; i < data.length; i++) {
    			$(".searchResults").append("<div class='col-md-12 well well-sm'><h3 class='col-md-6'>" + "Reponame: " + data[i].name + "</h3>" + "<a class='col-md-6' href='"+data[i].html_url+"'target='blank'>Link to This Repo</a></div>");
    	}
}

function search(query){
	$.ajax({
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		url:'https://api.github.com/users/'+ searchUser + '?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d',
		success: function(data){                          
			callback(data);
		},
		error: function(errorType) { 
            $(".searchResults").append("<p>" + "User was not found!" + "</p>");
        },
        complete: function() {
	        console.log("Ajax complete!");
	    }
	});
}

function searchRepos(query){
	$.ajax({
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		url:'https://api.github.com/users/'+ searchUser + '/repos?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d',
		success: function(data){                          
			reposCallback(data);
		},
		error: function(errorType) { 
        		 $(".searchResults").append("<p>" + "User was not found!" + "</p>");
        },
        complete: function() {
	        console.log("Ajax complete!");
	    }
	});
}


});//end document ready
