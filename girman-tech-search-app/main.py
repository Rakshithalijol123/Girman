from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from bson import ObjectId
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# MongoDB connection
client = MongoClient("mongodb://localhost:27017/girman") 
db = client['GirmanUsers'] 
user_collection = db['users']

# Model for the user
class User(BaseModel):
    first_name: str
    last_name: str
    city: str
    contact_number: str


# Route to fetch all users
@app.get("/users/")
async def get_users():
    users = []
    for user in user_collection.find():
        users.append({
            "id": str(user["_id"]),
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "city": user["city"],
            "contact_number": user["contact_number"]
        })
    return users

@app.post("/users/")
async def add_user(user: User):
    user_id = user_collection.insert_one(user.dict()).inserted_id
    return {"id": str(user_id), "message": "User added successfully"}

# Route to search users by name
@app.get("/users/search/")
async def search_users(query: str):
    search_term = query.lower()
    filtered_users = user_collection.find({
        "$or": [
            {"first_name": {"$regex": search_term, "$options": "i"}},
            {"last_name": {"$regex": search_term, "$options": "i"}}
        ]
    })
    users = []
    for user in filtered_users:
        users.append({
            "id": str(user["_id"]),
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "city": user["city"],
            "contact_number": user["contact_number"]
        })
    if not users:
        raise HTTPException(status_code=404, detail="No results found")
    return users
