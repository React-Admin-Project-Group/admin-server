const mongoose = require('mongoose')
 mongoose.connect('mongodb://admin:666666@114.215.148.3:27017/kitchen?authSource=admin',
 {useNewUrlParser: true,useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost:27017/chicken', { useNewUrlParser: true, useUnifiedTopology: true })

const connect = mongoose.connection

connect.on('error', console.error.bind(console, 'connection error'))

connect.once('open', () => {
  console.log('db connected')
})