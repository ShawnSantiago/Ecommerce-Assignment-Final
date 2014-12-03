Parse.initialize("1JaV3GtEpGqKEjFkyAclKyLcge3VSZM00LooXB7U", "G5ricgzTKLLQc9uX9yObyfTnNjFQE5c7zqyRv6eH");


var user = new Parse.User();

function signupFn () {
	user.set("username", document.getElementById('userNameField').value);
	user.set("password", document.getElementById('passwordField').value);
	// user.set("email", document.getElementById('emailField').value);
	user.signUp(null, {
		success:function(user) {
			console.log("worked");
			document.getElementById("one").style.display = 'block';
			document.getElementById("two").style.display = 'none';
		},
		error:function(user, error) {
			if (error.code == 202) {
				alert("User already exists. Log In or create new account.")
			};
			console.log("error code" + error.code);	
		}
	});
}

function loginFn () {
	user.set("username", document.getElementById('userNameField').value);
	user.set("password", document.getElementById('passwordField').value);
	user.logIn({
		success:function(user) {
			console.log("worked")
			document.getElementById("one").style.display = 'block';
			document.getElementById("two").style.display = 'none';
		},
		error:function(user, error) {
			console.log("error code" + error.code);	
			if (error.code == 101) {
				alert("User account doesn't exist. Create new account first.")
			};
		}
	});
}
// var StarRating = Parse.Object.extend("StarRatingDB");
// var StarRatingNumber = new StarRating();
// function starClicked(event) {
// 	console.log(event.currentTarget.innerHTML);
// 	StarRatingNumber.save({
// 		"rating": event.currentTarget.id, 
// 		"value" : event.currentTarget.innerHTML
// 	},{
// 		success: function(object) {
// 		console.log("worked");
// 		},
// 		error: function(error) {
// 		console.log("error code" + error.code);
// 		}
// 	});
// };	


var ProductObject = Parse.Object.extend("ProductDB");

function addProduct() {
	var product = new ProductObject();
	product.set("title", "Vanhawks Bike");
	product.save({
		success: function(object) {
			//worked
		},
		error: function(model, error) {
			//error
		}
	})
};

var query = new Parse.Query(ProductObject);
//query.equalTo("title", "Vanhawks Bike");
query.find({
	success: function(results) {
		console.log(results);
		for(var i=0; i<results.length; i++){
			var product = results[i];
			var img = product.get("mainImage");
			console.log(img.url());
			//document.getElementById("image").src = img.url();
			displayProduct(product);
		}
	},
	error: function(error) {
		//error
	}
})
function getAverage(array) {
	var total = 0;
	for (var i=0; i<array.length; i++) {
		total += array[i];
	}
	return total/array.length;
}
function displayProduct(product) {
	var div = document.createElement("div")
	var img = document.createElement("img");
	img.src = product.get("mainImage").url();
	img.setAttribute("class", "popup");
	div.appendChild(img)

	
	if(product.get("featured") == true) {
		img.setAttribute("class", "featured");
	}

	var form = document.createElement("form");
	var select = document.createElement("select");
	select.ratings = product.get("rating");
	select.product = product;
	select.onchange = addRating;
	form.appendChild(select);
	div.appendChild(form)
	for (var i=0; i<5; i++) {
		var option = document.createElement("option");
		option.innerText = i + " star";
		option.setAttribute("id", i + " star");
		option.setAttribute("value", i);
		select.appendChild(option);
	}
	var productRating = document.createElement("label");
	productRating.innerText = "the rating is " + getAverage(product.get("rating")).toFixed(2) + " stars.";

	document.getElementById("main").appendChild(div);
	
}

function addRating() {
	console.log(this.value);
	console.log(this.ratings);
	this.ratings.push(parseInt(this.value));
	console.log(this.product);
	// this.product.set("rating", newRatingArray);
	this.product.save();
	Parse.Analytics.track("ratingAdded", {'product':this.product.get('title'), 'rating': this.value});
}













