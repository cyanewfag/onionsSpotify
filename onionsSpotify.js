var musicTable = [
    [ "Test Song", "unknown", "test.wav", 120, 0, false ],
    [ "Test Song 2", "unknown", "test.wav", 180, 0, false ]
];

/*
 * Auto Generated Information
*/

var options = [
    [ "onion_autoplay", false ],
    [ "onion_shuffle", false ],
    [ "onion_music_path", "C:\\Users\\Username\\Documents\\music\\" ]
];

var fonts = [
    [ "Arial", Render.AddFont("Arial", 10, 600) ],
    [ "Verdana", Render.AddFont("Verdana", 10, 600) ]
];

// skipped items, scrollbar item offset
var scrollBar = [ 0, 0 ]
// x pos, y pos, width, height, name, unknown, mouse x, mouse y, mouse down, mouse down x, mouse down y, mouse down gui x, mouse down gui y, mouse down style, enabled
var main = [ 100, 100, 1150, 600, "Onion's Spotify", false, 0, 0, false, 0, 0, 0, 0, 0, true ];
var cachedTime = Globals.Realtime();
var buttonTime = Globals.Realtime();
var currentlyPlaying = false;
var songTime = 0;
var currentTime = 0;
var songName = "";
var songAuthor = "";

function returnSongTime(time)
{
    var returns = Math.floor(time / 60) + ":";

    if (Math.round(time - (Math.floor(time / 60) * 60)) < 10)
        returns += "0" + Math.round(time - (Math.floor(time / 60) * 60));
    else
        returns += Math.round(time - (Math.floor(time / 60) * 60))

    return returns;
}

function updateSong(enable, addition, song)
{
    for (var i = 0; i < musicTable.length; i++)
    {
        if (!enable){
            if (musicTable[i][5]){
                musicTable[i][4] += addition; 
                currentTime += addition;
                cachedTime = Globals.Realtime();
                songName = musicTable[i][0];
                songAuthor = musicTable[i][1];
            }
        } else {
            if (musicTable[i][5]) {
                musicTable[i][5] = false;
                currentTime = 0;
                songName = "";
                songAuthor = "";
            }

            if (song == musicTable[i][0]) {
                musicTable[i][5] = true; 
                currentTime = 0;
                songTime = musicTable[i][3];
                songName = musicTable[i][0];
                songAuthor = musicTable[i][1];
            }
        }

    }
}

function songStepper()
{
    var availableSpace = main[3] - 187;
    var overItems = 0;
    
    for (var i = 0; i < musicTable.length; i++)
    {
        if ((i + 1) * 35 + 10 > availableSpace)
            overItems++;
    }

    if (overItems == 0)
    {
        if (scrollBar[0] > 0)
            scrollBar[0] = 0;
    }
    else if (overItems > 0)
    {
        if (scrollBar[0] > overItems)
            scrollBar[0] = overItems;

        if (Globals.Realtime() - buttonTime >= .15)
        {
            if (Input.IsKeyPressed(0x28))
            {
                buttonTime = Globals.Realtime();

                if (scrollBar[0] + 5 > overItems)
                    scrollBar[0] = overItems;
                else
                    scrollBar[0] = scrollBar[0] + 5;
            }

            if (Input.IsKeyPressed(0x26))
            {
                buttonTime = Globals.Realtime();

                if (scrollBar[0] - 5 < 0)
                    scrollBar[0] = 0;
                else
                    scrollBar[0] = scrollBar[0] - 5;
            }
        }
    }
}

