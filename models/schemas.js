var schemas = {
    list: {
        _id: null,
        name: null,
        creation: null,
        maxDate: null,
        owner: null,
        lastUpdate: null
    },
    todos: {
        _id: null,
        idList: null,
        done: null,
        name: null,
        creation: null,
        maxDate: null
    },
    user: {
        _id: null,
        mail: null,
        password: null,
        name: null,
        img: null,
        username: null,
        creation: null
    }
}

module.exports = schemas;
