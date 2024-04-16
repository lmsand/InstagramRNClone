// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// const AWS = require('aws-sdk')
// const docClient = new AWS.DynamoDB.DocumentClient();

// const env = process.env.ENV
// const AppsyncID = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIIDOUTPUT
// const TableName = `User-${AppsyncID}-${env}`
// // const TableName = 'User-eeonzhttafdcvnkdjx6vgraax4-staging'

// const userExists = async id => {
//   const params = {
//     TableName,
//     Key: id
//   }

//   try {
//     const response = await docClient.get(params).promise()
//     return !!response?.Item // if response is a truthy value
//   } catch (e) {
//     return false
//   }
// }

// const saveUser = async user => {
//   const date = new Date()
//   const dateStr = date.toISOString()
//   const timestamp = date.getTime()

//   const Item = {
//     ...user,
//     __typename: 'User',
//     createdAt: dateStr,
//     updatedAt: dateStr

//   }
//   const params = {
//     TableName,
//     Item,
//   }

//   try {
//     await docClient.put(params).promise()
//   } catch (e) {
//     console.log(e)
//   }
// }

// exports.handler = async (event, context) => {
//   // insert code to be executed by your lambda trigger
//   console.log('lambda function is working')
//   console.log(event)

//   if (!event?.request?.userAttributes) {
//     console.log('No user data available')
//     return
//   }

//   const {sub, name, email} = event.request.userAttributes // {sub, email, name}

//   const newUser = {
//     id: sub,
//     name,
//     email
//   }

//   // check if user already exists
//   if (!(await userExists(newUser.id))) {
//     // if not, save user to database
//     await saveUser(newUser)
//     console.log(`User ${newUser.id} has been saved to the database`)
//   } else {
//     console.log(`User ${newUser.id} already exists`)
//   }


//   return event;
// };

const { DynamoDBClient, GetCommand, PutCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "us-east-1" }); // replace 'us-east-1' with your desired AWS region

const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`;

const userExists = async (id) => {
  const params = {
    TableName,
    Key: { id: { S: id } },
  };

  try {
    const { Item } = await client.send(new GetCommand(params));
    return !!Item; // if Item is a truthy value
  } catch (e) {
    console.log(e);
    return false;
  }
};

const saveUser = async (user) => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    ...user,
    __typename: { S: "User" },
    createdAt: { S: dateStr },
    updatedAt: { S: dateStr },
  };

  const params = {
    TableName,
    Item,
  };

  try {
    await client.send(new PutCommand(params));
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  console.log("lambda function is working");
  console.log(event);

  if (!event?.request?.userAttributes) {
    console.log("No user data available");
    return;
  }

  const { sub, name, email } = event.request.userAttributes; // {sub, email, name}

  const newUser = {
    id: sub,
    name,
    email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0
  };

  // check if user already exists
  if (!(await userExists(newUser.id))) {
    // if not, save user to database
    await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to the database`);
  } else {
    console.log(`User ${newUser.id} already exists`);
  }

  return event;
};
