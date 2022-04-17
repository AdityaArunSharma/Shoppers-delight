import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../backend/server.js'
const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

describe('Testing Product Routes',()=>{
    it('/api/products',(done)=>{
        chai.request(server)
        .get('/api/products')
        .end((err,res)=>{           
            res.should.have.status(200);            
            done()
        })
    })
    it('/api/products/top',(done)=>{
        chai.request(server)
        .get('/api/products/top')
        .end((err,res)=>{           
            res.should.have.status(200);            
            done()
        })
    })
    it('/api/products/:id',(done)=>{
        chai.request(server)
        .get('/api/products/623d98b0ca0cba3827b2dd22')
        .end((err,res)=>{           
            res.should.have.status(200);            
            done()
        })
    })
    it('/api/products/:id',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }
        chai.request(server)
        .delete('/api/products/625842a7ae07801f6b2834dc')
        .set('Authorization', `Bearer ${userInfo.token}`)   
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200,404]);           
            done()
        })
    })
    it('/api/products/:id',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }
        const putData = {
              name: "Amul Taaza Toned Milk",
              price: 68,
              description: "Wholesome taste Healthy and nutritious milk Rich in calcium",
              image: "/uploads\\image-1648207241932.jpg",
              brand: "Amul",
              category: "Dairy, Bread & Eggs",
              countInStock: 9,
              sellerMail : "aditya.sharma@iiitg.ac.in"
        }
        
        chai.request(server)
        .put('/api/products/623d98b0ca0cba3827b2dd22')
        .set('Authorization', `Bearer ${userInfo.token}`) 
        .send(putData)  
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })
    it('/api/products/:id/reviews',(done)=>{
        const postData = {
            rating: "4",
            comment: "test comment"
        }
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDQxNzgxNDIzNTRkM2JlOWZmNGJjMCIsImlhdCI6MTY0OTk0OTQyNCwiZXhwIjoxNjUyNTQxNDI0fQ.TVKnrr73q8GxPSZPAgXSYXJRAZ1Qf5NGsL4ROYHg-pE"
        }
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        chai.request(server)
        .post('/api/products/623d98b0ca0cba3827b2dd22/reviews')
        .set('Authorization', `Bearer ${userInfo.token}`)
        .send(postData)
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200,201,400]);            
            done()
        })
    })

    it('/api/products/',(done)=>{
        
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }
        
        chai.request(server)
        .post('/api/products')
        .set('Authorization', `Bearer ${userInfo.token}`)        
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([201]);            
            done()
        })
    })

})


describe('Testing Order Routes',()=>{

    it('/api/orders',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }
        const postData = {orderItems:[],
            shippingAddress:"",
            paymentMethod:"",
            itemsPrice:"",
            taxPrice:"",
            shippingPrice:"",
            totalPrice:"",}
        chai.request(server)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userInfo.token}`)   
        .send(postData)
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([400]);           
            done()
        })
    })

    it('/api/orders',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }        
        chai.request(server)
        .get('/api/orders')
        .set('Authorization', `Bearer ${userInfo.token}`)           
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })


    it('/api/orders/myorders',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }        
        chai.request(server)
        .get('/api/orders/myorders')
        .set('Authorization', `Bearer ${userInfo.token}`)           
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

    it('/api/orders/:id',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }        
        chai.request(server)
        .get('/api/orders/623ae46d403558bf621ce926')
        .set('Authorization', `Bearer ${userInfo.token}`)           
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

    it('/api/orders/:id/pay',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }     
        const putData = {
            status: "COMPLETED",
            update_time: "2022-03-23T09:12:34Z",
            payer: {email_address: "sb-ozbuu14580898@personal.example.com"}
        }   
        chai.request(server)
        .put('/api/orders/623ae46d403558bf621ce926/pay')
        .set('Authorization', `Bearer ${userInfo.token}`)      
        .send(putData)     
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

    it('/api/orders/:id/deliver',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }              
        chai.request(server)
        .put('/api/orders/623ae46d403558bf621ce926/deliver')
        .set('Authorization', `Bearer ${userInfo.token}`)                 
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })
})

describe('Testing User Routes',()=>{

    it('/api/users',(done)=>{        
        const postData = {
            name: "Aditya",
            email: "aditya.sharma@iiitg.ac.in",
            password: "123456"
            }
        chai.request(server)
        .post('/api/users')       
        .send(postData)
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([405]);           
            done()
        })
    })

    it('/api/users',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }        
        chai.request(server)
        .get('/api/users')
        .set('Authorization', `Bearer ${userInfo.token}`)           
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

    it('/api/users/login',(done)=>{        
        const postData = {
            name: "Aditya",
            email: "aditya.sharma@iiitg.ac.in",
            password: "123456"
            }
        chai.request(server)
        .post('/api/users/login')       
        .send(postData)
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

    it('/api/users/profile',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }        
        chai.request(server)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userInfo.token}`)           
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

    it('/api/users/profile',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }        
        const putData = {}
        chai.request(server)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${userInfo.token}`) 
        .send(putData)          
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

        it('/api/users/:id',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }
        chai.request(server)
        .delete('/api/users/625842a7ae07801f6b2834dc')
        .set('Authorization', `Bearer ${userInfo.token}`)   
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([404]);           
            done()
        })
    })

    it('/api/users/:id',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }
        chai.request(server)
        .get('/api/users/62310ea8eb1f5f85150449f5')
        .set('Authorization', `Bearer ${userInfo.token}`)   
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })

    it('/api/users/:id',(done)=>{
        const userInfo = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDQwMjM0NWJjYTcyZjE1NjEyYmQ0MiIsImlhdCI6MTY0OTk0OTg0MCwiZXhwIjoxNjUyNTQxODQwfQ.hRJrXEsLc0gZClC1EeWvWH_kWKu89ULCa3LR9TLfhIk"
        }
        const putData = {}
        chai.request(server)
        .put('/api/users/62310ea8eb1f5f85150449f5')
        .set('Authorization', `Bearer ${userInfo.token}`)  
        .send(putData) 
        .end((err,res)=>{           
            expect(res.status).to.be.oneOf([200]);           
            done()
        })
    })    
})

describe('Testing Email Routes',()=>{

    it('/api/email',(done)=>{
        chai.request(server)
        .post('/api/email')
        .send({userInfo:{
               _id: '624412833e82bafd490b59a2',
              name: 'Aman Agarwal',
              email: 'aman.agarwal@iiitg.ac.in',
              isAdmin: false,
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDQxMjgzM2U4MmJhZmQ0OTBiNTlhMiIsImlhdCI6MTY0ODcxNzI3OSwiZXhwIjoxNjUxMzA5Mjc5fQ.j2V1TO2ePHuq1STeRJ-TYIkFL9fslHsLFHq61yNz5QQ'
            }, cart:
             {
               cartItems: [
                 {
                   product: '623d98b0ca0cba3827b2dd22',
                  name: 'Amul Taaza Toned Milk',
                  image: '/uploads\\image-1648207241932.jpg',
                  price: 68,
                  countInStock: 9,
                  qty: 1,
                  sellerMail: 'aditya.sharma@iiitg.ac.in'
                }
              ],
              shippingAddress: {
                address: '25/20 Canal Road ',
                city: 'Kanpur',
                postalCode: '208001',
            country: ' India'
              },
               paymentMethod: 'PayPal',
               itemsPrice: '68.00',
               shippingPrice: '100.00',
               taxPrice: '10.20',
               totalPrice: '178.20'
             }})
        .end((err,res)=>{ 
            expect(res.status).to.be.oneOf([201]);           
        })
        done()
    })
})