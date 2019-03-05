var models = require('../model/appModel.js');
var Group = models.Group;
var Workout = models.Workout;

exports.list_all_groups = (req, res) => {
  Group.getAllGroups((err, groups) => {
    if (err) res.send(err);
      res.render("groups.hbs", {
          groups: groups,
          // welcomeMessage: "Welcome to my website"
      })
  });
}

exports.create_a_group = (req, res) => {
  var new_group = new Group(req.body);

  //handles null
  if(!new_group.navn) {
    res.status(400).send({ error:true, message: 'Please provide group' });
  } else {
    Group.createGroup(new_group, (err, group) => {
      if(err) res.send(err);
      res.json(group);
    });
  }
}
exports.list_n_last_workouts = (req, res) => {
  var amount = req.params.amount;
  var page = req.params.page || 1;
  Workout.getWorkoutCount((err, max) => {
    if (err) res.send(err);
    if (!/^\d+$/.test(page) || page < 1 || page > Math.ceil(max[0].Antall/amount)) {
      res.redirect(`./1`);
    }
    Workout.getLastWorkouts(amount, (page-1)*amount, (err, workouts) => {
      if(!amount) {
        res.status(400).send({ error:true, message: 'Please provide amount, example: /workouts/4' });
      }
      if (err) res.send(err);
      res.render("workouts.hbs", {
        workouts: workouts,
        max: max[0].Antall,
        amount: amount
      });
    });
  });
};

var validWorkout = (workout) => {
  if(!workout.datotid) {
    return { error:true, message: 'Please provide datetime' };
  } else if (!workout.varighet) {
    return { error:true, message: 'Please provide length of workout' };
  } else if (!workout.form) {
    return{ error:true, message: 'Please provide form' };
  } else  {
    return { error:false }
  }
}

exports.create_a_workout = (req, res) => {
  var new_workout = new Workout(req.body);

  if(validWorkout(new_workout).error) {
    res.status(400).send(validWorkout(new_workout));
  } else {
    Workout.createWorkout(new_workout, (err, workout) => {
      if(err) res.send(err);
      res.json(workout);
    });
  };
}

exports.update_a_workout = (req, res) => {
  var updated_workout = new Workout(req.body)
  var id = req.body.id;
  updated_workout.datotid = dbDatetimeFormat(updated_workout.datotid);
  console.log(updated_workout)
  if(validWorkout(updated_workout).error) {
    res.status(400).send(validWorkout(updated_workout));
  } else {
    Workout.updateById(id, updated_workout, (err, workout) => {
      if (err) res.send(err);
      console.log('Workout successfully updated')
      res.redirect('back');
    });
  };
};

var dbDatetimeFormat = (datetime) => {
  var temp = datetime.split(" ");
  var dato = temp[0].split("/");
  var tid = temp[1].split(":");
  var tid2 = tid[2] ? tid[2] : "00";

  return (`${dato[2]}-${dato[1]}-${dato[0]} ${tid[0]}:${tid[1]}:${tid2}`);
}
// exports.delete_a_workout = (req, res) => {
//   Workout.remove( req.params.workoutId, function(err, task) {
//     if (err) res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };
