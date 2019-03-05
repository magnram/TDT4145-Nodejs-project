var sql = require('../database.js');

/* GROUP START */
var Group = function (group) {
    this.navn = group.navn;
};

Group.createGroup = (newGroup, result) => {
    sql.query("INSERT INTO Gruppe SET ?;", newGroup, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    })
};

Group.getAllGroups = (result) => {
    sql.query("SELECT * FROM Gruppe;", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else{
            result(null, res);
        }
    });
};

module.exports.Group = Group;

/* GROUP END */
/* GROUP START */

var Workout = function(workout) {
    this.datotid = workout.datotid;
    this.varighet = workout.varighet;
    this.form = workout.form;
}

Workout.createWorkout = (newWorkout, result) => {
    sql.query(`INSERT INTO Treningsøkt SET ${newWorkout};`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })
};

Workout.getLastWorkouts = (n, offset, result) => {
    sql.query(`SELECT TreningsøktID, COUNT(*) AS Antall_Øvelser, AVG(Prestasjon) AS Gj_Prestasjon, Datotid, Form, Varighet
                FROM (SELECT * FROM Treningsøkt ORDER BY datotid DESC LIMIT ${n} OFFSET ${offset}) AS T
	                   NATURAL LEFT JOIN ØvelseITreningsøkt
                       NATURAL LEFT JOIN (Øvelse NATURAL LEFT JOIN ApparatØvelse NATURAL LEFT JOIN FriØvelse)
                GROUP BY TreningsøktID
                ORDER BY datotid DESC;`, (err, res) => {
        if(err) {
            result(null, err);
        } else{
            result(null, res);
        }
    });
};


Workout.getWorkoutCount = (result) => {
    sql.query("SELECT COUNT(*) AS Antall FROM Treningsøkt;", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else{
            result(null, res);
        }
    });
};

Workout.updateById = function(id, workout, result){
    sql.query(`UPDATE Treningsøkt SET Datotid = "${workout.datotid}", Varighet = "${workout.varighet}", Form = ${workout.form} WHERE TreningsøktID = ${id};`, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports.Workout = Workout;
