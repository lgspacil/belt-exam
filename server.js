var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/new_db');

var app = express();

var UserSchema = new mongoose.Schema({
	name: {type: String},
}, {timestamps: true});

var PollSchema = new mongoose.Schema({
	question: {type: String},
	option_1: {type: String},
	option_2: {type: String},
	option_3: {type: String},
	option_4: {type: String},
	vote_count_1: {type: Number, default: 0},
	vote_count_2: {type: Number, default: 0},
	vote_count_3: {type: Number, default: 0},
	vote_count_4: {type: Number, default: 0},
	_userid: {type: Schema.Types.ObjectId, ref: 'User'}	,
	name: {type: String}
}, { timestamps: true });


mongoose.model('User', UserSchema);
mongoose.model('Poll', PollSchema);


var User = mongoose.model('User');
var Poll = mongoose.model('Poll');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public/dist')));




app.post('/adding_user', function(req, res){

	User.findOne({name: req.body.name}, function(err, result){
		if(err){
			console.log("there was an error when finding in server.js")
		}
		else{
			if (result == null){
				console.log("there was a null! ... that means we have to add a user!")

				var user = new User({name: req.body.name});

				user.save(function(err){
					if(err){
						console.log("There was an error posting to the DB in the server.js!")
					}else{
						console.log(user._id);
						return res.json(user._id);
					}
				
				})

			}
			else{

				// console.log("there was not a null! ... we already have this user", result._id)
				return res.json(result._id);

			}
			
		}
	})
				
})




app.post('/add_poll', function(req, res){
	var poll = new Poll(req.body);

	console.log(req.body);

	poll.save(function(err){
		if(err){
			console.log("there was an error posting the Poll to the DB in the server.js")
		}else{
			console.log(/*"success! posted Topic in the DB"*/)
		}
	})

	return res.json(true);
})

app.post('/delete_poll', function(req, res){
	console.log(req.body.id)
	Poll.remove({_id: req.body.id}, function(err, result){
		if(err){
			console.log("Unable to delete this item")
		}
		else{
			return res.json(true)
		}
	
	})
})

// //creating a post that must also update the topic

// app.post('/add_post', function(req, res){


// 	Topic.findOne({_id: req.body._topic}, function(err, topic){
		
// 		//creating a post
// 		var post = new Post(req.body);
// 		post._topic = topic._id;
// 		topic.posts.push(post);
// 		post.save(function(err){
// 			topic.save(function(err){
// 				if(err) {console.log("Sadly this did not work");}
// 				else { res.json(true)}
// 			})
// 		})

// 	})

	

// 	// var post = new Post(req.body);

// 	// post.save(function(err){
// 	// 	if(err){
// 	// 		console.log("we got an error when posting a POST in server.js")
// 	// 	}else{
// 	// 		console.log("Success! in server.js when posting a POST")
// 	// 	}
// 	// })

// 	// return res.json(true);

// })


app.get('/all_polls', function(req, res){
	
	Poll.find({}, function(err, result){
		if(err){
			console.log("there was an error when trying to display the Polls form the server.js");
		}else{
			// console.log("result: ", result)
			return res.json(result);
		}
	})

})

app.get("/poll/:id", function(req, res){
	
	console.log(req.params.id);
	//new to populate the topics with the posts array


	Poll.find({_id: req.params.id}, function(err, result){
		if(err){
			console.log("error!");
		}else{
			return res.json(result);
		}
	})
})

app.post("/up_vote1", function(req, res){
	console.log(req.body);

	Poll.update({_id: req.body.id}, {$inc: {vote_count_1: 1}}, function(err, result){
		if(err){
			console.log("error adding")
		}else{
			return res.json(result)
		}
	})
})

app.post("/up_vote2", function(req, res){
	console.log(req.body);

	Poll.update({_id: req.body.id}, {$inc: {vote_count_2: 1}}, function(err, result){
		if(err){
			console.log("error adding")
		}else{
			return res.json(result)
		}
	})
})

app.post("/up_vote3", function(req, res){
	console.log(req.body);

	Poll.update({_id: req.body.id}, {$inc: {vote_count_3: 1}}, function(err, result){
		if(err){
			console.log("error adding")
		}else{
			return res.json(result)
		}
	})
})

app.post("/up_vote4", function(req, res){
	console.log(req.body);

	Poll.update({_id: req.body.id}, {$inc: {vote_count_4: 1}}, function(err, result){
		if(err){
			console.log("error adding")
		}else{
			return res.json(result)
		}
	})
})




app.listen(8000, function() {
    console.log("listening on port 8000");
})