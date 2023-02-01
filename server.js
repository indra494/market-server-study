const express = require('express');
const cors = require('cors');
const app = express();
const models = require('./models');
const { json } = require('sequelize');
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/products',(req,res) => {

    models.product.findAll({
        order: [["createdAt", "DESC"]],
        attributes: ["id", "name", "price", "createdAt", "seller","imageUrl"],
    }).then((result)=> {
        console.log("PRODUCTS : ", result);
        res.send({
            products : result
        })
    }).catch((error)=>{
        console.log(error);
        res.send("에러발생");
    });
});

app.get('/products/:id', (req,res) => {
    const params = req.params;
    const {id} = params;

    models.product.findOne({
        where : {
            id : id
        }
    }).then((result)=>{
        console.log("result : ", result);
        res.send({
            product: result
        });
    }).catch((error)=> {
        console.log(error);
        res.send("상품 조회에 에러가 발생하였습니다.");
    });

});


app.post('/products',(req,res) => {
    const body = req.body;
    const {name, description, price, seller} = body;

    console.log(name);
    console.log(description);    
    console.log(price);    
    console.log(seller);       

    if(!name || !description || !price || !seller) {
        res.send('모든 필드를 입력해주세요');
    }
    models.product.create({
        name,
        description,
        price,
        seller,
    }).then((result)=>{
        console.log("상품 생성결과",result);
        res.send({
            result,
        });
    }).catch((error)=>{
        console.log(error);
        res.send('상품 업로드에 문제가 발생하였습니다.')
    });
});

app.listen(port, () => {
    console.log('마켓이 서버가 작동중입니다.')
    models.sequelize.sync().then(()=>{
        console.log('DB 연결 성공!');
    }).catch((err)=>{
        console.error(err);
        console.log('DB 연결 에러');
        process.exit();
    });
})