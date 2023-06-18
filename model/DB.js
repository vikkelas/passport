module.exports = class DB{
    constructor(name) {
        this.name = name;
        this.arrayDb = [];
    }
    addDB(item){
        this.arrayDb.push(item);
        return {
            status: true,
            msg: 'Success add item db',
            data: item
        }
    }

    findOne(key, value){
        const dbItem = this.arrayDb.find(item=>item[key]===value);
        if(!dbItem){
            return {
                status: false,
                msg: 'Item undefined'
            }
        }
        return {
            status: true,
            element: dbItem
        }
    }
}