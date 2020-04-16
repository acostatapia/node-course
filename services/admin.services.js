const Product = require("../models/product");

exports.addProductService = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  return product.save();
};

exports.getEditProductService = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.editProductService = (req, res, next) => {
  const prodId = req.body.productId;
  return Product.findById(prodId).then((product) => {
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.imageUrl = req.body.imageUrl;
    return product.save();
  });
};

exports.getProductsService = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then((products) => {
      console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProductsService = (req, res, next) => {
  const prodId = req.body.productId;
  return Product.findByIdAndRemove(prodId).then(() => {
    console.log("DESTROYED PRODUCT");
    res.redirect("/admin/products");
  });
};
