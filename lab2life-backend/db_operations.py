from sqlalchemy import text
from database import engine

def save_to_db(patient_name, age, disease, summary):
    query = text("""
        INSERT INTO medical_reports 
        (patient_name, age, disease, report_date, summary)
        VALUES (:name, :age, :disease, CURDATE(), :summary)
    """)

    with engine.connect() as conn:
        conn.execute(query, {
            "name": patient_name,
            "age": age,
            "disease": disease,
            "summary": summary
        })
        conn.commit()