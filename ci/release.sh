#!/bin/bash

set -e
(
    set -x

    echo $KubeConfig > acs.config.json_

    base64 -d acs.config.json_ > acs.config.json

    export KUBECONFIG=acs.config.json
    
    kubectl cluster-info

    kubectl set image deployment/$K8_IMAGE_NAME $K8_IMAGE_NAME=clinicaalemana.azurecr.io/main-web:$CI_COMMIT_SHA

    rm -rf acs.config.json_ 
    rm -rf acs.config.json
)