const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

const port = 8081

/*in order to get this to work: run these in terminal:
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;
exit
*/
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '', //set password to empty for your mysql root user as well, see above comment
    database: 'asset_tracking'
})

app.get('/', (re, res) => {
    return res.json("From Backend Side");
})

app.get('/Asset', (req, res) => {
    const sql = "SELECT * FROM Asset";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(port, ()=> {
    console.log("LISTENING")
})