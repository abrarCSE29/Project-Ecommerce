const users = [
    {id: "1", name: "John Doe"},
    {id: "2", name: "Jane Doe"},
    {id: "3", name: "Mike Doe"}
];

const getUsers=((req, res) => {
    res.status(200).json({
        message: "User list is returned from controller",
        users : users
    });
}); 


module.exports = { getUsers };