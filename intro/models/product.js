const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  // How to reference a user
  // ref helps us specifiy which other mongoose model we are using
  // when using embedded document don't need to do this
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// connect schema/blueprint with a name - .model('Product')
module.exports = mongoose.model('Product', productSchema);

// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, prodId, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = prodId ? new mongodb.ObjectId(prodId) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({_id: this._id}, { $set: this })
//     } else {
//       return dbOp = db.collection('products').insertOne(this);
//     }

//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err)
//       });
//   }

//   static fetchAll() {
//     const db = getDb();

//     // Doesn't return a promise but a cursor
//     // Allows us to go through our documents step by step
//     // Only allow toArray if there aren't that many
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(err => console.log(err));
//   }

  // static findById(prodId) {
  //   const db = getDb();

  //   // next() gets the last document
  //   return db
  //     .collection('products')
  //     .find({ _id: new mongodb.ObjectId(prodId) })
  //     .next()
  //     .then(product => {
  //       return product;
  //     })
  //     .catch(err => console.log(err))
  // }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//       .then(result => {
//         console.log('Deleted')
//       })
//       .catch(err => console.log(err))
//   }
// }

// module.exports = Product;
