import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import ProductDAO from "./dao/productDAO.js";
import UserDAO from "./dao/userDAO.js";
import MessageDAO from "./dao/messageDAO.js";

async function main() {
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.MARKET_DB_URI);
  const port = process.env.PORT || 8000;

  try {
    // Connect to MongoDB server
    await client.connect();
    await ProductDAO.injectDB(client);
    await UserDAO.injectDB(client);
    await MessageDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);

// We export here for the benefit of testing
export default app;
