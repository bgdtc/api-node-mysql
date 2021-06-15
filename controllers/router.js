/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router()

/*
 * Controller
 *************/
const userController = require('./userController')
const messagesController = require('./messages')
const commentsController = require('./commentsController')

/*
 * Router
 ***********/

// User
router.route('/user')
    .get(userController.get)
    .post(userController.post)
    .delete(userController.deleteAll)

// User ID
router.route('/user/:id')
    .get(userController.getUser)
    .put(userController.editOne)
    .delete(userController.deleteOne)


//comments

router.route('/comments')
    .get(commentsController.get)
    .post(commentsController.post)
    .delete(commentsController.deleteAll)

router.route('/comments/:id')
    .get(commentsController.getID)
    .delete(commentsController.delete)
    .put(commentsController.editOne)


router.route('/user/comments/:id')
    .get(commentsController.getCommentsAuthorID)

//messages 
router.route('/messages')
    .get(messagesController.get)
    .post(messagesController.post)
    .delete(messagesController.deleteAll)


router.route('/messages/:id')
    .put(messagesController.editOne)
    .delete(messagesController.delete)

// router.route('/message')
//     .get(messageController.get)


/***********
 * / Router
 */


// on export router pour le récupérer dans ../server.js
module.exports = router;