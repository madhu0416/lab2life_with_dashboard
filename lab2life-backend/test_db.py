from database import engine
import pandas as pd

query = "SELECT * FROM medical_reports"
df = pd.read_sql(query, engine)

print(df)