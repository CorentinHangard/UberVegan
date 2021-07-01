using System.Windows;
using System.Windows.Controls;
using System.Collections.Generic;
using System.Net;
using System.IO;
using System;
using Newtonsoft.Json;


namespace ServiceApplication.Pages
{
    /// <summary>
    /// Logique d'interaction pour Logs.xaml
    /// </summary>
    public partial class Logs : Page
    {
        public string token = Login.token;
        public List<logs> logsList = new List<logs>();
            
        public Logs()
        {
            InitializeComponent();

            if (Login.role == "5")
            {
                dataGetter("http://localhost:3000/ms-logs", "GET");
            }
            else
            {
                dataGetter("http://localhost:3000/ms-logs/?type=All", "GET");
            }

            
        } 
        
        public void dataGetter(string addr, string method)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(addr);
            httpWebRequest.PreAuthenticate = true;
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add("Authorization", "Bearer " + token);
            httpWebRequest.Method = method;

            HttpWebResponse httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                System.Diagnostics.Debug.WriteLine(result);
                if (result.Contains("status code 40"))
                {
                    logsList.Add(new logs() { type = "Access Error", date = DateTime.Now, content = "Permission denied" });
                    logsData.ItemsSource = logsList;
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine(result);
                    logsList = JsonConvert.DeserializeObject<List<logs>>(result);
                    logsData.ItemsSource = logsList;
                    System.Diagnostics.Debug.WriteLine("Done");
                }
            }
        }
        public class logs
        {
            public string type { get; set; }
            public DateTime date { get; set; }
            public string content { get; set; }
        }

        private void UsersButton(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new UserManage());
        }

        private void LogoutButton(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new Login());
            Login.token = "";
            Login.role = "";
        }
    }
}
