
# WELCOME TO KASIR ASIK

## Backend Setup

Untuk backend project ini menggunakan Python, pastikan versi
**Python >= 3.9**. Pertama, lakukan clone pada repository `git clone https://github.com/Ndaru7/kasirAsik.git` dan lakukan setup sesuai dengan device masing - masing.

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

