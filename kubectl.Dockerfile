FROM bash:4.4

ENV KUBE_LATEST_VERSION="v1.9.0"
COPY ci /ci

RUN apk add --update ca-certificates \
 && apk add bash --update -t deps curl \
 && curl -L https://storage.googleapis.com/kubernetes-release/release/${KUBE_LATEST_VERSION}/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl \
 && chmod +x /usr/local/bin/kubectl \
 && apk del --purge deps \
 && rm /var/cache/apk/*

CMD ["bash", "/ci/release.sh"]