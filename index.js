import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;


let posts = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));



app.get("/", (req, res) => {
    res.render("home.ejs", { 
        posts : posts,
    });
});


app.get("/new", (req, res) => {
    res.render("create.ejs");
});


app.post("/posts", (req, res) => {
    const title = req.body["title"];
    const content = req.body["content"];
    posts.push({ id: Date.now().toString(), title, content });
    res.redirect("/");
});


app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render("edit.ejs", { post });
});


app.put("/posts/:id", (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        post.title = title;
        post.content = content;
    }
    res.redirect("/");
});


app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect("/");
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
