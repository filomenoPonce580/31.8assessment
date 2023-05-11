const uses = require('../data/uses-data')

let nextId = 3;

function list(req,res,next){
    let {urlId} = req.params
    if(urlId){
        urlId = Number(urlId)
        res.send({data: uses.filter(use=> use.urlId === urlId)})
    }else{
        res.send({data: uses})
    }
}

function validateUseExists(req,res,next){
    let index = uses.findIndex(use => use.id === Number(req.params.useId));
  console.log(index)
    if (index > -1){
        res.locals.index = index;
        res.locals.use = uses[index];
        next();
    }else{
        next({
            status: 404,
            message: `could not find use with is ${req.params.useId}`
        })
    }
}


function read(req,res,next){
    res.send({data: res.locals.use})
}

function destroy(req,res,next){
    console.log('pingIndex', res.locals.index)
    uses.splice(res.locals.index, 1);
    res.status(204).send();
}

module.exports = {
    list,
    read: [validateUseExists, read],
    destroy:[validateUseExists, destroy]
}