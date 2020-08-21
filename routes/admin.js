const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const Company = require("../models/Company");
const { route } = require("./auth");
const { Mongoose } = require("mongoose");

//Employees - para obtener todos los trabajadores
router.get("/employees", (req, res, next) => {
  const currentUser = req.session.currentUser;

  if (!currentUser.admin) {
    res.status(400).json({ message: "No tienes acceso Cojones" });
  } else {
    User.findById(currentUser._id)
      .then((userFresquito) => {
        //console.log({ userFresquito });
        Company.findOne({ _id: userFresquito.companyId })
          .populate("userIds")
          .then((allEmployees) => {
            res.json(allEmployees);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

//Informacion de la Empresa
router.get("/company", (req, res, next) => {
  const currentUser = req.session.currentUser;

  User.findById(currentUser._id)
    .then((userFresquito) => {
      Company.findOne({ _id: userFresquito.companyId })
        .then((allEmployees) => {
          res.json(allEmployees);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

//Creacion de la empresa
router.post("/company/create", (req, res, next) => {
  const currentUser = req.session.currentUser;
  const company = {
    registerName: req.body.registerName,
    tradeName: req.body.tradeName,
    CIF: req.body.CIF,
    CCC: req.body.CCC,
    address: req.body.address,
    postalCode: req.body.postalCode,
    registerDate: req.body.registerDate,
    legalPersonality: req.body.legalPersonality,
    colectiveAgreement: req.body.colectiveAgreement,
    mutualInsurance: req.body.mutualInsurance,
    userIds: [currentUser._id],
  };
  Company.create(company)
    .then((newCompany) => {
      User.findByIdAndUpdate(currentUser._id, {
        companyId: newCompany._id,
      })
        .then(() => {
          res.status(200).json({
            message: "Added Company",
            company: newCompany,
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

//Editar la empresa
router.patch("/company/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "The id is no valid" });
    return;
  }
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `The Company has been successfully updated` });
    })
    .catch((err) => {
      res.json(err);
    });
});

//creacion empleado
router.post("/employee/create", (req, res, next) => {
  const currentUser = req.session.currentUser;
  const user = {
    name: req.body.name,
    lastname: req.body.lastname,
    DNI: req.body.DNI,
    NAF: req.body.NAF,
    genre: req.body.genre,
    address: req.body.address,
    postalCode: req.body.postalCode,
    birthdate: req.body.birthdate,
    admin: false,
    avatar: req.body.avatar,
    email: req.body.email,
    password: req.body.password,
    company: currentUser.companyId,
  };

  User.create(user)
    .then((newUser) => {
      Company.findByIdAndUpdate(currentUser.companyId, {
        $pull: { userId: newUser._id },
      })
        .then(() => {
          res.status(200).json({
            message: "Added User",
            user: newUser,
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
