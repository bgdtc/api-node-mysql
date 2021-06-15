//CONTROLLEUR MESSAGES




//GET 

exports.get = async (req, res) => {
    // SQL récupération de tout les users
    let sql = `SELECT * FROM messages`;

    await db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            listMessages: data,
            message: "messages lists retrieved successfully"
        })
        // res.render('home', {
        //     status: 200,
        //     listUser: data,
        //     message: "users lists retrieved successfully"
        // })
    })
}

//get Message author
exports.getMessage = async (req, res) => {
    // SQL récupération de tout les users
    let sql = `SELECT *
               FROM messages
               RIGHT OUTER JOIN users
               ON users.nickname = messages.id
               WHERE users.nickname = '${req.params.id}' `;

    await db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            listMessages: data,
            message: "messages lists retrieved successfully"
        })
        // res.render('home', {
        //     status: 200,
        //     listUser: data,
        //     message: "users lists retrieved successfully"
        // })
    })
}

//POST


exports.post = async (req, res) => {
    // SQL pour creer un users
    let sql = `INSERT INTO messages (subject,content,email) values(?)`;
    let values = [
        req.body.subject,
        req.body.content,
        req.body.email
    ];
    await db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM messages`;
        db.query(sql, (error, dataRes, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listMessages: dataRes,
                message: "Add messages successfully"
            })
        })
    })
}


// PUT 
exports.editOne = async (req, res) => {
    // SQL pour edit comment
    let sql = `UPDATE messages 
                   SET subject = '${req.body.subject}',
                       content = '${req.body.content}',
                       email = '${req.body.email}'
                   WHERE id = '${req.params.id}';`


    await db.query(sql, function (err, edit, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM messages`;
        console.log(edit)
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listMessages: data,
                message: "Update messages successfully"
            })
        })
    })
}


//DELETE ID

// Method Delete One
exports.delete = async (req, res) => {
    // SQL pour delete un users à partir de son id
    let sql = `DELETE FROM messages  WHERE id = ?`;
    let values = [req.params.id];
    await db.query(sql, [values], function (err, del, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM messages`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listMessages: data,
                message: "Delete messages successfully"
            })
        })
    })
}

//DELETE TOUT 


//delete all 

exports.deleteAll = async (req, res) => {
    // SQL pour delete tout les users
    let sql = `DELETE FROM messages`;
    await db.query(sql, function (err, data, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM messages`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                dbArticle: data,
                message: "Delete All messages successfully"
            })
        })
    })
}