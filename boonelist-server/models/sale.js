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

     static async create({itemName, price, itemInfo, postedBy}) {

        const result = await db.query(
            `INSERT INTO sales
            (item_name, price, item_info, posted_by)
            VALUES ($1, $2, $3, $4)
            RETURNING 
            item_name AS "itemName", 
            price, 
            item_info AS "itemInfo",
            posted_by as "postedBy"`,
            [
                itemName,
                price,
                itemInfo,
                postedBy
            ]
        );


        const sale = result.rows[0];

        return sale
    }


/**
 * Find all sales items
 */

    static async findAll(){
        const result = await db.query(
            `SELECT id,
                    item_name AS "itemName",
                    item_info AS "itemInfo",
                    price,
                    posted_by AS "postedBy",
                    liked_by AS "likedBy",
                    created_at AS "createdAt"
            FROM sales
            ORDER BY created_at DESC`
        );

        return result.rows;
    }

    /** Find specific item by id
     * 
     * @param {*} id 
     * @returns { itemName, itemInfo, price, postedBy, likedBy createdAt}
     */

    static async get(id){
        const saleRes = await db.query(
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

        const sale = saleRes.rows[0];

        if(!sale) throw new NotFoundError(`No item with id: ${id}`)

        const commentsRes = await db.query(
            `SELECT
                    comment_text AS "commentText",
                    posted_by AS "postedBy",
                    created_at AS "createdAt",
                    id
            FROM sales_comments
            WHERE sales_id = $1
            ORDER BY created_at DESC`,
            [id]
        );

        sale.comments = commentsRes.rows;

        return sale;
    }

    // static async getComments(id){
    //     const result = await db.query(
    //         `SELECT
    //                 comment_text AS "commentText",
    //                 posted_by AS "postedBy",
    //                 created_at AS "createdAt"
    //         FROM sales_comments
    //         WHERE sales_id = $1`,
    //         [id]
    //     );

    //     const comments = result.rows;

    //     if(!sale) throw new NotFoundError(`No comments on this post yet!`)
    //     console.log(comments)
    //     return comments;
    // }

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

    static async createComment({subjectId, commentText, postedBy}){

        const result = await db.query(
            `INSERT INTO sales_comments
            (sales_id, comment_text, posted_by)
            VALUES ($1, $2, $3)
            RETURNING
            sales_id AS "subjectId",
            comment_text AS "commentText",
            posted_by AS "postedBy"`,
            [
                subjectId,
                commentText,
                postedBy
            ]
        );
        const comment = result.rows[0]

        return comment;
    }

    /** Delete sale comment from database and return undefined */

    static async removeComment(commentId){
        const result = await db.query(
            `DELETE FROM sales_comments
            WHERE id = $1
            RETURNING id`,
            [commentId]
        );
        
        const comment = result.rows[0];

        if(!comment) throw new NotFoundError(`No comment with id: ${commentId}`)
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