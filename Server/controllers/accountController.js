Account = require("../models/accountModel");
// const sha256 = require('sha256');
const {ObjectId} = require('mongodb'); // or ObjectID 

// const hash = crypto.createHash('sha256').update('password').digest('hex');
// const salt = "test";

// ! for now we have no access to modify email, album, _id
// ? Do we need to add independent access later, 
// ? e.g.link register user to virtual account

// get all accounts
exports.index = (req, res) => {
    Account.get((err, accounts) => {
        if (err){
            res.json({
                status: "error",
                message: "error",
            });
        }
        res.json({
            status: "Success",
            message: "Account retrieved successfully!",
            data: accounts
        });
    });
};

// ! need to modify
// create new account
exports.new = (req, res) => {
    var account = new Account();
    account.firstName = req.body.firstName;
    account.lastName = req.body.lastName;
    account.DOB = req.body.DOB;
    account.gender = req.body.gender;
    // TODO modify this id to hash function

    console.log(code);
    account._id = req.body._id;
    
    account.save((err) => {
        if (err){
            res.json(err);
        }
        res.json({
            message: "New Account created!",
            data: account
        });
    });
};


// view one account by id
exports.view = (req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
        if (err){
            res.send(err);
        }
        res.json({
            message: "Account details loading..",
            data: account
        });
    });
};

// update one account
exports.update = (req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
        if (err){
            res.send(err);
        };
        account.firstName = req.body.firstName;
        account.lastName = req.body.lastName;
        account.DOB = req.body.DOB;
        account.gender = req.body.gender;
        console.log(sha256("XiaojianZhang1963-05-12"));
        account.save((err => {
            if (err){
                res.json(err);
            }
            res.json({
                message: "Account info updated",
                data: account
            });
        }));
    });
};

// delete one account
exports.delete = (req, res) => {
    Account.remove({
        _id: req.params.account_id
    }, (err, account) => {
        if (err) res.send(err);

        res.json({
            status: "Success",
            message: "Account Deleted"
        });
    });
};

// set the family to given acount
exports.joinfamily = (req, res) => { 
    Account.findById(req.params.account_id, (err, account) => {
        if (err) {
            res.send(err);
        };
        account.family = req.body.family;

        account.save((err => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "Join family Success!",
                data: account
            });
        }));
    });
}