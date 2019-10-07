# API INFO

HOSTNAME: 52.14.226.1:8080

Account:
    /api/accounts
        Body: {
            firstName: String
            lastName: String
            email: String
        }

    /api/accounts/:account_id
        param: {
            account_id: _id
        }


Family:
    /api/families
        Body: {
            name: String
            relationship: array
        }

    relationship element
        Body: {
            person1: account_id of the 1st person
            person2: account_id of the 2nd person
            relationship: String
        }

    /api/families/:family_id
        param: {
            family_id: _id
        }

