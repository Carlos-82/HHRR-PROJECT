# RRHH PROJECT

## Description

This App helps the Companies to have all their employee's information in onne click and update it at any time: personal information, contacts and absences.
Also allows the employees to knows his actual situacion in the company and request for vacations or permissions to the platform administrator and inform sickness.

## User Stories

- SignUp: sign up in the platform
- Login: Login in the platform

#### Admin Stories

- User Page: The admin can se the all the employees of the company.
- Company Details: The admin can see all the company information.
- Create company: The admin needs to create a company.
- Edit company: The admin can edit the compnay information.
- Create User: The admin can create users that will correspond with the employees.
- Create Contract: The admin can create the contract information of each employee.
- Request: The admin recives the vacations and permission from the employees.
- Employee Absences: The admin can see the absences of one employee.

#### Employees Stories

- User Page: The employee can see the contract infrormation and a calendar with the absences
- Absences: The employee can send a request for vacactions and permissions or inform that is sick.

#### Common Pages

- Personal Information: The user can see his/her personal information and edit it.
- Contract Information: The user can see his/her contract information.

## MVP 

- Signup and Login for the admin and the employee
- Admin: Create and edit the company, create and delete the other users (employees) with the basic information, create and edit the employee contracts, see all the employees and their information
- Employee: See personal information and edit it, see contract information

## Backlog

- The employee can create, edit and delete the vacations, sickness or permissions and send a request to the admin, who has to validate or deny it.
- Work time control
- add a visual calendar for the absences
- Add a calendar for all the employees absences

## Wireframes

https://wireframepro.mockflow.com/editor.jsp?editor=on&publicid=M76ccafdbba3fa4cc47f537b663a537ae1597761258544&perm=Create&projectid=Mfaad04ed7282605e04bee75c47f604001597761305480&ptitle=RRHH&bgcolor=transparent&category=featured#/page/0b1784d94edd45c88caf4b8f0c4ea5d3/sidebar/off

## Client

### Routes

| Path                                          | Component             | Permissions        | Behavior                                                                                           |
| --------------------------------------------- | --------------------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| `/`                                           | HomePage              | public/user        | Link to login and signup in public and user's dashboard if user                                    |
| `/signup`                                     | SignupPage            | anon only          | signup form, link to login, navigate to homepage after signup                                      |
| `/login`                                      | LoginPage             | anon only          | login form, link to signup, navigate to homepage after login                                       |
| `/private/user`                               | AdminPage             | admin only         | main page, link to company, employees creation, company details, requests, absences                |
| `/private/user`                               | EmployeesList         | admin only         | List of employes with acces to employee contract, employee absences, employee personal information |
| `/private/company`                            | CompanyDetail         | admin only         | company information and links to create company and edit                                           |
| `/private/company/create`                     | CompanyCreate         | admin only         | company form to create the company                                                                 |
| `/private/company/:id`                        | CompanyEdit           | admin only         | company form to edit informationand links to create company                                        |
| `/private/employee/create`                    | EmployeeCreate        | admin only         | employee form                                                                                      |
| `/private/employee/:id`                       | EmployeeDetail        | admin only         | shows the employee information                                                                     |
| `/private/employee/:id/contract`              | ContractCreate        | admin only         | form to create the contract information                                                            |
| `/private/employee/:id/contract/:id`          | ContractEdit          | admin only         | form to create the edit information                                                                |
| `/private/request`                            | EmployeeRequest       | admin only         | company information and links to create company                                                    |
| `/private/user/:id`                           | UserDetails           | admin and employee | information about the personal information                                                         |
| `/private/user/:id/edit`                      | UserDetails           | admin and employee | information about the personal information                                                         |
| `/private/user/:id/absences`                  | AbsencesList          | admin and employee | List of Absences                                                                                   |
| `/private/user/:id/sickness`                  | SicknessCreate        | admin and employee |                                                                                                    | form to create the sickness information |
| `/private/user/:id/sickness/:id`              | SicknessInformation   | admin and employee | show information about the sickness and link to Edit                                               |
| `/private/user/:id/sickness/:id/editsickness` | SicknessEdit          | admin and employee | form to edit the sickness information                                                              |
| `/private/user/:id/vacation`                  | VacationCreate        | admin and employee | form to create the vacation information                                                            |
| `/private/user/:id/vacation/:id`              | VacationInformation   | admin and employee | show information to vacations and link to Edit                                                     |
| `/private/user/:id/vacation/:id/editvacation` | VacationEdit          | admin and employee | form to edit the vacation information                                                              |
| `/private/user/:id/permission`                | PermissionCreate      | admin and employee | form to create the permission information                                                          |
| `/private/user/:id/vacation/:id`              | PermissionInformation | admin and employee | show information to permission and link to Edit                                                    |

## Components

HomePage
SignupPage
LoginPage
AdminPage
EmployeesList
CompanyDetail
CompanyCreate
CompanyEdit
EmployeeCreate
EmployeeDetail
ContractCreate
ContractEdit
EmployeeRequest
UserDetails
SicknessCreate
SicknessInformation
SicknessEdit
VacationCreate
VacationInformation
VacationEdit
PermissionCreate
PermissionInformation

# Backend

## Models

### User Model:

