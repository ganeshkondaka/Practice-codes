from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Tea(BaseModel):
    id: int
    name: str
    origin: str

teas: List[Tea] = []

@app.get('/')
def read_root():
    return {"msg":"hello welcome !"}

@app.get('/teas')
def get_teas():
    return teas

@app.post('/teas')
def add_tea(tea: Tea):
    teas.append(tea)
    return {
        'msg':'tea was added successfully',
        'tea':tea
        }

@app.put('/teas/{tea_id}')
def update_tea(tea_id:int, updated_tea:Tea):
    for index,tea in enumerate(teas):
        if tea_id == tea.id:
            teas[index]=updated_tea
            return update_tea
    return {"err":"tea was not found"}

@app.delete('/teas/{tea_id}')
def delete_tea(tea_id:int):
    for index,tea in enumerate(teas):
        if tea_id == tea.id:
            deleted_tea = teas.pop(index)
            return delete_tea
    return {'err':'tea not found'}