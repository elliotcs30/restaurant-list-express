![demo](/public/images/3_S1_A1_01.png)

# A1:餐廳清單．Final

## 專案功能
  * 使用者可以新增一家餐廳
  * 使用者可以瀏覽一家餐廳的詳細資訊
  * 使用者可以瀏覽全部所有餐廳
  * 使用者可以修改一家餐廳的資訊
  * 使用者可以刪除一家餐廳
  * 使用者可以註冊帳號，註冊的資料包括: 
    - 名字、email、密碼、確認密碼。
    - 其中 email 與密碼是必填欄位，但名字不是。
    - 如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息。
  * 使用者也可以透過 Facebook Login 直接登入。
  * 使用者的密碼要使用 bcrypt 來處理。
  * 使用者必須登入才能使用餐廳清單:
    - 如果沒登入，會被導向登入頁面。
    - 登入後，使用者可以建立並管理專屬他的一個餐廳清單。
  * 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息。

## 執行專案
1. 將本專案 clone 到本地端

2. 安裝套件
```shell
  npm i express@4.17.1
  npm i mongoose@6.0.4 # Mac M1 chip
  npm i express-handlebars@4.0.2
  npm i method-override@3.0.0
  npm i body-parser@1.20.0
  npm i express-session@1.17.1
  npm i connect-flash@0.1.1
  npm i passport@0.4.1
  npm i passport-facebook@3.0.0
  npm i passport-local1.0.0
  npm i bcryptjs@2.4.3
  npm i dotenv@8.2.0
```

3. 建立 .env 環境變數檔案, 可參考 .env.example 檔案

4. 資料庫連線設定，本專案使用 Robo 3T GUI:
```shell
  export MONGODB_URI="mongodb+srv://<your name>:<your password>@cluster0.ayhtm.mongodb.net/restaurant-list?retryWrites=true&w=majority"
```

5. 新增種子資料到資料庫，在終端機執行:
```shell
  npm run seed
```

6. 種子資料新增成功，會看到以下訊息:
```shell
  create seeds done!
```

7. 啟動伺服器
```shell
  npm run start
```

8. 終端機啟動成功會顯示以下訊息
```node
  App is running on http://localhost:3000
  mongodb connected!
```
