# Module 7

## Dynamic Routes & Advanced Models

### Dynamic Routing

* You can pass dynamic path segments by adding a ":" to the Express router path
* The name you add after ":" is the name by which you can extract the data on `req.params`
* Optional (query) parameters can also be passed `?param=value&b=2` and extracted `req.query.myParam`

### Mode on Models

* A Cart model was added - it holds static methos only
* You can interact between models (e.g. delete cart item if a product is deleted)
* Working with files for data storage is suboptimal for bigger amounts of data
