"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

/** Related functions for services */

class Service {
    /**Create a service (from data), update db, return new service data. 
     * 
     * Data should be {title, pay, serviceInfo, postedBy}
     * 
     * Returns {title, pay, serviceInfo, postedBy, createdAt}
    */

    static async create({title, pay, serviceInfo, postedBy}) {

        const result = await db.query(
            `INSERT INTO services
            (title, pay, service_info, posted_by)
            VALUES ($1, $2, $3, $4)
            RETURNING 
            title, 
            pay, 
            service_info AS "serviceInfo",
            posted_by as "postedBy"`,
            [
                title,
                pay,
                serviceInfo,
                postedBy
            ]
        );

        // const result = await db.query(
        //     `INSERT INTO services
        //     (title, pay, service_info)
        //     VALUES ($1, $2, $3)
        //     RETURNING 
        //     title, 
        //     pay, 
        //     service_info AS "serviceInfo"`,
        //     [
        //         title,
        //         pay,
        //         serviceInfo
        //     ]
        // );

        const service = result.rows[0];

        return service;
    }

    static async findAll(){
        const result = await db.query(
            `SELECT id,
                    title,
                    pay,
                    service_info AS "serviceInfo",
                    posted_by AS "postedBy",
                    liked_by AS "likedBy",
                    created_at AS "createdAt"
            FROM services
            ORDER BY created_at`
        );

        return result.rows;
    }

/** Find service by id
 * 
 * @param {*} id 
 * @returns {title, serviceInfo, pay, postedBy, likedBy, createdAt}
 */

    static async get(id){
        const result = await db.query(
            `SELECT
                    title,
                    service_info AS "serviceInfo",
                    pay,
                    posted_by AS "postedBy",
                    liked_by AS "likedBy",
                    created_at AS "createdAt"
            FROM services
            WHERE id = $1`,
            [id]
        );

        const service = result.rows[0]

        if(!service) throw new NotFoundError(`No service with id: ${id}`)

        return service
    }

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
            serviceInfo: "service_info",
            });
        const handleVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE services 
                            SET ${setCols} 
                            WHERE id = ${handleVarIdx} 
                            RETURNING id, 
                                    title,
                                    service_info AS "serviceInfo",
                                    pay,
                                    posted_by AS "postedBy",
                                    liked_by AS "likedBy",
                                    created_at AS "createdAt"`;
        const result = await db.query(querySql, [...values, id]);
        const service = result.rows[0];
    
        if (!service) throw new NotFoundError(`No service: ${id}`);
    
        return service;
    }

    /** Delete given service from database and return undefined
     * 
     * Throws NotFoundError if no service found
     * 
     * @param {*} id 
     */

    static async remove(id){
        const result = await db.query(
            `DELETE
            FROM services
            WHERE id = $1
            RETURNING id`,
            [id]
        );
        const service = result.rows[0];

        if(!service) throw new NotFoundError(`No service with id: ${id}`)
    }

}

module.exports = Service;