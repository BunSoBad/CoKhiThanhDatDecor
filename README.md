# CoKhiThanhDatDecor
ThanhDatDecor

## Production (Vercel) setup

Project nay can db cloud va object storage cloud de ghi du lieu tren Vercel.

### 1) Environment variables tren Vercel

- `DATABASE_URL`: Postgres connection string
- `ADMIN_PASSWORD`: mat khau admin
- `BLOB_READ_WRITE_TOKEN`: token cho Vercel Blob

### 2) Tao schema tren Postgres

Sau khi cap nhat `DATABASE_URL`, chay:

```bash
npx prisma db push
```

### 3) Upload anh admin

API `/api/admin/upload` da luu anh len Vercel Blob va tra ve URL public.
