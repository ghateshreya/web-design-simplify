const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/simplyfyDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const groupCollectionSchema = {
  groupName: {
    type: String,
    unique: true,
    required: "Group Name is required",
  },
};

const groupCollection = mongoose.model(
  "groupCollection",
  groupCollectionSchema
);

app.post("/group/create", bodyParser.json(), (req, res) => {
  var Group_instance = new groupCollection(req.body);
  let errorr = Group_instance.validateSync();

  if (errorr) {
    if (errorr.name == "ValidationError") {
      for (field in errorr.errors) {
        console.log("** ", errorr.errors[field].message);
        res.send(errorr.errors[field].message);
        return;
      }
    }
  }

  groupCollection.count(
    { groupName: req.body.groupName },
    function (err, count) {
      if (count > 0) {
        res.status(400);
        res.send("Group Name is already exists");
      }
    }
  );
  // Save the new model instance, passing a callback
  Group_instance.save(function (err) {
    if (err) {
      //console.log("Error ", err);
      if (err.name == "MongoError") {
      }
    } else {
      res.send("Success");
      //console.log("Success");
    }
  });
});

const userSchema = {
  Email: {
    type: String,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please Enter a valid email address",
    ],
  },
  Password: {
    type: String,
    min: [6],
    max: 12,
    required: "Password is required",
    match: [
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password Should Include 1 upper case and 1 special character",
    ],
  },
};

const User = mongoose.model("User", userSchema);

app.post("/user/create", bodyParser.json(), (req, res) => {
  //console.log(req.body.Email);
  var User_instance = new User(req.body);
  let errorr = User_instance.validateSync();

  if (errorr) {
    if (errorr.name == "ValidationError") {
      for (field in errorr.errors) {
        console.log("** ", errorr.errors[field].message);
        res.send(errorr.errors[field].message);
        return;
      }
    }
  }

  User.count({ Email: req.body.Email }, function (err, count) {
    if (count > 0) {
      res.status(400);
      res.send("Email ID is already exists");
    }
  });
  // Save the new model instance, passing a callback
  User_instance.save(function (err) {
    if (err) {
      //console.log("Error ", err);
      if (err.name == "MongoError") {
      }
    } else {
      res.send("Success");
      //console.log("Success");
    }
  });
});

app.put("/user/edit/:EmailToEdit", function (req, res) {
  console.log(req.body);
  var User_instance = new User(req.body);

  console.log("User_Instance", User_instance);
  let errorr = User_instance.validateSync();

  console.log("User_instance.validateSync()" + User_instance.validateSync());
  console.log("errorr", errorr);

  if (errorr) {
    if (errorr.name === "ValidationError") {
      for (field in errorr.errors) {
        console.log("** ", errorr.errors[field].message);
        return res.send(errorr.errors[field].message);
      }
    }
  }

  User.count({ Email: req.body.Email }, function (err, count) {
    if (count > 0) {
      res.status(400);
      return res.send("Email ID is already exists");
    } else {
      User.findOneAndUpdate(
        { Email: req.params.EmailToEdit },
        { Email: req.body.Email, Password: req.body.Password },
        { overwrite: true },

        function (err) {
          if (!err) {
            return res.send("Successfully Updated Selected User Deatils.");
          }
        }
      );
    }
  });
  // console.log(req.body.Email);
  // if (req.body.Email === "" || req.body.Email === undefined)
  //   return res.send("Email address is required");

  // if (req.body.Password === "" || req.body.Password === undefined)
  //   return res.send("Password is required");
});

app.post("/user/edit", bodyParser.json(), (req, res) => {
  console.log(req.body);
  var User_instance = new User(req.body);
  // let errorr = User_instance.validateSync();

  // if (errorr) {
  //   if (errorr.name == "ValidationError") {
  //     for (field in errorr.errors) {
  //       console.log("** ", errorr.errors[field].message);
  //       res.send(errorr.errors[field].message);
  //     }
  //   }
  // }

  // User.count({ Email: req.body.Email }, function (err, count) {
  //   if (count > 0) {
  //     //document exists });
  //     res.status(400);
  //     res.send("Email ID is already exists");
  //   }
  // });
  User.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, Users) {
    res.send(Users);
  });
});

app.get("/user/getAll", bodyParser.json(), (req, res) => {
  //console.log("Get called");

  User.find({}, (err, Users) => {
    if (err) res.send(err);
    else res.send(Users);
  });
});

app.delete("/user/delete", bodyParser.json(), (req, res) => {
  console.log("Delete called");
  User.findOneAndDelete({ Email: req.body.Email }, function (err, Users) {
    if (err) {
      res.send(err);
      return;
    }
    User.find({}, (err, Users) => {
      if (err) res.send(err);
      else res.send(Users);
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
