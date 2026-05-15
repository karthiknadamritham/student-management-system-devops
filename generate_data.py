import random
from datetime import datetime, timedelta

departments = ['Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Information Technology']
genders = ['M', 'F']
lines = []
lines.append('INSERT INTO students (full_name, email, dob, gender, department, semester, enrollment_date, phone, is_active) VALUES ')
values = []
for i in range(1, 151):
    dept = random.choice(departments)
    gender = random.choice(genders)
    semester = random.randint(1, 8)
    dob = (datetime.now() - timedelta(days=365*(18 + random.randint(0, 4)))).strftime('%Y-%m-%d')
    enrollment = (datetime.now() - timedelta(days=365*(semester//2))).strftime('%Y-%m-%d')
    values.append(f"('Student {i}', 'student{i}@example.com', '{dob}', '{gender}', '{dept}', {semester}, '{enrollment}', '1234567890', true)")
lines.append(',\n'.join(values) + ';')

with open('src/main/resources/data.sql', 'w') as f:
    f.write('\n'.join(lines))
