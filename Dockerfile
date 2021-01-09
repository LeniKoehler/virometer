FROM postgres:13.0-alpine as base
# Basis enthält alles was grundsätzlich benötigt wird

ADD data/* /data/
ADD db/scripts/1_init.sql /docker-entrypoint-initdb.d/1_init.sql

# Test spezifische Anpassungen z.B Dateien die benötigt werden, ENV Variablen die geändert werden.
FROM base as test

ADD db/scripts/3_testdb.sh /docker-entrypoint-initdb.d/3_testdb.sh
RUN chmod +x /docker-entrypoint-initdb.d/*
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]

FROM base as dev

RUN chmod +x /docker-entrypoint-initdb.d/*
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 5432
CMD ["postgres"]