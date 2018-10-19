const express = require('express');
//inint instance app
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setup mongodb
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/todolist';
const ObjectId = require('mongodb').ObjectId;

MongoClient.connect(mongoUrl, function(err, db){
	if (err){
		console.log(err);
		return;
	}
	console.log('Database successfully connected!');
	todos = db.collection('todos');
	
});



app.get('/', function(req,res){
		//res.send("hello");
    todos.find().toArray(function(err, docs){
		 if(err){
			 console.log(err);
			 return;
		 }
	    res.render('index', {docs: docs}); 
	});
});

app.get('/todos/:id', function(req,res){
	
	todos.findOne({_id: ObjectId(req.params.id)}, function(err, doc){
		if(err){
			console.log(err);
			return;			
		}
		res.render('show', {doc: doc});		
	});
});

app.post('/todos/add', function(req,res){
	
	todos.insert(req.body, function(err, result){
		if(err){
			console.log(err);
			return;
		}
		res.redirect('/');
	});
	
});

app.get('/todos/edit/:id', function(req,res){
	
	todos.findOne({_id: ObjectId(req.params.id)}, function(err, doc){
		if(err){
			console.log(err);
			return;
		}
		res.render('edit', {doc: doc});
	});	
});

app.post('/todos/update/:id', function(req,res){
	 todos.updateOne({_id: ObjectId(req.params.id)},
        {$set: { rendor: req.body.rendor, lloji: req.body.lloji, aktiviteti: req.body.aktiviteti, inicimi: req.body.publikimi,
                 nenshkrimi: req.body.nenshkrimi, afati1: req.body.afati1, afati2: req.body.afati2, permbyllja: req.body.permbyllja,
                 cmimi: req.body.cmimi, totali: req.body.totali, emri: req.body.emri } }, 
               function(err, result) {
                   if (err) {
                    console.log(err);
                    return;
                  }
        res.redirect('/');
   });
	
});

app.get('/todos/delete/:id', function(req,res){
	todos.deleteOne({_id: ObjectId(req.params.id)}, function(err, result){
		if(err){
			console.log(err);
			return;
		}
		res.redirect('/');
	});
});

app.listen(3000, function(){
	console.log('App running at port 3000');
	
});

