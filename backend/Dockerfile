# Set master image
FROM php:7.4-fpm-alpine

# Copy composer.lock and composer.json
COPY composer.json /var/www/html/

# Set working directory
WORKDIR /var/www/html

# Install Additional dependencies
RUN apk update && apk add --no-cache \
    build-base shadow vim curl \
    php7 \
    php7-fpm \
    php7-common \
    php7-pdo \
    php7-pdo_mysql \
    php7-mysqli \
    php7-mcrypt \
    php7-mbstring \
    php7-xml \
    php7-openssl \
    php7-simplexml \
    php7-json \
    php7-phar \
    php7-zip \
    php7-gd \
    php7-dom \
    php7-session \
    php7-zlib \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libxslt-dev \
    libzip-dev \
    && docker-php-ext-install iconv soap sockets exif bcmath pdo_mysql pcntl \
	&& docker-php-ext-configure gd --with-jpeg --with-freetype \
	&& docker-php-ext-install gd \
	&& docker-php-ext-install zip

# Add and Enable PHP-PDO and GD Extenstions
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-enable pdo_mysql

# Install PHP Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set TimeZone
RUN apk add --no-cache tzdata && cp /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime
RUN echo "America/Argentina/Buenos_Aires" > /etc/timezone
RUN apk del tzdata

# Remove Cache
RUN rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /var/www

RUN chown -R www-data:www-data /var/www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]