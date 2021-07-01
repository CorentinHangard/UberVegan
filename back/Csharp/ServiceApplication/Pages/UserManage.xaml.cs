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
    /// Logique d'interaction pour UserManage.xaml
    /// </summary>
    public partial class UserManage : Page
    {
        public string token = Login.token;
        public List<User> usersList = new List<User>();
        public UserManage()
        {
            InitializeComponent();
            dataGetter("http://localhost:3000/ms-users/", "GET");
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
                usersList = JsonConvert.DeserializeObject<List<User>>(result);
                users.ItemsSource = usersList;
            }
        }

        private void LogoutButton(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new Login());
            Login.token = "";
            Login.role = "";
        }

        private void LogsButton(object sender, RoutedEventArgs e)
        {
            this.NavigationService.Navigate(new Logs());
        }


        public void delete(object obj, RoutedEventArgs e)
        {
            var id = ((Button)obj).Tag;
            string addr = "http://localhost:3000/ms-users/statut_archived";
            http_request(addr, "POST", Convert.ToInt32(id));
            dataGetter("http://localhost:3000/ms-users/", "GET");
        }
        public void suspend(object obj, RoutedEventArgs e)
        {
            var id = ((Button)obj).Tag;
            string addr = "http://localhost:3000/ms-users/statut_suspended";
            http_request(addr, "POST", Convert.ToInt32(id));
            dataGetter("http://localhost:3000/ms-users/", "GET");
        }
        public void activate(object obj, RoutedEventArgs e)
        {
            var id = ((Button)obj).Tag;
            string addr = "http://localhost:3000/ms-users/statut_reestablished";
            http_request(addr, "POST", Convert.ToInt32(id));
            dataGetter("http://localhost:3000/ms-users/", "GET");
        }


        public void http_request(string address, string method, int parameter)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(address);
            httpWebRequest.PreAuthenticate = true;
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Headers.Add("Authorization", "Bearer " + token);
            httpWebRequest.Method = method;

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                string json = System.Text.Json.JsonSerializer.Serialize(new
                {
                    usr_id = parameter
                });
                streamWriter.Write(json);
            }

            HttpWebResponse httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
                User userChanged = JsonConvert.DeserializeObject<User>(result);
                System.Diagnostics.Debug.WriteLine(result);
            }
        }

        public class User
        {
            public int usr_id { get; set; }
            public string usr_email { get; set; }
            public string usr_password { get; set; }
            public int usr_status { get; set; }
            public int rol_id { get; set; }
        }
    }
}
