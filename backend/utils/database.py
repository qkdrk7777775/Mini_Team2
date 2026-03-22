import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv("../.env")

user_id = os.getenv("USER_ID")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")


db_info = f"mysql+pymysql://{user_id}:{password}@{host}:{port}/{db_name}"
engine = create_engine(db_info, connect_args={})
print(engine)