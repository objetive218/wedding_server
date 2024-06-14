if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/connectDb");
const Single = require("./models/single");
const { default: helmet } = require("helmet");

const app = express();

app.use(express.json());
app.use(
  helmet(
    {
      crossOriginResourcePolicy: false,
    },
    {
      referrerPolicy: false,
    }
  )
);
app.use(cors());
connectDb();
/*
app.use((req, res, next) => {
  
  console.log("hola");
  next();
})

*/

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/invitations", async (req, res) => {
  const invitations = await Single.find();
  if (res) {
    res.json({ invitations: invitations });
  } else {
    res.status(404).end();
  }
});

//get invitation name
app.get("/invitations/:id", async (req, res) => {
  const invitationId = req.params.id;

  const invitation = await Single.findById(invitationId);
  if (invitation) {
    res.json({ invitation: invitation });
  } else {
    res.status(404).end();
  }
});

app.post("/invitations", async (req, res) => {
  const name = req.body.name;
  const attendance = req.body.attendance;
  const body = req.body.body;
  const id = req.body.id;
  const members = req.body.members;
  const seen = req.body.seen;
  const typeInvitation = req.body.typeInvitation;
  const confirmation = req.body.confirmation;
  const gender = req.body.gender;

  const single = await Single.create({
    _id: id,
    name: name,
    attendance: attendance,
    body: body,
    members: members,
    seen: seen,
    typeInvitation: typeInvitation,
    gender: gender,
  });
  if (single) {
    res.json({ single: single });
  } else {
    res.status(404).end();
  }
});

app.put("/invitations/:id", async (req, res) => {
  const invitationId = req.params.id;

  const attendance = req.body.attendance;
  const confirmation = req.body.confirmation;
  await Single.findByIdAndUpdate(invitationId, {
    attendance: attendance,
    seen: true,
    "members.confirmation": confirmation,
  });

  const invitation = await Single.findById(invitationId);
  if (invitation) {
    res.json({ invitation: invitation });
  } else {
    res.status(404).end();
  }
});

app.listen(process.env.PORT);
