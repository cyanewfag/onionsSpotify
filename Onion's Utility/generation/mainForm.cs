using NAudio.Wave;
using System;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace generation
{
    public partial class mainForm : Form
    {
        public mainForm()
        {
            InitializeComponent();
        }

        public static TimeSpan GetWavFileDuration(string fileName)
        {
            WaveFileReader wf = new WaveFileReader(fileName);
            return wf.TotalTime;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string files = "";

            if (folderBrowserDialog1.ShowDialog() == DialogResult.OK)
            {
                foreach (string file in Directory.GetFiles(folderBrowserDialog1.SelectedPath, "*.wav", SearchOption.TopDirectoryOnly))
                {
                    if (files == "")
                        files += file;
                    else
                        files += '\n' + file;
                }
            }

            string[] fileNames = files.Split('\n');
            string clipboard = "var musicTable = [";

            for (int i = 0; i < fileNames.Length; i++)
            {
                if (i != fileNames.Length - 1)
                    clipboard += '\n' + @"   [ """ + fileNames[i].Replace(".wav", "").Split('\\').Last() + @""", ""unknown"", """ + fileNames[i].Split('\\').Last() + @""", " + Math.Round(GetWavFileDuration(fileNames[i]).TotalSeconds) + ", 0, false ],";
                else
                    clipboard += '\n' + @"   [ """ + fileNames[i].Replace(".wav", "").Split('\\').Last() + @""", ""unknown"", """ + fileNames[i].Split('\\').Last() + @""", " + Math.Round(GetWavFileDuration(fileNames[i]).TotalSeconds) + ", 0, false ]";
            }

            Clipboard.SetText(clipboard + '\n' + "];" + "\n \n" + @"var options = [ " + '\n' + @"    [ ""onion_autoplay"", false ]," + '\n' + @"    [ ""onion_shuffle"", false ]," + '\n' + @"    [ ""onion_music_path"", """ + folderBrowserDialog1.SelectedPath.Replace(@"\", @"\\") + @"\\"" ]" + "\n ];");
        }
    }
}
