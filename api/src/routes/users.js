const express = require("express")
const db = require("../db")

const router = express.Router();

//get all users
router.get("/all", async (req, res) => {
    try{
        const result = await db.query(
            "SELECT * FROM users ORDER BY id"
        );

        if(result.rows.length > 0){
            return res.json(result.rows)
        }
        return res.json({message: "No registered users"});
        
    }catch (err){
        res.json({error: "Failed to fetch users"});
    }
})

//get user by id
router.get("/:id", async (req, res) => {
    try{
        const result = await db.query(
            "SELECT * FROM users u WHERE u.id = $1",
            [req.params.id]
        )

        if(result.rows.length == 0){
            return res.json({message: "user not found"});
        }

        return res.json(result.rows[0]);
    }catch(err){
        res.json({err: "Failed to fetch user"})
    }
});

//Create a user
router.post("/", async (req, res) => {
    const {name, surname, email, phone} = req.body;
    try{
        await db.query(
            `INSERT INTO users (name, surname, email, phone)
            VALUES ($1, $2, $3, $4)`,
            [name, surname, email, phone]
        )

        res.json({message: "User created Successfully"});
    }catch(err){
        res.json({error: "Could not create user"})
    }
});

module.exports = router;