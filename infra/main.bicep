// main.bicep - Infraestrutura para hospedar o site estático O Amigo Lucas no Azure Storage Account
targetScope = 'resourceGroup'

// Parâmetros
@description('Nome base para os recursos')
param projectName string = 'oamigolucas'

@description('Localização dos recursos Azure')
param location string = resourceGroup().location

@description('Ambiente (dev, staging, prod)')
param environmentName string = 'dev'

// Variáveis
var resourceToken = toLower(uniqueString(subscription().id, resourceGroup().id, environmentName))
var storageAccountName = '${projectName}${resourceToken}'

// Tags comuns
var tags = {
  'azd-env-name': environmentName
  'azd-service-name': 'web'
  project: projectName
  environment: environmentName
}

// Storage Account para hospedar site estático
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  tags: union(tags, {
    'azd-service-name': 'web'
  })
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: true
    defaultToOAuthAuthentication: false
    publicNetworkAccess: 'Enabled'
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
}

// Habilitação do static website no Storage Account
resource staticWebsite 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  name: 'default'
  parent: storageAccount
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['GET', 'HEAD', 'OPTIONS']
          allowedHeaders: ['*']
          exposedHeaders: ['*']
          maxAgeInSeconds: 86400
        }
      ]
    }
  }
}

// Outputs
@description('URL do site estático hospedado no Storage Account')
output AZURE_STORAGE_STATIC_WEB_URL string = 'https://${storageAccount.name}.z13.web.${environment().suffixes.storage}'

@description('Nome do Storage Account')
output AZURE_STORAGE_ACCOUNT_NAME string = storageAccount.name

@description('Endpoint principal do blob storage')
output AZURE_STORAGE_BLOB_ENDPOINT string = storageAccount.properties.primaryEndpoints.blob

@description('Resource Group onde os recursos foram criados')
output AZURE_RESOURCE_GROUP string = resourceGroup().name

@description('Resource Group ID')
output RESOURCE_GROUP_ID string = resourceGroup().id
