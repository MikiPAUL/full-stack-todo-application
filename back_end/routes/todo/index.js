const express = require("express")
const router = express.Router()
const { index, create, update, show, destroy } = require('../../controllers/todosController')

router.route('/todos').get(index)
                      .post(create)
router.route('/todo/:id').put(update)
                        .get(show)
                      .delete(destroy)


module.exports = router;