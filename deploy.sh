#!/bin/bash

# Script para deploy do site estático O Amigo Lucas no Azure Storage Account
# Uso: ./deploy.sh [nome-do-environment]

set -e

# Parâmetros
ENVIRONMENT_NAME=${1:-"dev"}
PROJECT_NAME="oamigolucas"
LOCATION="eastus2"
RESOURCE_GROUP_NAME="${PROJECT_NAME}-rg-${ENVIRONMENT_NAME}"

echo "🚀 Iniciando deployment do site O Amigo Lucas..."
echo "📋 Environment: ${ENVIRONMENT_NAME}"
echo "📍 Location: ${LOCATION}"
echo "📦 Resource Group: ${RESOURCE_GROUP_NAME}"

# Verificar se está logado no Azure
echo "🔐 Verificando autenticação no Azure..."
az account show > /dev/null || {
    echo "❌ Você não está logado no Azure. Execute 'az login' primeiro."
    exit 1
}

# Criar Resource Group
echo "📁 Criando Resource Group..."
az group create \
    --name "${RESOURCE_GROUP_NAME}" \
    --location "${LOCATION}" \
    --tags "azd-env-name=${ENVIRONMENT_NAME}" "project=${PROJECT_NAME}"

# Deploy da infraestrutura
echo "🏗️  Fazendo deploy da infraestrutura..."
DEPLOYMENT_OUTPUT=$(az deployment group create \
    --resource-group "${RESOURCE_GROUP_NAME}" \
    --template-file "./infra/main.bicep" \
    --parameters \
        projectName="${PROJECT_NAME}" \
        environmentName="${ENVIRONMENT_NAME}" \
        location="${LOCATION}" \
    --query 'properties.outputs' \
    --output json)

# Extrair informações do output
STORAGE_ACCOUNT_NAME=$(echo $DEPLOYMENT_OUTPUT | jq -r '.azurE_STORAGE_ACCOUNT_NAME.value')
STATIC_WEB_URL=$(echo $DEPLOYMENT_OUTPUT | jq -r '.azurE_STORAGE_STATIC_WEB_URL.value')

echo "✅ Infraestrutura criada com sucesso!"
echo "📦 Storage Account: ${STORAGE_ACCOUNT_NAME}"

# Habilitar static website hosting
echo "🌐 Habilitando static website hosting..."
az storage blob service-properties update \
    --account-name "${STORAGE_ACCOUNT_NAME}" \
    --static-website \
    --index-document "index.html" \
    --404-document "index.html" \
    --auth-mode login

# Upload dos arquivos do site
echo "📤 Fazendo upload dos arquivos do site..."

# Fazer upload do index.html
az storage blob upload \
    --account-name "${STORAGE_ACCOUNT_NAME}" \
    --container-name '$web' \
    --name "index.html" \
    --file "./index.html" \
    --content-type "text/html" \
    --auth-mode login \
    --overwrite

# Fazer upload do styles.css
az storage blob upload \
    --account-name "${STORAGE_ACCOUNT_NAME}" \
    --container-name '$web' \
    --name "styles.css" \
    --file "./styles.css" \
    --content-type "text/css" \
    --auth-mode login \
    --overwrite

# Fazer upload do script.js
az storage blob upload \
    --account-name "${STORAGE_ACCOUNT_NAME}" \
    --container-name '$web' \
    --name "script.js" \
    --file "./script.js" \
    --content-type "application/javascript" \
    --auth-mode login \
    --overwrite

# Fazer upload de outros arquivos necessários
for file in robots.txt sitemap.xml; do
    if [ -f "./${file}" ]; then
        az storage blob upload \
            --account-name "${STORAGE_ACCOUNT_NAME}" \
            --container-name '$web' \
            --name "${file}" \
            --file "./${file}" \
            --auth-mode login \
            --overwrite
    fi
done

# Fazer upload das imagens
echo "🖼️  Fazendo upload das imagens..."
for image_file in images/*; do
    if [ -f "$image_file" ]; then
        filename=$(basename "$image_file")
        az storage blob upload \
            --account-name "${STORAGE_ACCOUNT_NAME}" \
            --container-name '$web' \
            --name "images/${filename}" \
            --file "$image_file" \
            --auth-mode login \
            --overwrite
    fi
done

echo ""
echo "🎉 Deploy concluído com sucesso!"
echo "🌐 URL do site: ${STATIC_WEB_URL}"
echo "📦 Storage Account: ${STORAGE_ACCOUNT_NAME}"
echo "📁 Resource Group: ${RESOURCE_GROUP_NAME}"
echo ""
echo "O site estará disponível em alguns minutos em: ${STATIC_WEB_URL}"
