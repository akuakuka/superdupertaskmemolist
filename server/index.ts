
import { app } from "./api/app"
import { createDBConnection } from './db/dbsetup';

import { PORT } from './config/config';
console.log(`"PORTTI${PORT}"`)
createDBConnection().then(async () => {
 // const store = await getSessionStore()
 
   app.listen(parseInt(PORT), () => {

    console.log(`"Server running on port ${PORT}"`);
  });
}).catch((err) => {
   console.log("Failed to start!")
   console.log(err)
});

