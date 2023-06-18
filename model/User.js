const { v4: uuidv4 } = require('uuid');
const saltRounds = 8;
const bcrypt = require('bcrypt');

module.exports = class User{
    constructor(name, login, password) {
        this.id = uuidv4();
        this.name = name;
        this.login = login;
        this.password = password;
    }

    async hashPassword(){
         this.password = await bcrypt.hash(this.password, saltRounds);
    }

    async checkPassword(pass){
        await bcrypt.compare(pass, this.password, (err, result)=>{
            try {
                console.log(result)
                if(result!==pass){
                    return {
                        status: false,
                        errMsg: 'Неверный пароль'
                    }
                }
                return {
                    status: true
                }
            }catch (err){
                console.log(err)
            }
        })
    }
}