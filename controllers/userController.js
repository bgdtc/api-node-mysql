//CONTROLLEUR USERS

//GET
exports.get = async (req, res) => {
    // SQL récupération de tout les users
    let sql = `SELECT * FROM users`;

    await db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            listUser: data,
            message: "users lists retrieved successfully"
        })
        // res.render('home', {
        //     status: 200,
        //     listUser: data,
        //     message: "users lists retrieved successfully"
        // })
    })
}

//GETinFo
exports.getUser = async (req, res) => {
    // SQL récupération de tout les users
    let sql = `SELECT * FROM users WHERE users.nickname = '${req.params.id}'`;

    await db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.json({
            status: 200,
            listUser: data,
            message: "users lists retrieved successfully"
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
    let sql = `INSERT INTO users (full_name,nickname,email,password) values(?)`;
    let values = [
        req.body.full_name,
        req.body.nickname,
        req.body.email,
        req.body.password
    ];
    await db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM users`;
        db.query(sql, (error, dataRes, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listUser: dataRes,
                message: "Add Users successfully"
            })
        })
    })
}

// PUT 
exports.editOne = async (req, res) => {
    // SQL pour editer un users
    let sql = `UPDATE users 
                   SET full_name = '${req.body.full_name}',
                       nickname = '${req.body.nickname}',
                       email = '${req.body.email}',
                       password = '${req.body.password}'
                   WHERE id = '${req.params.id}';`

    await db.query(sql, function (err, edit, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM users`;
        console.log(edit)
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listUser: data,
                message: "Update Users successfully"
            })
        })
    })
}

// DELETE ID
exports.deleteOne = async (req, res) => {
    // SQL pour delete un users à partir de son id
    let sql = `DELETE FROM users  WHERE id = ?`;
    let values = [ req.params.id ];
    await db.query(sql, [values], function (err, del, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM users`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                listUser: data,
                message: "Delete Users successfully"
            })
        })
    })
}

//DELETE TOUT
exports.deleteAll = async (req, res) => {
    // SQL pour delete tout les users
    let sql = `DELETE FROM users`;
    await db.query(sql, function (err, data, fields) {
        if (err) throw err;
        // SQL récupération de tout les users
        let sql = `SELECT * FROM users`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.json({
                status: 200,
                dbArticle: data,
                message: "Delete All Users successfully"
            })
        })
    })
}