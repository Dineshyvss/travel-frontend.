# Student Frontend in Vue 3

This application allows users to create and maintain a list of tutorials that can have multiple lessons within. Please visit https://github.com/OC-ComputerScience/tutorial-backend for the backend repository.

## Project Setup for your Local Machine.
1. Clone the project into your **XAMPP/xamppfiles/htdocs** directory.
```
git clone https://github.com/OC-ComputerScience/tutorial-frontend-vue2.git
```

2. Install the project.
```
npm install
```

3. Make sure **Apache** is running.
    - We recommend using XAMPP to serve this project.
    - In XAMPP, make sure that **Apache** is running.

4. In order to make the Google authentication work, have a project registered with the **Google Developer console**.
    - https://console.developers.google.com/
    - Enable **Google+ API** and **Google Analytics API**.
    - Enable an **OAuth consent screen**.
    - Create an **OAuth client ID**.
    - Save your **Client ID** and **Client Secret** in a safe place.

5. In order to make the **Cypress testing** work, get a **Refresh Token** for your Google application through the **Google Developers OAuth 2.0 Playground**.
    - https://developers.google.com/oauthplayground/
    - Click the gear button on the right.
    - Check **Use your own OAuth credentials**.
    - Configure the Playground to use your Google project's **client ID** and **client secret**.
    - On the left, find Google OAuth2 API v2 and check all three items.
        - https://www.googleapis.com/auth/userinfo.email
        - https://www.googleapis.com/auth/userinfo.profile
        - openid
    - Click **Authorize APIs**.
    - Click **Exchange authorization code for tokens**.
    - Save the generated **Refresh token** in a safe place.

6. Add a local **.env** file and make sure the **client ID** and **client secret** are the values you have registered with Google and that the **refresh token** is the value you generated through the OAuth 2.0 Playground.
    - VUE_APP_CLIENT_ID = '**your-google-client-id**'
    - VUE_APP_CLIENT_SECRET = '**your-google-client-secret**'
    - VUE_APP_REFRESH_TOKEN = '**your-google-refresh-token**'
    - VUE_APP_CLIENT_URL = 'http://localhost:8081'
    - VUE_APP_API_URL = 'https://accounts.google.com/gsi/client'

7. Compile and run the project locally.
```
npm run serve
```

8. Test your project.
    - Note that your frontend and backend must be running for testing to be successful.
```
npm run test
```

9. Test your project and watch the tests run with Cypress.
```
npm run test:open
```

10. (Optional) Compile the project for production.
```
npm run build
```

11. (Optional) Lint and fix the project files.
```
npm run lint
```

# Student List Frontend with Vue 3

This application allows users to create and maintain a list of students. Please visit https://github.com/OC-ComputerScience/tutorial-backend for the backend repository.

### Table of Contents
[Project Setup for your Local Machine](#project-setup-for-your-local-machine)</br>
[Project Setup for your AWS Instance](#project-setup-for-your-aws-instance)

## Project Setup for your Local Machine

1. Clone the project into your **XAMPP/xamppfiles/htdocs/studentapp** directory.
```
git clone https://github.com/OC-ComputerScience/student-frontend-vue3.git
```

2. Install the project.
```
npm install
```

3. Make sure **Apache** is running.
    - We recommend using XAMPP to serve this project.
    - In XAMPP, make sure that **Apache** is running.

7. Compile and run the project locally.
```
npm run dev
```

10. (Optional) Compile the project for production.
```
npm run build
```

11. (Optional) Lint and fix the project files.
```
npm run lint
```

## Project Setup for your AWS Instance
1. Make a **nodeapps** directory in your home directory on your AWS instance with the following three commands.

```
cd ~
```

```
mkdir nodeapps
```

```
cd nodeapps
```

2. Clone the project into your new **nodeapps** directory.
```
git clone https://github.com/OC-ComputerScience/student-backend.git
```

3. Update your **MySQL password** in the **app.js** file.
    - Open your **app.js** file with the following two commands.

    ```
    cd student-backend
    ```

    ```
    nano app.js
    ```

    - Using your **arrow keys**, find the **MySQL connection**.
    
    ```
    res.locals.connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'student'
    ```
    
    - On the line that says `password : ''`, enter your **MySQL password** between ''.
    - Press **Control** and **X** on your keyboard.
    - Press **Y**.
    - Press **Enter**.

4. Install the project and start Node with the following two commands.
```
npm install
```

```
nohup npm run start &
```

5. Enable required **Apache modules** with the following two commands.
```
sudo a2enmod proxy
```

```
sudo a2enmod proxy_http
```

6. Configure **Apache** to point to **Node** for API requests.
    - Open the configuration file with the following command.

    ```
    sudo nano /etc/apache2/sites-enabled/000-default.conf
    ```

    - Find `</Virtual Host>`.
    - **Before** it, add the following:

    ```
    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    ProxyRequests Off
    ProxyPass /api http://localhost:3000/api
    ```
    
    - Press **Control** and **X** on your keyboard.
    - Press **Y**.
    - Press **Enter**.
    - Restart Apache with the following command.

    ```
    sudo /etc/init.d/apache2 restart
    ```

7. Update the **PHP config** to allow loading of big files. 
    - Open your **php.ini** file with the following two commands.

    ```
    cd /etc/php/7.2/apache2/
    ```

    ```
    sudo nano php.ini
    ```

    - Press **Command** and **W** on your keyboard to find the line quicker.
    - Type in **upload_max**.
    - Change the line to make the max **6M**.
     ```
     upload_max_filesize=6M
     ```
     
    - Press **Control** and **X** on your keyboard.
    - Press **Y**.
    - Press **Enter**.
    - Restart Apache with the following command.

    ```
    sudo /etc/init.d/apache2 restart
    ```

8. Make a **student** database on your **AWS instance**.
    - Go to http://**your instance**/phpmyadmin.
    - Create a database named **student**.
    - Import the **student.sql** file from this repository into the database.

9. Check the corresponding **frontend repositories** for the correct URL to use to test your application.
