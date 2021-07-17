# MERN Notes Keeper  

[![N|Solid](https://res.cloudinary.com/dsohtcuy3/image/upload/v1626470356/button_demo_1_k6is2z.png)](https://mern-keep-notes-app.herokuapp.com/)
#
![image](https://res.cloudinary.com/dsohtcuy3/image/upload/v1626475250/Screenshot_1_atrgwv.png)

### Test account:

| email | password |
| ------ | ------ |
| dante@ex.com | 123456 |

#

### Features:
- Responsive markup
- Client validation forms
- Live search
- Dynamic scroll pagination
- Filter notes by user tags
- Create, update, delete, pin/unpin for notes
- Add tags to notes
- Create, delete and update user tags
- Progress bar for loading progress

### Stack:

##### Client:
- HTML
- CSS + SASS ( SCSS )
- ES6+
- React ( Functional component, Formik, Yup, Masonry, Custom hooks )
- Redux + Thunk
- Axios

##### Server:
- NodeJS
- Express
- RestAPI architecture
- JWT
- MongoDB + Mongoose

#

### Environment:

Create a .env file in then root:

```sh
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```
### Install (Frontend and Backend):

```sh
npm install
cd frontend
npm install
```
### Run app:

```sh
npm run dev
```

### Run only server:

```sh
npm run server
```


