import ProductDAO from "../dao/productDAO.js";

export default class ProductController {
  static async apiGetProducts(req, res, next) {
    const productsPerPage = req.query.productsPerPage
      ? parseInt(req.query.productsPerPage)
      : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    // filter - click
    let filters = {};
    if (req.query.condition) {
      filters.condition = req.query.condition;
    }

    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.price) {
      filters.price = req.query.price;
    }

    if (req.query.title) {
      filters.title = req.query.title;
    }

    const { productList, totalNumProducts } = await ProductDAO.getProducts({
      filters,
      page,
      productsPerPage,
    });
    let response = {
      products: productList,
      page: page,
      filters: filters,
      entries_per_page: productsPerPage,
      total_results: totalNumProducts,
    };
    res.json(response);
  }

  static async apiGetProductById(req, res, next) {
    try {
      let id = req.params.id || {};
      let product = await ProductDAO.getProductByID(id);
      if (!product) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(product);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostProduct(req, res, next) {
    try {
      const title = req.body.title;
      const category = req.body.category;
      const description = req.body.description;
      const image = req.body.image;
      const status = req.body.status;
      const price = req.body.price;
      const seller = req.body.seller;
      const condition = req.body.condition;
      const date = new Date();

      const productResponse = await ProductDAO.addProduct(
        title,
        category,
        description,
        image,
        date,
        price,
        status,
        seller,
        condition
      );

      var { error } = productResponse;

      if (error) {
        res.status(500).json({ error: "Unable to post product." });
      } else {
        res.json({
          status: "success",
          response: productResponse,
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateProduct(req, res, next) {
    try {
      const productId = req.body._id;
      const category = req.body.category;
      const description = req.body.description;
      const image = req.body.image;
      const status = req.body.status;
      const price = req.body.price;
      const date = new Date();
      const title = req.body.title;
      const seller = req.body.seller;
      const condition = req.body.condition;
      const buyer = req.body.buyer;

      const productResponse = await ProductDAO.updateProduct(
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
      );
      var { error } = productResponse;

      if (error) {
        res.status(500).json({ error: "Unable to update product." });
      } else {
        res.json({
          status: "success",
          response: productResponse,
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async apiDeleteProduct(req, res, next) {
    try {
      const productId = req.body.productId;

      const productResponse = await ProductDAO.deleteProduct(productId);

      var { error } = productResponse;

      if (error) {
        res.status(500).json({ error: "Unable to delete product." });
      } else {
        res.json({
          status: "success",
          response: productResponse,
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
