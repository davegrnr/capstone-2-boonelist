"use strict"

/**Routes for sales */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Sale = require("../models/sale");

// const saleNewSchema = require("../schemas/saleNew.json");
// const saleUpdateSchema = require("../schemas/saleUpdate.json");

const router = express.Router();

/**GET / => {sales: [itemName, itemInfo, price, postedBy, likedBy, createdAt]}
 * 
 * Returns list of all sales.
 * 
 * Auth required: logged in
 */

router.get("/", async function(req, res, next) {
    try{
        const sales = await Sale.findAll();
        return res.json({sales});
    } catch(err) {
        return next(err)
    }
});

/**
 * POST => / { sale } => { sale }
 * 
 * sale should be { itemName, itemInfo, price }
 * 
 * Returns { itemName, itemInfo, price }
 * 
 * Auth required: logged in
 */

router.post("/new", async function(req, res, next) {
    try{
        const sale = await Sale.create(req.body);
        return res.status(201).json({sale})
    } catch(err) {
        return next(err)
    }
}) 

/**GET /[id] => {sale: [itemName, itemInfo, price, postedBy, likedBy, createdAt]}
 * 
 * Returns specific sale.
 * 
 * Auth required: logged in
 */

router.get("/:id", async function(req, res, next) {
    try{
        const sale = await Sale.get(req.params.id);
        return res.json({sale});
    } catch(err) {
        return next(err)
    }
});

router.get("/:id", async function(req, res, next) {
    try{
        const comments = await Sale.getComments(req.params.id);
        return res.json({comments});
    } catch(err) {
        return next(err)
    }
});

  /** Update sales data with `data`.
   *
   *
   * Data can include: {itemName, itemInfo, price}
   *
   * Returns {itemName, itemInfo, price, postedBy, likedBy, createdAt}
   *
   * Throws NotFoundError if not found.
   */

router.patch("/:id", async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, companyUpdateSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
    
        const sale = await Sale.update(req.params.id, req.body);
        return res.json({ sale });
        } catch (err) {
        return next(err);
        }
    });
    
/** POST /[id] 
 * 
 * Authorization: Logged in
*/

router.post("/:id", async function (req, res, next) {
    try{
        const comment = await Sale.createComment(req.body)
        return res.status(201).json({ comment })
    } catch(err) {
        return next(err);
    }
})

/** DELETE /[id] => {deleted: id}
 * 
 *  Authorization: admin or post creator
 * 
 */

router.delete("/:id", async function(req, res, next) {
    try {
        await Sale.remove(req.params.id)
        return res.json({ deleted: req.params.id })
    } catch(err){
        return next(err);
    }
})

/** DELETE /[id] => {deleted: commentId} */

router.delete("/:id/:commentId", async function(req, res, next) {
    try {
        await Sale.removeComment(req.params.commentId);
        return res.json({deleted: req.body.commentId})
    } catch(err) {
        return next(err)
    }
})


module.exports = router;