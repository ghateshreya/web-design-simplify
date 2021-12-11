const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
    useFindAndModify: false,
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.connect("mongodb+srv://simplyfydb:simplyfydb@cluster0.t5adm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
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
  firstName: {
    type: String,
    required: "First Name is required",
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please Enter a valid email address",
    ],
  },
  password: {
    type: String,
    min: [6],
    max: 12,
    required: "Password is required",
    match: [
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Password Should Include 1 upper case and 1 special character",
    ],
  },
  groupName: {
    type: String,
  },
};

const userCollection = mongoose.model("userCollection", userSchema);

app.post("/user/create", bodyParser.json(), (req, res) => {
  //console.log(req.body.Email);
  var User_instance = new userCollection(req.body);
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

  userCollection.count({ email: req.body.email }, function (err, count) {
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

const toDoCollectionSchema = {
  toDoName: {
    type: String,
    required: "To Do Name is required",
  },
  toDoDescription: {
    type: String,
    required: "To Do Description is required",
  },
  toDoStatus: {
    type: String,
    required: "Status is required",
  },
  userId: [
    {
      firstName: {
        type: String,
        //required: "First Name is required",
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        //unique: true,
      },
      password: {
        type: String,
        min: [6],
        max: 12,
        required: "Password is required",
        match: [
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
          "Password Should Include 1 upper case and 1 special character",
        ],
      },
      groupName: {
        type: String,
      },
    },
  ],
};

const toDoCollection = mongoose.model("toDoCollection", toDoCollectionSchema);

app.post("/todo/create", bodyParser.json(), (req, res) => {
  var User_instance = new toDoCollection(req.body);
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

  // Save the new model instance, passing a callback
  User_instance.save(function (err) {
    console.log("Err ", err);
    if (err) {
      if (err.name == "MongoError") {
      }
    } else {
      res.send("Success");
    }
  });
});

const expenseCollectionSchema = {
  expenseName: {
    type: String,
    required: "Expense Name is required",
  },
  expenseDescription: {
    type: String,
    required: "Expense Description is required",
  },
  expenseCategory: {
    type: String,
    required: "Expense Category is required",
  },
  expenseCostInDollars: {
    type: Number,
    required: "Expense Cost in Dollar is required",
  },
  userId: [
    {
      firstName: {
        type: String,
        //required: "First Name is required",
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        //unique: true,
      },
      password: {
        type: String,
        min: [6],
        max: 12,
        required: "Password is required",
        match: [
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
          "Password Should Include 1 upper case and 1 special character",
        ],
      },
      groupName: {
        type: String,
      },
    },
  ],
};

const expenseCollection = mongoose.model(
  "expenseCollection",
  expenseCollectionSchema
);

app.post("/expense/create", bodyParser.json(), (req, res) => {
  var User_instance = new expenseCollection(req.body);
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

  // Save the new model instance, passing a callback
  User_instance.save(function (err) {
    if (err) {
      console.log("Err ", err);
      if (err.name == "MongoError") {
      }
    } else {
      res.send("Success");
    }
  });
});

app.get("/user/getUserByEmail/:email", bodyParser.json(), (req, res) => {
  //console.log("Get called");

  console.log(req.body.email);

  userCollection.find({ email: req.params.email }, (err, Users) => {
    if (err) res.send(err);
    else res.send(Users);
  });
});

app.get("/user/getAll", bodyParser.json(), (req, res) => {
  //console.log("Get called");

  userCollection.find({}, (err, Groups) => {
    if (err) res.send(err);
    else res.send(Groups);
  });
});

app.get("/group/getAll", bodyParser.json(), (req, res) => {
  //console.log("Get called");

  groupCollection.find({}, (err, Groups) => {
    if (err) res.send(err);
    else res.send(Groups);
  });
});

app.get("/todo/getAll", bodyParser.json(), (req, res) => {
  //console.log("Get called");

  toDoCollection.find({}, (err, ToDos) => {
    if (err) res.send(err);
    else res.send(ToDos);
  });
});
app.get("/expense/getAll", bodyParser.json(), (req, res) => {
  //console.log("Get called");

  expenseCollection.find({}, (err, ToDos) => {
    if (err) res.send(err);
    else res.send(ToDos);
  });
});

app.get("/todo/getToDoByEmail/:email", bodyParser.json(), (req, res) => {
  console.log(req.params);

  toDoCollection.find({ "userId.email": req.params.email }, (err, ToDos) => {
    if (err) res.send(err);
    else res.send(ToDos);
  });
});

app.get("/expense/getAll", bodyParser.json(), (req, res) => {
  //console.log("Get called");

  expenseCollection.find({}, (err, ToDos) => {
    if (err) res.send(err);
    else res.send(ToDos);
  });
});

app.get("/expense/getExpenseByEmail/:email", bodyParser.json(), (req, res) => {
  console.log(req.params);

  expenseCollection.find({ "userId.email": req.params.email }, (err, ToDos) => {
    if (err) res.send(err);
    else res.send(ToDos);
  });
});

app.patch("/user/edit/:email", bodyParser.json(), (req, res) => {
  //console.log("mm", req.body);
  //console.log("req.params.email", req.params.email);
  //const id = req.body.id;

  //console.log(id);

  userCollection.findOneAndUpdate(
    { email: req.params.email },
    { $set: { lastName: req.body.lastName, password: req.body.password } },
    //req.body,
    { new: true },
    function (error, success) {
      if (error) {
        res.send({ message: "Error", error });
      } else {
        console.log("Update User ", success);
        res.send({ message: "User updated successfully", success });
      }
    }
  );
});

app.patch("/todo/edit/:email", bodyParser.json(), (req, res) => {
  //console.log("mm", req.body.id);
  //console.log(req.params.id);

  toDoCollection.findOneAndUpdate(
    { "userId.email": req.params.email },
    //req.body,
    {
      $set: {
        toDoDescription: req.body.toDoDescription,
        toDoStatus: req.body.toDoStatus,
      },
    },
    { new: true },
    function (error, success) {
      if (error) {
        res.send({ message: "Error", error });
      } else {
        console.log("Update To DO ", success);
        res.send({ message: "TO DO updated successfully", success });
      }
    }
  );
});

app.patch("/expense/edit/:email", bodyParser.json(), (req, res) => {
  //console.log("mm", req.body);
  //console.log("req.params.email", req.params.email);
  //const id = req.body.id;

  //console.log(id);

  expenseCollection.findOneAndUpdate(
    { "userId.email": req.params.email },
    {
      $set: {
        expenseDescription: req.body.expenseDescription,
        expenseCostInDollars: req.body.expenseCostInDollars,
      },
    },
    //req.body,
    { new: true },
    function (error, success) {
      if (error) {
        res.send({ message: "Error", error });
      } else {
        console.log("Update User ", success);
        res.send({ message: "User updated successfully", success });
      }
    }
  );
});

app.delete("/user/delete/:email", bodyParser.json(), (req, res) => {
  console.log("Delete called");
  userCollection.findOneAndDelete(
    { email: req.params.email },
    function (err, Users) {
      if (err) {
        res.send(err);
        return;
      }
      userCollection.find({}, (err, Users) => {
        if (err) res.send(err);
        else res.send(Users);
      });
    }
  );
});

app.delete("/todo/delete/:toDoName", bodyParser.json(), (req, res) => {
  console.log("Delete called");
  toDoCollection.findOneAndDelete(
    { toDoName: req.params.toDoName },
    function (err, Users) {
      if (err) {
        res.send(err);
        return;
      }
      toDoCollection.find({}, (err, Users) => {
        if (err) res.send(err);
        else res.send(Users);
      });
    }
  );
});

app.delete("/expense/delete/:expenseName", bodyParser.json(), (req, res) => {
  console.log("Delete called");
  expenseCollection.findOneAndDelete(
    { expenseName: req.params.expenseName },
    function (err, Users) {
      if (err) {
        res.send(err);
        return;
      }
      expenseCollection.find({}, (err, Users) => {
        if (err) res.send(err);
        else res.send(Users);
      });
    }
  );
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
