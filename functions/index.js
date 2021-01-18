const functions = require("firebase-functions");
const express = require("express");
const app=express();
const {getComments,postOneComment, deleteComment}=require('./handlers/comments')
const {getAllOrders,postOrder, getOrder, commentOnOrder, deleteOrder} = require("./handlers/orders");
const {signup,login,uploadImage}=require('./handlers/users')
const FBAuth=require('./util/fbAuth');
app.use(express.json());

app.get('/orders',getAllOrders)
app.get('/orders/:orderId',getOrder)
app.get('/comments',getComments)

app.post('/signup',signup)
app.post('/login',login)
app.post('/orders/:orderId/comment',FBAuth,commentOnOrder)
app.post('/comments',FBAuth,postOneComment)
app.post('/orders',FBAuth,postOrder)
app.post('/user/image',FBAuth,uploadImage);


app.delete('/order/:orderId',FBAuth,deleteOrder);
app.delete('/comment/:commentId',FBAuth,deleteComment);


exports.api=functions.region('europe-west1').https.onRequest(app);

