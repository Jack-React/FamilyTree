Family = require("../models/familyModel");
Account = require("../models/accountModel");

// get all families
exports.index = (req, res) => {
    Family.get((err, family) => {
        if (err){
            res.json({
                status: "Error",
                message: "Unable to obtain family details",
            });
        }
        res.json({
            status: "Success",
            message: "Family info retrieved successfully!",
            data: family
        });
    });
};

// create new families
exports.new = (req, res) => {
    var family = new Family();
    family.name = req.body.name;

    family.save((err) => {
        if (err){
            res.json(err);
        }
        res.status(201).json({
            message: "New Family created!",
            data: family
        });
    });
};

// Create relation schema and push it into family
exports.addRelation = (req, res) => { 
    data = {
        person1: req.body.person1,
        person2: req.body.person2,
        relationship: req.body.relationship
    }
    Family.findOneAndUpdate(
        { _id: req.params.family_id },
        { $push: { relations: data } },
        (err, success) => {
            if (err) res.json({ status: 'error', message: err })
            res.json({status: 'success', message: 'successfully added family member'})
        }
    );
};

// Delete relation of family
// TODO complete this function
// exports.deleteRelation = (req, res) => { 
//     Family.findById(req.params.family_id, (err, family) => { 
//         if (err) { 
//             res.send(err);
//         }
//         family.relations
//         for (var i = 0; i < arrayOfObjects.length; i++) {
//             var obj = arrayOfObjects[i];

//             if (listToDelete.indexOf(obj.id) !== -1) {
//                 arrayOfObjects.splice(i, 1);
//             }
//         }
//     });
// }

// View one family by id
exports.view = (req, res) => {
    Family.findById(req.params.family_id, (err, family) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: "Family details loading..",
            data: family
        });
    });
};

// Update one family
exports.update = (req, res) => {
    Family.findById(req.params.family_id, (err, family) => {
        if (err) res.status(400).send(err);

        family.name = req.body.name;

        family.save((err => {
            if (err){
                res.json(err);
            }
            res.json({
                message: "Account info updated",
                data: family
            });
        }));
    });
};


// Delete one family
exports.delete = (req, res) => {
    Family.remove({
        _id: req.params.family_id
    }, (err, family) => {
        if (err) res.send(err);

        res.json({
            status: "Success",
            message: "Family Deleted"
        });
    });
};

// find relations of one account
exports.findRelations = (req, res) => {
    var user_id = req.params.account_id;

    Account.findById(user_id, (err, account) => {
        if (err) {
            res.send(err);
        }

        var family_id = account.family;
        Family.findById(family_id, (err, family) => {
            if (err) {
                res.send(err);
            }

            var relations = family.relations.filter(relation => relation.person1 == user_id || relation.person2 == user_id);

            res.json({
                message: "Find all relations",
                data: relations
            });
        });
    });
}

// get all members in one family
exports.getmembers = (req, res) => {
    Family.findById(req.params.family_id , (err, family) => { 
        if (err) {
            res.send(err);
        }
        
        var people1 = family.relations.map((e) => { return e.person1; });
        var people2 = family.relations.map((e) => { return e.person2; });
        var members = people1.concat(people2);

        var membersid = arrayUnique(members);

        Account.find({
            '_id': {
                $in: membersid
            }
        }, (err, results) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: "Find all family members",
                data: results
            });
        });
    });
};

var arrayUnique = (arr) => {
    return arr.filter(function (item, index) {
        return arr.indexOf(item) >= index;
    });
};