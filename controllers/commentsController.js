//CONTROLLEUR COMMENTAIRES & AVIS

//GET
exports.get = async (req, res) => {
    // SQL récupération de tout les users
    let sql = `SELECT * FROM comments`;

    await db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            listComments: data,
            message: "comments lists retrieved successfully"
        })
        // res.render('home', {
        //     status: 200,
        //     listUser: data,
        //     message: "users lists retrieved successfully"
        // })
    })
}

//GET
exports.getID = async (req, res) => {
    // SQL récupération de tout les users
    let sql = `SELECT *
               FROM comments
               WHERE id = ${req.params.id}`;

    await db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            commentsId: data[0],
            message: "comments lists retrieved successfully"
        })
        // res.render('home', {
        //     status: 200,
        //     listUser: data,
        //     message: "users lists retrieved successfully"
        // })
    })
}

exports.getCommentsAuthorID = async (req, res) => {
    // SQL récupération de tout les users
    if (req.params.id == Number(req.params.id)) {
        let sql = `SELECT users.nickname, comments.content, comments.id
        FROM users
        LEFT OUTER JOIN comments
        ON users.id = comments.author_id
        WHERE users.id  = ${req.params.id} ;`

        await db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                commentsId: data,
                message: "comments lists retrieved tutyuyusuccessfully"
            })
            // res.render('home', {
            //     status: 200,
            //     listUser: data,
            //     message: "users lists retrieved successfully"
            // })
        })
    } else {
        let sql = `SELECT users.nickname, comments.content, comments.id
        FROM users
        LEFT OUTER JOIN comments
        ON users.id = comments.author_id
        WHERE users.nickname  = '${req.params.id}' ;`


        await db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                commentsId: data,
                message: "comments lists retrieved tutyuyusuccessfully"
            })
            // res.render('home', {
            //     status: 200,
            //     listUser: data,
            //     message: "users lists retrieved successfully"
            // })
        })
    }

}

//POST
exports.post = async (req, res) => {
    // SQL pour creer un users
    let sql = `INSERT INTO comments (content,avis,author_id) values(?)`;
    let values = [
        req.body.content,
        req.body.avis,
        req.body.author_id
    ];
    await db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM comments`;
        db.query(sql, (error, dataRes, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listComments: dataRes,
                message: "Add comments successfully"
            })
        })
    })
}


// PUT 
exports.editOne = async (req, res) => {
    // SQL pour edit comment
    let sql = `UPDATE comments 
                   SET content = '${req.body.content}',
                       author_id = '${req.body.author_id}',
                       avis = '${req.body.avis}'
                   WHERE id = '${req.params.id}';`


    await db.query(sql, function (err, edit, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM comments`;
        console.log(edit)
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listComments: data,
                message: "Update comments successfully"
            })
        })
    })
}


//DELETE ID

// Method Delete One
exports.delete = async (req, res) => {
    // SQL pour delete un users à partir de son id
    let sql = `DELETE FROM comments  WHERE id = ?`;
    let values = [req.params.id];
    await db.query(sql, [values], function (err, del, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM comments`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listComments: data,
                message: "Delete comments successfully"
            })
        })
    })
}

//DELETE TOUT 


//delete all 

exports.deleteAll = async (req, res) => {
    // SQL pour delete tout les users
    let sql = `DELETE FROM comments`;
    await db.query(sql, function (err, data, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM comments`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                dbArticle: data,
                message: "Delete All comments successfully"
            })
        })
    })
}