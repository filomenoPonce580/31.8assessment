const router = require('express').Router();

const urlsController = require('./urls.controller')
const usesRouter = require('../uses/uses.router')

const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/')
    .get(urlsController.list)
    .post(urlsController.create)
    .all(methodNotAllowed)

router.route('/:urlId')
    .get(urlsController.read)
    .put(urlsController.update)
    .all(methodNotAllowed)

router.route('/:urlId/uses', urlsController.validateUrlExists, usesRouter)

module.exports = router