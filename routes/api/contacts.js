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

  // here it find all contacts in the contactList
  let contactList = await Contact.find()

  let filteredContactList = contactList.filter((contact) => contact.LastName.includes(req.params._lastname) )

  console.log(filteredContactList)

  res.status(200).json(filteredContactList)
});

/* Post contact */
router.post('/', async function(req, res, next) {

  // it validates that firstName, LastName and EmailAddress exist and are of type string
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
router.put('/:_id', async function(req, res, next) {
  
  // it validates that FirstName, LastName, and EmailAddress exists and are not empty
  if(!req.body.FirstName || !req.body.LastName || !req.body.EmailAddress){
    res.status(400).json({"message":"missing First name, Last name, or email"})
  }else{
    
    // here it take the database and update the contact with the given id
    let modifiedContact = await Contact.findByIdAndUpdate(
      req.params._id,
      {
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
      },
      { new: true}
    )
    res.status(200).json(modifiedContact)
  }
});

/* Delete contact */
router.delete('/:_id', async function(req, res, next) {

  // here it will take the database and deletes the contact with the given id
  await Contact.findByIdAndDelete(req.params._id)

  // it returns a response
  res.status(200).json({"message": "contact successfully deleted"})
});

module.exports = router;
