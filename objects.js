class Restaurant {
    constructor (id, name, url, menu){
        this.id = id;
        this.name = name;
        this.url = url;
        this.menu = menu; //typeof(menu) = Item
    }
}

//Items can be products with price and description as well as sections of the menu (the whole menu is a section)
class Item {
    constructor (name, children, description, price){
        this.name = name;
        this.children = children;
        this.description = description;
        this.price = price;
    }
}

class User{
    constructor (id, type, name="", username="", passhash="", salt=""){
        this.id = id;
        this.type = type; //type of ["invalid", "waiter", "client", "restaurant"]
        this.name = name;
        this.username = username;
        this.passhash = passhash;
        this.salt = salt;
    }
}
const invalidUser = new User(-1, "invalid");

if (typeof(module) !== 'undefined'){
    module.exports = {'Restaurant': Restaurant, 'Item': Item, "User": User, "invalidUser": invalidUser};
}