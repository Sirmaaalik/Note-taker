const fs = require('fs');
const {v4} = require('uuid');
const router = require('express').Router();

router.get("/notes" , (req, res) => {
    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
        let noteData = [];
        if (err) {
            throw err;
        }
        if (data.length > 0) {
            noteData = JSON.parse(data);
            res.json(noteData);
        } else {
            console.log("No notes found");
        }
    });
});

router.post("/notes", (req, res) => {
    let note = req.body;

    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
        if (err) {
            console.log(`err at the database ${err}`);
        } else {
            if (data.length > 0) {
                obj = JSON.parse(data);
            } else {
                obj = [];
            }


            note.id = v4().substring(0, 4);
            obj.push(note);

            fs.writeFile("./Develop/db/db.json", JSON.stringify(obj), "utf8", (err) => {
                if (err) {
                    throw err;
                }
                console.log("Note saved.");

                fs.readFile("./Develop/db/db.json", "utf8", function (err, data) {
                    let noteData = [];
                    if (err) {
                        throw err;
                    }
                    if (data.length > 0) {
                        noteData = JSON.parse(data);
                        res.json(noteData);
                    } else {
                        console.log("No notes saved");
                    }
                });
            });
        }
    });
});

router.delete("/notes/:id", (req, res) => {
    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
        if(err) {
            throw err;
        }
        let objNew = JSON.parse(data);

        const deleteThis = objNew.findIndex((note) => note.id === req.params.id);
        objNew.splice(deleteThis, 1);

        const output = fs.writeFile("./Develop/db/db.json", JSON.stringify(objNew), (err) => {
            if (err) {
                throw err;
            }
            console.log("Note rewritten");            
        });
        res.send(output);
    });
});

module.exports = router;