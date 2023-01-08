const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
let app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
let ejs = require('ejs')
app.engine('html', ejs.renderFile)
app.set("view engine", "html")

var line_number;
var location;
var from;
var to;
var drawing_number;
var service;
var material;
var inservice_date
var pipe_size;
var original_thickness;
var stress;
var joint_efficiency;
var ca;
var design_life;
var design_pressure;
var operation_pressure;
var design_temperature;
var operating_temperature;
var cml_number
var cml_description
var actual_outside_diameter
var design_thickness
var structural_thickness
var required_thickness
var tp_number
var tp_description
var inspection_date
var actual_thickness
var id
var idd
const mysql = require('mysql');
const { query } = require('express')
const con = mysql.createConnection({
  multipleStatements:true,
  host: '127.0.0.1',
  user: 'root',
  database: 'piping'
});

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + "/html/table.html");
// });

app.get('/sample',function(req, res){

  res.redirect('/')
})

app.get('/',function(req,res){
  var query = "SELECT * FROM info ORDER BY id ASC";
  con.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
			res.render(__dirname+'/html/index.ejs', {title:'PIPING', action:'list', sampleData:data});
		
	});
})
app.get('/sample/edit/:id',function(req,res){
  var id = req.params.id;
  idd=id
  id_line_number = id
	var query = `SELECT * FROM info WHERE id = "${id}"`;

	con.query(query, function(error, data){
    console.log("id:"+id)
		res.render(__dirname+'/html/info.ejs', {title: 'PIPING', action:'edit', sampleData:data[0]});
    
	});
})
app.post('/edit/:id',function(req,res,next){
   id = req.params.id;
   line_number = req.body.line_number;
   location = req.body.location;
   from = req.body.from;
   to = req.body.to;
   material = req.body.material;
   drawing_number = req.body.drawing_number;
   service = req.body.service;
   inservice_date = req.body.inservice_date;
   pipe_size = req.body.pipe_size;
   original_thickness = req.body.original_thickness;
   stress = req.body.stress;
   joint_efficiency = req.body.joint_efficiency;
   ca = req.body.ca;
   design_life = req.body.design_life;
   design_pressure = req.body.design_pressure;
   operation_pressure = req.body.operation_pressure;
   design_temperature = req.body.design_temperature;
   operating_temperature = req.body.operating_temperature;
	 const update = `
	UPDATE info 
	SET line_number = "${line_number}", 
	location = "${location}",
  pipe_from = "${from}",
  pipe_to = "${to}",
	material = "${material}",
  drawing_number = "${drawing_number}",
  service = "${service}",
  inservice_date = "${inservice_date}",
  pipe_size = "${pipe_size}",
  original_thickness = "${original_thickness}",
  stress = "${stress}",
  joint_efficiency = "${joint_efficiency}",
  ca = "${ca}",
  design_life = "${design_life}",
  design_pressure = "${design_pressure}",
  operation_pressure = "${operation_pressure}",
  design_temperature = "${design_temperature}",
  operating_temperature = "${operating_temperature}"
	WHERE id = "${id}"
	`;
  const query = `SELECT cml_number FROM cml WHERE line_number = "${line_number}"`;
	con.query(query, function(error, data){
		if(error)
		{
			throw error;
		}
    
    if(data.length >0){
      calc(id)
      stCacl(id)
      dsgCalc(id)
      reqCalc(id)
      
		  con.query(update,(err,data)=>{
        console.log("UPDATED")
        res.redirect('/sample');
      })
    }
    else{
      con.query(update,(err,data)=>{
        console.log("UPDATED")
        res.redirect('/sample');
      })
      
    }
    
	});
})
app.get('/sample/detail/:id',function(req,res){
  id = req.params.id;
  idd=id
  var cml_data;
  var tp_data
  var t_data;
	const query = `SELECT line_number FROM info WHERE id = "${id}"`;
	con.query(query, function(error, data){
    
    line_number = data[0].line_number
    console.log("line number:"+line_number)
    const query= `SELECT * FROM cml WHERE line_number = "${line_number}"`;
    con.query(query,(err,data)=>{
    cml_data=data
    
    const query = `SELECT * FROM test_point WHERE line_number = "${line_number}"`;
    con.query(query,(err,data)=>{
      tp_data=data
      const query = `SELECT * FROM thickness WHERE line_number = "${line_number}"`;
      con.query(query,(err,data)=>{
        t_data=data
      if(err) throw err
      res.render(__dirname+"/html/detailejs.ejs",{id:id,line_number:line_number,cml_data:cml_data,tp_data:tp_data,t_data:t_data})
      })
    })
    })
	})
})
app.get('/detail/',function(req,res){
  var line_number = req.query.line_number;
  var cml_data;
  var tp_data
  var t_data;
	var query = `SELECT line_number FROM info WHERE id = "${id}"`;
	con.query(query, function(error, data){
    
    line_number = line_number
    console.log("line number:"+line_number)
    const query= `SELECT * FROM cml WHERE line_number = "${line_number}"`;
    con.query(query,(err,data)=>{
    cml_data=data
    cml_number = data[0].cml_number
    const query = `SELECT * FROM test_point WHERE line_number = "${line_number}" AND cml_number = "${cml_number}" `;
    con.query(query,(err,data)=>{
      tp_data=data
      const query = `SELECT * FROM thickness WHERE line_number = "${line_number}"`;
      con.query(query,(err,data)=>{
        t_data=data
      if(err) throw err
      res.render(__dirname+"/html/detailejs.ejs",{line_number:line_number,cml_data:cml_data,tp_data:tp_data,t_data:t_data})
      })
    })
    })
	})
})
app.get("/cml/get/add/:id", function(req, res, next){
  line_number = req.params.id;
  
  res.render(__dirname+"/html/cml_add.ejs", {title:'PIPING', action:'add',line_number:line_number});
});
app.post('/cml/add',function(req, res){
  id= req.query.id
  line_number = req.body.line_number
  cml_number = req.body.cml_number
  cml_description = req.body.cml_description
  actual_outside_diameter = req.body.actual_outside_diameter
  design_thickness = req.body.design_thickness
  structural_thickness = req.body.structural_thickness
  required_thickness = req.body.required_thickness
  console.log("add line number:"+line_number)
  var query = `
	INSERT INTO cml 
	(line_number,cml_number, cml_description, actual_outside_diameter, design_thickness,structural_thickness,required_thickness) 
	VALUES ("${line_number}","${cml_number}", "${cml_description}", "${actual_outside_diameter}", "${design_thickness}", "${structural_thickness}", "${required_thickness}")
	`;
  con.query(query,(err, showAll)=>{
    if (err) throw err
    console.log("INSERT COMPLETE!")
    res.redirect("/sample/detail/"+id);
    
  })
  
})
app.get('/cml/get/edit/:id',function(req,res){
  id = req.params.id;
  const idd = req.query.idd
	const query = `SELECT * FROM cml WHERE id_cml = "${id}"`;

	con.query(query, function(error, data){
    console.log("id:"+id)
		res.render(__dirname+'/html/cml_edit.ejs', {title: 'PIPING', action:'edit', idd:idd,data:data[0]});
    
	});
})
app.post('/cml/edit/:id',function(req,res,next){
  
	id = req.params.id
  cml_number = req.body.cml_number
  cml_description = req.body.cml_description
  actual_outside_diameter = req.body.actual_outside_diameter
  design_thickness = req.body.design_thickness
  structural_thickness = req.body.structural_thickness
  required_thickness = req.body.required_thickness
  
  var query = `
	UPDATE cml 
	SET 
	cml_number = "${cml_number}",
  cml_description = "${cml_description}",
  actual_outside_diameter = "${actual_outside_diameter}",
	design_thickness = "${design_thickness}",
  structural_thickness = "${structural_thickness}",
  required_thickness = "${required_thickness}"
	WHERE id = "${id}"
	`;
  
	con.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
    console.log("cml updated");
    res.redirect('/sample/detail/'+idd)
	});
})
app.get('/cml/delete/:id', function(req, res, next){
	var id = req.params.id;
	var query = `
	DELETE FROM cml WHERE id_cml = "${id}"
	`;
	con.query(query, function(error, data){
		if(error)
		{
			throw error;
		}
    res.redirect('/sample/detail/'+idd)
	});
});
app.get("/cml/view/", function(req, res, next){
  id = req.query.id;
  line_number = req.query.line_number;
  const query = ` SELECT cml_number FROM cml WHERE id_cml ="${id}" `;
  con.query(query,(err,data)=>{
    cml_number = data[0].cml_number
      const query = ` SELECT * FROM test_point WHERE cml_number = "${cml_number}" AND line_number = "${line_number}" `;
      con.query(query,(err,tp_data)=>{
      res.render(__dirname+"/html/tp_table.ejs", {title:'TEST POINT',id:id,line_number:line_number,cml_number:cml_number,tp_data:tp_data});
    })
  })
});
app.get("/sample/add", function(req, res, next){

	res.render(__dirname+"/html/add.ejs", {title:'PIPING', action:'add'});

});
app.post('/sample/add',function(req, res){
  const line_number2 = req.body.line_number;
  const location2 = req.body.location;
  const from2 = req.body.from;
  const to2 = req.body.to;
  const material2 = req.body.material;
  const drawing_number2 = req.body.drawing_number;
  const service2 = req.body.service;
  const inservice_date2 = req.body.inservice_date;
  const pipe_size2 = req.body.pipe_size;
  const original_thickness2 = req.body.original_thickness;
  const stress2 = req.body.stress;
  const joint_efficiency2 = req.body.joint_efficiency;
  const ca2 = req.body.ca;
  const design_life2 = req.body.design_life;
  const design_pressure2 = req.body.design_pressure;
  const operation_pressure2 = req.body.operation_pressure;
  const design_temperature2 = req.body.design_temperature;
  const operating_temperature2 = req.body.operating_temperature;
  
  console.log("result: "+line_number2)
  var query = `
	INSERT INTO info 
	(line_number, location, pipe_from, pipe_to,drawing_number,service,material,inservice_date,pipe_size,original_thickness,stress,joint_efficiency,ca,design_life,design_pressure,operation_pressure,design_temperature,operating_temperature) 
	VALUES ("${line_number2}", "${location2}", "${from2}", "${to2}", "${drawing_number2}", "${service2}", "${material2}", "${inservice_date2}", "${pipe_size2}", "${original_thickness2}", "${stress2}", "${joint_efficiency2}", "${ca2}", "${design_life2}", "${design_pressure2}", "${operation_pressure2}", "${design_temperature2}","${operating_temperature2}")
	`;
  //var query = 'INSERT INTO info (line_number,location,pipe_from,pipe_to,drawing_number,service,material,inservice_date,pipe_size,original_thickness,stress,joint_efficiency,ca,design_life,design_pressure,operation_pressure,design_temperature,operating_temperature) VALUES ?';
  //var values = [line_number2,location2,from2,to2,drawing_number2,service2,material2,inservice_date2,pipe_size2,original_thickness2,stress2,joint_efficiency2,ca2,design_life2,design_pressure2,operation_pressure2,design_temperature2,operating_temperature2]
  con.query(query,(err, showAll)=>{
    if (err) throw err
    console.log("INSERT COMPLETE!")
    res.redirect("/sample");
      
  })
  
})
app.get('/delete/:id', function(req, res, next){

	id = req.params.id;

	const query = `
	DELETE FROM info WHERE id = "${id}"
	`;

	con.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
			res.redirect("/sample");
	});

});
app.post('/tp/add',function(req, res){
  id_cml= req.query.id
  line_number = req.body.line_number
  cml_number = req.body.cml_number
  tp_number = req.body.tp_number
  tp_description = req.body.tp_description
  note = req.body.note
  console.log("id cml:"+id_cml)
  const query = `
	INSERT INTO test_point 
	(line_number,cml_number, tp_number, tp_description, note, id_cml) 
	VALUES ("${line_number}","${cml_number}", "${tp_number}", "${tp_description}", "${note}","${id_cml}")
	`;
  con.query(query,(err, showAll)=>{
    if (err) throw err
    console.log("INSERT COMPLETE!")
    res.redirect("/sample/detail/"+idd);
    
  })
  
})
app.get("/tp/view/", function(req, res, next){
  id_test = req.query.id;
  line_number = req.query.line_number;
  const query = ` SELECT tp_number,cml_number FROM test_point WHERE id_test ="${id_test}" `;
  con.query(query,(err,data)=>{
    tp_number = data[0].tp_number
    cml_number = data[0].cml_number
    const query = ` SELECT * FROM thickness WHERE cml_number = "${cml_number}" AND tp_number = "${tp_number}" AND line_number = "${line_number}" `;
      con.query(query,(err,data)=>{
        res.render(__dirname+"/html/thickness.ejs",{title:'THICKNESS',id_test:id_test,line_number:line_number,cml_number:cml_number,tp_number:tp_number,data:data})
      })
  })
});
app.get('/tp/get/edit/:id',function(req,res,next){
  
	id = req.params.id;
  const query= ` SELECT * FROM test_point WHERE id_test ="${id}" `;
  con.query(query,(err,data)=>{
    data=data[0]
    res.render(__dirname+"/html/tp_edit.ejs", {title:'TEST POINT',id:id,data:data});
  })
  
})
app.post('/tp/edit/:id',function(req,res,next){
	id = req.params.id
  
  tp_number = req.body.tp_number
  tp_description = req.body.tp_description
  note = req.body.note
  var query = `
	UPDATE test_point 
	SET 
	tp_number = "${tp_number}",
  note = "${note}",
  tp_description = "${tp_description}"
	WHERE id_test = "${id}"
	`;
  
	con.query(query, function(error, data){
		if(error)
		{
			throw error;
		}
    console.log("tp updated");
    console.log("idd:"+idd)
    res.redirect('/sample/detail/'+idd)
	});
})
app.get('/tp/delete/:id', function(req, res, next){

	var id = req.params.id;

	var query = `
	DELETE FROM test_point WHERE id_test = "${id}"
	`;

	con.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
    res.redirect('/sample/detail/'+idd)
	});

});
app.post('/t/add',function(req, res){
  id_test= req.query.id
  line_number = req.body.line_number
  cml_number = req.body.cml_number
  tp_number = req.body.tp_number
  inspection_date = req.body.inspection_date
  actual_thickness = req.body.actual_thickness
  console.log("id test:"+id_test)
  var query = `
	INSERT INTO thickness 
	(line_number,cml_number, tp_number, inspection_date, actual_thickness,id_test) 
	VALUES ("${line_number}","${cml_number}", "${tp_number}", "${inspection_date}", "${actual_thickness}","${id_test}")
	`;
  con.query(query,(err, showAll)=>{
    if (err) throw err
    console.log("INSERT COMPLETE!")
    const url = require('url')
    res.redirect('/sample/detail/'+idd);
  })
})
app.get('/t/get/edit/:id',function(req,res,next){
	id = req.params.id;
  const query= ` SELECT * FROM thickness WHERE id ="${id}" `;
  con.query(query,(err,data)=>{
    
    res.render(__dirname+"/html/t_edit.ejs", {title:'THICKNESS',data:data[0]});
  })
  
})
app.post('/t/edit/:id',function(req,res,next){
	id = req.params.id
  inspection_date = req.body.inspection_date
  actual_thickness = req.body.actual_thickness
  note = req.body.note
  var query = `
	UPDATE thickness 
	SET
  inspection_date = "${inspection_date}",
  actual_thickness = "${actual_thickness}"
	WHERE id = "${id}"
	`;
  
	con.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
    console.log("thickness updated");
    res.redirect('/sample/detail/'+idd)
	});
})
app.get('/t/delete/:id', function(req, res, next){

	id = req.params.id;

	const query = `
	DELETE FROM thickness WHERE id = "${id}"
	`;

	con.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
    res.redirect('/sample/detail/'+idd)
	});

});
global.calc = function calc(id) {
  var line_number3;
  
  console.log("in calc")
  var query = `SELECT * FROM info WHERE id = "${id}"`;
  con.query(query,function(error,data){
  //console.log("pipe_size:"+data[0].pipe_size)
  line_number3 = String(data[0].line_number)
  //console.log("where:"+data[0].line_number)
  
  
  switch(data[0].pipe_size) {
    case 0.125:
      actual_outside_diameter=10.300
      break;
    case 0.250:
      actual_outside_diameter=13.700
      break;
    case 0.357:
      actual_outside_diameter=17.100
      break;
    case 0.500:
      actual_outside_diameter=21.300
      break;
    case 0.750:
      actual_outside_diameter=26.700
      break;
    case 1:
      actual_outside_diameter=33.400
      break;
    case 1.25:
      actual_outside_diameter=42.200
      break;
    case 1.5:
      actual_outside_diameter=48.300
      break;
    case 2:
      actual_outside_diameter=60.300
      break;
    case 2.5:
      actual_outside_diameter=73.000
      break;
    case 3:
      actual_outside_diameter=88.900
      break;
    case 3.5:
      actual_outside_diameter=101.600
      break;
    case 4:
      actual_outside_diameter=114.300
      break;
    case 5:
      actual_outside_diameter=141.300
      break;
    case 6:
      actual_outside_diameter=168.300
      break;
    case 8.0:
      actual_outside_diameter=219.100
      break;
    case 10:
      actual_outside_diameter=273.000
      break;
    case 12:
        actual_outside_diameter=323.800
        break;
    case 14:
        actual_outside_diameter=355.600
        break;
    case 16:
        actual_outside_diameter=406.400
        break;
    case 18.0:
        actual_outside_diameter=457.000
        break;
     default:
      console.log("default")
      break;
  }
  var q = `
	UPDATE cml 
	SET
  actual_outside_diameter = "${actual_outside_diameter}"
	WHERE line_number = "${line_number3}"
	`;
  //console.log("where2:"+line_number3)
  con.query(q,function(err,data){
    console.log("value OD: "+actual_outside_diameter)
    console.log("OD updated")
  })
  })
  
 
}
global.stCacl = function stCacl(id){
  
  const query = `SELECT * FROM info WHERE id = "${id}"`;
  con.query(query,function(err,data){
    console.log("in structural calc")
    
    if(data[0].pipe_size <= 2){
      structural_thickness = 1.80
    }else if(data[0].pipe_size == 3){
      structural_thickness = 2.00
    }else if(data[0].pipe_size == 4){
      structural_thickness = 2.30
    }else if(data[0].pipe_size >= 6 && data[0].pipe_size <= 18){
      structural_thickness = 2.80
    }else{
      structural_thickness = 3.10
    }
    const line_number = data[0].line_number
    //console.log("line_number: "+line_number)
    const query = `UPDATE cml SET structural_thickness = "${structural_thickness}" WHERE line_number = "${line_number}"`;
    con.query(query,function(err,data){
      console.log("value structural thickness:"+structural_thickness)
        console.log("structural thickness updated!")
    })
    })
  }
