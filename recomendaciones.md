# 🚀 LearnTech: Infraestructura de Desarrollo 100% Contenedorizada

Este documento detalla el proceso técnico para levantar el ecosistema
**LearnTech (Next.js + Laravel + MySQL + Redis + Nginx)** manteniendo el
Sistema Operativo del Host (tu PC) totalmente limpio de lenguajes o
dependencias.

------------------------------------------------------------------------

## 📋 Arquitectura del Proyecto

La plataforma utiliza un **Proxy Inverso (Nginx)** como único punto de
entrada, derivando el tráfico según la ruta:

-   `/` → Dirige al contenedor de **Frontend (Next.js)**.
-   `/api` → Dirige al contenedor de **Backend (Laravel)**.

------------------------------------------------------------------------

## 🛠️ Fase 1: Configuración de "Espera" (Modo Idle)

Para evitar que los contenedores se apaguen al no encontrar archivos de
aplicación inicialmente, configuramos un comando de bloqueo.

### 1. Ajustar `frontend/Dockerfile` y `backend/Dockerfile`

``` dockerfile
# Temporalmente usamos tail para mantener el contenedor vivo
CMD ["tail", "-f", "/dev/null"]
```

### 2. Levantar servicios base

``` bash
docker compose up -d --build
```

------------------------------------------------------------------------

## ⚛️ Fase 2: Instalación Quirúrgica de Next.js (Frontend)

El comando `create-next-app` prohíbe la instalación si el directorio
contiene archivos (como el Dockerfile).\
Usamos el truco del directorio temporal `/tmp` dentro del contenedor.

### Proteger el Dockerfile

``` bash
docker exec -it learn_tech_frontend mv Dockerfile /tmp/Dockerfile
```

### Ejecutar Instalador

``` bash
docker exec -it learn_tech_frontend npx create-next-app@latest .
```

Opciones recomendadas:

-   TypeScript
-   Tailwind
-   App Router
-   `src/` directory

### Restaurar Configuración

``` bash
docker exec -it learn_tech_frontend mv /tmp/Dockerfile ./Dockerfile
```

------------------------------------------------------------------------

## 🐘 Fase 3: Instalación de Laravel (Backend)

Repetimos la lógica para garantizar que Composer genere la estructura de
carpetas sin conflictos.

### Proteger el Dockerfile

``` bash
docker exec -it learn_tech_backend mv Dockerfile /tmp/Dockerfile
```

### Instalar Laravel Core

``` bash
docker exec -it learn_tech_backend composer create-project laravel/laravel .
```

### Restaurar Configuración

``` bash
docker exec -it learn_tech_backend mv /tmp/Dockerfile ./Dockerfile
```

------------------------------------------------------------------------

## 🔧 Fase 4: Puesta a Punto y Permisos

Al crear archivos desde el contenedor (usuario `root`), Laravel suele
fallar por permisos de escritura en su caché interna.

### Habilitar Soporte API (Laravel 11+)

``` bash
docker exec -it learn_tech_backend php artisan install:api
```

### Corregir Permisos (Error 500 tempnam)

``` bash
docker exec -it learn_tech_backend chown -R www-data:www-data storage bootstrap/cache
docker exec -it learn_tech_backend chmod -R 775 storage bootstrap/cache
```

------------------------------------------------------------------------

## 🚀 Fase 5: Activación del Entorno Real

Ahora que los archivos ya existen en tu carpeta local (vía volumes),
devolvemos los contenedores a su estado de ejecución normal.

### 1. Restaurar CMD en `frontend/Dockerfile`

``` dockerfile
CMD ["npm", "run", "dev"]
```

### 2. Restaurar CMD en `backend/Dockerfile`

``` dockerfile
CMD ["php-fpm"]
```

### 3. Reinicio Global

``` bash
docker compose up -d --build
```

------------------------------------------------------------------------

## 🔗 Tabla de Accesos Locales

  Servicio                     URL / Host                  Puerto Interno
  ---------------------------- --------------------------- ----------------
  LearnTech Web (Frontend)     http://localhost:8000       3000
  LearnTech API (Backend)      http://localhost:8000/api   9000
  Base de Datos (phpMyAdmin)   http://localhost:8080       80
  MySQL Directo                127.0.0.1                   3307
  Redis                        learn_tech_redis            6379

------------------------------------------------------------------------

## 💡 Notas de Mantenimiento

### Permisos en Linux

Si los archivos creados por Docker no te permiten editar en VS Code:

``` bash
sudo chown -R $USER:$USER .
```

Ejecutar desde la **raíz del proyecto**.

### Hot Reload

Next.js y Laravel detectarán tus cambios en el código automáticamente
gracias a los **volúmenes configurados en `docker-compose.yml`**.

------------------------------------------------------------------------

Infraestructura pensada para **desarrollo moderno, reproducible y sin
contaminación del sistema host**.