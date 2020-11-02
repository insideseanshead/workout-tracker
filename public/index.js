// submit function
// submit workout name
document.querySelector("#workoutForm").addEventListener("submit", function(event){
    event.preventDefault();
    // find form id and table name
    let name = document.querySelector("#workoutForm input[name=name]").value
    // equivilent to ajax making http request to route workout, method post, json of the object json
    fetch("/workout", {
        method: "post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name})
    }).then(
        function(res) {
            console.log("something")
            if(!res.ok){
                throw res
            }
            console.log("something else")
            return res.json()
        }
    ).then(
        function(res){
            console.log(res)
        }
    ).catch(function(err){
        console.error(err)
    })
})

//submit exercise info
document.querySelector("#exerciseForm").addEventListener("submit", function(event){
    event.preventDefault();
    // find form id and table name
    let name = document.querySelector("#exerciseForm input[name=name]").value;
    let type = document.querySelector("#exerciseForm input[name=type]").value;
    let sets = document.querySelector("#exerciseForm input[name=sets]").value;
    let reps = document.querySelector("#exerciseForm input[name=reps]").value;
    let duration = document.querySelector("#exerciseForm input[name=duration]").value;
    fetch("/exercise", {
        method: "post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name,type,sets,reps,duration})
    }).then(
        function(res) {
            console.log("something")
            if(!res.ok){
                throw res
            }
            console.log("something else")
            return res.json()
        }
    ).then(
        function(res){
            console.log(res)
        }
    ).catch(function(err){
        console.error(err)
    })
})

// Take submit workout name variable and create a new card with form for exercisses to add to workout.
/* <h2>Exercises</h2>
        <input type="text" name="name" placeholder="Exercise Name">
        <input type="text" name="type" placeholder="Exercise type">
        <input type="number" name="sets" placeholder="Number of Sets">
        <input type="number" name="reps" placeholder="Number of Reps">
        <input type="number" name="duration" placeholder="Exercise Duration">
        <input type="submit">
    </form> */

// take exercise info and add to card within workout.