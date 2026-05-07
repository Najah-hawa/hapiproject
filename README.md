###  Testa och utvärdera Hapi med MongoDB
## Detta projekt skapades för att:
-	träna på Hapi.js-ramverket
-	använda MongoDB som databas
-	strukturera API med router, controller och model
-	testa valideringar och CRUD-funktionalitet
## 🔗 Länkar
•	GitHub Repository: https://github.com/Najah-hawa/hapiproject.git  <br/>
•	YouTube Video (Demonstration): https://www.youtube.com/watch?v=MTZFcM5jXvw 

### steg för att utföra projektet:
## 1️⃣ Installera Hapi och skapa projekt
Skapade ett nytt Node.js-projekt med:
npm init -y
npm install @hapi/hapi <br/>
Detta installerar Hapi och initierar projektets grundstruktur. 
________________________________________
## 2️⃣ Skapade filen server.js
I filen server.js skapades Hapi-servern och konfigurerades att köras lokalt på:
http://localhost:5000 <br/>
Här lades även anslutningen till MongoDB till (via Mongoose) samt grundläggande serverinställningar. 
________________________________________
## 3️⃣ Installerade npm-paket för MongoDB
För att ansluta och arbeta med databasen installerades:
npm install mongoose
npm install dotenv
•	Mongoose används för att kommunicera med MongoDB på ett enklare sätt.
•	dotenv används för att läsa miljövariabler med databaskopplingar.<br/>
Servern startades därefter och kunde ansluta till MongoDB på localhost. 
________________________________________
## 4️⃣ Skapade en modell
En Mongoose-modell skapades för booklist, med fält:
•	isbn (String)
•	title (String)
•	author (String)
•	year (Number)
•	haveRead (Boolean) <br/>
I modellen definierades även validering för respektive fält.
Modellen importerades senare till controller-delen. 
________________________________________
## 5️⃣ Skapade en router
I booklist.route.js skapades API-vägar för att hantera CRUD.
Funktioner som implementerades:
•	GET – hämta alla böcker
•	GET /id – hämta en specifik bok
•	POST – lägga till en ny bok
•	PUT /id – uppdatera en bok
•	DELETE /id – radera en bok <br/>
 Routern exporteras och laddas i server.js.
________________________________________
## 6️⃣ Skapade en controller
För att separera logik från routing skapades en controller-fil.
Där placerades all kod som tidigare låg i "handlers" i routern. <br/>
Controller ansvarar nu för CRUD-funktionaliteten, och routern anropar endast controller-funktioner. 
 
