const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", require("./api/users"))
app.use("/tracks", require("./api/tracks"))
app.use("/playlists", require("./api/playlists"))

app.use((req, res, enxt) =>{
    next({ status: 400, message: "Endpoint does not exist!"});
});

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(err.status ?? 500);
    res.json(err.message ?? "Sorry, its broken !!!!");
});

app.listen(PORT, ()=>{
console.log(`Listening on port num ${PORT}`);
})