const express = require('express');
const app = express();
const spawn = require('child_process').spawn;

var song = {};
var file_name = '';
var db = {};
var previous_song = '';

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/start_random', function (req, res) {
    var random_songs = getRandomSongs();
    log('----------------------------');
    log(random_songs);
    log('----------------------------');

    random_songs.map(function (elem) {
        if (undefined != elem.current) {
            song = startSong(elem.file, song)
        }
    });

    res.send(random_songs);
});

app.get('/start', function (req, res) {
    var mp3_name = undefined != req.query.song ? req.query.song : 'nope';
    log('looking for: ' + mp3_name);

    var found = db.songs.filter(function (elem) { return elem.file == mp3_name;});

    if (found.length > 0) {
        song = startSong(found[0].file, song);
        res.send('started ' + mp3_name + ' - pid: ' + song.pid);
    } else {
        log('go xmass yourself');
        res.send('go xmass yourself');
    }
});

app.get('/stop', function (req, res) {
    try {
        song.kill('SIGTERM');
        log(song.pid + ' kaput - ' + file_name + ' is no more!');
        res.send(song.pid + ' kaput - ' + file_name + ' is no more!');
        song = undefined;
    } catch (e) {
        log('no song to kill!');
        res.send('no song to kill!');
    }
});

app.listen(3000, function () {
    log('Example app listening on port 3000!')
});

function startSong(mp3_name, song) {
    file_name = mp3_name;

    if (true) {
        previous_song = file_name;
    }

    try {
        song.kill('SIGTERM');
        log(song.pid + ' is kaput!');
    } catch (e) {
        log('no song to kill');
    }

    //========================= DO TESTU
    //var spawned_song = spawn(
    //    'top',
    //    ['-U', 'zmey'],
    //    {cwd: '/Users'}
    //);

    song = spawn(
        'python',
        ['py/synchronized_lights.py', '--file=/home/workspace/xmassguess/mp3s/' + song],
        { cwd:  '/home/pi/lightshowpi'}
    );

    log('started ' + file_name + ' - pid: ' + spawned_song.pid);

    return spawned_song;
}

function getRandomSongs() {
    var limit = 6,
        lower_bound = 0,
        upper_bound = db.songs.length - 2,
        unique_random_numbers = [],
        songs = [],
        is_last_christmas = false,
        db_songs = JSON.parse(JSON.stringify(db.songs));

log([db_songs.length]);
    db_songs = db_songs.filter(function (elem) { return elem.file != previous_song; });
log([db_songs.length]);

    // collect songs
    while (unique_random_numbers.length < limit) {
        var random_number = Math.round(Math.random() * (upper_bound - lower_bound) + lower_bound);
        if (unique_random_numbers.indexOf(random_number) == -1) {
            // Yay! new random number
            unique_random_numbers.push(random_number);
            var random_song = db_songs[random_number];
            songs.push(random_song);
            if ('Last Christmas' == random_song.title) {
                is_last_christmas = true;
            }
        }
    }

    // add last christmas
    if (false === is_last_christmas) {
        songs[Math.round(Math.random() * 5)] = db_songs[0];
    }

    // pick one
    songs[Math.round(Math.random() * 5)].current = true;

    return songs;
}

function log(msg) {
    console.log([new Date().toUTCString(), msg]);
}

db = {
    "songs": [
        {
            "title": "Last Christmas",
            "file": "last_christmas.mp3"
        },
        {
            "title": "All I Want For Christmas Is You Metal",
            "file": "All_I_Want_For_Christmas_Is_You_metal.mp3"
        },
        {
            "title": "All I Want For Christmas Is You Remix",
            "file": "All_I_Want_For_Christmas_Is_You_rmx.mp3"
        },
        {
            "title": "Bog Sie Rodzi",
            "file": "Bog_Sie_Rodzi.mp3"
        },
        {
            "title": "Carol Of The Bells Metal",
            "file": "Carol_of_the_Bells_Metal.mp3"
        },
        {
            "title": "Carol Of The Bells Remix",
            "file": "Carol_Of_The_Bells_remix.mp3"
        },
        {
            "title": "Gdy Sliczna Panna Metal",
            "file": "Gdy_Sliczna_Panna_metal.mp3"
        },
        {
            "title": "Here Comes Santa Claus Trap",
            "file": "Here_Comes_Santa_Claus_Trap.mp3"
        },
        {
            "title": "Jingle Bell Rock Trap",
            "file": "Jingle_Bell_Rock_Trap.mp3"
        },
        {
            "title": "Jingle Bells Metal",
            "file": "Jingle_Bells_metal.mp3"
        },
        {
            "title": "Jingle Bells Trap",
            "file": "Jingle_Bells_Trap.mp3"
        },
        {
            "title": "Last Christmas Metal",
            "file": "Last_Christmas_metal.mp3"
        },
        {
            "title": "Last Christmas Trap",
            "file": "Last_Christmas_Trap.mp3"
        },
        {
            "title": "LetIt Snow Metal",
            "file": "Let_it_Snow_metal.mp3"
        },
        {
            "title": "Przybiezeli Do Betlejem Metal",
            "file": "Przybiezeli_Do_Betlejem_metal.mp3"
        },
        {
            "title": "Rudolph The Red Nosed Reindeer Remix",
            "file": "Rudolph_The_Red_Nosed_Reindeer_remix.mp3"
        },
        {
            "title": "Santa Claus Is Coming To TownMetal",
            "file": "Santa_Claus_Is_Coming_To_Town_metal.mp3"
        },
        {
            "title": "Santa Claus Is Coming To TownRemix",
            "file": "Santa_Claus_Is_Coming_To_Town_remix.mp3"
        },
        {
            "title": "Sleigh Ride Metal",
            "file": "Sleigh_Ride_metal.mp3"
        },
        {
            "title": "Sleigh RideRemix",
            "file": "Sleigh_Ride_remix.mp3"
        },
        {
            "title": "Wsrod Nocnej Ciszy Metal",
            "file": "Wsrod_Nocnej_Ciszy_metal.mp3"
        }
    ]
};