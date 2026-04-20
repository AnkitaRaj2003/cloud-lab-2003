Step 1 — Create Storage Account
Azure Portal → Storage accounts
Click Create
Fill:
Resource group → create new
Storage account name → unique (example: studentblob123)
Region → any
Click Review + Create
Click Create
Step 2 — Create Container
Open storage account
Click Containers
Click + Container
Name:
mydata
Access level:
Private
Click Create
Step 3 — Create JSON file

Create a file on your computer:

data.json
[]

Upload:

Storage account → Containers → mydata → Upload → select data.json

Step 4 — Generate SAS URL
Storage account → Shared access signature
Select permissions:
Read
Write
Create
Delete
Click Generate
Copy Blob Service SAS URL

Example:

https://studentblob123.blob.core.windows.net/mydata/data.json?sv=....
Step 5 — Create frontend file

Create file:

index.html
<!DOCTYPE html>
<html>

<head>
<title>Azure Blob CRUD App</title>

<style>

body{
font-family:Arial;
margin:40px;
}

input{
padding:8px;
margin:5px;
}

button{
padding:8px;
cursor:pointer;
}

li{
margin:5px;
}

</style>

</head>

<body>

<h2>Azure Blob CRUD App</h2>

<h3>Add Item</h3>

<input id="itemInput" placeholder="Enter item">

<button onclick="addItem()">Add</button>

<h3>Items</h3>

<ul id="list"></ul>

<script>

const BLOB_URL = "PASTE_YOUR_SAS_URL_HERE";


async function getData(){

const res = await fetch(BLOB_URL);

return await res.json();

}


async function saveData(data){

await fetch(BLOB_URL,{

method:"PUT",

headers:{
"x-ms-blob-type":"BlockBlob",
"Content-Type":"application/json"
},

body: JSON.stringify(data)

});

}


async function addItem(){

const input = document.getElementById("itemInput");

const value = input.value;

if(!value) return;

const data = await getData();

data.push(value);

await saveData(data);

input.value = "";

loadItems();

}


async function deleteItem(index){

const data = await getData();

data.splice(index,1);

await saveData(data);

loadItems();

}


async function editItem(index){

const newValue = prompt("Update item:");

if(!newValue) return;

const data = await getData();

data[index] = newValue;

await saveData(data);

loadItems();

}


async function loadItems(){

const data = await getData();

const list = document.getElementById("list");

list.innerHTML = "";

data.forEach((item,index)=>{

const li = document.createElement("li");

li.innerHTML = item + 

` <button onclick="editItem(${index})">Edit</button>
<button onclick="deleteItem(${index})">Delete</button>`;

list.appendChild(li);

});

}


loadItems();

</script>

</body>

</html>
Step 6 — Run app
Go to Static web app and upload this from repo AzureBlobApp

CREATE
Adds item to JSON stored in blob

READ
Loads JSON from blob

UPDATE
Changes item in JSON file

DELETE
Removes item from JSON file

Example stored file (Blob)
[
 "apple",
 "banana",
 "mango"
]