global.dsgCalc = function dsgCalc(id){
  const query = `SELECT * FROM info WHERE id = "${id}"`;
  con.query(query,(err,data)=>{
    line_number = data[0].line_number
    design_pressure = data[0].design_pressure
    joint_efficiency = data[0].joint_efficiency
    stress = data[0].stress
    const query = `SELECT * FROM cml WHERE line_number = "${line_number}"`;
    con.query(query,(err,data_cml)=>{
      actual_outside_diameter = data_cml[0].actual_outside_diameter
      console.log("in design thickness calc")
      // console.log("line_number:"+line_number)
      // console.log("OD:"+data_cml[0].actual_outside_diameter)
      // console.log("DP:"+data[0].design_pressure)
      // console.log("joint:"+data[0].joint_efficiency)
      // console.log("stress:"+data[0].stress)
      const top = design_pressure*actual_outside_diameter
      const down = (2*(stress*joint_efficiency))+(2*(design_pressure*0.4))
      design_thickness = top/down
      // console.log("thickness:"+design_thickness)
      const query = `UPDATE cml SET design_thickness = "${design_thickness}" WHERE line_number = "${line_number}"`;
      con.query(query,(err,data)=>{
        console.log("value Design thickness:"+design_thickness)
        console.log("Design thickness UPDATED")
      })
  })
  })
}
global.reqCalc = function reqCalc(id){
  const query = `SELECT * FROM info WHERE id = "${id}"`;
  con.query(query,(err,data)=>{
    line_number = data[0].line_number
    design_pressure = data[0].design_pressure
    joint_efficiency = data[0].joint_efficiency
    stress = data[0].stress
    const query = `SELECT * FROM cml WHERE line_number = "${line_number}"`;
    con.query(query,(err,data)=>{
      design_thickness = data[0].design_thickness
      console.log("T design:"+data[0].design_thickness)
      structural_thickness = data[0].structural_thickness
      console.log("T structural:"+data[0].structural_thickness)
      required_thickness = Math.max(design_thickness,structural_thickness)
      console.log("T required:"+required_thickness)
      const query = `UPDATE cml SET required_thickness = "${required_thickness}" WHERE line_number = "${line_number}"`;
      con.query(query,(err,data)=>{
        console.log("value required thickness:"+required_thickness)
        console.log("Required thickness UPDATED")
      })
    })
  })
}
app.listen(3000, function () {
  console.log('Server Listen at http://127.0.0.1:3000');
  con.connect((err) => {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established at http://127.0.0.1:3000');
  });
});

