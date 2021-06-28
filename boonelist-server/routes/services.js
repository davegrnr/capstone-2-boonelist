"use strict"

/**Routes for services */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Service = require("../models/service");

// const serviceNewSchema = require("../schemas/serviceNew.json");
// const serviceUpdateSchema = require("../schemas/serviceUpdate.json");

const router = express.Router();

/**GET / => {services: [title, pay, serviceInfo, postedBy, likedBy, createdAt]}
 * 
 * Returns list of all services.
 * 
 * Auth required: logged in
 */

router.get("/", async function(req, res, next) {
    try{
        const services = await Service.findAll();
        return res.json({services});
    } catch(err) {
        return next(err)
    } 
});


/**
 * POST => / { service } => { service }
 * 
 * service should be { title, serviceInfo, pay }
 * 
 * Returns { title, serviceInfo, pay }
 * 
 * Auth required: logged in
 */

router.post("/new", ensureLoggedIn, async function(req, res, next) {
    try{
        const service = await Service.create(req.body);
        return res.status(201).json({service})
    } catch(err) {
        return next(err)
    }
}) 

/**GET /[id] => {service: [title, serviceInfo, pay, postedBy, likedBy, createdAt]}
 * 
 * Returns specific service.
 * 
 * Auth required: logged in
 */

 router.get("/:id", async function(req, res, next) {
     console.log(res, req)
    try{
        const service = await Service.get(req.params.id);
        console.log(service)
        return res.json({service});
    } catch(err) {
        return next(err)
    }
});

/** Update services data with `data`.
   *
   *
   * Data can include: {title, serviceInfo, price}
   *
   * Returns {title, serviceInfo, price, postedBy, likedBy, createdAt}
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
    
        const service = await Service.update(req.params.id, req.body);
        return res.json({ service });
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
        const comment = await Service.createComment(req.body)
        return res.status(201).json({ comment })
    } catch(err) {
        return next(err);
    }
})

router.delete("/:id/:commentId", async function(req, res, next) {
    try {
        await Service.removeComment(req.params.commentId);
        return res.json({deleted: req.body.commentId})
    } catch(err) {
        return next(err)
    }
})


/** DELETE /[id] => {deleted: id}
 * 
 *  Authorization: admin or post creator
 * 
 */

router.delete("/:id", async function(req, res, next) {
    try {
        await Service.remove(req.params.id)
        return res.json({ deleted: req.params.id })
    } catch(err){
        return next(err);
    }
})



module.exports = router;