exports.index = function(req, res){
  console.log('INDEX REQUEST');
  res.render('index', { title: "Passport-Examples"});
};