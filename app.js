
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent1 = "Welcome to my blog! Here you'll find a variety of articles and posts covering topics such as technology, lifestyle, and personal development. My goal with this blog is to share my knowledge and experiences with you, and to provide valuable insights that can help you in your own life.";
const homeStartingContent2="Thank you for visiting my blog, and please feel free to leave a comment or get in touch if you have any questions or feedback. I look forward to connecting with you!"
const aboutContent1 = "Hi there! My name is Uddipto Jana, and I'm the creator of this blog. I'm an undergrad at Heritage Institute of Technology,Kolkata, and I'm passionate about software development.";
const aboutContent2="I started this blog as a way to share my knowledge and insights with others, and to connect with like-minded individuals. My hope is that this blog can be a source of inspiration, information, and community for anyone who wants to learn and grow.";
const aboutContent3="When I'm not writing blog posts, you can usually find me watching anime. I also enjoy following almost all sports.";
const aboutContent4="Thank you for visiting my blog, and I hope you find the content here valuable and enjoyable. If you have any questions or comments, please don't hesitate to reach out to me. I'd love to hear from you!";

const contactContent = "Reach me out at: janauddipto@gmail.com or ";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    startingContent1: homeStartingContent1,
    startingContent2: homeStartingContent2,
    posts: posts
  });

})


app.get("/about", function (req, res) {
  res.render("about", {
    about1: aboutContent1,
    about2: aboutContent2,
    about3: aboutContent3,
    about4: aboutContent4
  });

});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contact: contactContent
  });

});


app.get("/compose", function (req, res) {
  res.render("compose");

});

app.post("/compose", function (req, res) {
  let data = {
    title: req.body.titleText,
    content: req.body.postText
  }

  posts.push(data);


  res.redirect("/");
});



app.get("/posts/:postId", (req, res) => {
  const requested = _.lowerCase(req.params.postId);

  posts.forEach(post => {
    const storedData = _.lowerCase(post.title);


    if (storedData === requested) {
      res.render("post",{
        title:post.title,
        body:post.content
      });

    } 

  });

});



const port=process.env.PORT||3000;

app.listen(port,function(){
    console.log("server started");
});
