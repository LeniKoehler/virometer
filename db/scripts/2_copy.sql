COPY "Testdata"
FROM
    '/data/12112020.csv' DELIMITER ',' CSV HEADER;

COPY "mapTestkoordinaten"
FROM
    '/data/mapTestkoordinaten.csv' DELIMITER ',' CSV HEADER;