function drawSongs()
{
    var usedSpace = 125;

    for (var i = 0; i < musicTable.length; i++)
    {
        if (i >= scrollBar[0])
        {
            if (usedSpace + 105 <= main[3])
            {
                if (main[6] >= main[0] + 183 && main[6] <= main[0] + 183 + (main[2] - 203) && main[7] >= main[1] + usedSpace && main[7] <= main[1] + usedSpace + 34)
                {
                    Render.FilledRect(main[0] + 183, main[1] + usedSpace + 1, main[2] - 203, 34, [35, 35, 35, 255]);

                    if (main[8] && main[9] >= main[0] + 183 && main[9] <= main[0] + 183 + (main[2] - 203) && main[10] >= main[1] + usedSpace && main[10] <= main[1] + usedSpace + 34)
                        if (Globals.Realtime() - buttonTime >= 1)
                        {
                            if (Input.IsKeyPressed(0x01))
                            {
                                buttonTime = Globals.Realtime();
                                Sound.Play(options[2][1] + musicTable[i][2]);
                                updateSong(true, 0, musicTable[i][0]);
                                currentlyPlaying = true;
                            }
                        }
                }
                
                Render.FilledRect(main[0] + 183, main[1] + usedSpace, main[2] - 203, 1, [40, 40, 40, 255]);
                var text_width = Render.TextSize(musicTable[i][0], 12);
                Render.String( main[0] + 203, main[1] + usedSpace + (text_width[1] / 2) + 2, 0, musicTable[i][0], [ 255, 255, 255, 255 ], 12 );
                Render.String( main[0] + 203 + (main[2] / 3), main[1] + usedSpace + (text_width[1] / 2) + 2, 0, musicTable[i][1], [ 255, 255, 255, 255 ], 12 );
                Render.String( main[0] + 203 + ((main[2] / 3) * 2), main[1] + usedSpace + (text_width[1] / 2) + 2, 0, returnSongTime(musicTable[i][3]), [ 255, 255, 255, 255 ], 12 );
                usedSpace += 35;
            }
        }
    }
    
    Render.FilledRect(main[0] + 183, main[1] + usedSpace, main[2] - 203, 1, [40, 40, 40, 255]);
}

