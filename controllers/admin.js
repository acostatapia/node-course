const Product = require("../models/product");

const adminService = require("../services/admin.services");

exports.getAddProduct = (req, res, next) => {
  console.log("Render Add Product page");
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  try {
    adminService.addProductService(req, res, next);
    console.log("Created Product");
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = (req, res, next) => {
  try {
    adminService.editProductService(req, res, next);
    console.log("UPDATED PRODUCT!");
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = (req, res, next) => {
  adminService
    .deleteProductsService(req, res, next)
    .catch((err) => console.log(err));
};
