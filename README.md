## How to run the application:

```
git clone https://github.com/RahulBansal123/cstore.git
cd cstore
npm install
npm start

```

## Triggers are created for updated field for users(triggerUser), cart(triggerCart) and seller(triggerSeller)

### Example:

Trigger on users collection

```
exports = async function(changeEvent) {
  const collection= context.services.get("Cluster0").db("myFirstDatabase").collection("users");

  try {
   await collection
    .updateOne(
      { _id: changeEvent.documentKey._id },
      {
        $currentDate: {
        updated: true
        }
      }
    );
    console.log("users trigger successfully worked");

  } catch (err) {
    console.error("users trigger failed", err);
  }
  return;
};
```

## Views

1. Created a exclusive product view for products with price > $1500
2. Created a recommended product view for products with top reviews i.e with stars === 5

## Grants

#### Three users are created

1. rahul: admin of the database, can read/write any database
2. employee: can read/write myFirstDatabase
3. visitor: can only read myFirstDatabase

```
db.createUser( { user: "rahul", pwd: "*****", roles: [ { role: "readWrite", db: "admin" } ] } )

db.createUser( { user: "employee", pwd: "employee@1", roles: [ { role: "readWrite", db: "myFirstDatabase" } ] } )

db.createUser( { user: "visitor", pwd: "visitor@1", roles: [ { role: "read", db: "myFirstDatabase" } ] } )
```
