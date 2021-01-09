FROM grafana/grafana:7.3.1-ubuntu

COPY ["./datasources.yaml", "/etc/grafana/datasources/datasources.yaml"]
COPY ["./dashboard-leni.json", "/etc/grafana/dashboards/dashboard-leni.json"]
COPY ["./dashboards.yaml", "/etc/grafana/dashboards/dashboards.yaml"]

ENTRYPOINT ["/run.sh"]