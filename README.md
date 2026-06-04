# Clothing Wholesale - Cloud Network Project

## Tavsif
Ushbu loyiha ulgurji kiyim-kechak kompaniyasi uchun AWS bulut tarmog'ini loyihalash va amalga oshirish.

## Texnologiyalar
- AWS EC2
- AWS VPC
- IIS Web Server
- Windows Server 2025
- Docker

## Arxitektura
- VPC: 10.10.0.0/16
- Public Subnet (AZ1, AZ2)
- Private Subnet (AZ1, AZ2)
- Internet Gateway
- NAT Gateway

## O'rnatish
1. EC2 instance yaratish
2. IIS o'rnatish: Install-WindowsFeature -Name Web-Server
3. index.html faylni joylashtirish
4. Brauzerda http://localhost ochish

## Docker
```bash
docker build -t clothing-app .
docker run -d -p 8080:80 --name my-app clothing-app