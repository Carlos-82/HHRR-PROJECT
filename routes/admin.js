const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const User = require("../models/User");
const Company = require("../models/Company");
const Contract = require("../models/Contract");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { route } = require("./auth");
const mongoose = require("mongoose");
const { hasCompany } = require("../helpers/middlewares");

//Employees - para obtener todos los trabajadores
router.get("/employees", (req, res, next) => {
  const currentUser = req.session.currentUser;

  if (!currentUser.admin) {
    res.status(400).json({ message: "No tienes acceso Cojones" });
  } else {
    User.findById(currentUser._id)
      .then((newUSer) => {
        Company.findOne({ _id: newUSer.companyId })
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
    .then((userAdmin) => {
      Company.findOne({ _id: userAdmin.companyId })
        .then((company) => {
          res.json(company);
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
router.post("/company/create", hasCompany(), (req, res, next) => {
  const currentUser = req.session.currentUser;
  const company = {
    registerName: req.body.registerName,
    tradeName: req.body.tradeName,
    CIF: req.body.CIF,
    CCC: req.body.CCC,
    companyAddress: req.body.companyAddress,
    postalCode: req.body.postalCode,
    country: req.body.country,
    registerDate: req.body.registerDate,
    legalPersonality: req.body.legalPersonality.toLowerCase(),
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
    res.status(400).json({ message: "The id is not valid" });
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
    firstName: req.body.firstName,
    lastName: req.body.lastname,
    DNI: req.body.DNI,
    NAF: req.body.NAF,
    nationality: req.body.nationality,
    genre: req.body.genre,
    address: req.body.address,
    postalCode: req.body.postalCode,
    country: req.body.country,
    birthDate: req.body.birthdate,
    admin: req.body.admin,
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
  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      res.json({
        message: `The Employee has been successfully updated`,
        user,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

//Borrar trabajador - LO BORRA PERO CREO QUE PUEDE BORRARLO CUALQUIERA QUE SEA ADMIN SI TIENE EL ID
router.delete("/employee/:id/", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const currentUser = req.session.currentUser;
  const userDelete = req.params;

  User.findByIdAndRemove(userDelete.id)
    .then(() => {
      if (userDelete.companyId.equals(currentUser.companyId)) {
        res.json({ message: "The employee has been removed successfully" });
      } else {
        res.json({ message: "it's not an employee of your company" });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

//Obtener los contratos del trabajador
router.get("/employee/:id/contract", (req, res, next) => {
  const employee = req.params;
  User.findById(employee.id)
    .populate("contract")
    .then((userWhitContrats) => {
      res.json(userWhitContrats);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Crear contrato trabajador
router.post("/employee/:id/contract/create", (req, res, next) => {
  const currentUser = req.session.currentUser;
  const employeeId = req.params.id;
  const contract = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    contractType: req.body.contractType,
    contractCode: req.body.contractCode,
    workDay: req.body.workDay,
    workHours: req.body.workHours,
    category: req.body.category,
    jobRole: req.body.jobRole,
    salary: req.body.salary,
    bonus: req.body.bonus,
    educationLevel: req.body.educationLevel,
    vacationDays: req.body.vacationDays,
    aditionalClauses: req.body.aditionalClauses,
    user: employeeId,
  };

  Contract.create(contract)
    .then((newContract) => {
      User.findByIdAndUpdate(employeeId, {
        $push: { contract: newContract._id },
      })
        .then(() => {
          res.status(200).json({
            message: "Added contract",
            contract: newContract,
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

//Obtener informacion de un contrato
router.get("/employee/:employeeId/contract/:contractId", (req, res, next) => {
  const { employeeId, contractId } = req.params;

  User.findById(employeeId)
    .then(() => {
      Contract.findById(contractId)
        .populate("user")
        .then((contract) => {
          res.json({ message: "Your contract", contract });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

//editar contrato
router.patch(
  "/employee/:employeeId/contract/:contractId/editContract",
  (req, res, next) => {
    const { employeeId, contractId } = req.params;
    const currentUser = req.session.currentUser;

    if (!mongoose.Types.ObjectId.isValid(contractId)) {
      res.status(400).json({ message: "The id is no valid" });
      return;
    }

    User.findById(employeeId)
      .then(() => {
        Contract.findByIdAndUpdate(contractId, req.body)
          .then((updatedContract) => {
            res.json({
              message: `The Contract has been successfully updated`,
              updatedContract,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

//borrar un contrato
router.delete(
  "/employee/:employeeId/contract/:contractId",
  (req, res, next) => {
    const { currentUser } = req.session;
    const { contractId, employeeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contractId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Contract.findByIdAndRemove(contractId)
      .then(() => {
        User.findByIdAndUpdate(employeeId, { $pull: { contract: contractId } })
          .then(() => {
            res.json({ message: `Contract ${contractId} deleted` });
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

module.exports = router;
