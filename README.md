# Student List Frontend with Vue 3

This application allows users to create and maintain a list of students. Please visit https://github.com/OC-ComputerScience/student-backend for the backend repository.

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
