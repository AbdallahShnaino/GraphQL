const persons = [
    {
        fullName: 'Abdallah Shnaino',
        age: 22,
        status: 'ACTIVE',
        itemsNumber: 10
    },
    {
        fullName: "Mohammed Ali",
        age: 25,
        status: 'ACTIVE',
        level: 3
    }
]
const items = [
    {
        id:1,
        seller:{
            fullName: "Mohammed Ali",
        },
        buyer:{
            fullName: 'Abdallah Shnaino',
        }
    },
]

function getPersons(){
    return persons
}

function getPersonWithName(fullName){
    return persons.find( person => person.fullName == fullName)
}
function getItem(itemID){
    return items.find( item => item.id == itemID)
}
module.exports = {
    getPersons,
    getPersonWithName,
    getItem,
}