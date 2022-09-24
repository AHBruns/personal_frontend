FROM pierrezemb/gostatic
COPY ./dist/ /srv/http/
EXPOSE 8080
CMD ["-port", "8080", "-fallback", "/index.html"]
