# digital-signature-service
poc to demonstrate the cryptographic flow of a digital signature service


# npm start

# configure postman with the following endpoints 

1. GET http://localhost:3000/generate-key-pair  {
        body: { empty request to get public + private key }}

2. POST http://localhost:3000/sign {
        body: {
          "privateKey": "" ,
          "data": "sample text"
          }
        }
        response : {
          signature,
          document: "sample text"
        }

3. POST http://localhost:3000/verify { 
      body : {
          "data": "sample text",
          "signature": "",
          "publicKey": ""
      }
      response : {
          boolean: isverified
      }
    }

