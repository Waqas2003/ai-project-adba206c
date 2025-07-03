const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

mongoose.connect('mongodb://localhost/alibaba-clone', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const productSchema = new mongoose.Schema({
  title: String,
    price: Number,
  image: String
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/' }).single('image'));

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  res.send({ message: 'User created successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ message: 'User not found' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ message: 'Invalid password' });
  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.send({ token });
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.post('/products', async (req, res) => {
  const { title, description, price } = req.body;
  const image = req.file.path;
  const product = new Product({ title, description, price, image });
  await product.save();
  res.send({ message: 'Product created successfully' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

**Frontend**