
# WELCOME TO KASIR ASIK

Project ini terdiri dari 6 anggota, yaitu:
- **Salman Afif Awaludin** sebagai project leader dan membuat SRS
- **Zulfan Ariq Asidqi** sebagai Frontend
- **M. Indra Ardhana** sebagai UI/UX
- **Daru Prasetiyo** sebagai Backend
- **Faza Aditya Pratama** sebagai Backend
- **Dhika Chairul Bakti** sebagai dokumentasi dan membatu membuat SRS

## Frontend Setup

Untuk frontend project ini menggunakan react, pastikan node.js terinstall dan npm
otomatis akan terinstall. Install node.js [disini](https://nodejs.org/en/download)
dan lakukan setup seperti berikut:

- Masuk ke folder frontend  
``$ cd frontend``
- Install Semua dependencies dengan cara dibawah dependencies akan terinstall otomatis sesuai dengan package.json  
``$ npm i``
- Running React  
``$ npm run dev``

## Backend Setup

Untuk backend project ini menggunakan Python, pastikan versi **Python >= 3.9**.
Install python [disini](https://www.python.org/downloads/) dan lakukan setup
sesuai dengan device masing - masing.

### Setup untuk Linux

- Masuk ke folder backend  
`$ cd backend`
- Buat virtual environtment  
`$ python3 -m venv .drf-env`
- Aktifkan virtual environtment  
`$ source .drf-env/bin/activate`
- Install library yang dibutuhkan  
`$ pip3 install -r requirements.txt`
- Lakukan migrasi  
`$ python3 manage.py migrate`
- Bisa buat superuser jika diperlukan  
`$ python3 manage.py createsuperuser`
- Jalankan server  
`$ python3 manage.py runserver`

### Setup untuk Windows

- Masuk ke folder backend  
`> cd backend`
- Buat virtual environtment  
`> python -m venv .drf-env`
- Aktifkan virtual environtment  
`> .drf-env\Scripts\activate.bat`
- Install library yang dibutuhkan  
`> pip install -r requirements.txt`
- Lakukan migrasi  
`> python manage.py migrate`
- Buat superuser jika diperlukan  
`> python manage.py createsuperuser`
- Jalankan server  
`> python manage.py runserver`

