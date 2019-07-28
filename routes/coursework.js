const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const List = require("../models/List");
const Note = require("../models/Note");
const Board = require("../models/Board");

router.get("/", (req, res, next) => {
  Board.findOne({ name: "ftwd-june-berlin" })
    .then(board => {
      res.json(board);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/days", (req, res, next) => {
  List.find({})
    .then(days => {
      res.json(days);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/lessons", (req, res, next) => {
  Card.find({})
    .then(lessons => {
      res.json(lessons);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/days/:id", (req, res, next) => {
  List.findOne({ id: req.params.id })
    .populate("cards")
    .then(day => {
      res.json(day);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/weeks/:number", (req, res, next) => {
  List.find({ week: req.params.number.toString() })
    .populate("cards")
    .then(week => {
      res.json(week);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/weeks", (req, res, next) => {
  List.find({})
    .populate("cards")
    .then(days => {
      let weeks = [];
      for (var i = 1; i < 10; i++) {
        let week = days.filter(el => el.week === i.toString());
        weeks.push(week);
      }
      res.json(weeks);
    });
});

module.exports = router;
