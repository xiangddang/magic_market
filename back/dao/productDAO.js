import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let products;

export default class ProductDAO {
  static async injectDB(conn) {
    if (products) {
      return;
    }
    try {
      products = await conn
        .db(process.env.MARKET_DB_COLLECTION)
        .collection("products");
    } catch (e) {
      console.error(`Unable to connect to productsDAO: ${e}`);
    }
  }

  static async getProducts({
    filters = null,
    page = 0,
    productsPerPage = 20,
  } = {}) {
    // empty object as default value
    let query = {};
    if (filters) {
      if ("title" in filters) {
        const titleFilter = new RegExp(filters.title, "i");
        query = { ...query, title: { $regex: titleFilter } };
      }

      if ("condition" in filters) {
        query = { ...query, condition: { $eq: filters.condition } };
      }

      if ("category" in filters) {
        query = { ...query, category: { $eq: filters.category } };
      }

      if ("price" in filters) {
        switch (filters.price) {
          case "price1":
            query = { ...query, price: { $gte: 0, $lte: 10 } };
            break;
          case "price2":
            query = { ...query, price: { $gte: 10, $lte: 50 } };
            break;
          case "price3":
            query = { ...query, price: { $gte: 50, $lte: 100 } };
            break;
          case "price4":
            query = { ...query, price: { $gte: 100, $lte: 500 } };
            break;
          case "price5":
            query = { ...query, price: { $gte: 500 } };
            break;
          default:
            break;
        }
      }
    }

    let cursor;
    try {
      cursor = await products
        .find(query)
        .limit(productsPerPage)
        .skip(productsPerPage * page);
      const productList = await cursor.toArray();
      const totalNumProducts = await products.countDocuments(query);
      return { productList, totalNumProducts };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { productList: [], totalNumProducts: 0 };
    }
  }

  static async getProductByID(id) {
    try {
      return await products
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "productId",
              as: "products",
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`Unable to get product by ID: ${e}`);
      throw e;
    }
  }

  static async addProduct(
    title,
    category,
    description,
    image,
    date,
    price,
    status,
    seller,
    condition
  ) {
    try {
      const productDoc = {
        title: title,
        category: category,
        description: description,
        image: image,
        date: date,
        price: price,
        status: status,
        seller: seller,
        condition: condition,
        buyer: [],
      };

      return await products.insertOne(productDoc);
    } catch (e) {
      console.error(`Unable to post product: ${e}`);
      return { error: e };
    }
  }

  static async updateProduct(
    productId,
    title,
    category,
    description,
    image,
    date,
    price,
    status,
    seller,
    condition,
    buyer
  ) {
    try {
      const updatedProduct = {
        $set: {
          title: title,
          category: category,
          description: description,
          image: image,
          date: date,
          price: price,
          status: status,
          seller: seller,
          condition: condition,
          buyer: buyer,
        },
      };
      // Store the result
      const result = await products.updateOne(
        { _id: new ObjectId(productId) },
        updatedProduct
      );
      if (result.modifiedCount === 0) {
        throw new Error("Unable to update product");
      }
      return result;
    } catch (e) {
      console.error(`Unable to update product: ${e}`);
      return { error: e };
    }
  }

  static async deleteProduct(productId) {
    try {
      return await products.deleteOne({ _id: new ObjectId(productId) });
    } catch (e) {
      console.error(`Unable to delete product: ${e}`);
      return { error: e };
    }
  }
}
