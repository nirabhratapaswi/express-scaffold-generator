window.onload = function() {
	console.log("Javascript loaded from showall.js");
	for (id = 0; id < $(" #list ").find(" button ").length; id++) {
		var username = $(" #list ").find(" button ").eq(id).attr("id").toString();
		var clickattr = "clickMe('" + username + "')";
		$(" #list ").find(" button ").eq(id).attr({
			"onclick": clickattr
		});
	}
}

function clickMe(username) {
	var confirmDeletion = confirm("Sure you want to delete " + username);
	if (confirmDeletion) {
		var password = prompt("Enter password for selected user: ", "password here...");
		$.ajax({
			url: "/login/delete",
			contentType: "application/x-www-form-urlencoded",
			data: {
				"username": username,
				"password": password
			},
			method: "POST",
			success: function(data, status, jqXHR) {
				console.log("Successful request: " + data);
			},
			error: function(jqXHR, status, error) {
				console.log("Error occured: " + error);
			},
			complete: function(jqXHR, status) {
				console.log("Request complete!!");
			}
		});
	}
}