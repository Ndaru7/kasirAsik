
# WELCOME TO KASIR ASIK

## Backend Setup

Untuk backend project ini menggunakan Python, pastikan versi
**Python >= 3.9**.

- Masuk ke folder backend
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