```
Nombre: String
Apellidos: String
DNI: String
NAF: Number
Sexo: String, enum: Hombre, Mujer
Direccion: String
CP: Number
Fecha de Nacimiento: Date
Adminsitrador: Boolean
Foto Perfil: String
Mail: String
Password: string
Empresa: type: Schema.Types.ObjectId, ref: "Empresa"
Centro: type: Schema.Types.ObjectId, ref: "Centro"
Contrato: type: Schema.Types.ObjectId, ref: "Contrato"
Ausencias: type: Schema.Types.ObjectId, ref: "Ausencias"
```

### Modelo Empresa:

```
Nombre Registrado: String
Nombre Comercial: String
CIF: String
Direccion: String
Codigo Postal: Number
Naturaleza: String, enum: P.fisica o juridica
Fecha Constitucion: Date
Usuario: type: Schema.Types.ObjectId, ref: "Usuario"
```

### Modelo Contrato

```
Fecha de Alta: Date
Finalización: Date
Tipo de Contrato: String
Codigo Contrato: Number
Categoria: String
Puesto Trabajo: String
Salario: String
Bonus: String
Educacion: String
Dias de Vacaciones: Number
Clausulas Adicionales: String
Usuario: type: Schema.Types.ObjectId, ref: "Usuario"
```

## Modelo Ausencias:

```
Vacaciones: type: Schema.Types.ObjectId, ref: "Vacaciones"
Enfermedades:type: Schema.Types.ObjectId, ref: "Enfermedad"
Permisos: type: Schema.Types.ObjectId, ref: "Permisos"
Usuario: type: Schema.Types.ObjectId, ref: "Usuario"
```

## Modelo Vacaciones:

```
Fecha de Inicio: Date
Fecha Finalización: Date
Ausencias: type: Schema.Types.ObjectId, ref: "Ausencias"
```

## Modelo Enfermedad:

```
Tipo: String, Enum: Enfermedad Comun, Enfermedad Profesional, Accidente Laboral, Accidente No Laboral
Fecha de Inicio: Date
Fecha Finalización: Date
Ausencias: type: Schema.Types.ObjectId, ref: "Ausencias"
```

## Modelo Permisos:

```
Tipo: String
Fecha de Inicio: Date
Fecha Finalización: Date
Ausencias: type: Schema.Types.ObjectId, ref: "Ausencias"
```

## API Endpoints

1. /signup - Post - Body: {name, email, password}, response: {200 - user.name}

2. /login - Post - Body: {email, password}, response: {200 - user.name, user.administrador}

FOR EL ADMIN

3. /private/employees - GET - Response: {Users List: Employee's name} -

4. /private/company - GET - Response: {Company information: [Modelo Empresa](#modelo-empresa)} -

5. /private/company/create - POST - Body {Company information: [Modelo Empresa](#modelo-empresa)}, response { 200 - ok }

6. /private/company/:id - PUT/PATCH - Body {Company information: [Modelo Empresa](#modelo-empresa)}, response { 200 - ok }

7. /private/employee/create - POST - Body {User: Name, LastName, DNI, NAF, Email, Password}, response { 200 - ok }

8. /private/employee/:id - GET - Response: {User: [Modelo Usuario](#modelo-usuario)}

9. /private/employee/:id - DELETE - response { 200 - ok }

10. /private/employee/:id/contract - GET - response {Contracts: employee contracts }

11. /private/employee/:id/contract/create - POST - Body {contract: [Modelo Contrato](#modelo-contrato) }

12. /private/employee/:id/contract/:id - GET - response {contract: [Modelo Contrato](#modelo-contrato)}

13. /private/employee/:id/contract/:id - PUT/PATCH - Body {Contract: [Modelo Contrato](#modelo-contrato)}

/private/requests - GET - response: {Vacation Model Information, Permission Model Information}

/private/requests/:id - POST - Body: {Vacation Model Information, Permission Model Information}

FOR THE EMPLOYEE

14. /private/user/contract - GET - response: {Contrac: [Modelo Contrato](#modelo-contrato) }

15. /private/user/:id - GET - Body: {User Information: [User Model](#user-model)}

16. /private/user/:id/edit - PUT/PATCH - Body: {[User Model](#user-model)}

/private/user/:id/Absences - GET - Response: {Information: [Modelo Vacaciones](#modelo-vacaciones), Permision Model, [Modelo Enfermedad](#modelo-enfermedad)}

/private/user/:id/vacation/create - POST - Body: {[Modelo Vacaciones](#modelo-vacaciones)}

/private/user/:id/vacation/:id - PUT/PATCH - Body: {[Modelo Vacaciones](#modelo-vacaciones)}

/private/user/:id/vacation/:id - DELETE - response: {200- ok}

/private/user/:id/Enfermedad/create - POST - Body: {[Modelo Enfermedad](#modelo-enfermedad)}

/private/user/:id/enfermedad/:id - PUT/PATCH - Body: {[Modelo Enfermedad](#modelo-enfermedad)}

/private/user/:id/enfermedad/:id - DELETE - response: {200- ok}

/private/user/:id/permisos/create - POST - body: {[Modelo Permisos](#modelo-permisos)}

/private/user/:id/permisos/:id - PUT/PATCH - Body {[Modelo Permisos](#modelo-permisos)}

/private/user/:id/permisos::id - DELETE - response: {200- ok}
