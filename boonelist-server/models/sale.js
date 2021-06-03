"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

/** Related functions for sales */

class Sale {
    /**Create a sale (from data), update db, return new sale data. 
     * 
     * Data should be {item_name, item_info, price}
     * 
     * Returns {title, pay, itemInfo, createdAt}
    */

    static async create({itemName, itemInfo, price}) {

        const result = await db.query(
            `INSERT INTO sales
            (item_name, item_info, price)
            VALUES ($1, $2, $3)
            RETURNING 
                item_name AS "itemName",
                item_info AS "itemInfo",
                price`,
            [
                itemName,
                itemInfo,
                price
            ]
        );

        const sale = result.rows[0];

        return sale;
    }


/**
 * Find all sales items
 */

    static async findAll(){
        const result = await db.query(
            `SELECT
                    item_name AS "itemName",
                    item_info AS "itemInfo",
                    price,
                    posted_by AS "postedBy",
                    liked_by AS "likedBy",
                    created_at AS "createdAt"
            FROM sales
            ORDER BY created_at`
        );

        return result.rows;
    }

    /** Find specific item by id
     * 
     * @param {*} id 
     * @returns { itemName, itemInfo, price, postedBy, likedBy createdAt}
     */

    static async get(id){
        const result = await db.query(
            `SELECT
                    item_name AS "itemName",
                    item_info AS "itemInfo",
                    price,
                    posted_by AS "postedBy",
                    liked_by AS "likedBy",
                    created_at AS "createdAt"
            FROM sales
            WHERE id = $1`,
            [id]
        );

        if(!sale) throw new NotFoundError(`No item with id: ${id}`)

        return result.rows[0];
    }

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
            itemName: "item_name",
            itemInfo: "item_info"
            });
        const handleVarIdx = "$" + (values.length + 1);
    
        const querySql = `UPDATE sales 
                            SET ${setCols} 
                            WHERE id = ${handleVarIdx} 
                            RETURNING id, 
                                    item_name AS "itemName",
                                    item_info AS "itemInfo",
                                    price,
                                    posted_by AS "postedBy",
                                    liked_by AS "likedBy",
                                    created_at AS "createdAt"`;
        const result = await db.query(querySql, [...values, id]);
        const company = result.rows[0];
    
        if (!company) throw new NotFoundError(`No company: ${id}`);
    
        return company;
    }

        /** Delete given sale from database and return undefined
     * 
     * Throws NotFoundError if no sale found
     * 
     * @param {*} id 
     */

        static async remove(id){
            const result = await db.query(
                `DELETE
                FROM sales
                WHERE id = $1
                RETURNING id`,
                [id]
            );
            const sale = result.rows[0];
    
            if(!sale) throw new NotFoundError(`No item with id: ${id}`)
        }

}

module.exports = Sale;