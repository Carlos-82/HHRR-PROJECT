const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { route } = require("./auth");
const mongoose = require("mongoose");

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
  const currentUser = req.session.currentUser;
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

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPass = bcrypt.hashSync(req.body.password, salt);
  const user = {
    name: req.body.name,
    lastName: req.body.lastname,
    DNI: req.body.DNI,
    NAF: req.body.NAF,
    genre: req.body.genre,
    address: req.body.address,
    postalCode: req.body.postalCode,
    birthDate: req.body.birthdate,
    admin: false,
    avatar: req.body.avatar,
    email: req.body.email,
    password: hashPass,
    companyId: currentUser.companyId,
  };

  console.log(user);
  User.create(user)
    .then((newUser) => {
      Company.findByIdAndUpdate(currentUser.companyId, {
        $push: { userIds: newUser._id },
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

//informacion del trabajador
router.get("/employee/:employeeId", (req, res, next) => {
  const currentUser = req.session.currentUser;
  const employeeId = req.params.employeeId;

  User.findById(employeeId)
    .then((theEmployee) => {
      if (theEmployee.companyId.equals(currentUser.companyId)) {
        res.json(theEmployee);
      } else {
        res.json({ message: "it's not an employee of your company" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

//Editar el trabajador
router.patch("/employee/:id/editemployee", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "The id is no valid" });
    return;
  }
  const currentUser = req.session.currentUser;
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `The Employee has been successfully updated` });
    })
    .catch((err) => {
      res.json(err);
    });
});

//Borrar trabajador
router.delete("/employee/:id/", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const currentUser = req.session.currentUser;

  User.findByIdAndRemove(req.params._id)
    .then(() => {
      res.json({ message: "The employee has been removed successfully" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
