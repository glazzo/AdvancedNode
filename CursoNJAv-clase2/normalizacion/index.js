const normalizr = require('normalizr')
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize

const schema = normalizr.schema
const util = require('util')

function print(dato) {
  console.log(util.inspect(dato,false,12,true));
}

const data = {
  "id": "9999",
  "post": [
    {
      "id": "1234",
      "author": {
        "id": "1",
        "name": "Paul",
        "surname": "Perex",
        "DNI":"2039039",
        "address":"caba 213",
        "phone":"124345678"
      },
      "title": "My awesome blog post",
      "comments": [
        {
          "id": "1324",
          "commenter": {
            "id": "2",
            "name": "Nicole",
            "surname": "Perex",
            "DNI":"2039039",
            "address":"caba 213",
            "phone":"124345678"
          }
        },
        {
          "id": "1325",
          "commenter": {
            "id": "3",
            "name": "Pedro",
            "surname": "Gonzalez",
            "DNI":"34234434",
            "address":"caba 345",
            "phone":"5545454545"
          }
        }
      ]
    },
    {
      "id": "2123",
      "author": {
        "id": "2",
        "name": "Nicole",
        "surname": "Perex",
        "DNI":"2039039",
        "address":"caba 213",
        "phone":"124345678"
      },
      "title": "My awesome blog post",
      "comments": [
        {
          "id": "1324",
          "commenter": {
            "id": "2",
            "name": "Nicole",
            "surname": "Perex",
            "DNI":"2039039",
            "address":"caba 213",
            "phone":"124345678"
          }
        },
        {
          "id": "2325",
          "commenter": {
            "id": "3",
            "name": "Pedro",
            "surname": "Gonzalez",
            "DNI":"34234434",
            "address":"caba 345",
            "phone":"5545454545"
          }
        }
      ]
    },
    {
      "id": "1323",
      "author":{
        "id": "3",
        "name": "Pedro",
        "surname": "Gonzalez",
        "DNI":"34234434",
        "address":"caba 345",
        "phone":"5545454545"
      },
      "title": "My awesome blog post",
      "comments": [
        {
          "id": "324",
          "commenter": {
            "id": "2",
            "name": "Nicole",
            "surname": "Perex",
            "DNI":"2039039",
            "address":"caba 213",
            "phone":"124345678"
          }
        },
        {
          "id": "325",
          "commenter": {
            "id": "3",
            "name": "Pedro",
            "surname": "Gonzalez",
            "DNI":"34234434",
            "address":"caba 345",
            "phone":"5545454545"
          }
        }
      ]
    }
  ]
}

// ---------------------------------------------
// NORMALIZACION DE DATOS JSON
// ---------------------------------------------
const user = new schema.Entity('users') // Es el ultimo escalón, no necesito crear más entidades dentro de él.

const comment = new schema.Entity('comments',{
  commenter: user
})

const article = new schema.Entity('articles',{
  author :  user,
  comments: [comment]
})

const post = new schema.Entity('posts',{
  post: [article]
}) //crear una entidad dentro del objeto normalizado


//---------------------------------------------
// OBJETO ORIGINAL
//---------------------------------------------
print(data,'data');
console.log(JSON.stringify(data).length,'data');
console.log('--------------------------------')

//---------------------------------------------
// OBJETO NORMALIZADO 
//---------------------------------------------
let normlizedData = normalize(data, post)

print(normlizedData,'normlizedData');
console.log(JSON.stringify(normlizedData).length,'normlizedData')
console.log('--------------------------------')


//---------------------------------------------
// OBJETO DESNORMALIZADO 
//---------------------------------------------
let denormlizedData = denormalize(
  normlizedData.result,
  post,
  normlizedData.entities,
)


print(denormlizedData,'denormlizedData');
console.log(JSON.stringify(denormlizedData).length,'denormlizedData')
console.log('--------------------------------')