function drawMenu()
{
    var cursorPosition = Input.GetCursorPosition();
    main[6] = cursorPosition[0];
    main[7] = cursorPosition[1];

    if (!main[8] && Input.IsKeyPressed(0x01))
    {
        main[8] = true;
        main[9] = main[6]; // Mouse Down X POS
        main[10] = main[7]; // Mouse Down Y POS
        main[11] = main[0]; // Mouse Down GUI X POS
        main[12] = main[1]; // Mouse Down GUI Y POS
    }
    else if (main[8] && !Input.IsKeyPressed(0x01)){
        main[8] = false;
        main[13] = 0;
    }

    if (main[13] == 0)
        if ( main[8] && 
            main[9] > main[11] && main[9] <= main[11] + main[2] // If the initial click was within the GUI on the x axis
            && main[10] > main[12] && main[10] <= main[12] + main[3] ) // If the initial click was within the GUI on the y axis
        {
            main[13] = 0;
            
            if (main[9] > (main[11] + main[2]) - 32 && main[10] > (main[12] + main[3]) - 32)
                main[13] = 2; // Click state is resizing
            else if (main[10] - main[12] <= 35)
                main[13] = 1; // Click state is dragging
        }

    if (main[13] == 2)
    {
        if (main[6] - main[0] >= 850)
            main[2] = main[6] - main[0];
        else
            main[2] = 850;

        if (main[7] - main[1] >= 400)
            main[3] = main[7] - main[1];
        else
        main[3] = 400;
    }

    if (main[13] == 1)
    {
        main[0] = main[6] - (main[9] - main[11]);
        main[1] = main[7] - (main[10] - main[12]);
    }

    Render.FilledRect(main[0], main[1], main[2], main[3], [24, 24, 24, 255]);
    Render.FilledRect(main[0], main[1], main[2], 115, [40, 40, 40, 255]);
    Render.FilledRect(main[0], main[1], main[2], 114, [18, 18, 18, 255]);
    Render.FilledRect(main[0], main[1], 163, main[3], [18, 18, 18, 255]);
    Render.FilledRect(main[0], main[1] + (main[3] - 71), main[2], 71, [40, 40, 40, 255]);
    Render.FilledRect(main[0], main[1] + (main[3] - 72), main[2], 1, [18, 18, 18, 255]);
    var text_width = Render.TextSize(main[4], 4);
    Render.String( main[0] + 188 + text_width[1], main[1] + 104 - text_width[1], 0, main[4], [ 255, 255, 255, 255 ], 4 );
    Render.FilledRect(main[0] + 173, main[1] + 99 - text_width[1], text_width[1] + 10, text_width[1] + 10, [40, 40, 40, 255]);
    Render.FilledRect(main[0] + 174, main[1] + 100 - text_width[1], text_width[1] + 8, text_width[1] + 8, [18, 18, 18, 255]);
    Render.FilledRect(main[0] + (main[2] / 2) - 210, main[1] + main[3] - 36, 420, 4, [64, 64, 64, 255]);
    if ((currentTime / songTime) != 1)
        Render.FilledRect(main[0] + (main[2] / 2) - 210, main[1] + main[3] - 36, (currentTime / songTime) * 420, 4, [128, 128, 128, 255]);
    else
        Render.FilledRect(main[0] + (main[2] / 2) - 210, main[1] + main[3] - 36, 420, 4, [128, 128, 128, 255]);
    Render.FilledRect(main[0] + 13, main[1] + main[3] - 58, 46, 46, [18, 18, 18, 255]);
    Render.FilledRect(main[0] + 14, main[1] + main[3] - 57, 44, 44, [40, 40, 40, 255]);

    if (currentlyPlaying) {
        if (cachedTime + 0.5 <= Globals.Realtime()) {
            updateSong(false, 0.5, "");

            if (currentTime == songTime)
                updateSong(true, 0, songName);
        }

        var text_width = Render.TextSize(returnSongTime(currentTime), 8);
        Render.String(main[0] + (main[2] / 2) - 215 - text_width[0], main[1] + main[3] - 32 - (text_width[1] / 2), 0, returnSongTime(currentTime), [ 255, 255, 255, 255 ], 8 );
        var text_width = Render.TextSize(returnSongTime(songTime), 8);
        Render.String(main[0] + (main[2] / 2) + 420 - 205, main[1] + main[3] - 32 - (text_width[1] / 2), 0, returnSongTime(songTime), [ 255, 255, 255, 255 ], 8 );  

        var text_width = Render.TextSize(songName, 10);
        Render.String(main[0] + 64, main[1] + main[3] - 52, 0, songName, [ 255, 255, 255, 255 ], 10 );
        Render.String(main[0] + 64, main[1] + main[3] - 52 + text_width[1] + 4, 0, songAuthor, [ 175, 175, 175, 255 ], 8);
    } else {
        var text_width = Render.TextSize("0:00", 8);
        Render.String(main[0] + (main[2] / 2) - 215 - text_width[0], main[1] + main[3] - 32 - (text_width[1] / 2), 0, "0:00", [ 255, 255, 255, 255 ], 8 );
        Render.String(main[0] + (main[2] / 2) + 420 - 205, main[1] + main[3] - 32 - (text_width[1] / 2), 0, "0:00", [ 255, 255, 255, 255 ], 8 );  
    }

    Render.Circle(main[0] + (main[2] / 2) - 1, main[1] + main[3] - 15, 12, [18, 18, 18, 255]);

    if (main[6] >= main[0] + (main[2] / 2) - 11 && main[6] <= main[0] + (main[2] / 2) - 11 + 22 && main[7] >= main[1] + main[3] - 20 && main[7] <=  main[1] + main[3] - 20 + 12)
    {
        Render.FilledCircle(main[0] + (main[2] / 2) - 1, main[1] + main[3] - 15, 12, [18, 18, 18, 255]);

        if (Globals.Realtime() - buttonTime >= 1)
        {
            if (Input.IsKeyPressed(0x01))
            {
                updateSong(true, 0, songName);
                Sound.Play("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\csgo\\sound\\quake\\standard\\play.wav");
                buttonTime = Globals.Realtime();
                songTime = 0;
                currentlyPlaying = false;
                currentTime = 0;
                songName = "";
                songAuthor = "";
            }
        }
    }
}

function drawGUI()
{
    if (Globals.Realtime() - buttonTime >= 0.35)
    {
        if (Input.IsKeyPressed(0x4D))
        {
            buttonTime = Globals.Realtime();
            main[14] = !main[14];
        }
    }

    if (main[14])
    {
        drawMenu();
        drawSongs();
        songStepper();
    }
}

Cheat.RegisterCallback("Draw", "drawGUI");
