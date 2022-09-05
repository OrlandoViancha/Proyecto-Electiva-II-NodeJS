var express = require("express");
var router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const animals = require("../data/animals.json");
const fs=require("fs")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", function (req, res, next) {

  let obj = fs.readFileSync('./data/data.json');

  let data = JSON.parse(obj);
  res.render("index", { title: "Pagina Principal", animals:data,genero:animals});
});

router.use(bodyParser.urlencoded({ extended: true }));


router.post("/", function (req, res, next) {
  const{id,pet}=req.body

  let obj = fs.readFileSync('./data/data.json');

  let data = JSON.parse(obj);

  

    let transaction  =data.findIndex(element => (element.mascota === pet &&element.cedula===id))
    data.splice(transaction, 1)

    var jsonContent = JSON.stringify(data);
  
  
    fs.writeFile('./data/data.json',jsonContent,(err)=>{
    
    
    })
    
  res.redirect('/')
    

  
    
  
});

router.get("/insertar", function (req, res, next) {

  
  
  res.render("insert", { title: "Insertar Mascota", animals: animals });

});

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/insertar", function (req, res) {
  const {
    namepet,
    specie,
    gender,
    illness,
    nameowner,
    lastnameowner,
    identification,
    direction,
    emailowner,
    phone_number
  } = req.body;

  let obj = fs.readFileSync('./data/data.json');

  let data = JSON.parse(obj);

  data.push({"mascota":namepet,"especie":specie,"genero":gender,"enfermedad":illness,"nombredueño":nameowner,"apellidosdueño":lastnameowner,
  "cedula":identification,"direccion":direction,"email":emailowner,"telefono":phone_number})

  var jsonContent = JSON.stringify(data);
  
  
  fs.writeFile('./data/data.json',jsonContent,(err)=>{
   
   
  })
 
  res.redirect('/')
  
});

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/actualizar/:mascota;:cedula", function (req, res, next) {
  const {mascota,cedula}=req.params

  let obj = fs.readFileSync('./data/data.json');

  let data = JSON.parse(obj);
  
  var consulta= data.filter(value=>value.mascota==mascota&&value.cedula==cedula)

  console.log(consulta)
   

  res.render("update",{title:"Modificar",animals: animals,pet:consulta})
 
});

router.post("/actualizar/:mascota;:cedula",function(req,res){

  const {
    namepet,
    specie,
    gender,
    illness,
    nameowner,
    lastnameowner,
    identification,
    direction,
    emailowner,
    phone_number
  } = req.body;

  const {mascota,cedula}=req.params;

  let obj = fs.readFileSync('./data/data.json');

  let data = JSON.parse(obj);

  data.filter(value=>value.mascota==mascota&&value.cedula==cedula).forEach(val=>{
      val.mascota=namepet
      val.especie=specie
      val.genero=gender
      val.enfermedad=illness
      val.nombredueño=nameowner
      val.apellidosdueño=lastnameowner
      val.cedula=identification
      val.direccion=direction
      val.email=emailowner
      val.telefono=phone_number
  })

  console.log(data);
  var jsonContent = JSON.stringify(data);
  
  
    fs.writeFile('./data/data.json',jsonContent,(err)=>{
    
    
    })

    res.redirect('../')
  
})



module.exports = router;
