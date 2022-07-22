# Afstudeerproject @WORK5 - Gaandeweg

## Inleiding

Probleem
Onderzoek
Aanpak
Resultaat

## Features

### Gaandeweg Server: NestJS@8.0.0

De server applicatie maakt gebruik van NestJS en is geschreven in TypeScript.
MySQL database in een Docker container.
Authenticatie en authorizatie met Passport en JWT.
Encryptie en decryptie van "data at rest" voor gevoelige gebruikersinformatie.


### Gaandeweg Admin: Angular@13.2.0

Het administratiepaneel werd gemaakt in Angular en geschreven in TypeScript.
Verbinding met de server via library "data-access", gedeeld met de Gaandeweg Client applicatie.
Volledige CRUD-functionaliteit voor beheren van oefeningen, info elementen en categorieën.
Oefening templates geschreven in JSON worden dynamisch opgebouwd tot bewerkbare formulieren.
Bij info elementen kan gebruik gemaakt worden van een WYSIWYG-editor voor het bewerken/aanmaken van content.

### Gaandeweg Client: Angular@13.2.2 | Ionic/Angular@5.8.3

De client front-end applicatie geeft gebruikers de mogelijkheid om na authenticatie oefeningen op te slaan. Deze worden geëncrypteerd alvorens ze worden opgeslagen in de database (protect data at rest).
SSL-certificaten en HTTPS zorgen voor extra data protection in transit.


### Security

#### XSS - Cross Site Scripting

Angular safe html 

#### CSRF - Cross-Site Request Forgery

Server cookie-parser && csurf
Client HttpXsrfModule
