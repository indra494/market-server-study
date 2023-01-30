const express = require('express');
const cors = require('cors');
const app = express();
const models = require('./models')
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/products',(req,res) => {
    const query = req.query;
    console.log(query);
    res.send({
        products: [
            {
              id: 1,
              name: "농구공",
              price: 100000,
              seller: "조던",
              imageUrl: "images/products/basketball1.jpeg",
            },
            {
              id: 2,
              name: "축구공",
              price: 50000,
              seller: "메시",
              imageUrl: "images/products/soccerball1.jpg",
            },
            {
              id: 3,
              name: "키보드",
              price: 10000,
              seller: "그랩",
              imageUrl: "images/products/keyboard1.jpg",
            }
        ]
    });
});

app.get('/products/:id', (req,res) => {
    const params = req.params;
    const {id} = params;
    res.send(`id는 ${id}입니다.`);

});


app.post('/products',(req,res) => {
    const body = req.body;
    res.send({
        body: body
    });
    res.send('상품이 등록되었습니다.');
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