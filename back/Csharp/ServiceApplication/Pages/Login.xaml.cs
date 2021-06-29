using System.Collections.Generic;
using System.Net.Http;
using System.Windows;
using System.Windows.Controls;
using System.Text.Json;
using System.Net;
using System.IO;

namespace ServiceApplication.Pages
{
    /// <summary>
    /// Logique d'interaction pour Login.xaml
    /// </summary>
    /// 

    public partial class Login : Page
    {
        public static string token;
        public static string role;

        bool rundev = false;
        public Login()
        {
            InitializeComponent();
        }
        private void LoginButton(object sender, RoutedEventArgs e)
        {
            if (rundev)
            {
                this.NavigationService.Navigate(new UserManage());
            }
            else
            {
                string userName = UserText.Text;
                string password = PasswordText.Password.ToString();

                var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:3000/ms-users/authenticate");
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = JsonSerializer.Serialize(new
                    {
                        email = userName,
                        password = password
                    });
                    streamWriter.Write(json);
                }

                HttpWebResponse httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    var result_array = result.Split(",");
                    if (result_array[0].Split(":")[1] == "true")
                    {
                        string temp = result_array[1].Split(":")[1];
                        token = temp.Substring(1, temp.Length - 3);
                        this.NavigationService.Navigate(new UserManage());
                    }
                    else
                    {
                        System.Diagnostics.Debug.WriteLine("error" + result);
                    }
                }
            }
        }
    }
}
