# onionsSpotify

Menu key is M, the volume is uncontrollable due to onetaps api, to change it you have to change CS:GO's master volume in the volume mixer of windows.

Change this line
[ "onion_music_path", "C:\\Users\\Username\\Documents\\music\\" ]
to whatever your music path is ex:
[ "onion_music_path", "C:\\Users\\Username\\Documents\\peepeejuice\\" ]
[ "onion_music_path", "C:\\Users\\Username\\Music\\music\\" ]

Run the release generator or manually add the lines to the initial table to add songs. When using the generator select the folder you have set as your path, and make sure your songs are .wav format. It will auto generate a table and put it in your clipboard, all you have to do after that is replace the initial table with your own.

Ex:

Replace

var musicTable = [
    [ "Test Song", "unknown", "test.wav", 120, 0, false ],
    [ "Test Song 2", "unknown", "test.wav", 180, 0, false ]
];

with your own

var musicTable = [
    [ "2Paid", "lil Mosey", "2paid.wav", 142, 0, false ],
    [ "Valentino", "24KGoldn", "valentino.wav", 179, 0, false ],
    [ "Fashion Week", "blackbear", "fashion week.wav", 155, 0, false ],
    [ "Honors", "over", "over.wav", 266, 0, false ],
    [ "Jetski", "Lil Pump", "jetski.wav", 163, 0, false ],
    [ "Bodak Yellow", "Montana of 300", "bodak.wav", 170, 0, false ],
    [ "Nike Ticks", "someone", "niketicks.wav", 102, 0, false ],
    [ "Bhop Fun", "someone", "bhop.wav", 244, 0, false ],
    [ "Back Then", "H20 Hadd", "backthen.wav", 152, 0, false ],
    [ "Wanderlust", "blackbear", "wanderlust.wav", 175, 0, false ]
];
