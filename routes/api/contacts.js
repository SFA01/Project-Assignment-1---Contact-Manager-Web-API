var express = require('express');
var router = express.Router();

//Step 1: import model
var Contact = require("../../model/contact")

/* GET contacts */
router.get('/', async function(req, res, next) {

  let contactList = await Contact.find()

  res.status(200).json(contactList)
});

/* GET contacts using lastname */
router.get('/:_lastname', async function(req, res, next) {
  let contactList = await Contact.find()

  console.log(req.params._lastname)



  let filteredContactList = contactList.filter((contact) => contact.LastName.includes(req.params._lastname) )

  console.log(filteredContactList)

  res.status(200).json(filteredContactList)
});

/* Post contact */
router.post('/', async function(req, res, next) {

  //validation
  if(
    typeof req.body.FirstName === "string" &&
    typeof req.body.LastName === "string" &&
    typeof req.body.EmailAddress === "string")
    {
      let newContact = new Contact({
        FirstName : req.body.FirstName,
        MiddleName : req.body.MiddleName,
        LastName : req.body.LastName,
        EmailAddress : req.body.EmailAddress,
        PhoneNumber : req.body.PhoneNumber,
        AddressOne : req.body.AddressOne,
        AddressTwo : req.body.AddressTwo,
        Province : req.body.Province,
        PostalCode : req.body.PostalCode,
        Country : req.body.Country,
      })

      //save the new contact to the database
      await newContact.save()

      res.status(201).json(newContact)
    }else{
      res.status(400).json({"message":"invalid first name, last name, or email. please try again"});
    }

  
});

/* Put contact */
router.put('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Delete contact */
router.delete('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
