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

    // ========================= DO TESTU
    //var spawned_song = spawn(
    //    'top',
    //    ['-U', 'zmey'],
    //    {cwd: '/Users'}
    //);

    song = spawn(
        'python',
        ['py/synchronized_lights.py', '--file=/home/pi/lightshowpi/music/sample/' + song],
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
            "title": "White Christmas",
            "file": "white_christmas.mp3"
        },
        {
            "title": "The Chipmunk Song",
            "file": "the_chipmunk_song.mp3"
        },
        {
            "title": "Rudolph, The Red Nosed Reindeer",
            "file": "rudolph,_the_red_nosed_reindeer.mp3"
        },
        {
            "title": "I Saw Mommy Kissing Santa Claus",
            "file": "i_saw_mommy_kissing_santa_claus.mp3"
        },
        {
            "title": "Jingle Bell Rock",
            "file": "jingle_bell_rock.mp3"
        },
        {
            "title": "The Christmas Song",
            "file": "the_christmas_song.mp3"
        },
        {
            "title": "Snoopy's Christmas",
            "file": "snoopy's_christmas.mp3"
        },
        {
            "title": "Here Comes Santa Claus",
            "file": "here_comes_santa_claus.mp3"
        },
        {
            "title": "Little Drummer Boy",
            "file": "little_drummer_boy.mp3"
        },
        {
            "title": "Donde Esta Santa Claus",
            "file": "donde_esta_santa_claus.mp3"
        },
        {
            "title": "Rockin' Around The Christmas Tree",
            "file": "rockin'_around_the_christmas_tree.mp3"
        },
        {
            "title": "You're All I Want For Christmas",
            "file": "you're_all_i_want_for_christmas.mp3"
        },
        {
            "title": "Baby's First Christmas",
            "file": "baby's_first_christmas.mp3"
        },
        {
            "title": "Santa Claus Is Coming To Town",
            "file": "santa_claus_is_coming_to_town.mp3"
        },
        {
            "title": "Home For The Holidays",
            "file": "home_for_the_holidays.mp3"
        },
        {
            "title": "Do They Know It's Christmas",
            "file": "do_they_know_it's_christmas.mp3"
        }
    ]
};