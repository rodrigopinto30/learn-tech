FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    build-essential $PHPIZE_DEPS

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && pecl install xdebug-3.2.1 redis \
    && docker-php-ext-enable xdebug redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

CMD ["php-fpm"]